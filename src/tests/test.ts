import Model from '../components/model/model';
import { SortParm } from '../utils/types';
import { productsData, cartItems, product1, product2, product3, cart2, cart3 } from './testUtils';
import Validation from '../view/components/validation';

describe('test validation with some patterns', () => {
  const validation = new Validation();
  let parrentElement: HTMLDivElement;
  let testInput: HTMLInputElement;

  beforeEach(() => {
    parrentElement = document.createElement('div');
    testInput = document.createElement('input');
    parrentElement.append(testInput);
  });

  it('should return true of correct input', () => {
    const pattern = new RegExp('[0-9]{3}');
    expect(validation.validPattern('956', pattern)).toBe(true);
  });

  it('should return false because of incorrect input', () => {
    const pattern = new RegExp('[0-9]/[0-9]');
    expect(validation.validPattern('956', pattern)).toBe(false);
  });

  it('should change classlist of element', () => {
    const pattern = new RegExp('[0-9]{3}');
    testInput.value = 'test';
    validation.changeErrorStatus(testInput, pattern);
    expect(parrentElement.classList.contains('err')).toBe(true);
  });

  it('should change classlist of element', () => {
    const pattern = new RegExp('[0-9]{3}');
    validation.changeErrorStatus(testInput, pattern);
    expect(parrentElement.classList.contains('err')).toBe(true);
  });

  it('should not change classlist of element', () => {
    const pattern = new RegExp('[a-zA-Z]{4,99} [a-zA-Z]{4,99}');
    testInput.value = 'sdddsdsd sdsd';
    validation.changeErrorStatus(testInput, pattern);
    expect(parrentElement.classList.contains('err')).toBe(false);
  });
});

describe('test model', () => {
  let model: Model;
  beforeEach(() => {
    localStorage.clear();
    model = new Model();
  });

  it('should return sorted arr', () => {
    const sorted = model.sortItems(SortParm.priceDown, productsData);
    expect(sorted).toEqual(productsData.sort((el1, el2) => el2.price - el1.price));
  });

  it('should convert items from ICart to IProduct if exist', () => {
    model.productsAll = productsData;
    const result = model.findItemsFromCart(cartItems);
    expect(result).toEqual([
      { ...product2, count: cart2.count },
      { ...product3, count: cart3.count },
    ]);
  });

  it('should filter data by range', () => {
    const result = model.filterByRange(productsData, 'price', 1000, 1500);
    expect(result).toEqual([product3]);
  });

  it('should filter data by category', () => {
    const result = model.filterByField(productsData, 'brand', ['Apple']);
    expect(result).toEqual([product2, product1]);
  });

  it('should filter data by search', () => {
    const result = model.filterBySearch(productsData, 'samsung');
    expect(result).toEqual([product3]);
  });

  it('should save data to local storage', () => {
    model.shoppingCart = cartItems;
    model.saveShoppingCart();
    const result = localStorage.getItem('shopping');
    expect(result).toEqual(JSON.stringify(cartItems));
  });

  it('should return data from local storage', () => {
    localStorage.setItem('shopping', JSON.stringify(cartItems));
    const result = model.getShoppingCart();
    expect(result).toEqual(cartItems);
  });

  it('should change items in cart', () => {
    model.productsAll = productsData;
    expect(localStorage.getItem('shopping')).toBeNull;
    model.changeItemToCart('3', 'plus');
    const result = localStorage.getItem('shopping') as string;
    expect(JSON.parse(result)).toEqual([cart3]);
  });
});
