/* collect product id */
const id = new URL(window.location.href).searchParams.get("id");

(() => {
    getProduct()
        .then((product) => {
            console.log("Request result :", product);
            fillMarkup(product);
        })
    addToCart(id)
})();
/* collecting data from API */
function getProduct() {
    return fetch(`${apiUrl}/api/cameras/` + id)
        .then(res => {
            console.log("HTTP Request Status :", res.status);
            if (res.ok) {
                return res.json();
            }
        })
        .then((product) => product)
        .catch(err => {
            console.log(err)
            alert("La connexion au serveur à échoué, veuillez réactualiser la page !")
        });
};
/* Presenting data in markup */
function fillMarkup(product) {
    document.querySelector(".card-title").textContent = product.name
    document.querySelector(".card img").src = product.imageUrl
    document.querySelector(".card-title").alt = product.name
    document.querySelector(".price").textContent = (product.price / 100 + "€")
    document.querySelector(".card-text").textContent = (product.description)
        /* Dropdown menu feeding */
    for (let i in product.lenses) {
        let newDropdownItem = document.createElement("option")
        newDropdownItem.setAttribute("value", i)
        newDropdownItem.classList.add(".dropdown-item")
        newDropdownItem.textContent = (product.lenses[i])
        document.querySelector(".lense-selector").appendChild(newDropdownItem)
    }
}
/* Adding product to cart */
function addToCart(id) {
    document.querySelector(".addToCart").onclick = () => {
        localStorage.setItem('newItem', id)
        var newItem = localStorage.getItem('newItem');
        console.log("Last added to cart:", id)
    }
}