//Récupération des id avec la partie à droite du ?
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

// déclaration d'une variable pour que cela soit accessible dans le scope général et évite les conflits
if (id != null) {
    let itemPrice = 0
    let imgUrl
    let altText
    let articleName
}

// Requête au serveur pour obtenir plus d'informations
fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then((res) => handleData(res))

// Faire apparaître l'image, le prix et le descriptif du produit séléctionné
function handleData(kanap) {
    const { altTxt, colors, description, imageUrl, name, price, } = kanap
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

// Fonction pour la récupération de l'image
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

// Fonction pour la récupération du nom
function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

// Fonction pour la récupération du prix
function makePrice(price) {
    const span = document.querySelector("#price")
    const h3 = document.querySelector("#price")
    if (span != null) span.textContent = price
}

// Fonction pour la récupération de la description
function makeDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

// Fonction pour la récupération des couleurs
function makeColors(colors) {
    const select = document.querySelector("#colors")
    colors.forEach((color) => {
        // création d'une option pour chaque couleur
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        select.appendChild(option)
    })
}

const button = document.querySelector("#addToCart")
// Création du bouton "Ajouter au panier"
button.addEventListener("click", handleClick)

function handleClick() {
    //Permet de sélectionner la couleur et la quantité
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    
    if (isOrderInvalid(color, quantity)) return
    saveOrder(color, quantity)
    redirectToCart()
}

function saveOrder(color, quantity) {
    // Utilisation du localStorage pour ajouter des produits dans le panier
    const key = `${id}-${color}`
    const data = {
        //Apparition des produits par couleurs et par modèles
        id: id,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText,
        name: articleName,
    }
    // JSON.stringify transforme un objet en string (en texte)
    localStorage.setItem(key, JSON.stringify(data))
}

function isOrderInvalid(color, quantity) {
    // Fonction pour créer une alerte s'il n'y a pas de couleur ou de quantité sélectionnées
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("Veuillez sélectionner une couleur et une quantité")
        // pour que la fonction arrête de s'exécuter pour ne pas être redirigé vers le panier
        return true
    }
}

function redirectToCart() {
    // Propriété qui obtient l'adresse actuelle et qui redirige vers une nouvelle page
    window.location.href = "cart.html"
}

