// common variable
const parentOfAllProducts = document.getElementById("all-products");
const displayDetails = document.getElementById("display-details");

const spinner = () => {
	const addSpinner = `
	<div id="loading">
		<div class="d-flex loading-container text-white">
				<span class="spinner-border spinner" role="status"></span>
				<b class=""> &nbsp; Please wait...</b>
		</div>
	</div>
	`;
	return addSpinner;
};

const loadProducts = () => {
	displayDetails.innerHTML = "";
	// adding spinner by calling spinner function when data will be loaded
	parentOfAllProducts.innerHTML = spinner();
	const url = "https://fakestoreapi.com/products/";
	fetch(url)
		.then((response) => response.json())
		.then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
	parentOfAllProducts.innerHTML = "";
	const allProducts = products.map((pd) => pd);
	for (const product of allProducts) {
		const image = product.image;
		const div = document.createElement("div");
		div.classList.add("product");
		div.classList.add("col-md-4");
		div.classList.add("col-sm-6");
		div.innerHTML = `
    	<div class="single-product bg-light text-black p-3">
				<div class="text-center">
					<img class="product-image" src=${image}></img>
				</div>
				<div class="my-2">
					<h4>${product.title}</h4>
					<p>Category: ${product.category}</p>
					<h4 class="mt-2">Price: $ ${product.price}</h4>

					<h6 class="my-3"> <i class="fas fa-star"></i> ${product.rating.rate} || <i class="text-success fas fa-users"></i> ${product.rating.count} </h6>

					<button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn"class="buy-now btn btn-outline-dark">add to cart</button>

					<button onclick=showingDetails(${product.id})  id="details-btn" class="btn btn-outline-dark" >Details</button>
		        </div>
		</div>
      `;
		parentOfAllProducts.appendChild(div);
	}
};

let count = 0;
// updating my-cart
const addToCart = (id, price) => {
	count = count + 1;
	updatePrice("price", price);
	updateTaxAndCharge();
	updateTotal();
	document.getElementById("total-Products").innerText = count;
};

// getting input value as Number
const getInputValue = (id) => {
	const element = document.getElementById(id).innerText;
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
	document.getElementById(id).innerText = value.toFixed(2);
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

const showingDetails = async (id) => {
	displayDetails.innerHTML = spinner();
	const res = await fetch(`https://fakestoreapi.com/products/${id}`);
	const data = await res.json();
	showData(data);
};
const showData = (data) => {
	console.log(data);
	displayDetails.innerHTML = "";
	displayDetails.innerHTML = `
  	<div id="description" class="text-black bg-light m-auto mb-5 p-3">
        <h4> <b>CATEGORY :</b>  ${data.category.toUpperCase()} </h4>
        <h5> <b> TITLE : </b> ${data.title} </h5>
        <p> <b>DESCRIPTION : </b> ${data.description} </p>
  	</div>
`;
};
