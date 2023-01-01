import { IProduct } from '../../utils/types';
import FiltersCheckboxLine from './filtersCheckboxLine';
import Btn from './btn';
import DualSliderFilter from './dualSliderFilter';

export default class Filters {
  filtersItem: FiltersCheckboxLine;
  btn: Btn;
  dualSliderFilter: DualSliderFilter;

  constructor() {
    this.filtersItem = new FiltersCheckboxLine();
    this.btn = new Btn();
    this.dualSliderFilter = new DualSliderFilter();
  }

  getCategories(data: IProduct[]) {
    const categories: { [key: string]: number } = {};

    data.forEach((val) => {
      if (val.category in categories) {
        categories[val.category] += 1;
      } else {
        categories[val.category] = 1;
      }
    });

    return categories;
  }

  getBrands(data: IProduct[]) {
    const brands: { [key: string]: number } = {};

    data.forEach((val) => {
      if (val.brand in brands) {
        brands[val.brand] += 1;
      } else {
        brands[val.brand] = 1;
      }
    });

    return brands;
  }

  getMinMaxPrice(data: IProduct[], value: string) {
    const minMax: number[] = [];
    const all: number[] = [];

    data.forEach((val) => {
      if (value === 'price') all.push(val.price);
      if (value === 'stock') all.push(val.stock);
    });

    all.sort((x, y) => x - y);
    minMax.push(all[0]);
    minMax.push(all[all.length - 1]);
    return minMax;
  }

  drawCategoriesFilter(data: IProduct[]) {
    this.addFIltersBlock('Category', 'category');
    const categories = this.getCategories(data);
    const filtersListCategory = document.querySelector('.filters__list.category');

    Object.entries(categories).forEach((val) => {
      if (filtersListCategory !== null) filtersListCategory.append(this.filtersItem.createItem(val));
    });
  }

  drawBrandsFilter(data: IProduct[]) {
    this.addFIltersBlock('Brand', 'brand');
    const categories = this.getBrands(data);
    const filtersListCategory = document.querySelector('.filters__list.brand');

    Object.entries(categories).forEach((val) => {
      if (filtersListCategory !== null) filtersListCategory.append(this.filtersItem.createItem(val));
    });
  }

  drawPriceFilter(data: IProduct[]) {
    this.dualSliderFilter.create('Price', this.getMinMaxPrice(data, 'price'));
    this.dualSliderFilter.control('Price', '$ ');
  }

  drawStockFilter(data: IProduct[]) {
    this.dualSliderFilter.create('Stock', this.getMinMaxPrice(data, 'stock'));
    this.dualSliderFilter.control('Stock');
  }

  addFiltersStructure() {
    const productsInner = document.querySelector('.products__inner');
    const productsFilter = document.createElement('div');
    productsFilter.classList.add('products__filter', 'filters');

    if (productsInner !== null) productsInner.prepend(productsFilter);

    const filtersControl = document.createElement('div');
    filtersControl.classList.add('filters__control');
    productsFilter.append(filtersControl);

    filtersControl.append(this.btn.draw('Reset filters', 'filters__reset'));
    filtersControl.append(this.btn.draw('Copy Link', 'filters__copy'));
  }

  addFIltersBlock(blockName: string, className: string) {
    const filters = document.querySelector('.filters.products__filter');
    const filtersBlock = document.createElement('div');
    filtersBlock.classList.add('filters__block');
    if (filters !== null) filters.append(filtersBlock);

    const filtersName = document.createElement('h3');
    filtersName.classList.add('filters__name');
    filtersName.textContent = blockName;
    filtersBlock.append(filtersName);

    const filtersList = document.createElement('ul');
    filtersList.classList.add('filters__list', className);
    filtersBlock.append(filtersList);
  }

  draw(data: IProduct[]) {
    this.addFiltersStructure();
    this.drawCategoriesFilter(data);
    this.drawBrandsFilter(data);
    this.drawPriceFilter(data);
    this.drawStockFilter(data);
  }
}
