fetch("http://localhost:3000/api/products")
    // récupération des données des produits
    .then((res) => res.json())
    .then((data) => addProducts(data))


function addProducts(kanapes) {
    // Fonction pour la création des éléments
    kanapes.forEach((kanap) => {
        const { _id, imageUrl, altTxt, name, description } = kanap
        const anchor = makeAnchor(_id)
        const article = document.createElement("article")
        const image = makeImage(imageUrl, altTxt)
        const h3 = makeH3(name)
        const p = makeParagraph(description)

        appendElementsToArticle(article, image, h3, p)
        appendArticleToAnchor(anchor, article)
    })
}

function appendElementsToArticle(article, image, h3, p) {
    //Mettre image, h3 et p dans la balise <article>
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}

function makeAnchor(id) {
    // Fonction pour la création de l'élément "href"
    const anchor = document.createElement("a")
    //renvoi sur la page product.html
    anchor.href = "./product.html?id=" + id
    // return sert à renvoyer la promesse
    return anchor
}

function appendArticleToAnchor(anchor, article) {
    // Création de l'ID #items
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

function makeH3(name) {
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