import { IProduct } from "../utils/types";
import BreadCrumbs from "./components/breadCrumbs";

export default class ProductPage {
  breadCrumbs: BreadCrumbs;

  constructor() {
    this.breadCrumbs = new BreadCrumbs();
  }

  addSection() {
    const main = document.querySelector('main') as HTMLElement;
    main.innerHTML = '';

    const section = document.createElement('section');
    section.classList.add('product');

    const container = document.createElement('div');
    container.classList.add('container');
    section.append(container);
  }

  draw(data: IProduct) {
    this.breadCrumbs.draw(data);
  }
}