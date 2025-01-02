import ArticleInterface from "../interfaces/ArticleInterface";
import { PartialArticleWithId } from "../interfaces/ArticleInterface";
import { Subject } from "rxjs";

export default class ArticleService {
  private static endpoint: string = "http://localhost:3000/articles";
  private static instance: ArticleService;
  private static currentArticles: ArticleInterface[] = [];
  articleSubject = new Subject<ArticleInterface[]>();

  /**
   * Le constructeur privé m'assure qu'aucune instance ne sera créée en dehors de la classe
   */
  private constructor() {
    // S'abonner au Subject pour maintenir currentArticles à jour
    this.articleSubject.subscribe((articles) => {
      ArticleService.currentArticles = articles;
    });
  }

  async createArticle(partialArticle: Omit<ArticleInterface, "id">): Promise<void> {
    // Créer un ID temporaire
    const tempId = Date.now().toString();

    // Créer le nouvel article avec l'ID temporaire
    const newArticle: ArticleInterface = {
      ...partialArticle,
      id: tempId,
    };

    // Émettre immédiatement la nouvelle liste avec l'article ajouté
    this.emitArticles([...ArticleService.currentArticles, newArticle]);

    try {
      // Faire la requête au serveur
      const response = await fetch(ArticleService.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partialArticle),
      });

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la création. Statut : " + response.status
        );
      }

      // Recharger les articles depuis le serveur pour avoir l'ID réel
      this.loadArticles();
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error);
      // En cas d'erreur, revenir à la liste précédente
      this.emitArticles(ArticleService.currentArticles.filter((t) => t.id !== tempId));
      throw error;
    }
  }

  /**
   * Cette méthode renvoie une instance. Si il n'y avait
   * pas encore d'instance, elle la crée, sinon, elle revoie
   * celle qui est stockée dans ArticleService.instance
   * @returns ArticleService
   */
  static getInstance(): ArticleService {
    if (!ArticleService.instance) {
      ArticleService.instance = new ArticleService();
    }
    return ArticleService.instance;
  }

  /**
   * Permet d'émettre des notifications next d'articles
   * @param articles
   */
  emitArticles(articles: ArticleInterface[]) {
    this.articleSubject.next(articles);
  }

  /**
   * Récupère le sujet en tant qu'observable pour s'y abonner
   * @returns
   */
  getArticlesSubject() {
    return this.articleSubject.asObservable();
  }

 loadArticles(): void {
    // Utilisation de la fonction fetch qui utilise les promesses
    fetch(ArticleService.endpoint)
      .then((response) => {
        if (response.status == 200) {
          // Cas favorable
          return response.json();
        } else
          throw new Error("Erreur du serveur. Statut : " + response.status);
      })
      .then((articles) => {
        console.log(`articles : `, articles);
        this.emitArticles(articles);
      });
  }

  static deleteArticle(id: string): Promise<ArticleInterface> {
    // Utilisation de la fonction fetch qui utilise les promesses
    return fetch(ArticleService.endpoint + "/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status == 200) {
          // Cas favorable
          return response.json();
        } else
          throw new Error("Erreur du serveur. Statut : " + response.status);
      })
      .then((data) => {
        console.log(`Article supprimé : `, data);
        return data;
      });
  }

  static patchArticle(partialArticle: PartialArticleWithId): Promise<ArticleInterface> {
    // Utilisation de la fonction fetch qui utilise les promesses
    return fetch(ArticleService.endpoint + "/" + partialArticle.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partialArticle),
    })
      .then((response) => {
        if (response.status == 200) {
          // Cas favorable
          return response.json();
        } else
          throw new Error("Erreur du serveur. Statut : " + response.status);
      })
      .then((data) => {
        console.log(`Article modifié : `, data);
        return data;
      });
  }

  // Filtrer les articles par catégorie
  static filterArticlesByCategory(category: string): ArticleInterface[] {
    if (category === "all") {
      return ArticleService.currentArticles;
    }
    return ArticleService.currentArticles.filter(article => article.category === category);
  }
}
