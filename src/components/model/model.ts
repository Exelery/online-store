import { ApiLoader } from '../../loader/loader';
import { IData, IProduct, SortParm, ICart } from '../../utils/types';

export default class Model {
  private apiLoader: ApiLoader;
  productsAll: IProduct[];
  public shoppingCart: ICart[];
  // filters: IFilter;
  filter: URLSearchParams;
  constructor() {
    // console.log('filter', this.filter.entries());
    // console.log('filter', this.filter.getAll('brand'));
    this.apiLoader = new ApiLoader();
    this.shoppingCart = [];
    // this.loadData();
  }

  async loadData() {
    this.shoppingCart = this.getShoppingCart();
    const json: IData = await this.apiLoader.api();
    // console.log(Object.entries(json.products));
    this.productsAll = json.products;
  }

  public filterByRange(data: IProduct[], field: 'price' | 'stock', minValue: number, maxValue: number): IProduct[] {
    // this.filter.set(field, `${minValue}%${maxValue}`);
    return data.filter((item) => item[field] >= minValue && item[field] <= maxValue);
  }

  public filterByField(data: IProduct[], field: 'category' | 'brand', value: string[]): IProduct[] {
    // this.filter.append(field, `${value}`);
    let tempData: IProduct[] = [];
    value.forEach((el) => {
      tempData = [...tempData, ...data.filter((item: IProduct) => item[field] === el)];
    });
    return tempData;
  }

  public filterBySearch(data: IProduct[], value: string) {
    // this.filter.set('search', `${value}`);
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
    // this.filter.set('sort', `${dir}`);
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
      default:
        return arr;
    }
  }

  getShoppingCart() {
    const storage: string | null = localStorage.getItem('shopping');
    console.log(storage);
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
    // console.log(this.shoppingCart, 'start');
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
