/*GET Request (order_id, total)*/
(() => {
    //getOrderData()
})();

async function getOrderData() {
    return fetch(``)
        .then(res => {
            console.log("HTTP Request Status :", res.status);
            if (res.ok) {
                return res.json();
            }
        })
        .then((orderData) => orderData)
        .catch(err => {
            console.log(err);
            alert("La connexion au serveur à échoué, veuillez réactualiser la page !");
        });
};