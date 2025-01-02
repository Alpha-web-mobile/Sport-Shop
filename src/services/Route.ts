import Cart from '../components/Cart';
import FormArticle from '../components/FormArticle';
import ErrorPage from '../components/ErrorPage'; // Page d'erreur 404
import Article from '../components/Article';
import ArticleInterface from '../interfaces/ArticleInterface';

// Définition d'un type pour les composants de route
type AsyncComponent = () => Promise<{ default: any }>;
type RouteComponent = {
  path: string;
  component: AsyncComponent | (new (...args: any[]) => any);
  render: (parentElement: HTMLElement) => void;
};

// Définition des routes
const routes: RouteComponent[] = [
  {
    path: '/', // Route principale
    component: () => import('../components/List'), // Lazy loading pour la page d'accueil
    render: async (parentElement: HTMLElement) => {
      const module = await (routes[0].component as AsyncComponent)();
      const HomeComponent = module.default;
      const home = new HomeComponent("", [], parentElement);
      if (typeof home.render === 'function') {
        home.render();
      } else {
        console.error("Le composant Home ne possède pas de méthode render.");
      }
    },
  },
  {
    path: '/cart', // Route pour le panier
    component: Cart, // Utilisation directe du composant Cart
    render: (parentElement: HTMLElement) => {
      const cart = new Cart(parentElement);
      if (typeof cart.render === 'function') {
        cart.render();
      } else {
        console.error("Le composant Cart ne possède pas de méthode render.");
      }
    },
  },
  {
    path: '/article', // Route pour un article
    component: Article, // Utilisation directe du composant Article
    render: (parentElement: HTMLElement) => {
      const article = new Article({} as ArticleInterface, parentElement);
      if (typeof article.render === 'function') {
        article.render();
      } else {
        console.error("Le composant Article ne possède pas de méthode render.");
      }
    },
  },
  {
    path: '/form-article', // Route pour le formulaire d'article
    component: FormArticle, // Utilisation directe du composant FormArticle
    render: (parentElement: HTMLElement) => {
      const formArticle = new FormArticle(parentElement);
      if (typeof formArticle.render === 'function') {
        formArticle.render();
      } else {
        console.error("Le composant FormArticle ne possède pas de méthode render.");
      }
    },
  },
  {
    path: '*', // Route pour les erreurs 404
    component: ErrorPage, // Utilisation directe du composant ErrorPage
    render: (parentElement: HTMLElement) => {
      const errorPage = new ErrorPage(parentElement);
      if (typeof errorPage.render === 'function') {
        errorPage.render();
      } else {
        console.error("Le composant ErrorPage ne possède pas de méthode render.");
      }
    },
  },
];

export default routes;
