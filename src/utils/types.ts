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
  category?: string;
  brand?: string;
  priceMin?: string;
  priceMax?: string;
  stockMin?: string;
  stockMax?: string;
};
