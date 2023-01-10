import { IProduct } from '../utils/types';
import BreadCrumbs from './components/breadCrumbs';
import ProductDetail from './components/productDetail';

export default class ProductPage {
  breadCrumbs: BreadCrumbs;
  productDetail: ProductDetail;

  constructor() {
    this.breadCrumbs = new BreadCrumbs();
    this.productDetail = new ProductDetail();
  }

  addSection() {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';

    const section = document.createElement('section');
    section.classList.add('product');
    main.append(section);

    const container = document.createElement('div');
    container.classList.add('container');
    section.append(container);

    const productInner = document.createElement('div');
    productInner.classList.add('product__inner');
    container.append(productInner);
  }

  draw(data: IProduct, cartIds: number[]) {
    this.addSection();
    this.breadCrumbs.draw(data);
    this.productDetail.draw(data, cartIds);
    dispatchEvent(new Event('drawProductPage'));
  }
}
