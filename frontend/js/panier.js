/*GET Request (_id, total)*/

/*totalCalc*/

/* verification formulaire*/
//firstName
//lastName
//address
//city
//email
const ValidateEmail = (mail) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test("myForm.emailAddr.value")) {
    return (true)
  }
  alert("You have entered an invalid email address!")
  return (false)
}



/*POST Request (#firstName, #lastName, #address, #city, #email)*/

const postForm = () => {
  var request = new XMLHttpRequest();
  request.open("POST", "https://oc-p5-api.herokuapp.com/api/cameras");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(jsonBody));
}