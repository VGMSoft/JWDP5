(() => {
    getProducts()
        .then((products) => {
            console.log("Request results :", products);
            fillMarkup(products);
        })
})();
/* collecting data from API */
function getProducts() {
    return fetch(`${apiUrl}/api/cameras`)
        .then(res => {
            console.log("HTTP Request Status :", res.status);
            if (res.ok) {
                return res.json();
            }
        })
        .then((products) => products)
        .catch(err => {
            console.log(err);
            alert("La connexion au serveur à échoué, veuillez réactualiser la page !");
        });
}
/* Presenting data in markup */
function fillTemplate(product) {
    /* get template */
    const template = document.querySelector("#template");
    /* clone template */
    const clone = document.importNode(template.content, true);

    //const clone = document.querySelector("#template").content.cloneNode(true);

    /* fill template */
    const urlTemplate = "./html/produit.html?id=";
    clone.querySelector(".card img").src = product.imageUrl;
    clone.querySelector(".card img").alt = product.name;
    clone.querySelector(".card .card-body h2").textContent = product.name;
    clone.querySelector(".card .card-body a").href = (urlTemplate + product._id);
    /* send filled template */
    document.querySelector(".templateContainer").appendChild(clone);
}

function fillMarkup(products) {
    products.forEach((product) => fillTemplate(product));
}