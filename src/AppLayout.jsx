import { useState } from 'react';
import { MdHomeFilled } from 'react-icons/md';
import { PiShoppingCartFill } from 'react-icons/pi';
import { Outlet } from 'react-router';
import CartDrawer from './components/cart';
import CartManager from './cart_manager';
import { CartContext } from './hook/cart_hook';

const AppLayout = () => {
	const [cartVisible, setCartVisible] = useState(false);
  const [cart, setCart] = useState(CartManager.getCart());

	const toggleCartDrawer = () => {
		setCartVisible(!cartVisible);
	};

	return (
		<CartContext.Provider value={[cart, setCart]}>
			{cartVisible && <CartDrawer closeDrawer={() => setCartVisible(false)} />}

			<div className="flex items-center bg-black lg:bg-transparent justify-between p-4 fixed top-0 w-full z-10">
				<a href="/">
					<MdHomeFilled color="white" size={30} />
				</a>
				<button onClick={() => toggleCartDrawer()}>
					<PiShoppingCartFill color="white" size={30} />
				</button>
			</div>

			<div className="h-[100vh] md:p-[5%] w-full text-white" id="background">
				<div
					className={`bg-gray-100 mt-[30%] md:rounded-t bottom-0 p-[5%] text-black`}
				>
					<Outlet></Outlet>
				</div>
				<div></div>
			</div>
		</CartContext.Provider>
	);
};

export default AppLayout;
