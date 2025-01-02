"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routingService = exports.RoutingService = void 0;
const rxjs_1 = require("rxjs");
class RoutingService {
    constructor() {
        this.currentRouteSubject = new rxjs_1.BehaviorSubject(window.location.pathname);
        this.currentRoute$ = this.currentRouteSubject.asObservable();
        window.addEventListener('popstate', () => {
            this.currentRouteSubject.next(window.location.pathname);
        });
    }
    navigate(path) {
        window.history.pushState({}, '', path);
        this.currentRouteSubject.next(path);
    }
}
exports.RoutingService = RoutingService;
exports.routingService = new RoutingService();
//# sourceMappingURL=RouteService.js.map