import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import EventDetail from './EventDetail/EventDetail'

const App: React.FC = () => (
	<Router>
		<Routes>
			{/* Public Pages */}
			<Route path="/*" element={<Home />} />
			<Route path="/event" element={<EventDetail />} />
		</Routes>
	</Router>
)

export default App
