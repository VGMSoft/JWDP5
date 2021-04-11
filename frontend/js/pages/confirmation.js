//Cleaning Cart
cart.emptyCart()

document.querySelector(".orderId").innerHTML = getParam("orderId")
document.querySelector(".total").innerHTML = `${getParam("total")}&#128;`

function getParam(param) {
  return new URL(window.location.href).searchParams.get(param)
}