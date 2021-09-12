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

const showingDetails = async (id) => {
	const res = await fetch(`https://fakestoreapi.com/products/${id}`);
	const data = await res.json();
	showData(data);
};
const showData = (data) => {
	const displayData = document.getElementById("display-details");
	displayData.innerHTML = "";
	displayData.innerHTML = `

  <div id="description" class="text-white w-25 p-3">
        <h4> Category : ${data.category.toUpperCase()} </h4>
        <h5> Title : ${data.title.toUpperCase()} </h5>
        <p> Description : ${data.description} </p>
  </div>

`;
};
