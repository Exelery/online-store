import { IProduct } from '../utils/types';
import Item from './components/item';
import Filters from './components/filters';

export default class MainPage {
  item: Item;
  filters: Filters;

  constructor() {
    this.item = new Item();
    this.filters = new Filters();
  }

  addProductsSection() {
    const main = document.querySelector('main') as HTMLElement;

    const section = document.createElement('section');
    section.classList.add('products2');

    const container = document.createElement('div');
    container.classList.add('container');
    section.append(container);

    const productsInner = document.createElement('div');
    productsInner.classList.add('products__inner');
    container.append(productsInner);

    main.append(section);
  }

  draw(data: IProduct[]) {
    this.addProductsSection();
    this.item.draw(data);
    this.filters.draw(data);
  }
}
