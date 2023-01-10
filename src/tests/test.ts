// import App from '../components/app/app';
// import Model from '../components/model/model';
// import { ApiLoader } from '../loader/loader';
// import { IData } from '../utils/types';
// import AppController from '../components/controller/controller';
// import { productsData, filters } from './testUtils';
import Validation from '../view/components/validation';
// // import fetch, { Response } from 'node-fetch';

// const controller = new AppController();

// let data:
// beforeAll(async () =>
// });

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

// describe('My first test', () => {

// });
