import { IProduct } from '../utils/types';
import Item from './components/item';

export default class MainPage {
  item: Item;

  constructor() {
    this.item = new Item();
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
  }
}
