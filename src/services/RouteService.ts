import { BehaviorSubject } from 'rxjs';

export class RoutingService {
  private   currentRouteSubject: BehaviorSubject<string>;
  public  currentRoute$;

  constructor() {
    this.currentRouteSubject = new BehaviorSubject<string>(window.location.pathname);
    this.currentRoute$ = this.currentRouteSubject.asObservable();

    window.addEventListener('popstate', () => {
      this.currentRouteSubject.next(window.location.pathname);
    });
  }

navigate(path: string) {
    window.history.pushState({}, '', path);
    this.currentRouteSubject.next(path);
  }
}

export   const routingService = new RoutingService();
