import { Event } from '../types/event'

export const mockEvents: Event[] = [
	{
		id: '1',
		title: 'Summer Tech Conference',
		description:
			'Join us for the biggest tech conference of the summer. Network with industry professionals and learn about the latest trends in technology.',
		datetime: '2025-07-15T10:00:00Z',
		location: 'San Francisco Convention Center',
		image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000',
		preferences: ['Technology', 'Networking', 'Education'],
		createdAt: '2025-04-01T08:00:00Z',
	},
	{
		id: '2',
		title: 'Downtown Art Exhibition',
		description:
			'Explore the works of local artists in this monthly exhibition showcasing various art forms and styles.',
		datetime: '2025-05-20T18:30:00Z',
		location: 'Downtown Art Gallery',
		image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1000',
		preferences: ['Art', 'Networking'],
		createdAt: '2025-04-05T14:30:00Z',
	},
	{
		id: '3',
		title: 'Charity Marathon',
		description:
			"Run for a cause! Join our annual charity marathon to raise funds for children's education.",
		datetime: '2025-06-10T07:00:00Z',
		location: 'Central Park',
		image: 'https://images.unsplash.com/photo-1557159557-7a93fb1af9fd?q=80&w=1000',
		preferences: ['Sports', 'Charity', 'Outdoors'],
		createdAt: '2025-04-02T11:20:00Z',
	},
	{
		id: '4',
		title: 'Food & Wine Festival',
		description:
			'Taste extraordinary culinary creations and exquisite wines from top chefs and wineries.',
		datetime: '2025-05-25T16:00:00Z',
		location: 'Harbor Convention Center',
		image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000',
		preferences: ['Food', 'Networking'],
		createdAt: '2025-04-03T09:45:00Z',
	},
	{
		id: '5',
		title: 'Business Leadership Workshop',
		description:
			'Develop essential leadership skills with guidance from experienced business professionals.',
		datetime: '2025-05-18T09:00:00Z',
		location: 'Executive Learning Center',
		image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000',
		preferences: ['Business', 'Education', 'Networking'],
		createdAt: '2025-04-04T13:15:00Z',
	},
]

export function getEvents(): Promise<Event[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockEvents)
		}, 500)
	})
}

export function getEventById(id: string): Promise<Event | undefined> {
	return new Promise((resolve) => {
		setTimeout(() => {
			const event = mockEvents.find((event) => event.id === id)
			resolve(event)
		}, 300)
	})
}
