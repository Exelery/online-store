import Item from '../../view/item/item';
import Model from '../model/model';
import AppController from '../controller/controller';
export default class App {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private view: Item;
  private model: Model;
  private controller: AppController;

  constructor() {
    this.view = new Item();
    this.model = new Model();
    this.controller = new AppController();
  }

  public async start() {
    await this.model.loadData();
    const data = this.model.productsAll;
    console.log(data);
    this.view.draw(data);
    const productsContaner = document.querySelector('.products__items');
    const logo = document.querySelector('.header__title') as Element;

    if (productsContaner) {
      productsContaner.addEventListener('click', (e: Event) => {
        if (e.target instanceof HTMLElement) {
          const item = e.target.closest('.item');
          if (item) {
            this.controller.appRouter(e, 'product/n');
          }
        }
      });
    }

    logo.addEventListener('click', (e: Event) => {
      if (e.target instanceof HTMLElement) {
        this.controller.appRouter(e, '/');
      }
    });

    // const content = document.querySelector('main-page__content') as Element;
  }
}
