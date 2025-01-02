import List from "./components/List";
import '../public/sass/style.scss';
import ArticleService from "./services/ArticleService";
// import { Navbar } from './components/Navbar';
import FormArticle from "./components/FormArticle";
import Router from './services/Router'; // Correction du chemin d'importation

const parentElement = document.getElementById('root') as HTMLElement;
const router = new Router(parentElement);

// Exemple de navigation programmatique
document.getElementById('go-to-cart')?.addEventListener('click', () => {
  router.navigate('/cart');
});
document.getElementById('go-to-article')?.addEventListener('click', () => {
  router.navigate('/article');
});

document.getElementById('go-to-form')?.addEventListener('click', () => {
  router.navigate('/form-article');
});

// const listArticle = new List("", [], parentElement);

if (parentElement) {
  // const navbarShop = new Navbar(parentElement);

  // new FormArticle(parentElement);
  // Emission des tâches issues de l'appel au serveur json-server
  setTimeout(() => {
    ArticleService.getInstance().loadArticles();
  }, 1000);
} else {
  console.error("L'élément parentElement est introuvable.");
}
