(async () => {
  const products = await getData();
  fillMarkup(products);
})();

async function getData() {
  return fetch(`${apiUrl}/api/cameras`)
    .then(res => res.json())
    .then((products) => products)
    .catch(err => {
      console.log(err);
      alert("La connexion au serveur à échoué, veuillez réactualiser la page !");
    });
}

function fillMarkup(products) {
  products.forEach((product) => displayProduct(product));
}

function displayProduct(product) {

  /* get template */
  const template = document.querySelector("#template");
  console.log(template.content)
  
  /* clone template */
  const clone = document.importNode(template.content, true);

  /* fill template */
  const urlTemplate = "./html/produit.html?id=";
  clone.querySelector(".card img").src = product.imageUrl;
  clone.querySelector(".card img").alt = product.name;
  clone.querySelector(".card .card-body h2").textContent = product.name;
  clone.querySelector(".card .card-body a").href = (urlTemplate + product._id);

  /* display template */
  document.querySelector(".templateContainer").appendChild(clone);
}
