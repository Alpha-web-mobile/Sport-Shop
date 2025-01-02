import Component from "../utils/Component";
import ArticleInterface from '../interfaces/ArticleInterface';
import ArticleService from "../services/ArticleService";
import CartService from "../services/CartService";
import FormArticle from "./FormArticle"; // Importation de FormArticle
import Article from "./Article"; // Importation de Article
import ErrorService from "../services/ErrorService"; // Importation de ErrorService
import Category from "./Category";

export default class List extends Component {
  title: string;
  articles: ArticleInterface[];
  parentElement: HTMLElement;
  domElts: Record<string, HTMLElement>;
  id: string;

  constructor(title: string, articles: ArticleInterface[], parentElement: HTMLElement) {
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
    new Category(this.articles, this.parentElement);
    // Appel de render dès la construction
    this.render('/');
  }
  // Méthode qui permet de créer une section avec un h2 qui reprendra le titre de la liste
  render(route: string) {
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
    this.articles.forEach((article: ArticleInterface) => {
      new Article(article, section);
    });

    return {
      paragrapheError,
    };
  }

  subscribeTasksNotification() {
    ArticleService.getInstance()
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
    ErrorService.getInstance()
      .getErrorSubject()
      .subscribe({
        next: (msg: string) => {
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
