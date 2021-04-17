(() => {

  getProducts().then(products => displayProducts(products))
  cart.showAmount()
})();

// Collect Data from API
function getProducts() {
  loadingSpinnerOn()
  return fetch(`${apiUrl}/api/cameras`)
    .then(res => {
      if (res.ok) {
        loadingSpinnerOff()
        return res.json()
      } else {
        loadingSpinnerOff()
        serverOffline()
        return 0
      }
    })
    .catch(err => {
      console.error(err)
      alert(
        "La connexion au serveur semble être plus longue que d' habitude, veuillez réactualiser la page !"
      );
    });
}

// Display Data
function displayProducts(products) {
  products.forEach(product => fillTemplate(product))
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

/*----------------------------------- API states user feedback -------------------------------------*/
function serverOffline() {
  const loadingContainer = document.createElement("div")
  loadingContainer.innerHTML = '<p class="display-5 text-secondary text-center mt-5 pt-5">Server offline ...<br/>Please reload page<br/>or retry later!</p>'
  const templateContainer = document.querySelector(".templateContainer")
  templateContainer.classList.add("justify-content-center")
  templateContainer.appendChild(loadingContainer)
}

function loadingSpinnerOn() {
  const loadingContainer = document.createElement("div")
  loadingContainer.innerHTML = '<div class="spinner-border text-secondary loadingSpinner mt-5 pt-5" role="status"><span class="sr-only">Loading...</span></div>'
  const templateContainer = document.querySelector(".templateContainer")
  templateContainer.classList.add("justify-content-center")
  templateContainer.appendChild(loadingContainer)
}

function loadingSpinnerOff() {
  let spinner = document.querySelector('.loadingSpinner');
  spinner.parentNode.removeChild(spinner);
}
