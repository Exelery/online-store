// import {} from '../../utils/types';
import Model from '../model/model';
export default class App {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private view: any;
  private model: Model;

  constructor() {
    this.model = new Model();
  }

  public start() {
    this.model.loadData();
    // const content = document.querySelector('main-page__content') as Element;
  }
}
