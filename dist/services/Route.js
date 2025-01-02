"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cart_1 = require("../components/Cart");
const FormArticle_1 = require("../components/FormArticle");
const ErrorPage_1 = require("../components/ErrorPage"); // Page d'erreur 404
const Article_1 = require("../components/Article");
// Définition des routes
const routes = [
    {
        path: '/', // Route principale
        component: () => Promise.resolve().then(() => require('../components/List')), // Lazy loading pour la page d'accueil
        render: (parentElement) => __awaiter(void 0, void 0, void 0, function* () {
            const module = yield routes[0].component();
            const HomeComponent = module.default;
            const home = new HomeComponent("", [], parentElement);
            if (typeof home.render === 'function') {
                home.render();
            }
            else {
                console.error("Le composant Home ne possède pas de méthode render.");
            }
        }),
    },
    {
        path: '/cart', // Route pour le panier
        component: Cart_1.default, // Utilisation directe du composant Cart
        render: (parentElement) => {
            const cart = new Cart_1.default(parentElement);
            if (typeof cart.render === 'function') {
                cart.render();
            }
            else {
                console.error("Le composant Cart ne possède pas de méthode render.");
            }
        },
    },
    {
        path: '/article', // Route pour un article
        component: Article_1.default, // Utilisation directe du composant Article
        render: (parentElement) => {
            const article = new Article_1.default({}, parentElement);
            if (typeof article.render === 'function') {
                article.render();
            }
            else {
                console.error("Le composant Article ne possède pas de méthode render.");
            }
        },
    },
    {
        path: '/form-article', // Route pour le formulaire d'article
        component: FormArticle_1.default, // Utilisation directe du composant FormArticle
        render: (parentElement) => {
            const formArticle = new FormArticle_1.default(parentElement);
            if (typeof formArticle.render === 'function') {
                formArticle.render();
            }
            else {
                console.error("Le composant FormArticle ne possède pas de méthode render.");
            }
        },
    },
    {
        path: '*', // Route pour les erreurs 404
        component: ErrorPage_1.default, // Utilisation directe du composant ErrorPage
        render: (parentElement) => {
            const errorPage = new ErrorPage_1.default(parentElement);
            if (typeof errorPage.render === 'function') {
                errorPage.render();
            }
            else {
                console.error("Le composant ErrorPage ne possède pas de méthode render.");
            }
        },
    },
];
exports.default = routes;
//# sourceMappingURL=Route.js.map