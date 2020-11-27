const API = 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline';
const productsItems = document.getElementById('products-items');
const productsLength = document.getElementById('products-length');

const getData = (api) => {
	fetch(api)
		.then((response) => response.json())
		.then((resp) => {
			const products = resp;
			let product = products
				.map((product) => {
					let shortDescription = product.description.slice(0, 50);
					return `
                <div class="products__items--item">
					<img
						src="${product.image_link}"
						alt="${product.description}"
					/>
					<div class="products__items--info">
						<h2>${product.name} <span>$${product.price}</span></h2>
						<p>${shortDescription}...</p>
					</div>
					<button onclick="openModal(${product.id})">Información</button>
				</div>
                `;
				})
				.join('');
			let products_length = `<h3>${resp.length} productos</h3>`;
			let one_product = `<h3>${resp.length} producto</h3>`;
			let output = resp.length === 1 ? one_product : products_length;
			productsLength.innerHTML = output;
			productsItems.innerHTML = product;
		})
		.catch((error) => console.error(error));
};

getData(API);

const productTypes = (type) => {
	if (type === undefined) {
		getData(API);
	} else {
		let api = `https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline&product_type=${type}`;
		getData(api);
	}
};

const openModal = (product) => {
	let api = `https://makeup-api.herokuapp.com/api/v1/products/${product}.json`;
	fetch(api)
		.then((response) => response.json())
		.then((resp) => {
			const modal = document.getElementById('myModal');
			const span = document.getElementsByClassName('close')[0];
			const info = document.querySelector('.modal__info');

			modal.style.display = 'block';

			span.onclick = function () {
				modal.style.display = 'none';
			};

			info.innerHTML = `
			<h1>${resp.name}</h1>
			<section class="product__header">
				<img src="${resp.image_link}" />
				<div class="product__header--details">
					<span><strong>Price:</strong> $${resp.price}</span>
					<span><strong>Type:</strong> ${resp.product_type}</span>
					<span><strong>Rating:</strong> ${resp.rating}</span>
				</div>
			</section>
			<section class="product__info">
				<p class="product__info--description">${resp.description}</p>
				<p class="product__info--available">Available <a href="${resp.product_link}" target="_blank">here</a></p>
			</section>
			`;
		});
};
