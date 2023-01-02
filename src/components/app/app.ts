// import Item from '../../view/item/item';
import Model from '../model/model';
import AppController from '../controller/controller';
export default class App {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // private view: Item;
  private model: Model;
  private controller: AppController;

  constructor() {
    // this.view = new Item();
    // this.model = new Model();
    this.controller = new AppController();
  }

  public async start() {
    // await this.model.loadData();
    // const data = this.model.productsAll;
    // this.view.draw(data);
    // const content = document.querySelector('main-page__content') as Element;
  }
}
