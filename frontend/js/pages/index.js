(() => {
  getProducts().then(products => {
    displayProducts(products)
    console.log('HTTP Request Results : ', products)
  })
})();
// Collect Data from API
function getProducts() {
  return fetch(`${apiUrl}/api/teddies`)
    .then(res => {
      console.log(`HTTP Request Status : ${res.status}`)
      if (res.ok) {
        return res.json()
      } else {
        const loadingContainer = document.createElement("div")
        loadingContainer.innerHTML = '<p class=" display-2 text-secondary">Loading ...</p>'
        const templateContainer = document.querySelector(".templateContainer")
        templateContainer.classList.add("justify-content-center")
        templateContainer.appendChild(loadingContainer)
      }
    })
    .catch(err => {
      console.error(err)
      alert(
        "La connexion au serveur semble être plus longue que d'habitude, veuillez réactualiser la page !"
      );
    });
}
// Insert Data in Markup
function fillTemplate(product) {
  // get template
  const template = document.querySelector("#template")
  // clone template
  const clone = document.importNode(template.content, true)

  // fill template
  const urlTemplate = "./html/produit.html?id="
  clone.querySelector(".card img").src = product.imageUrl
  clone.querySelector(".card img").alt = product.name
  clone.querySelector(".card .card-body h2").textContent = product.name
  clone.querySelector(".card .card-body a").href = urlTemplate + product._id
  // send filled template
  document.querySelector(".templateContainer").appendChild(clone)
}
// Display Data
function displayProducts(products) {
  products.forEach(product => fillTemplate(product))
}
//-------------------------------------------------------------------------//
