export type EventPreference =
	| 'Music'
	| 'Sports'
	| 'Art'
	| 'Technology'
	| 'Food'
	| 'Education'
	| 'Networking'
	| 'Outdoors'
	| 'Charity'
	| 'Business'
	| 'Anime'

export interface Gifter {
	name: string
	gift: string
	amount: number
}

export interface Event {
	id: string
	title: string
	datetime: string // ISO string
	location: string
	preferences: EventPreference[]
	createdAt: string
	gifters?: Gifter[]
	budget?: string
}
