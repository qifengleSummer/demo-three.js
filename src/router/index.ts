import { createBrowserRouter } from 'react-router'
import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import Monday from '../pages/childrenPage/Monday'
import TestThreeDemo from '../pages/TestThreeDemo'

export const routers = createBrowserRouter([
	{
		path: '/test-three-demo',
		Component: TestThreeDemo,
	},
	{
		path: '/',
		Component: Home,
	},
	{
		path: '/about',
		Component: About,
		children: [
			{
				path: '/about/monday',
				Component: Monday,
			},
		],
	},
	{
		path: '/404',
		Component: NotFound,
	},
])
