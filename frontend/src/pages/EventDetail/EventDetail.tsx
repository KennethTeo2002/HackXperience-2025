import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button, Flex } from '@chakra-ui/react'
import { IconButton, Badge } from '@chakra-ui/react'
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { getEventById } from '@/lib/mock-data'
import { formatEventDate } from '@/lib/date-utils'
import { EventPreference, Gifter } from '../../types/event'

const EventDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()

	const {
		data: event,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['event', id],
		queryFn: () => getEventById(id || ''),
		enabled: !!id,
	})

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-20">
				<p className="text-xl">Loading event details...</p>
			</div>
		)
	}

	if (error || !event) {
		return (
			<div className="flex flex-col items-center justify-center py-20">
				<p className="text-xl text-red-500 mb-4">Event not found</p>
				<Link to="/events">
					<Button variant="outline">Back to Events</Button>
				</Link>
			</div>
		)
	}
	const calculateAveragePrice = (gifters: Gifter[]): number => {
		const totalAmount = gifters.reduce(
			(acc, gifter) => acc + gifter.amount,
			0,
		)
		return totalAmount / gifters.length
	}

	const averagePrice = event.gifters
		? calculateAveragePrice(event.gifters)
		: 0

	return (
		<Flex>
			<div className="bg-white rounded-xl shadow-sm overflow-hidden">
				<div className="p-6 md:p-8">
					<h1 className="text-2xl md:text-3xl font-bold mb-3">
						{event.title}
					</h1>
					<div className="flex flex-wrap gap-6 mb-6 text-slate-600">
						<div className="flex items-center gap-2">
							<IconButton
								icon={<FaCalendarAlt />}
								aria-label="Open Calendar"
								size="lg"
							/>
							<span>{formatEventDate(event.datetime)}</span>
						</div>
						<div className="flex items-center gap-2">
							<IconButton
								icon={<FaMapMarkerAlt />}
								aria-label="Open Calendar"
								size="lg"
							/>
							<span>{event.location}</span>
						</div>
					</div>
					<div className="flex flex-wrap gap-2 mb-6">
						{event.preferences.map((pref: EventPreference) => (
							<Badge
								key={pref}
								className="bg-event-muted text-event"
							>
								{pref}
							</Badge>
						))}
					</div>
					<Flex>
						Still stuck? Use our AI to generate some questions to
						ask the Giftee!
					</Flex>
					<Button>Generate Questions</Button>

					<Flex>
						{event.gifters && event.gifters.length > 0 && (
							<div className="mb-6">
								<h2 className="text-xl font-semibold mb-3">
									Gifters
								</h2>
								{event.gifters.map((gifter: Gifter) => (
									<div className="bg-yellow-100 p-4 rounded-lg flex items-center justify-between mb-3">
										<div className="flex flex-col">
											<p>
												{' '}
												{gifter.name} bought a{' '}
												{gifter.gift}$
												{gifter.amount.toFixed(2)}
											</p>
										</div>
									</div>
								))}
							</div>
						)}
					</Flex>
					<Flex>
						<p>
							Budget: {event.budget} Average Price: $
							{averagePrice.toFixed(2)}
						</p>
					</Flex>
				</div>
			</div>
		</Flex>
	)
}

export default EventDetail
