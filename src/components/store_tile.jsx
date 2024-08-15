import { Link } from 'react-router-dom';

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'NGN',
	currencyDisplay: 'narrowSymbol',
	// currencySign: '₦'
});

/**
 *
 * @param {Number} amt
 * @returns
 */
export const formatPrice = (amt) => {
	return formatter.format(amt);
};

const StoreTile = ({ image }) => {
	return (
		<Link
			to={image ? `/shop/${image.slug}` : ''}
			className="hover:border hover:shadow-xl rounded-lg p-4 bg-white"
		>
			<img src={image?.image} className="max-w-full" />
			<div className="p-2"></div>
			<div className="flex justify-between items-end">
				<div>
					<p className="text-2xl font-bold">{image?.name}</p>
					<div className="flex gap-x-2">
						{image.sizes?.map((size, i) => (
							<span key={i} className="uppercase text-xs font-bold">
								{size}
							</span>
						))}
					</div>
				</div>
				<p className="font-light text-sm">{formatPrice(image?.price)}</p>
			</div>
			<div className="py-2"></div>
			{/* <div className="py-1"></div> */}
		</Link>
	);
};

export default StoreTile;
