import { Event } from '../types/event'

export const mockEvents: Event[] = [
	{
		id: '1',
		title: 'Joshua’s Birthday',
		datetime: '2025-07-15T10:00:00Z',
		location: 'Marina Bay Sands',
		preferences: ['Art', 'Anime', 'Technology'],
		createdAt: '2025-04-01T08:00:00Z',
		gifters: [
			{ name: 'john', gift: 'plant', amount: 10 },
			{ name: 'john2', gift: 'plant2', amount: 11 },
		],
		budget: '10-20',
	},
	{
		id: '2',
		title: 'Downtown Art Exhibition',
		datetime: '2025-05-20T18:30:00Z',
		location: 'Downtown Art Gallery',
		preferences: ['Art', 'Networking'],
		createdAt: '2025-04-05T14:30:00Z',
	},
	{
		id: '3',
		title: 'Charity Marathon',
		datetime: '2025-06-10T07:00:00Z',
		location: 'Central Park',
		preferences: ['Sports', 'Charity', 'Outdoors'],
		createdAt: '2025-04-02T11:20:00Z',
	},
	{
		id: '4',
		title: 'Food & Wine Festival',
		datetime: '2025-05-25T16:00:00Z',
		location: 'Harbor Convention Center',
		preferences: ['Food', 'Networking'],
		createdAt: '2025-04-03T09:45:00Z',
	},
	{
		id: '5',
		title: 'Business Leadership Workshop',
		datetime: '2025-05-18T09:00:00Z',
		location: 'Executive Learning Center',
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
