import { Logger } from './Logger'

const FORM_ID = 'npNy2J'
const DAYS_AFTER_SUBMITTED = 60
const DAYS_AFTER_CLOSED = 7
const DAYS_REPEAT_CYCLE = 25
const AUTO_CLOSE_TIMEOUT = 30000
const SHOW_DELAY = 2000
const DEFAULT_WIDTH = 600

interface TallyFormData {
	lastSubmitted?: number
	lastClosed?: number
	closureCount: number
}

interface TallyFormConfig {
	formId: string
	storageKey?: string
	autoCloseTimeout?: number
	showDelay?: number
	layout?: 'default' | 'modal'
	width?: number
	hiddenFields?: { [key: string]: any }
}

export class TallyFormManager {
	private readonly formId: string
	private readonly storageKey: string
	private readonly autoCloseTimeout: number
	private readonly showDelay: number
	private readonly layout: 'default' | 'modal'
	private readonly width: number
	private hiddenFields: { [key: string]: any }
	private autoCloseTimer: number | null = null
	private isFormSubmitted = false
	private userInteractionHandler: (() => void) | null = null

	constructor(config: TallyFormConfig) {
		this.formId = config.formId || FORM_ID
		this.storageKey = config.storageKey || 'tally_form_data'
		this.autoCloseTimeout = config.autoCloseTimeout || AUTO_CLOSE_TIMEOUT
		this.showDelay = config.showDelay || SHOW_DELAY
		this.layout = config.layout || 'modal'
		this.width = config.width || DEFAULT_WIDTH
		this.hiddenFields = config.hiddenFields || {}
	}

	private getTallyFormData(): TallyFormData {
		const stored = localStorage.getItem(this.storageKey)

		if (stored) {
			try {
				return JSON.parse(stored)
			}
			catch (error) {
				Logger.warning('Failed to parse Tally form data from localStorage:', false, error)
			}
		}
		return { closureCount: 0 }
	}

	private saveTallyFormData(data: TallyFormData): void {
		try {
			localStorage.setItem(this.storageKey, JSON.stringify(data))
		}
		catch (error) {
			Logger.warning('Failed to save Tally form data to localStorage:', false, error)
		}
	}

	private shouldShowTallyForm(): boolean {
		const now = Date.now()
		const data = this.getTallyFormData()

		if (data.lastSubmitted) {
			const daysSinceSubmission = (now - data.lastSubmitted) / (1000 * 60 * 60 * 24)
			return daysSinceSubmission >= DAYS_AFTER_SUBMITTED
		}

		if (data.lastClosed) {
			const daysSinceClosure = (now - data.lastClosed) / (1000 * 60 * 60 * 24)

			if (daysSinceClosure < DAYS_AFTER_CLOSED) {
				return false
			}

			const daysAfterFirstPeriod = daysSinceClosure - DAYS_AFTER_CLOSED
			const cycleLength = DAYS_REPEAT_CYCLE
			const currentCycle = Math.floor(daysAfterFirstPeriod / cycleLength)
			const daysInCurrentCycle = daysAfterFirstPeriod % cycleLength

			return daysInCurrentCycle === 0 && Math.floor(daysAfterFirstPeriod) === currentCycle * cycleLength
		}

		return true
	}

	private showTallyForm(): void {
		if (!window.Tally) {
			Logger.warning('Tally is not false, loaded')
			return
		}

		const data = this.getTallyFormData()
		this.isFormSubmitted = false

		window.Tally.openPopup(this.formId, {
			layout: this.layout,
			width: this.width,
			hiddenFields: this.hiddenFields,
			onSubmit: () => {
				this.clearAutoCloseTimer()
				this.removeUserInteractionListeners()
				this.isFormSubmitted = true
				const updatedData: TallyFormData = {
					...data,
					lastSubmitted: Date.now(),
				}
				this.saveTallyFormData(updatedData)
			},
			onClose: () => {
				this.clearAutoCloseTimer()
				this.removeUserInteractionListeners()

				if (!this.isFormSubmitted) {
					const updatedData: TallyFormData = {
						...data,
						lastClosed: Date.now(),
						closureCount: data.closureCount + 1,
					}
					this.saveTallyFormData(updatedData)
				}
				this.isFormSubmitted = false
			},
			onPageView: () => {
				// Сбрасываем таймер при переходе между страницами формы
				this.resetAutoCloseTimer()
			},
		})

		// Запускаем таймер и добавляем слушатели взаимодействия
		this.startAutoCloseTimer()
		this.addUserInteractionListeners()
	}

	private startAutoCloseTimer(): void {
		if (this.autoCloseTimeout > 0) {
			this.autoCloseTimer = window.setTimeout(() => {
				this.forceCloseForm()
			}, this.autoCloseTimeout)
		}
	}

	private clearAutoCloseTimer(): void {
		if (this.autoCloseTimer) {
			window.clearTimeout(this.autoCloseTimer)
			this.autoCloseTimer = null
		}
	}

	private forceCloseForm(): void {
		if (window.Tally && window.Tally.closePopup) {
			window.Tally.closePopup(this.formId)
		}
	}

	private resetAutoCloseTimer(): void {
		this.clearAutoCloseTimer()
		this.startAutoCloseTimer()
	}

	private addUserInteractionListeners(): void {
		// Создаем обработчик для сброса таймера при взаимодействии
		this.userInteractionHandler = () => {
			this.resetAutoCloseTimer()
		}

		// Добавляем слушатели для различных событий взаимодействия
		document.addEventListener('click', this.userInteractionHandler, true)
		document.addEventListener('input', this.userInteractionHandler, true)
		document.addEventListener('keydown', this.userInteractionHandler, true)
		document.addEventListener('scroll', this.userInteractionHandler, true)
	}

	private removeUserInteractionListeners(): void {
		if (this.userInteractionHandler) {
			document.removeEventListener('click', this.userInteractionHandler, true)
			document.removeEventListener('input', this.userInteractionHandler, true)
			document.removeEventListener('keydown', this.userInteractionHandler, true)
			document.removeEventListener('scroll', this.userInteractionHandler, true)
			this.userInteractionHandler = null
		}
	}

	showIfReady(): void {
		if (this.shouldShowTallyForm()) {
			window.setTimeout(() => {
				this.showTallyForm()
			}, this.showDelay)
		}
	}

	forceShow(): void {
		this.showTallyForm()
	}

	getFormStatus(): TallyFormData & { shouldShow: boolean } {
		const data = this.getTallyFormData()
		return {
			...data,
			shouldShow: this.shouldShowTallyForm(),
		}
	}

	resetFormData(): void {
		this.clearAutoCloseTimer()
		this.removeUserInteractionListeners()
		this.isFormSubmitted = false
		localStorage.removeItem(this.storageKey)
	}

	updateHiddenFields(fields: { [key: string]: any }): void {
		Object.assign(this.hiddenFields, fields)
	}

	closeForm(): void {
		this.forceCloseForm()
	}

	destroy(): void {
		this.clearAutoCloseTimer()
		this.removeUserInteractionListeners()
		this.isFormSubmitted = false
	}
}
