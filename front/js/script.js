fetch("http://localhost:3000/api/products")
    // ce code permet d'envoyer des requêtes pour récupérer les produits
    .then((res) => res.json())
    .then((data) => addProducts(data))
    // return sert à renvoyer la promesse

function addProducts(kanapes) {
    // Fonction pour la récupération des produits
    // const _id = kanapes[0]._id
    // const imageUrl = kanapes[0].imageUrl
    // const altTxt = kanapes[0].altTxt
    // const name = kanapes[0].name
    // const description = kanapes[0].description
    // On peut l'écrire sur une seule ligne ex : 
    
    
kanapes.forEach((kanap) => {
    const { _id, imageUrl, altTxt, name, description } = kanap
    const anchor = makeAnchor(_id)
    const article = document.createElement("article")
    const image = makeImage(imageUrl, altTxt)
    const h3 = makeH3(name)
    const p = makeParagraph(description)

    appendElementsToArticle(article, image, h3,p)
    appendArticleToAnchor(anchor, article)
})    
}

function appendElementsToArticle(article, image, h3,p) {
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}

function makeAnchor(id) {
    // Fonction pour la création des éléments
    const anchor = document.createElement("a")
    //renvoi sur la page product.html
    anchor.href = "./product.html?id=" + id
    // sortir "anchor" de function
    return anchor
}

function appendArticleToAnchor(anchor, article) {
    // Fonction pour créer la balise article
    // récupération de l'ID #items
    const items = document.querySelector("#items")
    // Mettre "a" nommé "anchor" à l'intérieur de l'ID "#items"
    items.appendChild(anchor)
    anchor.appendChild(article)
}

function makeImage(imageUrl, altTxt) {
    // Fonction pour créer la balise image
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

function makeH3 (name) {
// Fonction pour créer la balise h3
const h3 = document.createElement("h3")
h3.textContent = name
h3.classList.add("productName")
return h3
}

function makeParagraph(description) {
// Fonction pour créer la balise p
const p = document.createElement("p")
p.textContent = description
p.classList.add("productDescription")
return p
}