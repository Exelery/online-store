import { IProduct } from '../../utils/types';
import FiltersItem from './filtersItem';

export default class Filters {
  filtersItem: FiltersItem;

  constructor() {
    this.filtersItem = new FiltersItem();
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

  drawCategoriesFilter(data: IProduct[]) {
    const categories = this.getCategories(data);
    const filtersListCategory = document.querySelector('.filters__list.category');

    Object.entries(categories).forEach((val) => {
      if (filtersListCategory !== null) filtersListCategory.append(this.filtersItem.createItem(val));
    });
  }

  drawBrandsFilter(data: IProduct[]) {
    const categories = this.getBrands(data);
    const filtersListCategory = document.querySelector('.filters__list.brands');

    Object.entries(categories).forEach((val) => {
      if (filtersListCategory !== null) filtersListCategory.append(this.filtersItem.createItem(val));
    });
  }
}
