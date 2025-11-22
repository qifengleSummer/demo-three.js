import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const About: React.FC = () => (
	<main style={{ padding: 20 }}>
		<h1>About</h1>
		<p>This is the about page.</p>
		<Link to="/">Back to Home</Link>
		<Outlet></Outlet>
	</main>
)

export default About
