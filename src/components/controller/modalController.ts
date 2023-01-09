import AppController from './controller';

export default class ModalController {
  controller: AppController;

  constructor(controller: AppController) {
    this.controller = controller;
  }

  listen() {
    window.addEventListener('drawModal', () => {
      const confirmBtn = document.querySelector('.modal__confirm');
      const modalForm = document.querySelector('.modal__form');
      if (confirmBtn && modalForm) {
        confirmBtn.addEventListener('click', (e) => {
          const errors = modalForm.querySelectorAll('.err');
          console.log(errors, errors.length);
          if (errors.length === 0) {
            localStorage.clear();
            confirmBtn.textContent = 'Congratulations! You did it!!';
            setTimeout(() => {
              this.controller.updateCart();
              this.controller.appRouter(e, '/');
            }, 3000);
          }
        });
      }
    });
  }
}
