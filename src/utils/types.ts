export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IProductCount extends IProduct {
  count: number;
}

export interface IData {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export enum SortParm {
  priceUp = 'price-up',
  priceDown = 'price-down',
  ratingUp = 'rating-up',
  ratingDown = 'rating-down',
}

// interface StringByString {
//   [key: string]: string | string[];
// }

export type IFilter = {
  search?: string;
  category: string[];
  brand: string[];
  price?: number[];
  stock?: number[];
  display: IDisplay;
  sort: SortParm | string;
  changePriceOrStock?: boolean;
};

export interface ICart {
  id: number;
  count: number;
  price: number;
}

export type IRoutes = '' | 'cart' | 'product' | 'error';

export type IDisplay = 'tile' | 'list';
