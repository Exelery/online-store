import AppController from './controller';
import Router from '../../router/router';
import MainPage from '../../view/mainPage';
import Model from '../model/model';
import { IDisplay } from '../../utils/types';

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
      const priceWrapper = document.querySelector('.filters__block.wrapper.price');
      const stockWrapper = document.querySelector('.filters__block.wrapper.stock');
      const productsViewMode = document.querySelector('.products__view-mode');
      const copyBtn = document.querySelector('.filters__copy');

      if (productsContaner) {
        productsContaner.addEventListener('click', (e: Event) => {
          if (e.target instanceof HTMLElement) {
            const item = e.target.closest('.item');
            // console.log(item?.getAttribute('data-id'));
            const addItem = e.target.closest('.item__add');
            if (item) {
              const id = item.getAttribute('data-id');
              if (addItem && id) {
                const typeChange = addItem.textContent === 'Drop from cart' ? 'minus' : 'plus';
                this.model.changeItemToCart(id, typeChange);
                addItem.textContent = addItem.textContent === 'Drop from cart' ? 'Add to cart' : 'Drop from cart';
              } else {
                this.controller.appRouter(e, `product/${id}`);
              }
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
        categories.addEventListener('change', (e: Event) => {
          this.checkboxInput(e, categories, 'category');
        });
      }

      if (brands) {
        brands.addEventListener('change', (e: Event) => {
          this.checkboxInput(e, brands, 'brand');
        });
      }

      if (resetBtn) {
        resetBtn.addEventListener('click', (e: Event) => {
          const productContainer = document.querySelector('.products__items');
          productContainer?.parentElement?.removeChild(productContainer);
          this.controller.appRouter(e, '/');
        });
      }

      if (priceWrapper) {
        priceWrapper.addEventListener('input', (e) => {
          const minValue = parseInt((priceWrapper.querySelector('#range1-Price') as Element).innerHTML.slice(1));
          const maxValue = parseInt((priceWrapper.querySelector('#range2-Price') as Element).innerHTML.slice(1));
          this.model.filter.set('price', `${minValue}%${maxValue}`);
          this.controller.changeSliders();
          this.controller.appRouter(e, '?' + this.model.filter.toString());
          this.controller.view.item.changeSlidersValue('stock');
        });
      }

      if (stockWrapper) {
        stockWrapper.addEventListener('input', (e) => {
          const minValue = parseInt((stockWrapper.querySelector('#range1-Stock') as Element).innerHTML.slice(1));
          const maxValue = parseInt((stockWrapper.querySelector('#range2-Stock') as Element).innerHTML.slice(1));
          this.model.filter.set('stock', `${minValue}%${maxValue}`);
          this.controller.changeSliders();
          this.controller.appRouter(e, '?' + this.model.filter.toString());
          this.controller.view.item.changeSlidersValue('price');
        });
      }

      if (productsViewMode) {
        productsViewMode.addEventListener('click', (e) => {
          const tile = productsViewMode.querySelector('.products__view-tile');
          const list = productsViewMode.querySelector('.products__view-list');

          if (e.target instanceof HTMLElement) {
            const tileTarget = e.target.closest('.products__view-tile');
            const listTarget = e.target.closest('.products__view-list');

            if (tileTarget && list) {
              this.toggleDisplayClasses(tileTarget, list, 'tile', e);
            } else if (listTarget && tile) {
              this.toggleDisplayClasses(listTarget, tile, 'list', e);
            }
          }
        });
      }

      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const url = window.location.href;
          const originText = copyBtn.textContent;
          console.log('copy', url);
          navigator.clipboard.writeText(url).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
              copyBtn.textContent = originText;
            }, 500);
          });
        });
      }
    });
  }

  private checkboxInput(e: Event, target: Element, type: 'category' | 'brand') {
    const checkedElement = target.querySelectorAll('.filters__item input:checked') as NodeListOf<HTMLInputElement>;
    this.model.filter.delete(type);
    [...checkedElement].forEach((e: HTMLInputElement) => this.model.filter.append(type, e.id));
    this.controller.appRouter(e, '?' + this.model.filter.toString());
  }

  private toggleDisplayClasses(target: Element, another: Element, mode: IDisplay, event: Event) {
    const activeTarget = target.classList.contains('active-mode');

    if (!activeTarget) {
      target.classList.add('active-mode');
      another.classList.remove('active-mode');
      this.model.filter.set('display', mode);
      this.controller.appRouter(event, '?' + this.model.filter.toString());
    }
  }
}
