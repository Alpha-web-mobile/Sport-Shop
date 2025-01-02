"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("../utils/Component");
const CartService_1 = require("../services/CartService");
class Cart extends Component_1.default {
    constructor(parentElement) {
        super();
        this.parentElement = parentElement;
        this.domElts = this.render();
        this.subscribeToCartUpdates();
        this.subscribeToTotalUpdates();
    }
    render() {
        // Conteneur principal pour le panier
        const cartContainer = this.createMarkup("div", this.parentElement, "", {
            class: "cart-container",
        });
        // Liste des articles
        const itemList = this.createMarkup("ul", cartContainer, "", {
            class: "cart-item-list",
        });
        // Affichage du total
        const totalContainer = this.createMarkup("div", cartContainer, "", {
            class: "cart-total-container",
        });
        const totalLabel = this.createMarkup("span", totalContainer, "Total: ", {
            class: "cart-total-label",
        });
        const totalValue = this.createMarkup("span", totalContainer, "0.00", {
            class: "cart-total-value",
        });
        // Message vide
        const emptyMessage = this.createMarkup("div", cartContainer, "Votre panier est vide.", {
            class: "cart-empty-message",
        });
        emptyMessage.style.display = "none"; // Masqué par défaut
        return {
            cartContainer,
            itemList,
            totalContainer,
            totalValue,
            emptyMessage,
        };
    }
    // Abonnement aux changements du panier
    subscribeToCartUpdates() {
        CartService_1.default.getCartObservable().subscribe((cart) => {
            this.updateCartItems(cart);
        });
    }
    // Abonnement aux changements du total
    subscribeToTotalUpdates() {
        CartService_1.default.getTotalObservable().subscribe((total) => {
            this.updateTotal(total);
        });
    }
    // Met à jour la liste des articles dans le DOM
    updateCartItems(cart) {
        const { itemList, emptyMessage } = this.domElts;
        // Nettoyer la liste existante
        itemList.innerHTML = "";
        // Vérifier si le panier est vide
        if (Object.keys(cart).length === 0) {
            emptyMessage.style.display = "block"; // Afficher le message "panier vide"
            const contentCart = document.getElementById('cart-content');
            if (contentCart)
                contentCart.style.display = "none"; // Masquer le contenu du panier
            return;
        }
        else {
            emptyMessage.style.display = "none"; // Cacher le message "panier vide"
            const contentCart = document.getElementById('cart-content');
            if (contentCart)
                contentCart.style.display = "block"; // Afficher le contenu du panier
        }
        // Ajouter les articles au panier
        Object.values(cart).forEach((item) => {
            const itemElement = this.createMarkup("li", itemList, "", {
                class: "cart-item",
            });
            const itemName = this.createMarkup("span", itemElement, item.name, {
                class: "cart-item-name",
            });
            const itemQuantity = this.createMarkup("span", itemElement, ` x ${item.quantity}`, { class: "cart-item-quantity" });
            const itemPrice = this.createMarkup("span", itemElement, ` - ${item.price * item.quantity} €`, { class: "cart-item-price" });
            const removeButton = this.createMarkup("button", itemElement, "Supprimer", { class: "cart-item-remove" });
            // Ajouter un événement pour supprimer l'article
            removeButton.addEventListener("click", () => {
                CartService_1.default.deleteArticle(item.id);
            });
        });
    }
    // Met à jour le total dans le DOM
    updateTotal(total) {
        this.domElts.totalValue.textContent = `${total.toFixed(2)} €`;
    }
}
exports.default = Cart;
// handleEvents() {
// const { deleteArticleBtn, articleContainer } = this.domElts;
// Vérifiez que les éléments DOM existent avant d'ajouter des événements
// if (deleteArticleBtn && articleContainer) {
// deleteArticleBtn.addEventListener("click", async () => {
// if (confirm(`Voulez-vous supprimer l'article ${this.name} qui a pour id ${this.id} ?`)) {
// articleContainer.style.display = "none";
// try {
// Supprimer l'article via le service
// await CartService.deleteArticle(this.id);
// console.log("Article supprimé");
// CartService.getTotalObservable();
// } catch (error) {
// console.error(`Erreur lors de la suppression de l'article : ${error}`);
// articleContainer.style.display = "flex";
// Notifier l'erreur
// ErrorService.getInstance().emitError(
// "Erreur lors de la suppression en base de données. Veuillez réessayer."
// );
// }
// }
// });
// }
// }
//# sourceMappingURL=Cart.js.map