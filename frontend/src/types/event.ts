export interface EventPreference {
	id: string
	name: string
}

export interface Gifter {
	id: string
	name: string
	gift: string
	amount: number
	isRepeated?: boolean
}

export interface Event {
	id: string
	title: string
	datetime: string
	location: string
	preferences: EventPreference[]
	budget: {
		min: number
		max: number
	}
	gifters: Gifter[]
}
