import { Flex, Box, Text } from '@chakra-ui/react'
import { Squash as Hamburger } from 'hamburger-react'
import { useState } from 'react'

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
				zIndex="10"
			>
				Sidebar here
			</Flex>
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
					zIndex="11"
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
		</>
	)
}

export default Navbar
