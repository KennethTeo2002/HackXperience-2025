import { Box, Flex, Text } from '@chakra-ui/react'
import { Squash as Hamburger } from 'hamburger-react'
import { useState } from 'react'

const Home: React.FC = () => {
	const [isOpen, setOpen] = useState(false)

	return (
		<Flex height="100vh" flexDir="column" bgColor="#EEE">
			{/* Side navigation bar */}
			<Flex
				flexDir="column"
				position="absolute"
				height="100%"
				width="320px"
				left={isOpen ? '0' : '-320px'}
				bgColor="white"
				borderRadius="0 30px 30px 0"
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
				<Text variant={'logo'} fontSize="4xl" color="white">
					Gify
				</Text>
			</Flex>
			{/* Display board */}
			<Flex flexDir="column" height="100%" width="100%">
				<Text left="500px">body here</Text>
			</Flex>
		</Flex>
	)
}

export default Home
