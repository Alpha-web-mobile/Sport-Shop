// router.ts
import  routes from './Route';

export default class Router {
  private parentElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute(); // Pour gérer la route initiale
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || '/'; // Obtenir la route actuelle
    const route = routes.find((r) => r.path === hash) || routes.find((r) => r.path === '*'); // Route correspondante ou 404

    if (route) {
      this.parentElement.innerHTML = ''; // Réinitialiser le contenu
      route.render(this.parentElement); // Rendre le composant associé
    }
  }

  navigate(path: string) {
    window.location.hash = path; // Changer la route
  }
}

