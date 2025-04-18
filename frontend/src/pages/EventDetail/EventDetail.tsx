import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
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
	const [isLoadingRecommendedGifts, setIsLoadingRecommendedGifts] =
		useState(false)
	const [isLoadingRecommendQuestions, setIsLoadingRecommendQuestions] =
		useState(false)
	const [giftsLoaded, setGiftsLoaded] = useState(false)
	const [questionsLoaded, setQuestionsLoaded] = useState(false)
	const [data, setData] = useState()

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

	const handleGenerateGifts = async () => {
		if (!id) return

		setIsLoadingRecommendedGifts(true)
		try {
			const response = await fetch(
				`http://127.0.0.1:8000/recommend_gifts/event/${id}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)

			if (!response.ok) {
				throw new Error('Failed to generate gift ideas')
			}

			const data = await response.json()
			setQuestionsLoaded(false)
			setGiftsLoaded(true)
			setData(data)
		} catch (error) {
			console.error('Error generating gift ideas:', error)
		} finally {
			setIsLoadingRecommendedGifts(false)
		}
	}

	const handleGenerateQuestions = async () => {
		if (!id) return

		setIsLoadingRecommendQuestions(true)
		try {
			const response = await fetch(
				`http://127.0.0.1:8000/recommend_questions/event/${id}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)

			if (!response.ok) {
				throw new Error('Failed to generate questions')
			}

			const data = await response.json()
			setGiftsLoaded(false)
			setQuestionsLoaded(true)
			setData(data)
		} catch (error) {
			console.error('Error generating questions:', error)
		} finally {
			setIsLoadingRecommendQuestions(false)
		}
	}

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
								marginBottom: '0.6rem',
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
									marginBottom: '0.5rem',
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
											background: '#40BFFF',
											color: 'white',
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
								textAlign: 'center',
							}}
						>
							<p style={{ marginBottom: '1rem', color: '#555' }}>
								Still stuck? Use our AI to generate gift ideas
								or even some questions to ask the Giftee for
								better ideas!
							</p>
							<Flex gap="1rem" justify="center">
								<Button
									background="#4254B0"
									color="white"
									borderRadius="30px"
									padding="0 20px"
									onClick={handleGenerateGifts}
								>
									Generate Gift Ideas
								</Button>

								<Button
									background="#4254B0"
									color="white"
									borderRadius="30px"
									padding="0 20px"
									onClick={handleGenerateQuestions}
								>
									Generate Questions
								</Button>
							</Flex>
						</div>
						<Flex
							flexDir="column"
							maxWidth="400px"
							marginTop="8px"
							borderRadius="12px"
							height="120px"
							padding="40px"
							display={
								giftsLoaded || questionsLoaded
									? 'initial'
									: 'none'
							}
						>
							<Text fontWeight="semibold">
								AI-Recommended{' '}
								{giftsLoaded ? 'Gifts' : 'Question Suggestions'}
							</Text>
							<Text overflow="text">{data}</Text>
						</Flex>

						{/* Gifters Section */}
						{event.gifters && event.gifters.length > 0 && (
							<div
								style={{
									marginBottom: '2rem',
									marginTop: '2rem',
								}}
							>
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
											background: '#F8CF61',
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
											<span style={{ fontWeight: '600' }}>
												{gifter.name}
											</span>
											<span
												style={{
													fontWeight: '400',
												}}
											>
												bought a {gifter.gift}
											</span>
											{gifter.isRepeated && (
												<Box
													color="white"
													bgColor="#DA2F47"
													borderRadius="20px"
													padding="5px 12px"
													fontSize="xs"
												>
													Repeated Gift
												</Box>
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
						<Flex
							flexDir="column"
							gap="0.75rem"
							padding="1rem 1.2rem"
							bgColor="#f9f9f9"
							borderRadius="0.5rem"
							fontSize="lg"
						>
							<Flex flexDir="row" justifyContent="space-between">
								<Flex width="60%">
									<Text fontWeight="bold" marginRight="10px">
										Budget:{' '}
									</Text>
									<Text>
										${event.budget.min} - $
										{event.budget.max}
									</Text>
								</Flex>
								<Flex
									fontWeight="500"
									borderLeft="1px solid #ddd"
									paddingLeft="30px"
								>
									<Text fontWeight="bold" marginRight="10px">
										Average Price:
									</Text>
									<Text>${averagePrice.toFixed(2)}</Text>
								</Flex>
							</Flex>
						</Flex>

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
