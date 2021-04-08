(() => {
  const id = getProductId()
  getProduct(id)
    .then(product => {
      displayProduct(product)
      console.log('HTTP Request Result : ', product)
      revealModalOnClick(product)
    })

})()

/* ------------------------------------------ Filling Markup ------------------------------------------ */
//collect product id
function getProductId() {
  return new URL(window.location.href).searchParams.get("id")
}
//fetching data from API
function getProduct(id) {
  return fetch(`${apiUrl}/api/cameras/` + id)
    .then(res => {
      console.log(`HTTP Request Status : ${res.status}`)
      if (res.ok) {
        return res.json();
      }
    })
    .catch(err => {
      console.log(err)
      alert("La connexion au serveur à échoué, veuillez réactualiser la page !")
    })
}

//Presenting data in markup
function displayProduct(product) {
  document.querySelector(".card-title").textContent = product.name
  document.querySelector(".card img").src = product.imageUrl
  document.querySelector(".card-title").alt = product.name
  document.querySelector(".price").textContent = `${product.price / 100}€`
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
function revealModalOnClick(product) {
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

    cart.addItem(product)
  }
}





function redirectProductToCart(product) {
  addItem(product)
  revealModalOnClick(product)
}