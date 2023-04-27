const orderId = getOrderId()
displayOrderId(orderId)
removeALLCache()

function getOrderId() {
    // Récupération des numéros de commande
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}

function displayOrderId(orderId) {
    //Affichage du numéro de commande
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

function removeALLCache() {
    //Fonction pour vider le cache du panier
    const cache = window.localStorage
    cache.clear()
}