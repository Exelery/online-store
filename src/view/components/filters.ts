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

  private getList(
    data: IProduct[],
    allData: IProduct[],
    type: 'brand' | 'category'
  ): { [key: string]: [number, number] } {
    const list: { [key: string]: [number, number] } = {};
    allData.forEach((el) => {
      if (el[type] in list) {
        list[el[type]][1] += 1;
      } else {
        list[el[type]] = [0, 1];
      }
    });
    data.forEach((val) => {
      if (val[type] in list) {
        list[val[type]][0] += 1;
      }
    });

    return list;
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

  drawCategoriesFilter(data: IProduct[], allData: IProduct[], category: string[]) {
    // this.addFIltersBlock('Category', 'category');
    const categories = this.getList(data, allData, 'category');

    const filtersListCategory = document.querySelector('.filters__list.category');
    if (filtersListCategory) {
      filtersListCategory.innerHTML = '';
      Object.entries(categories).forEach((val) => {
        filtersListCategory.append(this.filtersItem.createItem(val, category));
      });
    }
  }

  drawBrandsFilter(data: IProduct[], allData: IProduct[], category: string[]) {
    // this.addFIltersBlock('Brand', 'brand');
    const categories = this.getList(data, allData, 'brand');
    const filtersListCategory = document.querySelector('.filters__list.brand');
    if (filtersListCategory) {
      filtersListCategory.innerHTML = '';
      Object.entries(categories).forEach((val) => {
        filtersListCategory.append(this.filtersItem.createItem(val, category));
      });
    }
  }

  drawPriceFilter(data: IProduct[], allData: IProduct[]) {
    this.dualSliderFilter.create('Price', this.getMinMaxPrice(data, 'price'), this.getMinMaxPrice(allData, 'price'));
    this.dualSliderFilter.control('Price', '$ ');
  }

  setPriceSliderValues(data: IProduct[]) {
    this.dualSliderFilter.setSliderValues('Price', '$ ', this.getMinMaxPrice(data, 'price'));
  }

  drawStockFilter(data: IProduct[], allData: IProduct[]) {
    this.dualSliderFilter.create('Stock', this.getMinMaxPrice(data, 'stock'), this.getMinMaxPrice(allData, 'stock'));
    this.dualSliderFilter.control('Stock');
  }

  setStockSliderValues(data: IProduct[]) {
    this.dualSliderFilter.setSliderValues('Stock', '', this.getMinMaxPrice(data, 'stock'));
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
    this.addFIltersBlock('Category', 'category');
    this.addFIltersBlock('Brand', 'brand');
  }

  addFIltersBlock(blockName: string, className: string) {
    const filters = document.querySelector('.filters.products__filter');
    const filtersBlock = document.createElement('div');
    filtersBlock.classList.add('filters__block', `filters__${className}`);
    if (filters !== null) filters.append(filtersBlock);

    const filtersName = document.createElement('h3');
    filtersName.classList.add('filters__name');
    filtersName.textContent = blockName;
    filtersBlock.append(filtersName);

    const filtersList = document.createElement('ul');
    filtersList.classList.add('filters__list', className);
    filtersBlock.append(filtersList);
  }

  draw(data: IProduct[], allData: IProduct[]) {
    //allData: IProduct[]
    this.addFiltersStructure();
    // this.drawCategoriesFilter(data, allData);
    // this.drawBrandsFilter(data, allData);
    this.drawPriceFilter(data, allData);
    this.drawStockFilter(data, allData);
  }
}
