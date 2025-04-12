import { Box, Button, Flex, Text, Image, FormLabel } from '@chakra-ui/react'
import {
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
} from '@chakra-ui/input'
import { Squash as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import PresentsImage from '/images/PresentsImage.svg'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Home/Navbar'

const NewEvent: React.FC = () => {
	const [isOpen, setOpen] = useState(false)
	const navigate = useNavigate()

	return (
		<Flex height="100vh" flexDir="column" bgColor="#F9F9F9">
			<Navbar />
			{/* Form */}
			<Flex
				height="100%"
				width="100%"
				alignItems="center"
				justifyContent="center"
				padding="24px"
				zIndex="0"
			>
				<Flex
					flexDir="row"
					height="90%"
					width="60%"
					bgColor="white"
					borderRadius="26px"
					boxShadow="md"
					overflow="hidden"
				>
					<Flex
						flexDir="column"
						height="100%"
						width="40%"
						bgColor="#F8CF61"
						alignItems="center"
						justifyContent="center"
						padding="28px"
					>
						<Image
							src={PresentsImage}
							width="200px"
							marginBottom="30px"
						/>
						<Text
							variant="roboto"
							fontSize="2xl"
							fontWeight="bold"
							marginBottom="8px"
						>
							Let's create your event
						</Text>
						<Text
							variant="roboto"
							fontSize="md"
							fontWeight="normal"
							textAlign="center"
						>
							It's okay if you don't have all the details now! You
							can always add more later
						</Text>
					</Flex>
					<Flex
						flexDir="column"
						height="100%"
						width="60%"
						bgColor="white"
						padding="32px 52px"
						gap="10px"
					>
						<Box>
							<FormLabel>Event Name</FormLabel>
							<Input type="text" />
						</Box>
						<Box>
							<FormLabel>Date & Time</FormLabel>
							<Input type="datetime-local" marginBottom="8px" />
						</Box>
						<Box>
							<FormLabel>
								Preferences (separate with commas)
							</FormLabel>
							<Input type="text" marginBottom="8px" />
						</Box>
						<Box>
							<FormLabel>Budget per pax</FormLabel>
							<InputGroup>
								<InputLeftAddon children="$" />
								<Input placeholder="0.00" marginBottom="8px" />
								<InputRightAddon children="SGD" />
							</InputGroup>
						</Box>
						<Flex
							flexDir="row"
							marginTop="30px"
							alignItems="center"
							gap="20px"
						>
							<Button
								height="46px"
								width="50%"
								onClick={() => navigate(-1)}
							>
								Cancel
							</Button>
							<Button
								height="46px"
								width="50%"
								colorScheme="green"
							>
								Create
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default NewEvent
