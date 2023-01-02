import { IProduct } from '../../utils/types';

export default class SortingBar {
  draw(data: IProduct[]) {
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

      const optionValue = ['price-up', 'price-down', 'rating-up', 'rating-down'];
      const optionText = ['\u{21E7} Price', '\u{21E9} Price', '\u{21E7} Rating', '\u{21E9} Rating'];

      optionValue.forEach((val, i) => {
        const option = document.createElement('option');
        option.value = val;
        option.textContent = optionText[i];
        productsSelect.append(option);
      });

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
      productsViewTile.classList.add('products__view-tile', 'active-mode');
      productsViewMode.append(productsViewTile);

      const productsViewList = document.createElement('div');
      productsViewList.classList.add('products__view-list');
      productsViewMode.append(productsViewList);

      for (let i = 0; i < 2; i++) {
        productsViewTile.append(document.createElement('span'));
        productsViewList.append(document.createElement('span'));
      }
    }
  }
}
