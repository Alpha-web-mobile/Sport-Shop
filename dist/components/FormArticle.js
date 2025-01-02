"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("../utils/Component");
const ArticleService_1 = require("../services/ArticleService");
class FormArticle extends Component_1.default {
    constructor(parentElement) {
        super();
        this.domElts = null;
        this.parentElement = parentElement;
        // Appel de render uniquement si le formulaire n'existe pas déjà
        if (!this.domElts) {
            this.domElts = this.render();
            this.handleEvents();
        }
    }
    // Méthode utilitaire pour créer une paire label-input/textarea
    createFormField(parent, labelText, inputType, attributes) {
        const label = this.createMarkup("label", parent, labelText, { for: attributes.id });
        const input = inputType === "textarea"
            ? this.createMarkup("textarea", parent, "", attributes)
            : this.createMarkup("input", parent, "", Object.assign({ type: inputType }, attributes));
        return input;
    }
    render() {
        // Vérification pour éviter le double rendu
        if (this.domElts) {
            console.warn("Le formulaire a déjà été rendu.");
            return this.domElts;
        }
        // Création d'une balise form
        const formElt = this.createMarkup("form", this.parentElement, "", {
            class: "d-flex flex-column gap-3 my-4",
            method: "POST",
        });
        // Création des champs du formulaire
        const inputName = this.createFormField(formElt, "Nom de l'article : ", "text", {
            id: "name",
            name: "name",
        });
        const inputBrand = this.createFormField(formElt, "Marque : ", "text", {
            id: "brand",
            name: "brand",
        });
        const inputCategory = this.createFormField(formElt, "Catégorie : ", "text", {
            id: "category",
            name: "category",
        });
        const inputDescription = this.createFormField(formElt, "Description : ", "textarea", {
            id: "description",
            name: "description",
        });
        const inputStock = this.createFormField(formElt, "Stock : ", "number", {
            id: "stock",
            name: "stock",
        });
        const inputImage = this.createFormField(formElt, "Image URL : ", "text", {
            id: "image",
            name: "image",
        });
        const inputPrice = this.createFormField(formElt, "Prix : ", "number", {
            id: "price",
            name: "price",
        });
        // Créer un bouton "Ajouter"
        const addElt = this.createMarkup("button", formElt, "Ajouter", {
            class: "btn btn-success",
            type: "submit",
        });
        return {
            formElt,
            inputName,
            inputBrand,
            inputCategory,
            inputDescription,
            inputStock,
            inputImage,
            inputPrice,
            addElt,
        };
    }
    handleEvents() {
        console.log(`Dans handleEvents de FormArticle`);
        if (!this.domElts) {
            console.error("Impossible de gérer les événements : le formulaire n'a pas été rendu.");
            return;
        }
        this.domElts.formElt.addEventListener("submit", (event) => {
            console.log(`Formulaire soumis`);
            // Empêcher le rechargement de la page lors de la soumission
            event.preventDefault();
            // Récupération des données soumises via une instance de FormData
            const formData = new FormData(this.domElts.formElt);
            const partialArticle = Object.assign({ name: "", brand: "", price: 0, category: "", description: "", stock: 0, image: "" }, Object.fromEntries(formData));
            console.log(`partialArticle : `, partialArticle);
            // Ajouter l'article via ArticleService
            ArticleService_1.default.getInstance().createArticle(partialArticle);
            // Logique supplémentaire pour afficher ou gérer les articles
        });
    }
}
exports.default = FormArticle;
//# sourceMappingURL=FormArticle.js.map