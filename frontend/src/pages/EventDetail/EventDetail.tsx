import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button, Flex } from '@chakra-ui/react'
import { IconButton, Badge } from '@chakra-ui/react'
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { getEventById } from '@/lib/mock-data'
import { formatEventDate } from '@/lib/date-utils'

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
			<button
				onClick={() => navigate(-1)}
				className="flex items-center text-slate-600 hover:text-event mb-6 transition-colors"
			>
				Back to Events
			</button>

			<div className="bg-white rounded-xl shadow-sm overflow-hidden">
				<div className="relative h-64 md:h-80 bg-slate-200">
					{event.image ? (
						<img
							src={event.image}
							alt={event.title}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
							No Image Available
						</div>
					)}
				</div>

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
						{event.preferences.map((pref) => (
							<Badge
								key={pref}
								className="bg-event-muted text-event"
							>
								{pref}
							</Badge>
						))}
					</div>

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

					<div className="mt-8">
						<Button
							className="bg-event hover:bg-event-accent"
							size="lg"
						>
							Register for this event
						</Button>
					</div>
				</div>
			</div>
		</Flex>
	)
}

export default EventDetail
