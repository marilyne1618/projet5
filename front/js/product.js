const queryString = window.location.search
// récupération de l'id
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

// déclaration d'une variable pour que cela soit accessible dans le scope général et évite les conflits
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText
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
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

// Fonction pour la récupération de l'image du produit
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

// Fonction pour la récupération du nom du produit
function makeTitle(name) {
    const h1 = document.querySelector("#title")
    h1.textContent = name
}

// Fonction pour la récupération du prix du produit
function makePrice(price) {
    const span = document.querySelector("#price")
    const h3 = document.querySelector("#price")
    span.textContent = price
}

// Fonction pour la récupération de la description du produit
function makeDescription(description) {
    const p = document.querySelector("#description")
    p.textContent = description
}

// Fonction pour la récupération des couleurs du produit dans un menu déroulant
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
// Utilisation de l'API de Chrome pour observer l'interaction de l'utilisateur sur la page
    button.addEventListener("click", handleClick)

function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value

    // Fonction pour créer une alerte s'il n'y a pas de couleur ou de quantité sélectionnées
    // return pour ne pas être redirigé vers le panier
    if (isOrderIsInvalide(color, quantity)) return
    saveOrder(color, quantity)
    redirectToCart()
}

function saveCarte(color, quantity) {
    // Utilisation du localStorage pour ajouter des produits dans le panier
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imgeUrl: imgUrl,
        altTxt: altText,
    }
    // JSON.stringify transforme un objet en string (en texte)
    localStorage.setItem(id, JSON.stringify(data))
}

function isCartIsInvalide(color, quantity) {
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("Please select a color and quantity")
        return true// pour que la fonction arrête de s'exécuter pour ne pas être redirigé vers le panier
    }
}

function redirectToCart() {
    // Propiété qui obtient l'adresse actuelle et qui redirige vers une nouvelle page
    window.location.href = "cart.html"
}
