import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NewEvent from './NewEvent/NewEvent'
import EventDetail from './EventDetail/EventDetail'

const queryClient = new QueryClient()

const App: React.FC = () => (
	<QueryClientProvider client={queryClient}>
		<Router>
			<Routes>
				{/* Public Pages */}
				<Route path="/*" element={<Home />} />
				<Route path="/new-event" element={<NewEvent />} />
				<Route path="/event/:id" element={<EventDetail />} />
			</Routes>
		</Router>
	</QueryClientProvider>
)

export default App
