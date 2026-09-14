import { type ILinkPost } from '@/core/types/link'

export const postsData: {posts: ILinkPost[]; count: number} = {
	posts: [
		{
			'id': 1,
			'createdAt': '2024-12-04T09:42:11.621Z',
			'updatedAt': '2024-12-04T09:42:11.621Z',
			'content': 'Post 1',
			'embed': null,
		},
		{
			'id': 2,
			'createdAt': '2024-12-04T09:42:11.621Z',
			'updatedAt': '2024-12-04T09:42:11.621Z',
			'content': 'Post 2',
			'embed': null,
		},
	],
	count: 2,
}
