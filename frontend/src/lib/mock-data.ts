import { Event } from '../types/event'

export const mockEvents: Event[] = [
	{
		id: '1',
		title: "Joshua's Birthday",
		datetime: '2025-04-19T09:30:00',
		location: 'Marina Bay Sands',
		preferences: [
			{ id: '1', name: 'Art' },
			{ id: '2', name: 'Anime' },
		],
		budget: {
			min: 10,
			max: 20,
		},
		gifters: [
			{
				id: '1',
				name: 'John Doe',
				gift: 'Plant',
				amount: 12.5,
				isRepeated: true,
			},
			{
				id: '2',
				name: 'John Doe',
				gift: 'Plant',
				amount: 13.5,
				isRepeated: true,
			},
			{ id: '3', name: 'John Doe', gift: 'Cat', amount: 150.0 },
		],
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
