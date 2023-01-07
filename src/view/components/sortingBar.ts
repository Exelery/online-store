import { IProduct, IFilter } from '../../utils/types';

export default class SortingBar {
  draw(data: IProduct[], filters: IFilter) {
    const productsList = document.querySelector('.products__list');

    if (productsList !== null) {
      const productsSort = document.createElement('div');
      productsSort.classList.add('products__sort');
      productsList.prepend(productsSort);

      const productsSortBar = document.createElement('div');
      productsSortBar.classList.add('products__sort-bar');
      productsSort.append(productsSortBar);

      const productsSelect = document.createElement('select');
      productsSelect.classList.add('products__select');
      productsSelect.name = 'select';
      productsSortBar.append(productsSelect);

      // this.drawSelect(filters);

      const productsFind = document.createElement('div');
      productsFind.classList.add('products__find');
      productsFind.textContent = `Found: ${data.length}`;
      productsSort.append(productsFind);

      const productsSearchBar = document.createElement('div');
      productsSearchBar.classList.add('products__search-bar');
      productsSort.append(productsSearchBar);

      const productsSearch = document.createElement('input');
      productsSearch.classList.add('products__search');
      productsSearch.type = 'search';
      productsSearch.placeholder = 'Search product';
      productsSearchBar.append(productsSearch);

      const productsViewMode = document.createElement('div');
      productsViewMode.classList.add('products__view-mode');
      productsSort.append(productsViewMode);

      const productsViewTile = document.createElement('div');
      productsViewTile.classList.add('products__view-tile');
      productsViewMode.append(productsViewTile);

      const productsViewList = document.createElement('div');
      productsViewList.classList.add('products__view-list');
      productsViewMode.append(productsViewList);

      if (filters.display === 'tile') productsViewTile.classList.add('active-mode');
      else productsViewList.classList.add('active-mode');

      for (let i = 0; i < 2; i++) {
        productsViewTile.append(document.createElement('span'));
        productsViewList.append(document.createElement('span'));
      }
    }
  }

  drawSelect(filters: IFilter) {
    const productsSelect = document.querySelector('.products__select');
    if (productsSelect) {
      const optionValue = ['', 'price-up', 'price-down', 'rating-up', 'rating-down'];
      const optionText = ['Sorting', '\u{21E7} Price', '\u{21E9} Price', '\u{21E7} Rating', '\u{21E9} Rating'];
      productsSelect.innerHTML = '';
      optionValue.forEach((val, i) => {
        const option = document.createElement('option');
        if (val === '') {
          option.hidden = true;
        }
        if (val === filters.sort) {
          option.defaultSelected = true;
        }
        option.value = val;
        option.textContent = optionText[i];
        productsSelect.append(option);
      });
    }
  }
}
