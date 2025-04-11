import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { Squash as Hamburger } from 'hamburger-react'
import { ReactNode, useState } from 'react'

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
	const [isOpen, setOpen] = useState(false)

	return (
		<Flex height="100vh" flexDir="column" bgColor="#F9F9F9">
			{/* Side navigation bar */}
			<Flex
				flexDir="column"
				position="absolute"
				height="100%"
				width="320px"
				left={isOpen ? '0' : '-320px'}
				bgColor="white"
				borderRadius="0 24px 24px 0"
				boxShadow="xl"
			>
				Sidebar here
			</Flex>
			{/* Top bar */}
			<Flex
				flexDir="row"
				width="100%"
				alignItems="center"
				justifyContent="center"
				padding="12px 0"
				bgColor="#195AFF"
			>
				<Box
					paddingLeft={isOpen ? '250px' : '30px'}
					position="absolute"
					left="0"
				>
					<Hamburger
						color={isOpen ? 'black' : 'white'}
						toggled={isOpen}
						toggle={setOpen}
					/>
				</Box>
				<Text variant="logo" fontSize="4xl" color="white">
					Gify
				</Text>
			</Flex>
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
					width="100%"
					gap="12px"
					padding="10px"
					alignItems="center"
				>
					<Text
						fontSize="2xl"
						fontWeight="bold"
						color="#195AFF"
						width="100%"
						paddingLeft="24px"
					>
						Calendar
					</Text>
					<Box
						width="100%"
						height="100%"
						borderRadius="18px"
						boxShadow="lg"
						bgColor="white"
						padding="10px"
					>
						{/* TZE XUAN TODO CALENDAR IN THIS BOX */}
					</Box>
					<Button
						width="360px"
						height="60px"
						bgColor="#195AFF"
						borderRadius="120px"
						color="white"
						marginTop="16px"
					>
						Create New
					</Button>
				</Flex>
				{/* Upcoming Events */}
				<Flex
					flexDir="column"
					height="100%"
					width="100%"
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
