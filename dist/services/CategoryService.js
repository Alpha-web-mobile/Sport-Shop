"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CategoryService {
    constructor() {
        this.selectedCategory = '';
    }
    static getInstance() {
        if (!CategoryService.instance) {
            CategoryService.instance = new CategoryService();
        }
        return CategoryService.instance;
    }
    setSelectedCategory(category) {
        this.selectedCategory = category;
    }
    getSelectedCategory() {
        return this.selectedCategory;
    }
}
exports.default = CategoryService;
//# sourceMappingURL=CategoryService.js.map