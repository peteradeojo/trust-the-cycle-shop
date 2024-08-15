import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.jsx';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import AppLayout from './AppLayout.jsx';
import Item from './pages/item.jsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<App />} />
				<Route path="/shop/:item" element={<Item />} />
			</Route>
		</Route>
	)
);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
		{/* <App /> */}
	</StrictMode>
);
