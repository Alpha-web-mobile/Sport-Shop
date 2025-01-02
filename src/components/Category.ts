import ArticleInterface from "../interfaces/ArticleInterface";
import Component from "../utils/Component";
import CategoryService from "../services/CategoryService";


class Category extends Component {
    title: string;
  articles: ArticleInterface[];
  parentElement: HTMLElement;
  domElts: Record<string, HTMLElement | HTMLFormElement> | null = null;

  constructor(articles: ArticleInterface[], parentElement: HTMLElement) {
    super();
    this.parentElement = parentElement;
    this.articles = articles;
    this.render();
    this.handleEvents();
  }

  render(): Record<string, HTMLElement | HTMLFormElement> {
    const container = this.createMarkup("div", this.parentElement, "", { class: 'container' });
    this.createMarkup("h5", container, "Category", {});
    const select = this.createMarkup("select", container, "", { class: 'form-select' });

    const categories = this.articles.reduce(
      (acc, art) =>
        acc.includes(art.category) ? acc : acc.concat(art.category),
      []
    );

    categories.forEach(cat => {
      this.createMarkup("option", select, cat, { value: cat });
    });

    return {
      container: container,
    };
  }

  handleEvents() {
    const select = this.domElts?.select as HTMLSelectElement;
    if (select) {
      select.addEventListener('change', (event) => {
        const selectedCategory = (event.target as HTMLSelectElement).value;
        console.log(`Selected category: ${selectedCategory}`);
        CategoryService.getInstance().setSelectedCategory(selectedCategory);
       
      });
    }
  }
}

export default Category;
