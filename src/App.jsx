import React, { useEffect } from 'react';
import { Landing } from '@/pages';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import '@/scripts/i18next.js';
import '@/scripts/aos.js';
import '@/styles/index.scss';



const App = (props) => {

	// const router = createBrowserRouter(createRoutesFromElements(<>
	// 	<Route path='/' element={<Landing />} />
	// </>))

	return (<>
		{/* <RouterProvider router={router} /> */}
		<Landing />
	</>);
}

export default App;