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
				zIndex="1"
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
