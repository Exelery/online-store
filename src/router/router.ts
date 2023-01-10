import PageError from '../view/404/404';
import AppController from '../components/controller/controller';

type IDrawCB = () => void;

export default class Router {
  controller: AppController;
  pageError: PageError;
  routes: { [key: string]: IDrawCB };
  root = '/';
  constructor(control: AppController) {
    this.controller = control;
    this.pageError = new PageError();
  }

  listen() {
    const path = this.clearSlashes(decodeURI(window.location.pathname));
    this.controller.loadPage(path);

    window.onpopstate = (event) => {
      console.log('location: ' + document.location + ', state: ' + JSON.stringify(event.state));
      const path = this.clearSlashes(decodeURI(window.location.pathname));
      this.controller.loadPage(path);
    };
  }

  clearSlashes(path: string) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  navigate = (path = '') => {
    window.history.pushState(null, '', this.root + this.clearSlashes(path));
    const popStateEvent = new PopStateEvent('popstate', { state: 'test' });
    dispatchEvent(popStateEvent);
    return this;
  };
}
