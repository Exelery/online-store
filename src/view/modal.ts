import ConfirmInput from './components/confirmInput';

export default class Modal {
  confirmInput: ConfirmInput;

  constructor() {
    this.confirmInput = new ConfirmInput();
  }

  addStructure() {
    const main = document.querySelector('.main');

    if (main) {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      main.prepend(modal);

      const modalInner = document.createElement('div');
      modalInner.classList.add('modal__inner');
      modal.append(modalInner);

      const modalTitle = document.createElement('h2');
      modalTitle.classList.add('modal__title');
      modalTitle.textContent = 'Personal details';
      modalInner.append(modalTitle);
    }
  }

  draw() {
    this.addStructure();
  }
}
