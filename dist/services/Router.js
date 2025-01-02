"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// router.ts
const Route_1 = require("./Route");
class Router {
    constructor(parentElement) {
        this.parentElement = parentElement;
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute(); // Pour gérer la route initiale
    }
    handleRoute() {
        const hash = window.location.hash.slice(1) || '/'; // Obtenir la route actuelle
        const route = Route_1.default.find((r) => r.path === hash) || Route_1.default.find((r) => r.path === '*'); // Route correspondante ou 404
        if (route) {
            this.parentElement.innerHTML = ''; // Réinitialiser le contenu
            route.render(this.parentElement); // Rendre le composant associé
        }
    }
    navigate(path) {
        window.location.hash = path; // Changer la route
    }
}
exports.default = Router;
//# sourceMappingURL=Router.js.map