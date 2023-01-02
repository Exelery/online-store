import { ApiLoader } from '../../loader/loader';
import { IData, IProduct, SortParm } from '../../utils/types';

export default class Model {
  private apiLoader: ApiLoader;
  productsAll: IProduct[];
  public shoppingCart: { id: number; count: number; price: number }[] | [];
  // filters: IFilter;
  filter: URLSearchParams;
  constructor() {
    this.filter = new URLSearchParams(window.location.search);
    // console.log('filter', this.filter.entries());
    // console.log('filter', this.filter.getAll('brand'));
    this.apiLoader = new ApiLoader();
    // this.loadData();
    this.shoppingCart = this.getShoppingCart();
  }

  async loadData() {
    const json: IData = await this.apiLoader.api();
    // console.log(Object.entries(json.products));
    this.productsAll = json.products;
  }

  public filterByRange(field: 'price' | 'stock', minValue: number, maxValue: number): IProduct[] {
    this.filter.set(field, `${minValue}%${maxValue}`);
    return this.productsAll.filter((item) => item[field] >= minValue && item[field] <= maxValue);
  }

  public filterByField(field: 'category' | 'brand', value: string): IProduct[] {
    this.filter.append(field, `${value}`);
    return this.productsAll.filter((item: IProduct) => item[field] === value);
  }

  public filterBySearch(value: string) {
    this.filter.set('search', `${value}`);
    return this.productsAll.filter(
      (item: IProduct) =>
        item.title.includes(value) ||
        item.brand.includes(value) ||
        item.category.includes(value) ||
        item.description.includes(value)
    );
  }

  public sortItems(dir: SortParm, arr: IProduct[]) {
    this.filter.set('sort', `${dir}`);
    switch (dir) {
      case SortParm.priceDown:
        return arr.sort((el1, el2) => el2.price - el1.price);
        break;
      case SortParm.priceUp:
        return arr.sort((el1, el2) => el1.price - el2.price);
        break;
      case SortParm.ratingDown:
        return arr.sort((el1, el2) => el2.rating - el1.rating);
        break;
      case SortParm.ratingUp:
        return arr.sort((el1, el2) => el1.rating - el2.rating);
        break;
    }
  }

  getShoppingCart() {
    const storage: string | null = localStorage.getItem('shopping');
    if (storage) {
      return JSON.parse(storage);
    }
    return null;
  }
  saveShoppingCart() {
    localStorage.setItem('shopping', JSON.stringify(this.shoppingCart));
  }

  addItemToCart() {
    this.shoppingCart.push();
  }
}
