"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("../utils/Component");
class ErrorPage extends Component_1.default {
    constructor(parentElement, message = "Page not found") {
        super();
        this.parentElement = parentElement;
        this.message = message;
        this.render();
    }
    render() {
        // Effacer le contenu précédent
        this.parentElement.innerHTML = "";
        // Conteneur principal
        const container = this.createMarkup("div", this.parentElement, "", {
            class: "error-page",
        });
        // Titre de l'erreur
        this.createMarkup("h1", container, "Error", { class: "error-title" });
        // Message d'erreur
        this.createMarkup("p", container, this.message, { class: "error-message" });
        // Lien de retour à la page d'accueil
        const homeLink = this.createMarkup("a", container, "Go back to Home", {
            class: "error-home-link",
            href: "#/",
        });
        return container;
    }
}
exports.default = ErrorPage;
//# sourceMappingURL=ErrorPage.js.map