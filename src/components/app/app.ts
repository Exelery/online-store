import AppController from '../controller/controller';
export default class App {
  controller: AppController;

  constructor() {
    this.controller = new AppController();
  }

  public async start() {
    this.controller.start();
  }
}
