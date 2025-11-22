import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => (
	<main style={{ padding: 20 }}>
		<h1>Home</h1>
		<p>Welcome to the demo app.</p>
		<Link to="/about">Go to About</Link>
	</main>
)

export default Home
