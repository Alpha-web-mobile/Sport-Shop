"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class ErrorService {
    /**
     * LE constructeur privé m'assure qu'aucune instance ne sera créée en dehors de la classe
     */
    constructor() {
        this.errorSubjet = new rxjs_1.Subject();
    }
    /**
     * Cette méthode renvoie une instance. Si il n'y avait
     * pas encore d'instance, elle la crée, sinon, elle revoie
     * celle qui est stockée dans ErrorService.instance
     * @returns ErrorService
     */
    static getInstance() {
        if (!ErrorService.instance) {
            ErrorService.instance = new ErrorService();
        }
        return ErrorService.instance;
    }
    /**
     * Permet d'émettre des notification next de message d'erreur
     * @param errorMessage
     */
    emitError(errorMessage) {
        this.errorSubjet.next(errorMessage);
    }
    /**
     * Récupère le sujet en tant qu'observable pour s'y abonner
     * @returns
     */
    getErrorSubject() {
        return this.errorSubjet.asObservable();
    }
}
exports.default = ErrorService;
//# sourceMappingURL=ErrorService.js.map