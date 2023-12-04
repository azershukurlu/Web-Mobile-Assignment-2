const apiUrl = "https://dummyjson.com/products";

function getProducts() {
    fetch(apiUrl).then(response => response.json()).then(data => createCard(data))
        .catch(error => console.log('error:', error))
}




function createCard(data) {
    const cardContainer = document.getElementById("card-container");
    data.products.forEach(products => {
        console.log(products.images[0])
        cardContainer.innerHTML += `
        <div class="card">
            <div class="img">
                <img src="${products.images[0]}" alt="Prodcut Name">
            </div>
            <h3>${products.title}</h3>
            <p>Price: $${products.price}</p>
            <a href="" class="detail-button">Details</a>
        </div>`
    });



}

getProducts();