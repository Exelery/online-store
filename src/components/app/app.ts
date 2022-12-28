// import {} from '../../utils/types';
import Model from '../model/model';
import AppController from '../controller/controller';
export default class App {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private view: any;
  private model: Model;
  private controller: AppController;

  constructor() {
    this.model = new Model();
    this.controller = new AppController();
  }

  public start() {
    this.model.loadData();
    const productsContaner = document.querySelector('.products__items') as Element;
    productsContaner.addEventListener('click', (e: Event) => {
      if (e.target instanceof HTMLElement) {
        this.controller.appRouter(e);
      }
    });

    // const content = document.querySelector('main-page__content') as Element;
  }
}
