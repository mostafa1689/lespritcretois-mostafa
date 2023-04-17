 // affichage de message de confirmation 

 const orderConfirm = document.querySelector("#confirmation-commande")
 console.log(orderConfirm)
 const pElement = document.createElement('p');
 orderConfirm.append(pElement);
 pElement.innerHTML = '<p class="confirm-commande"> confirmation N° 345678456</p>'