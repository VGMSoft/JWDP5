/* GET url id */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

/*GET Request (imageUrl, name, description, lenses[])*/
const myRequest = new Request("https://oc-p5-api.herokuapp.com/api/cameras/" + id);

/* HARD QuerySelector */
const vcamName = document.querySelector(".card-title");
const vcamImage = document.querySelector(".card img");
const vcamPrice = document.querySelector(".price");
const vcamDescription = document.querySelector(".card-text");
const vcamDropdown = document.querySelector(".dropdown-menu");
const vcamAdd = document.querySelector(".modal-footer a");

/* API Fetch */
fetch(myRequest)
  .then(res => {
    if (res.ok) {
      res.json().then(data => {
        console.log(data);
        vcamName.textContent = (data.name);
        vcamImage.setAttribute("src", data.imageUrl);
        vcamImage.setAttribute("alt", data.name);
        vcamPrice.textContent = (data.price / 100 + "€");
        vcamDescription.textContent = (data.description);

        console.log(data.lenses);


        //vcamDropdown.
        //vcamAdd.setAttribute("href", "./html/panier.html?id=" + data._id);

      });
    }
    else {
      throw new Error("Erreur de conexion à l'API");
    }
  })
  .catch(err => {
    return err;
  });


/*formatPrice*/