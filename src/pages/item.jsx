import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import items from '../data.json';
import { useContext, useEffect, useState } from 'react';
import { formatPrice } from '../components/store_tile';
import CartManager from '../cart_manager';
import { CartContext } from '../hook/cart_hook';

const Item = () => {
	// CartManager.getCart();
	const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const [cart, setCart] = useContext(CartContext);

	const [item, setItem] = useState(null);
	const [thumbIndex, setThumbIndex] = useState(0);

	useEffect(() => {
		const search = items.find((i) => i.slug == params.item);
		if (search) {
			setItem((prev) => search);
			return;
		}

		navigate('/');
	}, []);

	return (
		<>
			<div className="md:flex">
				{/* Images display */}
				<div className="flex-grow-0">
					<div className="">
						<img
							src={item?.images[thumbIndex]}
							alt=""
							className="m-auto max-h-[500px]"
						/>
					</div>
					<div className="py-2"></div>
					<div className="flex overflow-x-scroll gap-x-8 h-24 justify-center">
						{item?.images.map((image, index) => (
							<div
								className={`border-4 ${thumbIndex == index && `border-black`}`}
								key={item?.slug + index}
								onClick={() => setThumbIndex(index)}
							>
								<img src={image} className="h-full" alt="" />
							</div>
						))}
					</div>
				</div>

				<div className="py-8 md:py-0"></div>

				{/* Details */}
				<div className="flex-grow md:pl-10">
					<p className="text-4xl font-bold">{item?.name}</p>
					<p>{formatPrice(item?.price)}</p>
					<div className="py-2"></div>
					<button
						className={`btn btn-sm bg-[#${item?.tertiaryColor}] font-light text-white`}
						onClick={() => {
							CartManager.addToCart(item, 1);
              setCart(CartManager.cart);
						}}
					>
						Add to Cart
					</button>
				</div>
			</div>

			{/* carousel */}
		</>
	);
};

export default Item;
