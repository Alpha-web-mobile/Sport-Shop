"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("../utils/Component");
const ErrorService_1 = require("../services/ErrorService");
const CartService_1 = require("../services/CartService");
const Cart_1 = require("./Cart");
const ArticleService_1 = require("../services/ArticleService");
class Article extends Component_1.default {
    constructor(article, parentElement) {
        super();
        this.id = article.id;
        this.name = article.name;
        this.brand = article.brand;
        this.price = article.price;
        this.description = article.description;
        this.category = article.category;
        this.stock = article.stock;
        this.image = article.image;
        this.parentElement = parentElement;
        // Appel de render qui retourne un objet littéral (clé/valeur) dont les valeurs sont de type HTMLElement
        this.domElts = this.render();
        // Gestion des événements
        this.handleEvents();
    }
    render() {
        // Création d'une balise article comme conteneur pour afficher les articles
        const containerSection = this.createMarkup('section', this.parentElement, '', {
            class: 'parent-element-section',
        });
        const container = this.createMarkup('div', containerSection, '', {
            class: 'container__article',
        });
        const articleContainer = this.createMarkup("article", container, "", { class: "parentElt" });
        const imageLink = this.createMarkup("a", articleContainer, "", { class: "img-link" });
        const img = this.createMarkup("img", imageLink, "", { class: 'article-img', src: this.image, alt: this.name });
        const containerDetailsArticle = this.createMarkup('div', articleContainer, '', { class: 'container-details-article d-flex' });
        const articleTitle = this.createMarkup('h2', containerDetailsArticle, this.name, { class: 'article-title' });
        const articleBrand = this.createMarkup('p', containerDetailsArticle, this.brand, { class: 'article-brand' });
        const articlePrice = this.createMarkup('p', containerDetailsArticle, `Price: ${this.price}`, { class: 'article-price' });
        const articleDescription = this.createMarkup('p', containerDetailsArticle, this.description, { class: 'article-description' });
        const articleCategory = this.createMarkup('p', containerDetailsArticle, this.category, { class: 'article-category' });
        const articleStock = this.createMarkup('p', containerDetailsArticle, `Stock: ${this.stock}`, { class: 'article-stock' });
        // Création de conteneur pour les boutons
        const containerButtons = this.createMarkup('div', articleContainer, '', { class: 'container-buttons' });
        const addArticle = this.createMarkup('button', containerButtons, 'Add', { class: 'article-add' });
        const detailsArticle = this.createMarkup('button', containerButtons, 'Details', { class: 'article-details' });
        return {
            containerSection,
            articleContainer,
            imageLink,
            img,
            containerDetailsArticle,
            articleTitle,
            articleBrand,
            articlePrice,
            articleDescription,
            articleCategory,
            articleStock,
            containerButtons,
            addArticle,
            detailsArticle
        };
    }
    handleEvents() {
        // Vérifiez que les éléments DOM existent avant d'ajouter des écouteurs d'événements
        if (this.domElts.addArticle) {
            this.domElts.addArticle.addEventListener("click", () => {
                CartService_1.default.addToCart(this);
                console.log("Article ajouté au panier:", this);
                const cartElt = document.getElementById('cart-content');
                if (cartElt) {
                    new Cart_1.default(cartElt);
                    console.log(CartService_1.default.getTotalObservable());
                }
            });
        }
        CartService_1.default.getCartObservable().subscribe((cartState) => {
            console.log("Cart updated:", cartState);
        });
        // Vérifiez que l'élément deleteElt existe avant d'ajouter un écouteur d'événements
        if (this.domElts.deleteElt) {
            this.domElts.deleteElt.addEventListener("click", () => {
                if (confirm(`Voulez-vous supprimer l'article ${this.name} qui a pour id ${this.id} ?`)) {
                    // Cache l'élément du DOM qui représente l'article
                    this.domElts.articleElt.style.setProperty("display", "none", "important");
                    // Faire appel au service pour supprimer l'article sur le serveur (json-server)
                    ArticleService_1.default.deleteArticle(this.id)
                        .then((data) => {
                        console.log(`Article supprimé: ${data}`);
                    })
                        .catch((error) => {
                        console.error(`Erreur attrapée lors de l'appel de deleteArticle dans le composant Article : ${error}`);
                        setTimeout(() => {
                            this.domElts.articleElt.style.setProperty("display", "flex", "important");
                        }, 2000);
                    });
                    // Si le delete ne fonctionne pas, on revient à la version précédente de la liste en donnant un message d'erreur qui sera affiché sur le parent (Todolist) et la méthode préconisée pour ce genre de communication est le design pattern observer
                    // On va se servir du service ErrorService pour émettre une notification next
                    ErrorService_1.default.getInstance().emitError("Erreur lors de la suppression en base de données. Veuillez renouveler votre suppression ultérieurement et/ou contacter le service technique : tech@todolist.fr");
                }
            });
        }
    }
}
exports.default = Article;
//# sourceMappingURL=Article.js.map