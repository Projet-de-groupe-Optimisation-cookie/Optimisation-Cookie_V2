// POPUP_____________________________________________________
function showPopup(message) {
    const popup = document.getElementById('cart-popup');
    const popupMessage = document.getElementById('popup-message');
    const closeButton = document.getElementById('close-popup');

    // Vérifier si les éléments de la popup existent
    if (popup && popupMessage && closeButton) {
        popupMessage.textContent = message;
        popup.style.display = 'block'; // Afficher la popup

        // Fermer la popup quand le bouton OK est cliqué
        closeButton.addEventListener('click', () => {
            popup.style.display = 'none'; // Masquer la popup
        });

        // Faire disparaître la popup après quelques secondes
        setTimeout(() => {
            popup.style.display = 'none'; // Masquer la popup après 3 secondes
        }, 3000); // 3 secondes
    } else {
        console.error('Les éléments de la popup sont introuvables.');
    }
}


// menu responsive_____________________________________________________ 
// Liste des liens à ajouter
const links = [
    { href: '/', text: 'Home' },
    { href: '/menu', text: 'Menu' },
    { href: '/#about', text: 'About' },
    { href: '/#contact', text: 'Contact' }
];

// Fonction pour ajouter des destinations aux liens existants
function updateAnchors(links, targetElementId) {
    // Sélectionner l'élément cible
    const ul = document.getElementById(targetElementId);
    // Sélectionner tous les éléments <a> enfants de l'élément <ul>
    const anchors = ul.querySelectorAll('a');

    // Parcourir chaque lien dans la liste
    links.forEach((link, index) => {
        // Mettre à jour l'attribut href et le texte de chaque ancre
        anchors[index].href = link.href;
        anchors[index].textContent = link.text;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Gestion du menu responsive
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('nav-links');

    // Ajouter un événement pour l'icône du menu
    menuToggle.addEventListener('click', () => {
        // Ajouter ou supprimer la classe "show" pour afficher ou cacher les liens
        navLinks.classList.toggle('show');
    });

    // Mise à jour des liens (appelez cette fonction si nécessaire)
    // updateAnchors(links, 'nav-links');
});

// FIN menu responsive_____________________________________________________ 

// panier_____________________________________________________
var button = document.querySelector('.addtoCart');

// Ajout au panier
document.querySelectorAll('.addtoCart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');

        // Récupérer les éléments actuels du panier dans le localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log(cart);

        // Ajouter le nouveau produit au panier
        cart.push({ name: productName, price: productPrice });

        // Stocker le panier mis à jour dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Appeler la fonction pour afficher la popup
        showPopup(`${productName} a été ajouté au panier!`);
        // console.log(localStorage);
    });
});



// Affichage du panier

document.getElementById('cart').addEventListener('click', () => {
    const cartContent = document.getElementById('cart-content');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Vider le contenu actuel du panier
    cartItems.innerHTML = '';

    // Récupérer le panier du localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Variable pour calculer le total
    let total = 0;

    // Générer le HTML pour chaque produit
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);

        // Calculer le total
        total += parseFloat(item.price);
    });

    // Afficher le total
    cartTotal.textContent = total.toFixed(2);

    // Afficher le conteneur du panier
    cartContent.style.display = 'block';
});


// fermeture du panier

// Sélectionner le bouton pour fermer le panier
const closeCartButton = document.getElementById('close-cart');

// Ajouter un événement de clic pour fermer le panier
closeCartButton.addEventListener('click', () => {
    document.getElementById('cart-content').style.display = 'none';
});


// Sélectionner le bouton pour vider le panier
const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
    // Vider le localStorage
    localStorage.removeItem('cart');
    // Mettre à jour l'affichage du panier
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('cart-total').textContent = '0.00';
});

// Sélectionner le bouton pour valider la commande
const checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', () => {
    // Vérifier si le panier n'est pas vide dans le localStorage
    const cart = localStorage.getItem('cart');
    // console.log("Panier actuel:", cart);

    if (cart && JSON.parse(cart).length > 0) { // Vérifie si le panier n'est pas vide
        // Générer un ID aléatoire pour le bon de commande (juste pour l'exemple)
        const orderId = Math.floor(Math.random() * 1000000);
        
        // Afficher un message avec l'ID de commande
        showPopup(`Commande validée! Numéro de commande: ${orderId}`);
        
        // Vider le localStorage
        localStorage.removeItem('cart');
        // Mettre à jour l'affichage du panier
        document.getElementById('cart-items').innerHTML = '';
        document.getElementById('cart-total').textContent = '0.00';
        // Si le panier est vide, afficher un message d'erreur ou une notification
    } else {
        showPopup("Votre panier est vide . Ajoutez des articles avant de valider la commande.");
    }
});


// panier_____________________________________________________
