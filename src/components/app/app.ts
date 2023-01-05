import AppController from '../controller/controller';
export default class App {
  private controller: AppController;

  constructor() {
    this.controller = new AppController();
  }

  public async start() {
    this.controller.start();
  }
}
