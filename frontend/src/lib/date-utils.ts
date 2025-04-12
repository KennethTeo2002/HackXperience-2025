import { format, parseISO } from 'date-fns'

export const formatEventDate = (dateString: string): string => {
	const date = parseISO(dateString)
	return format(date, 'd MMMM yyyy')
}

export const formatEventTime = (dateString: string): string => {
	const date = parseISO(dateString)
	return format(date, 'HH:mm')
}
