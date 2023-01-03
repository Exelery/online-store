import AppController from './controller';
import Router from '../../router/router';
import MainPage from '../../view/mainPage';
import Model from '../model/model';

export default class MainPageController {
  view: MainPage;
  router: Router;
  model: Model;
  controller: AppController;
  constructor(controller: AppController) {
    this.controller = controller;
    this.router = controller.router;
    this.model = controller.model;
    this.view = controller.view;
  }

  public listen() {
    window.addEventListener('drawMainPage', () => {
      const productsContaner = document.querySelector('.products__items');
      const search = document.querySelector('.products__search');
      const sortBy = document.querySelector('.products__select');
      const categories = document.querySelector('.filters__list.category');
      const brands = document.querySelector('.filters__list.brand');
      const resetBtn = document.querySelector('.filters__reset');

      if (productsContaner) {
        productsContaner.addEventListener('click', (e: Event) => {
          if (e.target instanceof HTMLElement) {
            const item = e.target.closest('.item');
            console.log(item?.getAttribute('data-id'));
            const addItem = e.target.closest('.item__add');
            if (addItem) {
              this.model.addItemToCart();
            } else if (item) {
              const id = item.getAttribute('data-id');
              this.controller.appRouter(e, `product/${id}`);
            }
          }
        });
      }

      if (search) {
        search.addEventListener('input', (e: Event) => {
          const field = e.target as HTMLInputElement;
          if (field.value) {
            this.model.filter.set('search', field.value);
          } else {
            this.model.filter.delete('search');
          }
          this.controller.appRouter(e, '?' + this.model.filter.toString());
        });
      }

      if (sortBy) {
        sortBy.addEventListener('change', (e: Event) => {
          const select = e.target as HTMLSelectElement;
          this.model.filter.set('sort', select.value);
          this.controller.appRouter(e, '?' + this.model.filter.toString());
        });
      }
      if (categories) {
        // console.log(categories);
        categories.addEventListener('change', (e: Event) => {
          const checkedElement = categories.querySelectorAll(
            '.filters__item input:checked'
          ) as NodeListOf<HTMLInputElement>;
          this.model.filter.delete('category');
          [...checkedElement].forEach((e: HTMLInputElement) => this.model.filter.append('category', e.id));
          this.controller.appRouter(e, '?' + this.model.filter.toString());
        });
      }

      if (brands) {
        // console.log(categories);
        brands.addEventListener('change', (e: Event) => {
          const checkedElement = brands.querySelectorAll(
            '.filters__item input:checked'
          ) as NodeListOf<HTMLInputElement>;
          this.model.filter.delete('brand');
          [...checkedElement].forEach((e: HTMLInputElement) => this.model.filter.append('brand', e.id));
          this.controller.appRouter(e, '?' + this.model.filter.toString());
        });
      }

      if (resetBtn) {
        console.log(resetBtn);
        resetBtn.addEventListener('click', (e: Event) => {
          this.controller.appRouter(e, '/');
        });
      }
    });
  }
}
