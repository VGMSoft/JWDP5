(() => {
  //const id = getProductId()
  getProductId()
    .then(id => getProduct(id))
    .then(product => displayProduct(product))
  displayAmount()
})()

/* ------------------------------------------ Filling Markup ----------------------------------------*/
function getProductId() {
  return new Promise((resolve) => resolve(new URL(window.location.href).searchParams.get("id")))
}

//fetching data from API
function getProduct(id) {
  return fetch(`${apiUrl}/api/cameras/` + id)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return 0
      }
    })
    .catch(err => {
      console.error(err)
      alert("La connexion au serveur à échoué, veuillez réactualiser la page !")
    })
}

//Presenting data in markup
function displayProduct(product) {
  document.querySelector(".card-title").textContent = product.name
  document.querySelector(".card img").src = product.imageUrl
  document.querySelector(".card-title").alt = product.name
  document.querySelector(".price").innerHTML = `${product.price / 100}&#128;`
  document.querySelector(".card-text").textContent = (product.description)
  /* Dropdown menu feeding */
  for (let i in product.lenses) {
    let newDropdownItem = document.createElement("option")
    if (product.lenses.hasOwnProperty(i)) {
      newDropdownItem.setAttribute("value", i)
      newDropdownItem.classList.add(".dropdown-item")
      newDropdownItem.textContent = (product.lenses[i])
      newDropdownItem.value = (product.lenses[i])
      document.querySelector(".lenseSelector").appendChild(newDropdownItem)
    }
  }
  document.querySelector('.addToCart').onclick = () => redirectProductToCart(product)
}

//get lense option on change
function getOption() {
  const lenseOption = document.querySelector(".lenseSelector").value
  if (lenseOption !== "Objectif") {
    return new Promise((resolve) => resolve(lenseOption))
  }
}

/*----------------------------------- redirect product to cart -------------------------------------*/
function revealModalOnClick() {
  const modal = document.querySelector(".modal")
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

function redirectProductToCart(product) {
  getOption()
    .then((option) => {
      cart.addItem(product, option)
      displayAmount()
      revealModalOnClick()
    })
}

function displayAmount() {
  cart.updateAmount()
  let cartContent = document.querySelector(".cartContent")
  if (cart.getAmount() === 0) {
    cartContent.classList.add("d-none")
    cartContent.classList.remove("d-inline-block")
  } else {
    cartContent.innerHTML = cart.getAmount()
    cartContent.classList.add("d-inline-block")
    cartContent.classList.remove("d-none")
  }
}

