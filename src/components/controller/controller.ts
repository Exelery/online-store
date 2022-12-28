import Router from '../../router/router';

export default class AppController {
  router: Router;
  constructor() {
    this.router = new Router();
  }
  appRouter(e: Event) {
    if (e.target instanceof HTMLElement) {
      const item = e.target.closest('.item');
      console.log('controller', item);
      this.router.navigate('item');
    }
  }
}
