document.querySelector(".orderId").innerHTML = getParam("orderId")
document.querySelector(".total").innerHTML = `${getParam("total")}&#128;`

//Cleaning Cart

const emptyCart = once(
  cart.emptyCart()
)


function getParam(param) {
  return new URL(window.location.href).searchParams.get(param)
}