/*GET Request */
const myRequest = new Request("https://oc-p5-api.herokuapp.com/api/cameras");

/* HARD QuerySelector */
const vcam1Name = document.querySelector(".vcam1 .card-body h2");
const vcam1Image = document.querySelector(".vcam1 img");
const vcam1View = document.querySelector(".vcam1 .card-body a");

const vcam2Name = document.querySelector(".vcam2 .card-body h2");
const vcam2Image = document.querySelector(".vcam2 img");
const vcam2View = document.querySelector(".vcam2 .card-body a");

const vcam3Name = document.querySelector(".vcam3 .card-body h2");
const vcam3Image = document.querySelector(".vcam3 img");
const vcam3View = document.querySelector(".vcam3 .card-body a");

const vcam4Name = document.querySelector(".vcam4 .card-body h2");
const vcam4Image = document.querySelector(".vcam4 img");
const vcam4View = document.querySelector(".vcam4 .card-body a");

const vcam5Name = document.querySelector(".vcam5 .card-body h2");
const vcam5Image = document.querySelector(".vcam5 img");
const vcam5View = document.querySelector(".vcam5 .card-body a");

/* QuerySelector loop 
for (let i = 1; i <= 5; i++) {
  let object = "." + "vcam" + i;
  let property = "vcam" + i + "Name";
    //${CSS.escape()} ?
}
*/

/* API Fetch */
fetch(myRequest)
  .then(res => {
    if (res.ok) {
      res.json().then(data => {  
        vcam1Name.textContent = (data[0].name);
        vcam1Image.setAttribute("src", data[0].imageUrl);
        vcam1Image.setAttribute("alt", data[0].name);
        vcam1View.setAttribute("href", "./html/produit.html?id=" + data[0]._id);

        vcam2Name.textContent = (data[1].name);
        vcam2Image.setAttribute("src", data[1].imageUrl);
        vcam1Image.setAttribute("alt", data[1].name);
        vcam2View.setAttribute("href", "./html/produit.html?id=" + data[1]._id);

        vcam3Name.textContent = (data[2].name);
        vcam3Image.setAttribute("src", data[2].imageUrl);
        vcam1Image.setAttribute("alt", data[2].name);
        vcam3View.setAttribute("href", "./html/produit.html?id=" + data[2]._id);

        vcam4Name.textContent = (data[3].name);
        vcam4Image.setAttribute("src", data[3].imageUrl);
        vcam1Image.setAttribute("alt", data[3].name);
        vcam4View.setAttribute("href", "./html/produit.html?id=" + data[3]._id);

        vcam5Name.textContent = (data[4].name);
        vcam5Image.setAttribute("src", data[4].imageUrl);
        vcam1Image.setAttribute("alt", data[4].name);
        vcam5View.setAttribute("href", "./html/produit.html?id=" + data[4]._id);
      });
    }
    else {
      throw new Error();
    }
  })
  .catch(err => {
    console.log("Fetch Error :", err);
  });