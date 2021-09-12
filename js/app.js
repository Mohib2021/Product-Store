const loadProducts = () => {
	const url = "./api/api.json";
	fetch(url)
		.then((response) => response.json())
		.then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
	const allProducts = products.map((pd) => pd);
	for (const product of allProducts) {
		const image = product.image;
		console.log(product);
		const div = document.createElement("div");
		div.classList.add("product");
		div.classList.add("col-md-4");
		div.classList.add("col-sm-6");
		div.innerHTML = `
    <div class="single-product bg-light text-black p-3">
        <div class="text-center">
          <img class="product-image" src=${image}></img>
        </div>
        <div class="my-3">
        <h3>${product.title}</h3>
          <p>Category: ${product.category}</p>
          <h2>Price: $ ${product.price}</h2>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn"class="buy-now btn btn-outline-dark">add to cart</button>
          <button id="details-btn" class="btn btn-outline-dark">Details</button>
        </div>
    </div>
      `;

		document.getElementById("all-products").appendChild(div);
	}
};
let count = 0;
const addToCart = (id, price) => {
	count = count + 1;
	updatePrice("price", price);

	updateTaxAndCharge();
	updateTotal();
	document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
	const element = document.getElementById(id).innerText;
	console.log(element);
	const converted = parseFloat(element);
	return converted;
};

// main price update function
const updatePrice = (id, value) => {
	const convertedOldPrice = getInputValue(id);
	const convertPrice = parseFloat(value);
	const total = convertedOldPrice + convertPrice;
	document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
	document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
	const priceConverted = getInputValue("price");
	if (priceConverted > 200) {
		setInnerText("delivery-charge", 30);
		setInnerText("total-tax", priceConverted * 0.2);
	}
	if (priceConverted > 400) {
		setInnerText("delivery-charge", 50);
		setInnerText("total-tax", priceConverted * 0.3);
	}
	if (priceConverted > 500) {
		setInnerText("delivery-charge", 60);
		setInnerText("total-tax", priceConverted * 0.4);
	}
};

//grandTotal update function
const updateTotal = () => {
	const grandTotal =
		getInputValue("price") +
		getInputValue("delivery-charge") +
		getInputValue("total-tax");
	document.getElementById("total").innerText = grandTotal.toFixed(2);
};
