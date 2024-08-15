import StoreTile from './components/store_tile';

import items from './data.json';

function App() {
	return (
		<div className="relative">
			<div className="py-2"></div>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-4">
				{items.map((item, index) => (
					<StoreTile image={item} key={index} />
				))}
			</div>
		</div>
	);
}

export default App;
