import { Button, Flex, Text, Image } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import CalendarImg from '/images/Calendar.png'
import Navbar from './Navbar'

const EventEntry: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
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
	)
}

const Home: React.FC = () => {
	const navigate = useNavigate()

	return (
		<Flex height="100vh" flexDir="column" bgColor="#F9F9F9">
			<Navbar />
			{/* Display board */}
			<Flex
				flexDir="row"
				height="100%"
				width="100%"
				color="#195AFF"
				padding="32px"
				alignItems="center"
				justifyContent="center"
				gap="20px"
				overflow="hidden"
			>
				{/* Calendar */}
				<Flex
					flexDir="column"
					height="100%"
					width="40%"
					gap="12px"
					padding="10px"
					alignItems="center"
				>
					<Text
						fontSize="2xl"
						fontWeight="bold"
						color="#195AFF"
						width="100%"
						paddingLeft="86px"
					>
						Calendar
					</Text>
					<Flex
						height="100%"
						borderRadius="18px"
						boxShadow="lg"
						bgColor="white"
						padding="10px"
						alignItems="center"
						justifyContent="center"
					>
						<Image
							src={CalendarImg}
							borderRadius="20px"
							width="420px"
						/>
					</Flex>
					<Button
						width="360px"
						height="60px"
						bgColor="#195AFF"
						borderRadius="120px"
						color="white"
						marginTop="16px"
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
						color="#195AFF"
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
						<EventEntry>
							<Text>Event 1</Text>
						</EventEntry>
						<EventEntry>
							<Text>Event 2</Text>
						</EventEntry>
						<EventEntry>
							<Text>Event 3</Text>
						</EventEntry>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Home
