// Création d'une array pour obtenir une liste totale de cart
const cart = []

retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))

//bouton commander
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))


function retrieveItemsFromCache() {
    const numberOfitems = localStorage.length
    //Récupération de l'item
    for (let i = 0; i < numberOfitems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || ""
        // JSON.parse transforme un string (texte) en objet
        const itemObject = JSON.parse(item)
        //Dans chaque objet trouvé pusher dans le cart l'objet correspondant
        cart.push(itemObject)
    }
}

function displayItem(item) {
    const article = makeArticle(item)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    const cartItemContent = makeCartContent(item)
    article.appendChild(cartItemContent)
    displayArticle(article)
    displayTotalQuantity()
    displayTotalPrice()
}

function displayTotalQuantity() {
    //Fonction pour que le prix total change en fonction de la quantité
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

function displayTotalPrice() {
    //Fonction pour que le prix total s'affiche
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total
}

function makeCartContent(item) {
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")
    const description = makeDescription(item)
    const settings = makeSettings(item)
    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
}

function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__itm__content__description__settings")
    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

function addDeleteToSettings(settings, item) {
    //Fonction pour supprimer des articles du panier
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))
    const p = document.createElement("p")
    p.textContent = "supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item) {
    //supprime l'index de l'article en prenant compte l'id et la couleur
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color
    )
    cart.splice(itemToDelete, 1)
    displayTotalPrice()
    displayTotalQuantity()
    deleteDataFromCache(item)
    deleteArticleFromPage(item)
}

function deleteArticleFromPage(item) {
    //Supprime les articles en différenciant les id par leur couleur
    const articleToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    articleToDelete.remove()
}

function deleteDataFromCache(item) {
    //Supprime la key
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

function addQuantityToSettings(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    //assigne à un évènement plusieurs fonctions à la fois
    input.addEventListener("input", () => udaptePriceAndQuantity(item.id, input.value, item))
    quantity.appendChild(input)
    settings.appendChild(quantity)
}

function udaptePriceAndQuantity(id, newValue, item) {
    //Lorsque la quantité change sur l'input, la fonction récupère la nouvelle valeur de l'id
    const itemToUpdate = cart.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    //Changement du prix total et du nombre d'articles en fonction de la quantité sélectionnée
    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(item)
}

function saveNewDataToCache(item) {
    //Mémorise le panier lors du rafraîchissement de la page
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}

function makeDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function makeImageDiv(item) {
    // Création de la div qui contient la source de l'image
    const div = document.createElement("div")
    // Ajout de la class "cart__item__img"
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

 //Formulaire
function submitForm(e) {
    //Ne pas rafraichir
    e.preventDefault()
    if (cart.length === 0) {
        alert("Sélectionnez un article")
        return
    }
     //Vérifie si le formulaire est invalide
    if (isFormInvalid()) return
    if (isEmailInvalid()) return

     //Fonction post pour envoyer le formulaire au back-end
    const body = makeRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
}

function isEmailInvalid () {
    const email = document.querySelector("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
    if (regex.test (email) === false) {
        alert("Entrez une adresse mail valide")
        return true
    }
    return false
}

function isFormInvalid() {
    const form = document.querySelector(".cart__order__form")
    //Si un champ du formulaire est manquant impossible de valider
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
        if (input.value === "") {
            alert("Remplissez tous les champs du formulaire")
            return true
        }
        //validation possible
        return false
    })
}

function makeRequestBody() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: getIdsFromCache()
    }
    return body
}

 //Récupération de tous les ID
function getIdsFromCache(){
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i)
        //obtenir la key de l'id mais sans la couleur
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
}
    

