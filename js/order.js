const myUrl = "https://mostafa1689.github.io/lespritcretois-mostafa/json/products.json";
const titleForm = document.querySelector("#commande h3");
const myForm = document.querySelector("#form-commande");


// Vérification si le panier est vide affiche le message
if (localStorage.getItem("cart")) {
  myForm.style.display = "block";
  console.log(myForm)
} else {
  myForm.style.display = "none";
  titleForm.style.display = "none";
  const conatiner = document.querySelector("#commande");
  conatiner.style.width = "50%";
  conatiner.style.padding = "30px";
  conatiner.style.color = "#fff";
  conatiner.style.color = "#000";
  conatiner.style.margin = "auto"
  conatiner.style.textAlign = "center"
  

  conatiner.insertAdjacentHTML(
    "beforeend",
    "<p > Votre panier est vide !!!</p>"
  );
}


const cart = localStorage.getItem("cart");
console.log(cart)
const command = new Map();

//// // Events envoi du formulaire
myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const panier = JSON.parse(cart);
  console.log(panier);

  const shipping = new Map();

  for (let objetForm of myForm) {
    const type = objetForm.type;
    const name = objetForm.name;
    const value = objetForm.value;

    if (type === "submit") {
      //skip submit button
      continue;
    }
      //console.log(type,name,value)
      shipping.set(name, value);
  }
  console.log(shipping)

  // Ajout des données de la commande dans une Map
  command.set({ panier: panier }, { shipping: shipping });
  console.log(command);

  // Redirection vers la page de confirmation de commande
  window.location.replace("confirmation-commande.html");

  // Suppression du panier enregistré localement
  localStorage.removeItem("cart");

});



// Envoie le panier avec la méthode POST de fetch
fetch(myUrl, {
  method: "POST",
  body: JSON.stringify(command),
  headers: { "Content-type": "application/json; charset=UTF-8" },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));


