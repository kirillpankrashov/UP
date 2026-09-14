export const removeEmptyProps = (obj: Record<string, unknown>) => {
	for (const key in obj) {
		if (obj[key] === undefined) {
			delete obj[key]
		}
	}
}
