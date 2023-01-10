export default class Validation {
  name() {
    const input = document.querySelector('.modal__input.name');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('[a-zA-Z]{4,99} [a-zA-Z]{4,99}');
      this.changeErrorStatus(input, pattern);
    }
  }

  phone() {
    const input = document.querySelector('.modal__input.phone');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('[+][0-9]{11,99}');
      this.changeErrorStatus(input, pattern);
    }
  }

  addres() {
    const input = document.querySelector('.modal__input.addres');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('(?:[A-Za-z]+ ){2}[A-Za-z]+');
      this.changeErrorStatus(input, pattern);
    }
  }

  email() {
    const input = document.querySelector('.modal__input.e-mail');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('^[A-Za-z0-9+_.-]+@(.+)$');
      this.changeErrorStatus(input, pattern);
    }
  }

  number() {
    const input = document.querySelector('.modal__input.number');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('[0-9]{16,16}');
      this.changeErrorStatus(input, pattern);
    }
  }

  date() {
    const input = document.querySelector('.modal__input.date');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('[0-9]/[0-9]');
      this.changeErrorStatus(input, pattern);
    }
  }

  cvv() {
    const input = document.querySelector('.modal__input.cvv');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('[0-9]{3}');
      this.changeErrorStatus(input, pattern);
    }
  }

  changeErrorStatus(input: HTMLInputElement, pattern: RegExp) {
    if (this.validPattern(input.value, pattern)) {
      this.removeErr(input);
    } else {
      this.addErr(input);
    }
  }

  validPattern(value: string, pattern: RegExp) {
    return pattern.test(value);
  }

  addErr(element: HTMLInputElement) {
    if (element.parentElement) element.parentElement.classList.add('err');
  }

  removeErr(element: HTMLInputElement) {
    if (element.parentElement) element.parentElement.classList.remove('err');
  }

  validate() {
    this.name();
    this.phone();
    this.addres();
    this.email();
    this.number();
    this.date();
    this.cvv();
  }
}
