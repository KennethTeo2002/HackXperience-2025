import { Flex, Box, Text, Image } from '@chakra-ui/react'
import { Squash as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import leftBlob from '/images/HomeBgBlob1.svg'
import rightBlob from '/images/HomeBgBlob2.svg'
import notificationImg from '/images/Notification.png'

const Navbar: React.FC = () => {
	const [isOpen, setOpen] = useState(false)
	return (
		<>
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
				zIndex="2"
			>
				Sidebar here
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
				<Text variant="logo" fontSize="5xl" color="#003466">
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
