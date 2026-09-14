export const useYoutube = () => {
	const isYouTubeLink = (url: string) => {
		const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([a-zA-Z0-9_-]{11})(\S*)?$/

		return pattern.test(url)
	}

	const getYouTubeVideoId = (url: string) => {
		const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|embed|watch)\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
		const match = url.match(pattern)
		return match ? match[1] : null
	}

	return {
		isYouTubeLink,
		getYouTubeVideoId,
	}
}
