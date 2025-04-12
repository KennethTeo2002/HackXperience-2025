import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button, Flex } from '@chakra-ui/react'
import { IconButton, Badge } from '@chakra-ui/react'
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { getEventById } from '@/lib/mock-data'
import { formatEventDate } from '@/lib/date-utils'
import { EventPreference } from '../../types/event'

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
					<Flex>Still stuck use AI</Flex>

					{event.description && (
						<div className="prose max-w-none mb-8">
							<h2 className="text-xl font-semibold mb-2">
								About this event
							</h2>
							<p className="text-slate-700">
								{event.description}
							</p>
						</div>
					)}
					<Flex>
						{event.gifters && event.gifters.length > 0 && (
							<div className="mb-6">
								<h2 className="text-xl font-semibold mb-3">
									Gifters
								</h2>
								{event.gifters.map((gifter: Gifter) => (
									<div className="bg-yellow-100 p-4 rounded-lg flex items-center justify-between mb-3">
										<div className="flex flex-col">
											<span className="font-bold">
												{gifter.name}
											</span>
											<span>{gifter.gift}</span>
										</div>
										<span className="text-xl font-semibold">
											${gifter.amount.toFixed(2)}
										</span>
									</div>
								))}
							</div>
						)}
					</Flex>
				</div>
			</div>
		</Flex>
	)
}

export default EventDetail
