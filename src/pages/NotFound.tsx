import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => (
	<main style={{ padding: 20 }}>
		<h1>404 — Not Found</h1>
		<p>The page you requested does not exist.</p>
		<Link to="/">Go to Home</Link>
	</main>
)

export default NotFound
