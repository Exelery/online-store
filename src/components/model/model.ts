import { ApiLoader } from '../../loader/loader';
import { IData, IProduct, SortParm, ICart } from '../../utils/types';

export default class Model {
  private apiLoader: ApiLoader;
  productsAll: IProduct[];
  public shoppingCart: ICart[];
  filter: URLSearchParams;
  constructor() {
    this.apiLoader = new ApiLoader();
    this.shoppingCart = [];
  }

  async loadData() {
    this.shoppingCart = this.getShoppingCart();
    const json: IData = await this.apiLoader.api<IData>();
    this.productsAll = json.products;
  }

  public filterByRange(data: IProduct[], field: 'price' | 'stock', minValue: number, maxValue: number): IProduct[] {
    return data.filter((item) => item[field] >= minValue && item[field] <= maxValue);
  }

  public filterByField(data: IProduct[], field: 'category' | 'brand', value: string[]): IProduct[] {
    let tempData: IProduct[] = [];
    value.forEach((el) => {
      tempData = [...tempData, ...data.filter((item: IProduct) => item[field] === el)];
    });
    return tempData;
  }

  public filterBySearch(data: IProduct[], value: string) {
    value = value.toLocaleLowerCase().trim();
    return data.filter(
      (item: IProduct) =>
        item.title.toLocaleLowerCase().includes(value) ||
        item.brand.toLocaleLowerCase().includes(value) ||
        item.category.toLocaleLowerCase().includes(value) ||
        item.description.toLocaleLowerCase().includes(value)
    );
  }

  public sortItems(dir: SortParm, arr: IProduct[]) {
    switch (dir) {
      case SortParm.priceDown:
        return arr.sort((el1, el2) => el2.price - el1.price);
      case SortParm.priceUp:
        return arr.sort((el1, el2) => el1.price - el2.price);
      case SortParm.ratingDown:
        return arr.sort((el1, el2) => el2.rating - el1.rating);
      case SortParm.ratingUp:
        return arr.sort((el1, el2) => el1.rating - el2.rating);
      default:
        return arr;
    }
  }

  getShoppingCart() {
    const storage: string | null = localStorage.getItem('shopping');
    if (storage) {
      return JSON.parse(storage);
    }
    return [];
  }
  saveShoppingCart() {
    localStorage.setItem('shopping', JSON.stringify(this.shoppingCart));
    dispatchEvent(new Event('storage'));
  }

  changeItemToCart(id: string, type: 'plus' | 'minus') {
    const item: IProduct | undefined = this.productsAll.find((el) => el.id === Number(id));
    const indexInCart = this.shoppingCart.findIndex((el) => el.id === Number(id));
    const itemInCart = this.shoppingCart.find((el) => el.id === Number(id));
    if (item) {
      if (type === 'minus') {
        if (indexInCart > -1 && itemInCart) {
          itemInCart.count--;
          if (itemInCart.count === 0) {
            this.shoppingCart.splice(indexInCart, 1);
          } else {
            this.shoppingCart[indexInCart] = itemInCart;
          }
        }
      }
      if (type === 'plus') {
        if (indexInCart > -1 && itemInCart) {
          if (item.stock > itemInCart.count) {
            itemInCart.count++;
            this.shoppingCart[indexInCart] = itemInCart;
          }
        } else {
          this.shoppingCart.push({
            id: item.id,
            count: 1,
            price: item.price,
          });
        }
      }
    }
    this.saveShoppingCart();
  }

  public findItemsFromCart(arr: ICart[]) {
    return arr.map((el) => {
      const item: IProduct | undefined = this.productsAll.find((e) => e.id === el.id);
      if (item) {
        return { ...item, count: el.count };
      }
    });
  }
}
