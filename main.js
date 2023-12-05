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

        const response = await fetch('https://dummyjson.com/products');

        const data = await response.json()
        productsData = data.products
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
            <p>Old Price: ${product.price + (product.price * product.discountPercentage / 100)}</p>
            <p>Stock: ${product.stock}</p>
            <a href="" class="detail-button">Details</a>
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
