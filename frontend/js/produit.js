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

        /* Dropdown menu feeding */
        for (let i in data.lenses) {
          let newDropdownItem = document.createElement("a");
          newDropdownItem.classList.add("dropdown-item");
          newDropdownItem.textContent = (data.lenses[i])
          vcamDropdown.appendChild(newDropdownItem);
        }


        //vcamAdd.setAttribute("href", "./html/panier.html?id=" + data._id);

      });
    }
    else {
      console.log('Mauvaise réponse du réseau');
    }
  })
  .catch(function (error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
  });

/*formatPrice*/
/*-----------------------------------------------------------*/
