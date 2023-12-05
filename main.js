const apiUrl = "https://dummyjson.com/products";

var datas = [];


async function CardCreate(){
    await productsDatas();

    document.getElementById("card-container").innerHTML = datas.map(products=>
    `
        <div class="card">
            <div class="img">
                <img src="${products.images[0]}" alt="Prodcut Name">
            </div>
            <h3>${products.title}</h3>
            <p>Category: ${products.category}</p>
            <p>Price: ${products.price}</p>
            <p>Old Price: ${products.price + (products.price*products.discountPercentage/100)}</p>
            <p>Stock: ${products.stock}</p>
            <a href="" class="detail-button">Details</a>
        </div>
    `
    ).join("");
}
CardCreate();

async function productsDatas(){
    const data = await fetch(apiUrl);
    const response =await data.json();
    datas = response.products;
}