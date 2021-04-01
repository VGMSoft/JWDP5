(async() => {
    const id = getProductId()
    const option = await getLenseOption()
    getProduct(id)
        .then((product) => {
            fillMarkup(product)
            createProductObject(product, option)
        })




    revealModal()
})()

/* ------------------------------------------ Filling Markup ------------------------------------------ */
//collect product id
function getProductId() {
    return new URL(window.location.href).searchParams.get("id")
}

//collecting data from API
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
//Presenting data in markup
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

/* ---------------------------- revealing modal (BootstrapJS homemade patch) ---------------------------- */
function revealModal() {
    const modal = document.querySelector(".modal")
    document.querySelector(".addToCart").onclick = () => {
        document.body.classList.add("modal-open")
        modal.classList.add("show")
        modal.style.display = "block"
        modal.setAttribute("aria-modal", "true")
        modal.setAttribute("role", "dialog")
        modal.removeAttribute("aria-hidden")
        const div = document.createElement("div");
        div.classList.add("modal-backdrop")
        div.classList.add("fade")
        div.classList.add("show")
        document.body.appendChild(div)
    }
}



/* ------------------------------------------- Building Cart -------------------------------------------- */
function getLenseOption() {
    const lenseSelector = document.querySelector(".lenseSelector")
    lenseSelector.onchange = () => {
        console.log(lenseSelector.value)
        return lenseSelector.value
    }
}

function createProductObject(product, option) {
    //gathering data
    const id = (product._id)
    const name = (product.name)
    const price = (product.price / 100 + "€")
    const lenseSelector = document.querySelector(".lenseSelector")
        //Create cart
    let cartContent = {}
        //Create cartObject
    const productObject = {}
        //Adding attribute to cartObject
    productObject.name = name
    productObject.price = price
    productObject.option = option
    productObject.quantity = 1
        //Append to localStorage
    console.log(productObject)
    localStorage.setItem('cartContent', JSON.stringify(productObject))
}