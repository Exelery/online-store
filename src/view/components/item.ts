import { IDisplay, IFilter, IProduct } from '../../utils/types';
import Filters from './filters';
import SortingBar from './sortingBar';

export default class Item {
  filters: Filters;
  data: IProduct[];
  sortringBar: SortingBar;

  constructor() {
    this.sortringBar = new SortingBar();
    this.filters = new Filters();
  }
  draw(data: IProduct[], allData: IProduct[], filters: IFilter) {
    this.data = data;
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

          const button: HTMLElement | null = sourceClone.querySelector('.item__add');
          if (button) {
            if (filters.cartIds.includes(item.id)) {
              button.textContent = 'Drop from cart';
            }
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
    this.changeDisplayMode(filters.display);
    if (filters.search) {
      this.updateSearch(filters.search);
    }
    this.updateActualCategories(data, allData, filters);
    this.changeSortingValue(filters);
  }

  changeFoundItemsCount(data: IProduct[]) {
    const countLabel = document.querySelector('.products__find');

    if (countLabel !== null) countLabel.textContent = `Found: ${data.length}`;
    this.filters.addProductNotFound(data);
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
  updateActualCategories(data: IProduct[], allData: IProduct[], options: IFilter) {
    const categoryBlock = document.querySelector('filters__category');
    const brandBlock = document.querySelector('filters__brand');
    if (categoryBlock && brandBlock) {
      categoryBlock.innerHTML = '';
      brandBlock.innerHTML = '';
    }

    this.filters.drawBrandsFilter(data, allData, options.brand);
    this.filters.drawCategoriesFilter(data, allData, options.category);
    if (!options.changePriceOrStock) {
      this.changeSlidersValue('price');
      this.changeSlidersValue('stock');
    }
  }
  changeSlidersValue(target: 'price' | 'stock', data = this.data) {
    if (data.length > 0) {
      if (target === 'price') {
        this.filters.setPriceSliderValues(data);
      } else {
        this.filters.setStockSliderValues(data);
      }
    }
  }

  changeSortingValue(filtes: IFilter) {
    this.sortringBar.drawSelect(filtes);
  }
}
