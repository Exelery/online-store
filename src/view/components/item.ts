// import './item.scss';
import { IDisplay, IProduct } from '../../utils/types';
import Filters from './filters';
// import { getList } from '../../utils/utils';

export default class Item {
  filters: Filters;

  constructor() {
    this.filters = new Filters();
  }
  draw(data: IProduct[], allData: IProduct[], display: IDisplay, searchValue = '', category: string[] = []) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const itemTemp: HTMLTemplateElement | null = document.querySelector('#itemTemp');

    if (itemTemp != null) {
      data.forEach((item) => {
        const sourceClone: Node = itemTemp.content.cloneNode(true);

        if (sourceClone instanceof DocumentFragment) {
          const itemLi: HTMLElement | null = sourceClone.querySelector('.item');
          if (itemLi != null) {
            itemLi.dataset.id = item.id.toString();
          }

          const itemName: HTMLElement | null = sourceClone.querySelector('.item__name');
          if (itemName != null) {
            itemName.textContent = item.title;
          }

          const itemPrice: HTMLElement | null = sourceClone.querySelector('.item__price');
          if (itemPrice != null) {
            itemPrice.textContent = '$ ' + item.price.toString();
          }

          const itemImage: HTMLImageElement | null = sourceClone.querySelector('.item__image');
          if (itemImage != null) {
            itemImage.src = item.images[0];
          }

          const itemCategory: HTMLElement | null = sourceClone.querySelector('.item__category span');
          if (itemCategory != null) {
            itemCategory.textContent = item.category;
          }

          const itemBrand: HTMLElement | null = sourceClone.querySelector('.item__brand span');
          if (itemBrand != null) {
            itemBrand.textContent = item.brand;
          }

          const itemDiscount: HTMLElement | null = sourceClone.querySelector('.item__discount span');
          if (itemDiscount != null) {
            itemDiscount.textContent = item.discountPercentage.toString() + ' %';
          }

          const itemRating: HTMLElement | null = sourceClone.querySelector('.item__rating span');
          if (itemRating != null) {
            itemRating.textContent = item.rating.toString();
          }

          const itemStock: HTMLElement | null = sourceClone.querySelector('.item__stock span');
          if (itemStock != null) {
            itemStock.textContent = item.stock.toString();
          }

          fragment.append(sourceClone);
        }
      });

      const productsItems: HTMLElement | null = document.querySelector('.products__items');
      if (productsItems != null) {
        productsItems.innerHTML = '';
        productsItems.append(fragment);
      }
    }

    this.changeFoundItemsCount(data);
    this.changeDisplayMode(display);
    this.updateSearch(searchValue);
    this.updateActualCategories(data, allData, category);

    this.filters.setPriceSliderValues(data);
    this.filters.setStockSliderValues(data);
  }

  changeFoundItemsCount(data: IProduct[]) {
    const countLabel = document.querySelector('.products__find');

    if (countLabel !== null) countLabel.textContent = `Found: ${data.length}`;
  }

  changeDisplayMode(display: IDisplay) {
    const anotherDisplay: IDisplay = display === 'list' ? 'tile' : 'list';
    const productsItems = document.querySelector('.products__items');
    if (productsItems) {
      if (!productsItems.classList.contains(display)) {
        productsItems.classList.add(display);
        productsItems.classList.remove(anotherDisplay);
      }
    }
  }
  updateSearch(value: string) {
    const search = document.querySelector('.products__search');
    if (search instanceof HTMLInputElement) {
      search.value = value;
    }
  }
  updateActualCategories(data: IProduct[], allData: IProduct[], category: string[]) {
    const categoryBlock = document.querySelector('filters__category');
    const brandBlock = document.querySelector('filters__brand');
    if (categoryBlock && brandBlock) {
      categoryBlock.innerHTML = '';
      brandBlock.innerHTML = '';
    }

    this.filters.drawBrandsFilter(data, allData, category);
    this.filters.drawCategoriesFilter(data, allData, category);
  }
}
