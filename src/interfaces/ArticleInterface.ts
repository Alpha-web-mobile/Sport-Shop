
export default interface ArticleInterface {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image?: string;
}

export interface PartialArticleWithId {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image?: string;
}
