
class CartManager {
	static cart = [];

	static getCart() {
		this.cart = JSON.parse(localStorage.getItem('2s_cart') ?? '[]');
		return this.cart;
	}

	static addToCart(item, count = 1) {
		if (this.itemInCart(item.slug)) {
			return this.updateCount(item.slug);
		}
		this.cart.push({ slug: item.slug, image: item.image, count: 1 });
		this.saveCart();
	}

	static updateCount(slug, count = 1) {
		if (this.itemInCart(slug)) {
			const i = this.cart.findIndex((item) => item.slug == slug);
			this.cart[i].count += count;
			if (this.cart[i].count < 0) this.cart[i].count = 0;
		}

		this.saveCart();
	}

	static saveCart() {
		localStorage.setItem('2s_cart', JSON.stringify(this.cart));
    this.getCart();
	}

	static removeFromCart(slug) {
		this.cart = this.cart.filter((item) => item.slug != slug);
		this.saveCart();
	}

	static itemInCart(slug) {
		return this.cart.find((item) => item.slug == slug) != null;
	}
}

export default CartManager;
