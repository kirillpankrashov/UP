export interface IObsData {
  connected: boolean
	sceneName: string | null
	sceneItemId: number | null
	sourceName: string | null
	userSettings: Record<string, unknown> | null
}
