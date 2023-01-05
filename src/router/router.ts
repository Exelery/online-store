import PageError from '../view/404/404';
import AppController from '../components/controller/controller';

type IDrawCB = () => void;

export default class Router {
  controller: AppController;
  pageError: PageError;
  routes: { [key: string]: IDrawCB };
  root = '/';
  current = '';
  constructor(control: AppController) {
    this.controller = control;
    this.pageError = new PageError();
    this.listen();
  }

  listen() {
    // console.log('test', this.clearSlashes(decodeURI(window.location.pathname)));
    const path = this.clearSlashes(decodeURI(window.location.pathname));
    // console.log('path', path);
    this.controller.loadPage(path);

    window.onpopstate = (event) => {
      console.log('location: ' + document.location + ', state: ' + JSON.stringify(event.state));
      const path = this.clearSlashes(decodeURI(window.location.pathname));
      // console.log('path', path);
      this.controller.loadPage(path);
    };
  }

  // changePage() {
  //   if (this.current === this.getFragment()) return;
  //   this.current = this.getFragment();
  //   console.log('current', this.current);
  //   if (this.routes[this.current]) {
  //     this.routes[this.current]();
  //   }
  // this.routes.some((route) => {
  //   const match = this.current.match(route.path);

  //   if (match) {
  //     match.shift();
  //     //      route.cb.apply({}, match);
  //     return match;
  //   }
  //   return false;
  // });
  // }

  clearSlashes(path: string) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  getFragment() {
    let fragment: string;

    fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
    fragment = fragment.replace(/\?(.*)$/, '');
    fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;

    return this.clearSlashes(fragment);
  }

  navigate = (path = '') => {
    window.history.pushState(null, '', this.root + this.clearSlashes(path));
    const popStateEvent = new PopStateEvent('popstate', { state: 'test' });
    dispatchEvent(popStateEvent);
    return this;
  };
}
