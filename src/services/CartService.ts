import { BehaviorSubject, Observable } from 'rxjs';
import ArticleInterface from '../interfaces/ArticleInterface';
import CartInterface from '../interfaces/CartInterface';

export default class CartService {
  private static cart: Record<string, CartInterface> = {};
  private static cartSubject: BehaviorSubject<Record<string, CartInterface>> = new BehaviorSubject(this.cart);
  private static totalSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  
  // Méthode pour ajouter un article au panier
  static addToCart(article: ArticleInterface) {
    if (this.cart[article.id]) {
      this.cart[article.id].quantity += 1;
    } else {
      this.cart[article.id] = { ...article, quantity: 1 };
    }
    this.cartSubject.next(this.cart); // Notifier les observateurs des changements du panier
    this.calculateTotal(); // Calculer le total après chaque ajout
  }

  // Méthode pour supprimer un article du panier
  static deleteArticle(articleId: string) {
    delete this.cart[articleId];
    this.cartSubject.next(this.cart); // Notifier les observateurs des changements du panier
    this.calculateTotal(); // Calculer le total après chaque suppression
  }

  // Méthode pour obtenir l'observable du panier
  static getCartObservable(): Observable<Record<string, CartInterface>> {
    return this.cartSubject.asObservable();
  }

  // Méthode pour obtenir l'observable du total
  static getTotalObservable(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  // Méthode pour calculer le total du panier
static calculateTotal() {
    const total = Object.values(this.cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.totalSubject.next(total); // Notifier les observateurs du nouveau total
  }

  // Méthode optionnelle pour obtenir l'état actuel du panier
  static getCartState(): Record<string, CartInterface> {
    return this.cart;
  }
}
