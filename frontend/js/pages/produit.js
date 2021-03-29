(() => {
    const id = getProductId()
    getProduct(id)
        .then((product) => fillMarkup(product))
        .then()
})();

/* ------------------------------------------ Filling Markup ------------------------------------------ */
/* collect product id */
function getProductId() {
    return new URL(window.location.href).searchParams.get("id")
}

/* collecting data from API */
function getProduct(id) {
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
        newDropdownItem.value = (product.lenses[i])
        document.querySelector(".lenseSelector").appendChild(newDropdownItem)
    }
}

// revealing modal (BootstrapJS homemade patch)
function revealModal() {
    document.querySelector(".addToCart").onclick = () => {
        document.body.classList.add("modal-open")
        document.querySelector(".modal").classList.add("show")
        document.querySelector(".modal").style.display = "block"
        document.querySelector(".modal").setAttribute("aria-modal", "true")
        document.querySelector(".modal").setAttribute("role", "dialog")
        document.querySelector(".modal").removeAttribute("aria-hidden")
        const div = document.createElement("div");
        div.classList.add("modal-backdrop")
        div.classList.add("fade")
        div.classList.add("show")
        document.body.appendChild(div)
        console.log(div)
    }
}
revealModal()