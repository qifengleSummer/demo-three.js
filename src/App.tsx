import './App.css'
import { RouterProvider } from 'react-router'
import { routers } from './router'

function App() {
	return (
		<div>
			<RouterProvider router={routers} />
		</div>
	)
}

export default App
