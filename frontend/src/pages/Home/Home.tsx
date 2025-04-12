import { Button, Flex, Text, Image, Box } from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import CalendarImg from '/images/Calendar.png'
import Navbar from './Navbar'
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { formatEventTime } from '@/lib/date-utils'

const EventEntry: React.FC<{ children: ReactNode; to: string }> = ({
	children,
	to,
}) => {
	return (
		<Link to={to}>
			<Flex
				width="100%"
				height="128px"
				justifyContent="center"
				alignItems="center"
				flexShrink="0"
			>
				<Flex
					flexDir="row"
					bgColor="white"
					height="95%"
					width="95%"
					borderRadius="18px"
					margin="10px"
					padding="10px"
					boxShadow="md"
					_hover={{
						bgColor: '#195AFF',
						color: 'white',
						height: '100%',
						width: '100%',
						boxShadow: 'lg',
					}}
				>
					{children}
				</Flex>
			</Flex>
		</Link>
	)
}

const Home: React.FC = () => {
	const navigate = useNavigate()
	const [events, setEvents] = useState<any[]>([])

	// Fetch the events
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch('/data.json') // Adjust your API or path here
				const data = await response.json()
				setEvents(data.events) // Assuming 'events' is an array in the fetched data
			} catch (error) {
				console.error('Error fetching events:', error)
			}
		}

		fetchEvents()
	}, [])

	return (
		<Flex height="100vh" flexDir="column" bgColor="#F6F2ED">
			<Navbar />
			{/* Display board */}
			<Flex
				flexDir="row"
				height="100%"
				width="100%"
				color="#003466"
				padding="32px"
				alignItems="center"
				justifyContent="center"
				gap="20px"
				overflow="hidden"
				zIndex="0"
			>
				{/* Calendar */}
				<Flex
					flexDir="column"
					height="100%"
					width="40%"
					padding="10px"
					alignItems="center"
				>
					<Text
						fontSize="2xl"
						fontWeight="bold"
						width="100%"
						paddingLeft="86px"
						marginBottom="12px"
					>
						Calendar
					</Text>
					<Flex
						height="100%"
						borderRadius="18px"
						boxShadow="lg"
						bgColor="white"
						alignItems="center"
						justifyContent="center"
						marginBottom="20px"
					>
						<Image src={CalendarImg} width="400px" />
					</Flex>
					<Button
						width="400px"
						height="60px"
						bgColor="#2E3EBD"
						borderRadius="120px"
						color="white"
						marginTop="0px"
						onClick={() => navigate('new-event')}
					>
						Create New
					</Button>
				</Flex>
				{/* Upcoming Events */}
				<Flex
					flexDir="column"
					height="100%"
					width="60%"
					gap="12px"
					padding="10px"
					alignItems="center"
				>
					<Text
						fontSize="2xl"
						fontWeight="bold"
						width="100%"
						paddingLeft="38px"
					>
						Upcoming Events
					</Text>
					<Flex
						flexDir="column"
						height="500px"
						width="100%"
						gap="12px"
						overflowY="scroll"
						overflow="auto"
					>
						{events.map((event, index) => (
							<EventEntry key={index} to={`/event/${event.id}`}>
								<Box>
									<Flex alignItems="center" gap="8px">
										{/* Event Date */}
										<Text
											fontSize="3xl"
											fontWeight="bold"
											color="#F25C54"
											marginRight="10px"
										>
											{new Date(
												event.datetime,
											).toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
											})}
										</Text>
										<Text fontSize="xl" fontWeight="bold">
											{event.title}
										</Text>
									</Flex>

									<Flex
										alignItems="center"
										color="#003466"
										gap="8px"
										marginTop="8px"
									>
										<FaClock />
										<Text fontSize="sm">
											{formatEventTime(event.datetime)}
										</Text>
										|
										<FaMapMarkerAlt />
										<Text fontSize="sm">
											{event.location}
										</Text>
									</Flex>

									{/* Gifters Info */}
									{event.gifters.length - 1 !== 1 ? (
										<>
											+ {event.gifters.length - 1}{' '}
											{event.gifters.length - 1 === 1
												? 'gifter'
												: 'gifters'}
										</>
									) : (
										''
									)}
								</Box>
							</EventEntry>
						))}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Home
