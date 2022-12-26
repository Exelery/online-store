import { ApiLoader } from '../../loader/loader';
import { IData, IProduct } from '../../utils/types';

export default class Model {
  private apiLoader: ApiLoader;
  private productsAll: IProduct[];
  constructor() {
    this.apiLoader = new ApiLoader();
    this.loadData();
  }

  async loadData() {
    const json: IData = await this.apiLoader.api();
    // console.log(Object.entries(json.products));
    this.productsAll = json.products;
  }

  public filterByRange(field: 'price' | 'stock', minValue: number, maxValue: number): IProduct[] {
    return this.productsAll.filter((item) => item[field] >= minValue && item[field] < minValue);
  }

  public filterByField(field: 'category' | 'brand', value: string): IProduct[] {
    return this.productsAll.filter((item: IProduct) => item[field] === value);
  }

  public filterBySearch(value: string) {
    return this.productsAll.filter(
      (item: IProduct) =>
        item.title.includes(value) ||
        item.brand.includes(value) ||
        item.category.includes(value) ||
        item.description.includes(value)
    );
  }

  // public drawItemCards(item: IProduct[]){

  // }
}
