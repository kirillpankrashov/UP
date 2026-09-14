import { debounce } from 'lodash'
import { EventSubscription, OBSWebSocket as ObsWebSocketClient } from 'obs-websocket-js'

import { PusherDebugEventName } from '@/core/types'
import { Logger, wait } from '@/core/helpers'
import { Widget } from '@/modules/Widget/class/Widget'
import type { ILayerSettings } from '@/modules/Widget/types'

export class ObsWebSocket {
	widget: Widget
	client: ObsWebSocketClient | null = null
	sceneName: string | null = null
	sceneItemId: number | null = null
	sourceName: string | null = null
	defaultSettings: ILayerSettings = {
		css: 'body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }',
		fps: 60,
		fps_custom: true,
		fps_override: true,
		height: 1080,
		positionX: 0,
		positionY: 0,
		reroute_audio: true,
		restart_when_active: true,
		scaleY: 1,
		scaleX: 1,
		shutdown: true,
		webpage_control_level: 5,
		width: 1920,
	}

	constructor (widget: Widget) {
		this.widget = widget
	}

	async init () {
		await this.connect()
		await this.getLayerInfo()

		this.setupWidget()

		await wait(1000)

		this.listenEvents()
	}

	async connect () {
		const { port, pass } = this.widget.data.value.obsWebSocket

		if (!('obsstudio' in window)) {
			return
		}

		if (!port) {
			Logger.debug('OBS WebSocket port is not set', false)
			return
		}

		try {
			this.client = new ObsWebSocketClient()
			await this.client.connect(`ws://localhost:${port}`, pass ?? undefined, {
				eventSubscriptions:
					EventSubscription.All | EventSubscription.SceneItemTransformChanged,
			})

			this.widget.pusher.privateChannel?.whisper(PusherDebugEventName.OBS_SETTINGS, {
				connected: true,
				sceneName: this.sceneName,
				sceneItemId: this.sceneItemId,
				sourceName: this.sourceName,
				userSettings: await this.getUserSettings(),
			})

			Logger.debug('Connected to OBS WebSocket')
		}
		catch (error) {
			Logger.error('Error connecting to OBS WebSocket', false, error)
		}
	}

	private async getLayerInfo () {
		if (!this.client) return

		const { inputs } = await this.client.call('GetInputList')
		for (const input of inputs) {
			if (input.inputKind === 'browser_source') {
				const { inputSettings } = await this.client.call('GetInputSettings', {
					inputName: input.inputName as string,
				})

				if (inputSettings.url && (inputSettings.url as string).startsWith(this.widget.data.value.url)) {
					this.sourceName = input.inputName as string
				}
			}
		}

		const { scenes } = await this.client.call('GetSceneList')
		for (const scene of scenes) {
			const items = await this.client.call('GetSceneItemList', { sceneName: scene.sceneName } as any)
			const item = items.sceneItems.find(i => i.sourceName === this.sourceName)

			if (item) {
				this.sceneName = scene.sceneName as string
				this.sceneItemId = item.sceneItemId as number
			}
		}
	}

	setupWidget (settings: ILayerSettings = this.defaultSettings) {
		this.setOrder()
		this.setPositioning(settings)
		this.setLayer(settings)
	}

	private async setPositioning (settings: ILayerSettings) {
		if (!this.client) return

		const videoSettings = await this.client.call('GetVideoSettings')

		this.client?.call('SetSceneItemTransform', {
			sceneName: this.sceneName!,
			sceneItemId: this.sceneItemId!,
			sceneItemTransform: {
				positionX: settings.positionX,
				positionY: settings.positionY,
				width: settings.width,
				height: settings.height,
				scaleX: videoSettings.baseWidth / settings.width,
				scaleY: videoSettings.baseHeight / settings.height,
			},
		})
	}

	private async setOrder () {
		if (!this.client) return

		const { inputs } = await this.client.call('GetInputList')

		this.client?.call('SetSceneItemIndex', {
			sceneName: this.sceneName!,
			sceneItemId: this.sceneItemId!,
			sceneItemIndex: inputs.length - 1,
		})
	}

	private async setLayer (settings: ILayerSettings) {
		if (!this.client) return

		this.client.call('SetInputSettings', {
			inputName: this.sourceName!,
			inputSettings: {
				...settings,
			},
			overlay: true,
		})
	}

	async getUserSettings () {
		if (!this.client) return

		const { inputSettings } = await this.client.call('GetInputSettings', {
			inputName: this.sourceName!,
		})

		const { sceneItemTransform } = await this.client.call('GetSceneItemTransform', {
			sceneName: this.sceneName!,
			sceneItemId: this.sceneItemId!,
		})

		const userSettings = {
			...inputSettings,
			positionX: sceneItemTransform.positionX,
			positionY: sceneItemTransform.positionY,
			scaleX: sceneItemTransform.scaleX,
			scaleY: sceneItemTransform.scaleY,
		}

		return {
			connected: !!this.client,
			sceneName: this.sceneName,
			sceneItemId: this.sceneItemId,
			sourceName: this.sourceName,
			userSettings: userSettings ?? null,
		}
	}

	listenEvents() {
		if (!this.client) return

		const debouncedLog = debounce(async () => {
			const userSettings = await this.getUserSettings()

			this.widget.pusher.privateChannel?.whisper(PusherDebugEventName.OBS_SETTINGS, userSettings)
		}, 3000)

		this.client.on('SceneItemTransformChanged', debouncedLog)

		this.client.on('InputSettingsChanged', debouncedLog)

		this.client.on('InputNameChanged', debouncedLog)

	}

	closeLayer () {
		if (!('obsstudio' in window)) {
			document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#666">You can close this tab</div>'
			document.title = 'Close this tab'
			return
		}

		if (!this.client) return

		this.client.call('RemoveSceneItem', {
			sceneName: this.sceneName!,
			sceneItemId: this.sceneItemId!,
		})
	}
}
