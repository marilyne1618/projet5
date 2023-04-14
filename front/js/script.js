fetch("http://localhost:3000/api/products")
// ce code permet d'envoyer des requêtes pour récupérer les produits
    .then((res) => res.json())
    .then((data) => addProducts(data))

    function addProducts(data) {
        const imageUrl = data[0].imageUrl
        // création des éléments
        const anchor = document.createElement("a")
        anchor.href = imageUrl
        anchor.text = "un super kanap"
        // récupération de l'ID #items
        const items = document.querySelector("#items")
        
        // Mettre "a" nommé "anchor" à l'intérieur de l'ID "#items"
        items.appendChild(anchor)
    }
        

    
