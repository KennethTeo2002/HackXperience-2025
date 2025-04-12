import { format, parseISO } from 'date-fns'

export function formatEventDate(dateString: string): string {
	const date = parseISO(dateString)
	return format(date, "EEEE, MMMM d, yyyy 'at' h:mm a")
}

export function formatShortDate(dateString: string): string {
	const date = parseISO(dateString)
	return format(date, 'MMM d')
}

export function formatTime(dateString: string): string {
	const date = parseISO(dateString)
	return format(date, 'h:mm a')
}
