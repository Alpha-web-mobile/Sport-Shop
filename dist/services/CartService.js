"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class CartService {
    // Méthode pour ajouter un article au panier
    static addToCart(article) {
        if (this.cart[article.id]) {
            this.cart[article.id].quantity += 1;
        }
        else {
            this.cart[article.id] = Object.assign(Object.assign({}, article), { quantity: 1 });
        }
        this.cartSubject.next(this.cart); // Notifier les observateurs des changements du panier
        this.calculateTotal(); // Calculer le total après chaque ajout
    }
    // Méthode pour supprimer un article du panier
    static deleteArticle(articleId) {
        delete this.cart[articleId];
        this.cartSubject.next(this.cart); // Notifier les observateurs des changements du panier
        this.calculateTotal(); // Calculer le total après chaque suppression
    }
    // Méthode pour obtenir l'observable du panier
    static getCartObservable() {
        return this.cartSubject.asObservable();
    }
    // Méthode pour obtenir l'observable du total
    static getTotalObservable() {
        return this.totalSubject.asObservable();
    }
    // Méthode pour calculer le total du panier
    static calculateTotal() {
        const total = Object.values(this.cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
        this.totalSubject.next(total); // Notifier les observateurs du nouveau total
    }
    // Méthode optionnelle pour obtenir l'état actuel du panier
    static getCartState() {
        return this.cart;
    }
}
_a = CartService;
CartService.cart = {};
CartService.cartSubject = new rxjs_1.BehaviorSubject(_a.cart);
CartService.totalSubject = new rxjs_1.BehaviorSubject(0);
exports.default = CartService;
//# sourceMappingURL=CartService.js.map