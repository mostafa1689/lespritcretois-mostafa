"use strict";
const currentUrl = new URL(window.location.href);
const getId = currentUrl.searchParams.get("id");
const productsJson = sessionStorage.getItem("products");
const products = productsJson ? JSON.parse(productsJson) : [];
const detailProduct = document.getElementById("produit-simple");

// Fonction affichage des détails du produit
const displayProductsDetails = ({id, name, image, category, subCategory, description, price}) => {
  let productDetailsHtml = `
    <article>
    <h3>${name}</h3>
      <div>
          <figure><img src="img/products/${category}/${subCategory}/${image}" alt="${name}"></figure>
          <div>
              <p>${description}</p>
              <footer>
                  <form id="panier">
                  <input type="hidden" id="id" value="${id}">
                  <input type="number" min="1" step="1" value="1"
                          id="price"><span id="calcul-price">${price.toFixed(
                            2
                          )}€</span>
                <button type="submit" class="bt-panier"
                          id="bt-panier" href="panier.html?id=${id}">Ajouter au panier</button></form>
              </footer>
          </div>
      </div>
    </article>
      `;

  detailProduct.insertAdjacentHTML("beforeend", productDetailsHtml);

// Ajout du produit au panier le bouton "Ajouter au panier"
  const quantityProducts = document.getElementById("price");
  const priceProducts = document.getElementById("calcul-price");

  const actualCalculPrice = () => {
    const quantity = Number(quantityProducts.value);
    const calculPrice = price * quantity;
    priceProducts.innerHTML = `${calculPrice.toFixed(2)}€`;
  };

  quantityProducts.addEventListener("input", () => actualCalculPrice());
};

// Appel fonction affiche les détails du produit
for (let product of products) {
    if (product.id == getId) {
      displayProductsDetails(product);
      break;
    }
  }

