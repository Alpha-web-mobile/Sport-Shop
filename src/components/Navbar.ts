import Component from "../utils/Component";

export class Navbar extends Component {
  parentElement: HTMLElement;
  domElts: Record<string, HTMLElement>;

  constructor(parentElement: HTMLElement) {
    super();
    this.parentElement = parentElement;
    this.domElts = this.render();
  }

  render(): Record<string, HTMLElement> {
    // Render the navbar
    const navbar = this.createMarkup('nav', this.parentElement, '', { 
      'class': 'navbar',
    });
    const listItems = this.createMarkup('ul', navbar, '', { 
      'class': 'nav-list',
    });
    const itemArticles = this.createMarkup('li', listItems, '', { 'class': 'nav-item',});
    const itemForm = this.createMarkup('li', listItems, '', { 'class': 'nav-item',});
    const itemCart = this.createMarkup('li', listItems, '', { 'class': 'nav-item',});
    
    const linkArticle = this.createMarkup('a', itemArticles, 'List', { href: 'index.html', target: '_self' });
    const linkForm = this.createMarkup('a', itemForm, 'Create Article', { href: 'form.html', target: '_self' });
    const linkCart = this.createMarkup('a', itemCart, 'Panier', { href: 'cart.html', target: '_self' });

    return { 
      navbar,
      listItems,
      itemArticles,
      itemForm,
      itemCart,
      linkArticle,
      linkForm,
      linkCart
    };
  }
}
