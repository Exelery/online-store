export default class Validation {
  name() {
    const input = document.querySelector('.modal__input.name');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('[a-zA-Z]{4,99} [a-zA-Z]{4,99}');
      if (!pattern.test(input.value)) {
        this.addErr(input);
      } else {
        this.removeErr(input);
      }
    }
  }

  phone() {
    const input = document.querySelector('.modal__input.phone');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('[+][0-9]{11,99}');
      if (!pattern.test(input.value)) {
        this.addErr(input);
      } else {
        this.removeErr(input);
      }
    }
  }

  addres() {
    const input = document.querySelector('.modal__input.addres');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('(?:[A-Za-z]+ ){2}[A-Za-z]+');
      if (!pattern.test(input.value)) {
        this.addErr(input);
      } else {
        this.removeErr(input);
      }
    }
  }

  email() {
    const input = document.querySelector('.modal__input.e-mail');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('^[A-Za-z0-9+_.-]+@(.+)$');
      if (!pattern.test(input.value)) {
        this.addErr(input);
      } else {
        this.removeErr(input);
      }
    }
  }

  number() {
    const input = document.querySelector('.modal__input.number');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('[0-9]{16,16}');
      if (!pattern.test(input.value)) {
        this.addErr(input);
      } else {
        this.removeErr(input);
      }
    }
  }

  date() {
    const input = document.querySelector('.modal__input.date');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('[0-9]/[0-9]');
      if (!pattern.test(input.value)) {
        this.addErr(input);
      } else {
        this.removeErr(input);
      }
    }
  }

  cvv() {
    const input = document.querySelector('.modal__input.cvv');

    if (input && input instanceof HTMLInputElement) {
      const pattern = new RegExp('[0-9]{3}');
      if (!pattern.test(input.value)) {
        this.addErr(input);
      } else {
        this.removeErr(input);
      }
    }
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
