const myUrl = "https://mostafa1689.github.io/lespritcretois-mostafa/json/products.json";

const loadData = async (myUrl) => {
  return fetch(myUrl)
    .then((response) => response.json())
    .then((data) => {
      const products = data.products;
      sessionStorage.setItem("products", JSON.stringify(products));
      return products;
    })
    .catch((error) =>
      console.error("Erreur de récupération des produits", error)
    );
};

const actualCalculPrice = (price, quantityProducts, priceProducts) => {
  const quantity = Number(quantityProducts.value);
  const calculPrice = price * quantity;
  priceProducts.innerHTML = `${calculPrice.toFixed(2)}€`;
};

const displayItems = (products, displayType) => {
  const containerProducts = document.getElementById("produits");
  containerProducts.innerHTML = "";

  if (!displayType) {
    const itemsProducts = document.createElement("ul");
    containerProducts.appendChild(itemsProducts);

    let productsHtml = "";
    products.forEach((product) => {
      productsHtml += `
        <li>
          <a href="produit-simple.html?id=${product.id}">
            <img src="img/products/${product.category}/${product.subCategory}/${product.image}" alt="${product.name}">
          </a>
          <a href="produit-simple.html?id=${product.id}">
            <h3>${product.name}</h3><span>${product.price.toFixed(2)}€</span>
          </a>
        </li>`;
    });

    itemsProducts.innerHTML = productsHtml;
  } else {
    let productsHtml = "";
    products.forEach((product) => {
      productsHtml += `
      <article>
        <h3>${product.name}</h3>
        <div>
          <figure><img src="img/products/${product.category}/${product.subCategory}/${product.image}" alt="${product.name}"></figure>
          <div>
            <p>${product.description}</p>
            <footer>
              <form id="panier">
                <input type="hidden" id="id" value="${product.id}">
                <input type="number" min="1" step="1" value="1" id="price">
                <span id="calcul-price">${product.price.toFixed(2)}€</span>
                <button type="submit" class="bt-panier" id="bt-panier" href="panier.html?id=${product.id}">Ajouter au panier</button>
              </form>
            </footer>
          </div>
        </div>
      </article>`;
    });

    containerProducts.insertAdjacentHTML("beforeend", productsHtml);

    products.forEach((product) => {
      const quantityProducts = document.getElementById("price");
      const priceProducts = document.getElementById("calcul-price");
      quantityProducts.addEventListener("input", () => actualCalculPrice(product.price, quantityProducts, priceProducts));
    });
  }
};

if (!sessionStorage.getItem("products")) {
  loadData(myUrl).then((products) => {
    displayItems(products, false);
  });
} else {
  const products = JSON.parse(sessionStorage.getItem("products"));
  displayItems(products, false);
}

const displayBoutonVign = document.querySelector(".fa-th");
const displayBoutonList = document.querySelector(".fa-list");

displayBoutonVign.addEventListener("click", () => {
  displayBoutonVign.classList.add("active");
  displayBoutonList.classList.remove("active");
  const products = JSON.parse(sessionStorage.getItem("products"));
  displayItems(products, false);
});

displayBoutonList.addEventListener("click", () => {
  displayBoutonList.classList.add("active");
  displayBoutonVign.classList.remove("active");
  const products = JSON.parse(sessionStorage.getItem("products"));
  displayItems(products, true);
  });

  
