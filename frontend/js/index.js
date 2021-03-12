/*GET Request (imageUrl, name)*/

/* API Fetch */

const img = document.getElementsByClassName('vcam2')

fetch('https://oc-p5-api.herokuapp.com/api/cameras')
  .then(res => {
    if (res.ok) {
      res.json().then(data => {
        for (let i in data) {
          console.log(data[i]);
          img.src = data[i].imageUrl;
        
        }
      })
    }
    else {
      throw new Error("Erreur de coonexion à l'API")
    }
  })
  .catch(function (err) {
    return 0;
  })


//notes
/*
img.setAttribute("src", img.src);
.catch ()
*/
