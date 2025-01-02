"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
require("../public/sass/style.scss");
const ArticleService_1 = require("./services/ArticleService");
const Router_1 = require("./services/Router"); // Correction du chemin d'importation
const parentElement = document.getElementById('root');
const router = new Router_1.default(parentElement);
// Exemple de navigation programmatique
(_a = document.getElementById('go-to-cart')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    router.navigate('/cart');
});
(_b = document.getElementById('go-to-article')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    router.navigate('/article');
});
(_c = document.getElementById('go-to-form')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
    router.navigate('/form-article');
});
// const listArticle = new List("", [], parentElement);
if (parentElement) {
    // const navbarShop = new Navbar(parentElement);
    // new FormArticle(parentElement);
    // Emission des tâches issues de l'appel au serveur json-server
    setTimeout(() => {
        ArticleService_1.default.getInstance().loadArticles();
    }, 1000);
}
else {
    console.error("L'élément parentElement est introuvable.");
}
//# sourceMappingURL=index.js.map