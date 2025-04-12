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

interface Gifter {
	name: string
	gift: string
	amount: number
}

export interface Event {
	id: string
	title: string
	description?: string
	datetime: string // ISO string
	location: string
	image?: string
	preferences: EventPreference[]
	createdAt: string
	gifters?: Gifter[]
}
