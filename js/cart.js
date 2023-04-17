// récupération les produits stockés dans la session
const getProducts = () => JSON.parse(sessionStorage.getItem("products"));
// récupération les éléments du panier stockés dans le local storage
const getCartItems = () => new Map(JSON.parse(localStorage.getItem("cart")) || []);

// Ajoute un produit au panier
const addToCart = (product, quantity) => {
  const cartItems = getCartItems();

  if (cartItems.has(product.id)) {
    cartItems.set(product.id, cartItems.get(product.id) + quantity);
  } else {
    cartItems.set(product.id, quantity);
  }

  localStorage.setItem("cart", JSON.stringify([...cartItems.entries()]));
  displayCartItems();
};

// calcul le prix total des produits dans le panier
const calculatePrice = (cartItems, products) => {
  let quantityTotal = 0;
  let priceTotal = 0;

  for (const [id, quantity] of cartItems) {
    const product = products.find((p) => p.id == id);
    if (product) {
      quantityTotal += quantity;
      priceTotal += quantity * product.price;
    }
  }
  return [quantityTotal, priceTotal];
};

// mettre à jour le nombre d'articles et le prix total affichés dans la page
const updateProduct = (quantityTotal, priceTotal) => {
  const displayNbreProducts = document.querySelector(".nbre-produits");
  displayNbreProducts.innerHTML = `${quantityTotal} Article(s) ${priceTotal.toFixed(2)} €`;
};

// création HTML dans le tableau du panier pour un produit donné
const containerCart = (product, quantity) => `
  <tr>
    <td><img src="img/products/${product.category}/${product.subCategory}/${product.image}" alt="${product.name}"></td>
    <td>${product.name}</td>
    <td>${product.price.toFixed(2)}€</td>
    <td><input class="quantity" type="number" id="${product.id}" min="1" max="50" value="${quantity}"></td>
    <td class="sub-total">${(product.price * quantity).toFixed(2)}€</td>
    <td><a data-id="${product.id}">X</a></td>
  </tr>
`;

// affiche les produits dans le panier dans la page
const displayCartItems = () => {
  const products = getProducts();
  const cartItems = getCartItems();
  const [quantityTotal, priceTotal] = calculatePrice(cartItems, products);
  updateProduct(quantityTotal, priceTotal);

  const table = document.querySelector("#panier table");
  table.innerHTML = "";
  const tableBody = document.createElement("tbody");
  table.append(tableBody);

// iteration tous les produits et affiche ceux qui sont présents dans le panier
  for (const product of products) {
    const quantity = cartItems.get(product.id);

    // Events et mettre à jour la quantité et le prix total lorsqu'on modifie la quantité d'un produit
    if (quantity) {
      tableBody.insertAdjacentHTML("beforeend", containerCart(product, quantity));
      const inputQuantity = document.getElementById(product.id);
      inputQuantity.addEventListener("input", (e) => {
        const newQuantity = parseInt(e.target.value);
        const subTotalElement = e.target.parentElement.nextElementSibling;
        const subTotal = newQuantity * product.price;
        subTotalElement.innerText = `${subTotal.toFixed(2)}€`;

        cartItems.set(product.id, newQuantity);
        localStorage.setItem("cart", JSON.stringify([...cartItems.entries()]));
        //const [newQuantityTotal, newPriceTotal] = calculatePrice(cartItems, products);
        //updateProduct(newQuantityTotal, newPriceTotal);
      });
    }
  }


// fonction pour supprimer les produits dans le panier 
const addSuppButton = () => {
  const suppButtons = document.querySelectorAll("[data-id]");

  for (let suppButton of suppButtons) {
    suppButton.addEventListener("click", (e) => {
      const idProduct = e.target.dataset.id;
      console.log(idProduct)
      cartItems.delete(idProduct);
      localStorage.setItem("cart", JSON.stringify([...cartItems.entries()]));
      displayCartItems();
    });
  } 
}

 // ajoute les événements pour supprimer les produits dans le panier 
 addSuppButton();

  // Si le panier contient des produits, affiche le bouton "Recalculer le panier"
  let recalculButton = document.getElementById('recalcul-panier');
  if (priceTotal != 0) {
    if (!recalculButton) {
      recalculButton = document.createElement('button');
      recalculButton.id = 'recalcul-panier';
      recalculButton.innerText = 'Recalculer le panier';
      table.after(recalculButton);
    }
  // Affiche le prix total des produits dans le panier
    let totalPriceDiv = document.getElementById('totalPrice');
    if (!totalPriceDiv) {
      totalPriceDiv = document.createElement('div');
      totalPriceDiv.id = 'totalPrice';
      recalculButton.after(totalPriceDiv);
      totalPriceDiv.innerText = `Total: ${priceTotal.toFixed(2)} €`;
    }

// Events pr recalculer le prix total des produits en cliquant sur le bouton "recalculeer"
  recalculButton.addEventListener('click', () => {
    let newTotalPrice = 0;
    let newTotalQuantity = 0;
    const displayNbreProducts = document.querySelector(".nbre-produits"); 
    const inputQuantities = document.querySelectorAll('.quantity');
    inputQuantities.forEach(input => {
      newTotalQuantity += Number(input.value);
    });
    const subTotalCells = document.querySelectorAll('.sub-total');
    subTotalCells.forEach(cell => {
      newTotalPrice += Number(cell.innerText.replace('€', ''));
    });
    totalPriceDiv.innerText = `Total: ${newTotalPrice.toFixed(2)} €`;
    displayNbreProducts.innerText = `${newTotalQuantity} Article(s) ${newTotalPrice.toFixed(2)} €`;
  });
  
  } else {
    // Si le panier est vide, supprime le bouton "Recalculer le panier" s'il existe
    if (recalculButton) {
      recalculButton.remove();
    }
  
}

};

// events  ajouter un produit au panier click sur le bouton "Ajouter au panier"
const ajoutButton = document.getElementById("panier");
if (ajoutButton) {
  ajoutButton.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = e.target.querySelector("#id").value;
    const product = getProducts().find((p) => p.id == id);
    const quantityProduct = document.querySelector("#price");
    const quantity = parseInt(quantityProduct.value);

    addToCart(product, quantity);
    
  });
  
}
document.addEventListener("DOMContentLoaded", () => {
    
    displayCartItems ()
});

