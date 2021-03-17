/* GET url id */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

/* GET url id short */
console.log(new URL(window.location.href).searchParams.get("id"));

/* Vars */
const myRequest = new Request(`${apiUrl}/api/cameras/` + id);
let cart = [];

/* HARD QuerySelector */
const vcamName = document.querySelector(".card-title");
const vcamImage = document.querySelector(".card img");
const vcamPrice = document.querySelector(".price");
const vcamDescription = document.querySelector(".card-text");
const vcamDropdown = document.querySelector(".dropdown-menu");
const vcamAdd = document.querySelector(".addToCart");

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
        /* Cart feeding */
        console.log(vcamAdd);
        vcamAdd.addEventListener('click', event => {
          let cart = [];
          cart.push(data._id);
          localStorage.setItem("productId", cart);
          console.log(cart);
        })
        

      });
    }
    else {
      throw new Error();
    }
  })
  .catch(err => {
    console.log("Fetch Error :", err);
  });

/*formatPrice*/
/*-----------------------------------------------------------*/
