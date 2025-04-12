import { Flex, Box, Text, Image, Center} from "@chakra-ui/react"
import { Squash as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import leftBlob from '/images/HomeBgBlob1.svg'
import rightBlob from '/images/HomeBgBlob2.svg'
import notificationImg from '/images/Notification.png'
import profilePhoto from '/images/ProfilePhoto.png'
import { useNavigate } from "react-router-dom"

const Navbar: React.FC = () => {
	const [isOpen, setOpen] = useState(false)
	const navigate = useNavigate()
	return (
		<>
			{/* Side navigation bar */}
			<Flex
				flexDir="column"
				position="absolute"
				height="100%"
				width="320px"
				left={isOpen ? '0' : '-320px'}
				bgColor="#FCF0E3"
				borderRadius="0 24px 24px 0"
				boxShadow="xl"
				zIndex="2"
			>
				<Box height="40px"></Box>

				<Flex padding="20px" justifyContent="center">
					<Center>
						<Image 
							src={profilePhoto}
							width="150px"
							justifyItems="center">
						</Image>
					</Center>
				</Flex>
				
				<Center>
					<Text
						variant="roboto" 
						fontWeight="medium"
						color="#003466"
						fontSize="30px"
						height="80px"
						>
						@wiwiwi_cat
					</Text>
				</Center>

				<Flex 
					direction="column" 
					textAlign="left" 
					borderLeftWidth="80px" 
					borderLeftColor="transparent"
					gap="20px"
				>
					<button>
						<Flex
							fontStyle="roboto" 
							fontWeight="light"
							fontSize="30px"
							color="#003466"
							_hover={{
								textDecoration: 'underline',
								color: '#F36B7F'
							}}
							>
							Events
						</Flex>
					</button>
					<button>
							<Flex 
							fontStyle="roboto" 
							fontWeight="light"
							fontSize="30px"
							color="#003466"
							_hover={{
								textDecoration: 'underline',
								color: '#F36B7F'
							}}
							>
							Calendar
						</Flex>
					</button>
				</Flex>

				
			</Flex>
			{/* BG Image */}
			<Flex
				position="absolute"
				width="100%"
				height="100%"
				bgColor="#F6F2ED"
				overflow="hidden"
				zIndex="0"
			>
				<Image src={leftBlob} marginBottom="-200px" width="640px" />
				<Image src={rightBlob} marginLeft="360px" width="680px" />
			</Flex>
			{/* Burger Menu */}
			<Box
				paddingLeft={isOpen ? '250px' : '30px'}
				position="absolute"
				left="0"
				top="22px"
				zIndex="3"
			>
				<Hamburger color="black" toggled={isOpen} toggle={setOpen} />
			</Box>
			{/* Header */}
			<Flex
				flexDir="row"
				width="100%"
				alignItems="center"
				justifyContent="center"
				padding="12px 0"
				bgColor="white"
				zIndex="1"
			>
				<Text 
					variant="logo"
					fontSize="5xl" 
					color="#003466"
					_hover={{
						cursor: "pointer"
					}} 
					onClick={() => navigate("/")}
				>
					Gify
				</Text>
				<Image
					src={notificationImg}
					width="46px"
					position="absolute"
					right="40px"
					zIndex="3"
				/>
			</Flex>
		</>
	)
}

export default Navbar
