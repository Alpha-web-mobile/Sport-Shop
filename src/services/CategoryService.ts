class CategoryService {
    private static instance: CategoryService;
    private selectedCategory: string = '';
  
    private constructor() {}
  
    public static getInstance(): CategoryService {
      if (!CategoryService.instance) {
        CategoryService.instance = new CategoryService();
      }
      return CategoryService.instance;
    }
  
    public setSelectedCategory(category: string): void {
      this.selectedCategory = category;
    }
  
    public getSelectedCategory(): string {
      return this.selectedCategory;
    }
  }
  
  export default CategoryService;
  