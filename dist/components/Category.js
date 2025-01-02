"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("../utils/Component");
const CategoryService_1 = require("../services/CategoryService");
class Category extends Component_1.default {
    constructor(articles, parentElement) {
        super();
        this.domElts = null;
        this.parentElement = parentElement;
        this.articles = articles;
        this.render();
        this.handleEvents();
    }
    render() {
        const container = this.createMarkup("div", this.parentElement, "", { class: 'container' });
        this.createMarkup("h5", container, "Category", {});
        const select = this.createMarkup("select", container, "", { class: 'form-select' });
        const categories = this.articles.reduce((acc, art) => acc.includes(art.category) ? acc : acc.concat(art.category), []);
        categories.forEach(cat => {
            this.createMarkup("option", select, cat, { value: cat });
        });
        return {
            container: container,
        };
    }
    handleEvents() {
        var _a;
        const select = (_a = this.domElts) === null || _a === void 0 ? void 0 : _a.select;
        if (select) {
            select.addEventListener('change', (event) => {
                const selectedCategory = event.target.value;
                console.log(`Selected category: ${selectedCategory}`);
                CategoryService_1.default.getInstance().setSelectedCategory(selectedCategory);
            });
        }
    }
}
exports.default = Category;
//# sourceMappingURL=Category.js.map