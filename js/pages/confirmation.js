(() => {
  displayData()
  cleanCart()
})()

function displayData() {
  document.querySelector(".orderId").innerHTML = getParam("orderId")
  document.querySelector(".total").innerHTML = `${getParam("total")}&#128;`
}

function cleanCart() {
  localStorage.removeItem("cart")
  localStorage.removeItem("amount")
}

function getParam(param) {
  return new URL(window.location.href).searchParams.get(param)
}
