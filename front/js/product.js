const queryString = window.location.search
// récupération de l'id
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")


// Requête au serveur pour obtenir plus d'informations
fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then((res) => handleData(res))

// Faire apparaître l'image, le prix et le descriptif du produit séléctionné
function handleData(kanap) {
    const { altTxt, colors, description, imageUrl, name, price, } = kanap
    makeImage (imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

// Image du produit
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

// Nom du produit
function makeTitle(name) {
    const h1 = document.querySelector("#title")
    h1.textContent = name
}

// Prix du produit
function makePrice(price) {
    const span = document.querySelector("#price")
    const h3 = document.querySelector("#price")
    span.textContent = price
}

// Description du produit
function makeDescription(description) {
    const p = document.querySelector("#description")
    p.textContent = description
}

// Couleurs du produit dans un menu déroulant
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