import ArticleInterface from "./ArticleInterface";

export default interface CartInterface extends ArticleInterface{

  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image?: string;
  // article: ArticleInterface;
  quantity: number;
}