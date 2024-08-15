import React, { useContext, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { formatPrice } from './store_tile';
import CartManager from '../cart_manager';
import { CartContext } from '../hook/cart_hook';

import items from '../data.json';
import { FaTrashCan } from 'react-icons/fa6';

const CartTile = ({ item }) => {
	const data = items.find((i) => i.slug == item.slug);

	const [cart, setCart] = useContext(CartContext);

	const deleteFromCart = (slug) => {
		CartManager.removeFromCart(slug);
		setCart(CartManager.cart);
	};

	return (
		<div className="bg-gray-100 p-1 rounded-sm row h-16 flex gap-x-4 items-center pr-3">
			<img src={data.image} alt="" className="max-h-full" />

			<div className="flex-grow-0">
				<p className="text-sm truncate max-w-[110px] text-clip">
					{item.count}x {data.name}
				</p>
				<p className="text-sm">{formatPrice(data.price)}</p>
			</div>

			<p className="text-right text-sm flex-grow">
				{formatPrice(data.price * item.count)}
			</p>
			<i
				className="btn btn-sm btn-ghost bg-transparent"
				onClick={() => deleteFromCart(data.slug)}
			>
				<FaTrashCan color="red" />
			</i>
		</div>
	);
};

const CartDrawer = ({ closeDrawer }) => {
	CartManager.getCart();

	const [cart] = useContext(CartContext);

	function sumCart() {
		return cart.reduce((a, b) => {
			const i = items.findIndex((i) => i.slug == b.slug);

			return a + items[i].price * b.count;
		}, 0);
	}

	return (
		<>
			<div className="bg-white w-[90%] md:w-1/4 p-1 h-full fixed z-40 overflow-y-auto top-0 right-0 duration-200 transition-all text-black grid grid-rows-12">
				{/* close button */}
				<div className="flex p-1 items-center justify-end w-full row-span-1">
					<button onClick={closeDrawer}>
						<FaTimes color="black" size={40} />
					</button>
				</div>

				{/* Cart items */}
				<div className="p-5 row-span-11">
					<div className="flex h-full flex-col justify-between">
						<div>
							<p className="text-sm">
								You have {cart?.length} item(s) in your cart
							</p>

							<div className="py-2"></div>
							{cart.map((item) => (
								<React.Fragment key={item.slug}>
									<CartTile item={item} key={item.slug} />
									<div className="py-2"></div>
								</React.Fragment>
							))}
						</div>

						<div className="text-right font-light">
							<p>Subtotal: {formatPrice(sumCart())}</p>
							<p>Tax: {formatPrice(0.07 * sumCart())}</p>
              <div className="py-1"></div>
              <hr />
              <div className="py-1"></div>
							<p>
								Total: <span className='text-xl font-bold'>{formatPrice(sumCart() + 0.07 * sumCart())}</span>
							</p>
              <div className="py-2"></div>
							<button className="btn bg-green-500 border-0 text-black w-full btn-full hover:bg-green-800 hover:text-white">
								Pay Now
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CartDrawer;
