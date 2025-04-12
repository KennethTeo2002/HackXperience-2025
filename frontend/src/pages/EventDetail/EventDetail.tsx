import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button, Flex } from '@chakra-ui/react'
import {
	FaCalendarAlt,
	FaClock,
	FaMapMarkerAlt,
	FaUserPlus,
} from 'react-icons/fa'
import { Badge } from '@/components/badge'
import { Card, CardContent } from '@/components/card'
import { formatEventDate, formatEventTime } from '@/lib/date-utils'
import { Gifter } from '@/types/event'
import Navbar from '../Home/Navbar'

const EventDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()

	// Query to fetch event by ID from the public JSON file
	const {
		data: event,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['event', id],
		queryFn: async () => {
			const response = await fetch(`/data.json`)
			if (!response.ok) throw new Error('Event not found')
			const data = await response.json()
			return data.events.find((event: any) => event.id === id)
		},
		enabled: !!id,
	})

	if (isLoading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '5rem 0',
				}}
			>
				<p style={{ fontSize: '1.25rem' }}>Loading event details...</p>
			</div>
		)
	}

	if (error || !event) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '5rem 0',
				}}
			>
				<p
					style={{
						fontSize: '1.25rem',
						color: '#DC3545',
						marginBottom: '1rem',
					}}
				>
					Event not found
				</p>
				<Link to="/">
					<Button variant="outline">Back to Home</Button>
				</Link>
			</div>
		)
	}

	const calculateAveragePrice = (gifters: Gifter[]): number => {
		if (gifters.length === 0) return 0
		const totalAmount = gifters.reduce(
			(acc, gifter) => acc + gifter.amount,
			0,
		)
		return totalAmount / gifters.length
	}

	const averagePrice = event.gifters
		? calculateAveragePrice(event.gifters)
		: 0

	const handleGenerateQuestions = () => {
		console.log('Generating questions')
		// Implement AI question generation functionality here
	}

	return (
		<Flex height="100vh" flexDir="column" bgColor="#F6F2ED">
			<Navbar />
			<Flex
				height="100%"
				width="100%"
				alignItems="center"
				justifyContent="center"
				padding="24px"
				overflow="hidden"
				zIndex="0"
			>
				<Card
					style={{
						overflowY: 'auto', // Enable vertical scrolling
						maxHeight: '80vh', // Set the maximum height of the card (you can adjust as needed)
						border: 'none',
						boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
						borderRadius: '0.75rem',
						background: 'white',
					}}
				>
					<CardContent style={{ padding: '1.5rem', margin: '0' }}>
						{/* Event Title */}
						<h1
							style={{
								fontSize: 'clamp(1.5rem, 5vw, 1.875rem)',
								fontWeight: '700',
								marginBottom: '1.5rem',
								color: '#F36B7F',
							}}
						>
							{event.title}
						</h1>

						{/* Event Details */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',
								marginBottom: '1.5rem',
							}}
						>
							<div
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: '2rem',
									color: '#666',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '0.5rem',
									}}
								>
									<FaCalendarAlt
										style={{
											height: '1.25rem',
											width: '1.25rem',
											color: '#4254B0',
										}}
									/>
									<span>
										{formatEventDate(event.datetime)}
									</span>
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '0.5rem',
									}}
								>
									<FaClock
										style={{
											height: '1.25rem',
											width: '1.25rem',
											color: '#4254B0',
										}}
									/>
									<span>
										{formatEventTime(event.datetime)}
									</span>
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '0.5rem',
									}}
								>
									<FaMapMarkerAlt
										style={{
											height: '1.25rem',
											width: '1.25rem',
											color: '#4254B0',
										}}
									/>
									<span>{event.location}</span>
								</div>
							</div>
						</div>

						{/* Preferences */}
						<div style={{ marginBottom: '2rem' }}>
							<h2
								style={{
									fontSize: '1.25rem',
									fontWeight: '600',
									marginBottom: '0.75rem',
									color: '#4254B0',
								}}
							>
								Collated Preferences
							</h2>
							<div
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: '0.5rem',
								}}
							>
								{event.preferences.map((pref: any) => (
									<Badge
										key={pref.id}
										style={{
											background: '#F8F4EA',
											color: '#4254B0',
											fontWeight: '500',
											padding: '0.25rem 0.75rem',
											borderRadius: '9999px',
										}}
									>
										{pref.name}
									</Badge>
								))}
							</div>
						</div>

						{/* AI Help Box */}
						<div
							style={{
								background: '#F8F4EA',
								borderRadius: '0.5rem',
								padding: '1.5rem',
								marginBottom: '2rem',
								textAlign: 'center',
							}}
						>
							<p style={{ marginBottom: '1rem', color: '#555' }}>
								Still stuck? Use our AI to generate some
								questions to ask the Giftee!
							</p>
							<Button
								style={{
									background: '#4254B0',
									color: 'white',
								}}
								onClick={handleGenerateQuestions}
							>
								Generate Questions
							</Button>
						</div>

						{/* Gifters Section */}
						{event.gifters && event.gifters.length > 0 && (
							<div style={{ marginBottom: '2rem' }}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										marginBottom: '1rem',
									}}
								>
									<h2
										style={{
											fontSize: '1.25rem',
											fontWeight: '600',
											color: '#4254B0',
										}}
									>
										Gifters
									</h2>
									<Button
										variant="outline"
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.25rem',
											border: '1px solid #4254B0',
											color: '#4254B0',
										}}
									>
										<FaUserPlus
											style={{
												height: '1rem',
												width: '1rem',
											}}
										/>
										<span>Invite</span>
									</Button>
								</div>

								{event.gifters.map((gifter: any) => (
									<div
										key={gifter.id}
										style={{
											background: '#F8F4EA',
											padding: '1rem',
											borderRadius: '0.5rem',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											marginBottom: '0.75rem',
										}}
									>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
											}}
										>
											<span style={{ fontWeight: '500' }}>
												{gifter.name}
											</span>
											<span style={{ color: '#666' }}>
												bought a {gifter.gift}
											</span>
											{gifter.isRepeated && (
												<Badge
													style={{
														background: '#DC3545',
														color: 'white',
													}}
												>
													Repeated Gift
												</Badge>
											)}
										</div>
										<div style={{ fontWeight: '600' }}>
											${gifter.amount.toFixed(2)}
										</div>
									</div>
								))}
							</div>
						)}

						{/* Budget Summary */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '0.75rem',
								padding: '1rem 1.5rem',
								background: '#f9f9f9',
								borderRadius: '0.5rem',
							}}
						>
							<div
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: '2rem',
								}}
							>
								<div style={{ fontWeight: '500' }}>
									Budget: ${event.budget.min} - $
									{event.budget.max}
								</div>
								<div
									style={{
										fontWeight: '500',
										borderLeft: '1px solid #ddd',
										paddingLeft: '2rem',
									}}
								>
									Average Price: ${averagePrice.toFixed(2)}
								</div>
							</div>
						</div>

						{/* Back Button */}
						<div
							style={{
								marginTop: '2rem',
								textAlign: 'center',
							}}
						>
							<Button
								variant="outline"
								onClick={() => navigate('/')}
								style={{
									color: '#4254B0',
									borderColor: 'rgba(66, 84, 176, 0.3)',
								}}
							>
								Back to Events
							</Button>
						</div>
					</CardContent>
				</Card>
			</Flex>
		</Flex>
	)
}

export default EventDetail
