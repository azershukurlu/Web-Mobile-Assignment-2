document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('card-container');
    const searchInput = document.getElementById('searchBox')
    const categoryUl = document.getElementById('category')

    let productsData = []


    searchInput.addEventListener('keyup', function (event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = productsData.filter
            (
                product => product.title.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm)
            );
        displayProducts(filteredProducts)
    })
    async function fetchProducts() {

        const response = await fetch(`https://dummyjson.com/products`);
        const data = await response.json()
        productsData = data.products
        console.log(data.products);
        displayProducts(productsData)

    }


    async function fetchCategories() {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json()
        displayCategories(data)
    }

    function displayProducts(products) {
        productList.innerHTML = "";
        products.forEach(product => {
            productList.innerHTML += `
            <div class="card">
            <div class="img">
                <img src="${product.images[0]}" alt="Prodcut Name">
            </div>
            <h3>${product.title}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Old Price: ${Math.ceil(product.price + (product.price * product.discountPercentage / 100))}</p>
            <p>Stock: ${product.stock}</p>
            <button onclick="redirectToDetailPage(${product.id})" class="detail-button">Details</button>
             </div>
            
            `
        });
    }
    function displayCategories(categories) {
        categories.forEach(category => {
            categoryUl.innerHTML += `<li id="list-item">${category}</li>`

        })
        var listItems = document.querySelectorAll("#list-item");
        listItems.forEach(function (sidebar) {
            sidebar.addEventListener("click", function (event) {
                var clickedItems = event.target.textContent;
                var endpoint = 'https://dummyjson.com/products/category/' + clickedItems.toLowerCase();
                fetch(endpoint).then(response => response.json()).then(data => displayProducts(data.products))
            })
        });

    }

    fetchCategories();
    fetchProducts();
});






//detail
function Detail(id) {
    fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(console.log);
}

function changeMainImage(thumbnail, imageSrc) {
    var thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(function (thumb) {
        thumb.classList.remove('active');
    });

    thumbnail.classList.add('active');

    var mainImage = document.getElementById("mainImage");

    mainImage.src = imageSrc;

}


const productContainer = document.getElementById("product-container");

function redirectToDetailPage(productId) {
    window.location.href = 'detail.html?id=' + productId;
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    fetch('https://dummyjson.com/products/' + productId)
        .then(response => response.json())
        .then(productData => {
            producDetailDisplay(productData);
        }).catch(err=>console.log(err))

});

function producDetailDisplay(data) {
    productContainer.innerHTML = ` 
    <div class="product">
        <div class="col">
            <div class="product_img_wrapper">
                <img id="mainImage"
                    src="${data.images[0]}"
                    alt="Main Image">
                <div id="imageContainer">
                     <img src="${data.images[0]}"
                        class="thumbnail active"
                        onclick="changeMainImage(this, '${data.images[0]}')">
                    <img src="${data.images[1]}"
                        class="thumbnail"
                        onclick="changeMainImage(this, '${data.images[1]}')">
                    <img class="thumbnail" src="${data.images[2]}"
                        onclick="changeMainImage(this, '${data.images[2]}')">
                    <img src="${data.images[3]}" 
                        class="thumbnail"
                        onclick="changeMainImage(this, '${data.images[3]}')">
                </div>
                <span class="product_discount">-${data.discountPercentage}%</span>
            </div>
        </div>
        <div class="col product_about_wrapper">
            <h2 class="product_name">${data.title}</h2>
            <div class="product_about">
                <div class="product_price_rating_wrapper">
                    <p class="product_price">$${Math.ceil(data.price - (data.price * data.discountPercentage / 100))} <del class="span-price">${data.price}</del></p>
                    <span class="price_line"></span>
                    <div class="product_rating_wrapper">
                        <img class="star"
                            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Plain_Yellow_Star.png"
                            alt="star">
                        <p class="product_rating">${data.rating}</p>
                    </div>
                </div>
                <p class="product_description">${data.description}</p>

                <div class="brand_category_wrapper">
                    <div class="brand">
                        <span class="">Brand:</span>
                        <span>${data.brand}</span>
                    </div>
                    <div class="category">
                        <span class="">Category:</span>
                        <span>${data.category}</span>
                    </div>
                </div>
                <div class="add_to_cart_btn_wrapper">
                    <span>Avaible in stock: ${data.stock}</span>
                </div>
            </div>
        </div>
    </div>
`
}