import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/Routes'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/roboto'
import '@fontsource-variable/albert-sans'

const theme = extendTheme({
	initialColorMode: `light`,
	useSystemColorMode: false,
	fonts: {
		body: `'Roboto', sans-serif`,
	},
	components: {
		Text: {
			variants: {
				logo: {
					fontFamily: `'Albert Sans Variable', sans-serif`,
				},
				roboto: {
					fontFamily: `'Roboto Variable', sans-serif`,
				},
			},
		},
	},
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
)
