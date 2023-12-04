const apiUrl = "https://dummyjson.com/products";

fetch(apiUrl)
.then(response =>response.json())
.then(data=>console.log(data.products));