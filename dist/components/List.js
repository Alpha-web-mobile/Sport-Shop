"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("../utils/Component");
const ArticleService_1 = require("../services/ArticleService");
const Article_1 = require("./Article"); // Importation de Article
const ErrorService_1 = require("../services/ErrorService"); // Importation de ErrorService
const Category_1 = require("./Category");
class List extends Component_1.default {
    constructor(title, articles, parentElement) {
        super();
        this.title = title;
        this.articles = articles;
        this.parentElement = parentElement;
        this.id = Date.now().toString();
        this.domElts = {}; // Initialisation de domElts
        // Souscription au service qui émet des tâches
        this.subscribeTasksNotification();
        // Souscription au service d'erreur
        this.subscribeErrorNotification();
        // Ajout du formulaire d'ajout d'article
        // new FormArticle(this.parentElement);
        new Category_1.default(this.articles, this.parentElement);
        // Appel de render dès la construction
        this.render('/');
    }
    // Méthode qui permet de créer une section avec un h2 qui reprendra le titre de la liste
    render(route) {
        let section = document.getElementById(this.id);
        if (section) {
            section.remove();
        }
        // création d'une section qui entoure la liste
        section = this.createMarkup("section", this.parentElement, "", {
            id: this.id,
        });
        // Création d'une balise h2 qui reprend le titre de la liste et qui le place dans la section
        this.createMarkup("h2", section, this.title, {});
        // Création d'un paragraphe qui affichera les éventuelles erreurs
        const paragrapheError = this.createMarkup("p", section, "", {
            class: "text-danger h2",
        });
        // Ajout de paragrapheError à domElts
        this.domElts.paragrapheError = paragrapheError;
        // Création des balises "article" à partir de la propriété articles
        this.articles.forEach((article) => {
            new Article_1.default(article, section);
        });
        return {
            paragrapheError,
        };
    }
    subscribeTasksNotification() {
        ArticleService_1.default.getInstance()
            .getArticlesSubject()
            .subscribe({
            next: (articles) => {
                console.log(`Articles reçus dans la liste via le service des articles`, articles);
                this.articles = articles;
                setTimeout(() => {
                    this.render('/article');
                }, 1000);
            },
        });
    }
    subscribeErrorNotification() {
        ErrorService_1.default.getInstance()
            .getErrorSubject()
            .subscribe({
            next: (msg) => {
                console.log(`Message reçu dans la liste via le service d'erreur`, msg);
                if (this.domElts.paragrapheError) {
                    this.domElts.paragrapheError.innerText = msg;
                    setTimeout(() => {
                        this.domElts.paragrapheError.innerText = "";
                    }, 5000);
                }
            },
        });
    }
}
exports.default = List;
//# sourceMappingURL=List.js.map