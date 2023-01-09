import Btn from './components/btn';
import Input from './components/input';
import Validation from './components/validation';

export default class Modal {
  input: Input;
  btn: Btn;
  validation: Validation;
  private placeholders: string[] = ['name', 'phone', 'addres', 'e-mail'];
  private placeholdersCard: string[] = ['number', 'date', 'cvv'];
  private srcImg: string[][] = [
    [
      '',
      'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71',
    ],
    [
      '3',
      'https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg',
    ],
    ['4', 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png'],
    ['5', 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg'],
  ];

  constructor() {
    this.input = new Input();
    this.btn = new Btn();
    this.validation = new Validation();
  }

  addStructure() {
    const main = document.querySelector('.main');

    if (main) {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      main.prepend(modal);

      const modalForm = document.createElement('form');
      modalForm.classList.add('modal__form');
      modal.append(modalForm);

      const modalTitle = document.createElement('h2');
      modalTitle.classList.add('modal__title', 'modal__title--personal');
      modalTitle.textContent = 'Personal details';
      modalForm.append(modalTitle);

      const modalTitleCard = document.createElement('h2');
      modalTitleCard.classList.add('modal__title', 'modal__title--card');
      modalTitleCard.textContent = 'Credit card details';
      modalForm.append(modalTitleCard);

      const modalCardData = document.createElement('div');
      modalCardData.classList.add('modal__card-data');
      modalForm.append(modalCardData);

      const modalImg = document.createElement('img');
      modalImg.classList.add('modal__img');
      modalImg.alt = 'Credit card logo';
      modalImg.src =
        'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71';
      modalCardData.append(modalImg);

      modalForm.append(this.btn.draw('CONFIRM', 'modal__confirm'));
    }
  }

  createPersonalInputs() {
    this.placeholders.forEach((val, i) => {
      const fragment = this.input.create(i !== this.placeholders.length - 1 ? 'text' : 'email', val);
      const personalTitle = document.querySelector('.modal__title--card');
      if (personalTitle) personalTitle.before(fragment);
    });
  }

  createCardInputs() {
    const modalCardData = document.querySelector('.modal__card-data');

    if (modalCardData) {
      this.placeholdersCard.forEach((val) => {
        const fragment = this.input.create('text', val);
        modalCardData.append(fragment);
      });
    }
  }

  closeModal() {
    const modal = document.querySelector('.modal');
    const main = document.querySelector('.main');

    if (modal && main) {
      modal.addEventListener('click', (e) => {
        if (e.target && e.target instanceof HTMLElement && e.target.classList.contains('modal')) {
          e.target.remove();
        }
      });
    }
  }

  cardNumberOnlyDigits() {
    const input = document.querySelector('.modal__input.number');

    if (input && input instanceof HTMLInputElement) {
      input.maxLength = 16;
      input.addEventListener('input', () => {
        if (isNaN(+input.value)) input.value = '';
      });
    }
  }

  cardDateOnlyDigits() {
    const input = document.querySelector('.modal__input.date');

    if (input && input instanceof HTMLInputElement) {
      input.maxLength = 5;
      input.addEventListener('input', () => {
        if (isNaN(+input.value.replace('/', '0'))) input.value = '';
        if (+input.value.slice(0, 2) > 12) input.value = '';
        if (input.value.length === 2) input.value += '/';
      });
    }
  }

  cardCvvOnlyDigits() {
    const input = document.querySelector('.modal__input.cvv');

    if (input && input instanceof HTMLInputElement) {
      input.maxLength = 3;
      input.addEventListener('input', () => {
        if (isNaN(+input.value)) input.value = '';
      });
    }
  }

  confirmValid() {
    const btnConfirm = document.querySelector('.modal__confirm');

    if (btnConfirm) {
      btnConfirm.addEventListener('click', (e) => {
        e.preventDefault();
        this.validation.validate();
      });
    }
  }

  draw() {
    this.addStructure();
    this.createPersonalInputs();
    this.createCardInputs();
    this.closeModal();
    this.confirmValid();
    this.cardNumberOnlyDigits();
    this.cardDateOnlyDigits();
    this.cardCvvOnlyDigits();
  }
}
