import PageError from '../view/404/404';

// const router = (event: Event) => {
//   event = event || window.event;
//   event.preventDefault();
//   const target = event.target as HTMLAnchorElement;
//   window.history.pushState({}, '', target.href);
// };

// // пока не знаю что где
// const routes = {
//   404: 'component/pages/404.html',
//   '/': '/index.html',
//   '/count': 'component/count/count.html',
//   '/product': 'component/product/product.html',
// };

// const handleLocation = async () => {
//   const path = window.location.pathname;
//   const route = routes[path as keyof typeof routes] || routes[404];
//   const html = await fetch(route).then((data) => data.text());
//   // document.getElementById('main-page')?.innerHTML = html;
// };

// window.onpopstate = handleLocation;
// // window.route = route

// type IRouteCB = (arr: object | undefined, match: RegExpMatchArray | null | undefined) => void;
type IDrawCB = () => void;

export default class Router {
  pageError: PageError;
  routes: { [key: string]: IDrawCB };
  root = '/';
  current = '';
  intervalControl: ReturnType<typeof setInterval>;
  constructor() {
    this.pageError = new PageError();
    this.routes = { none: this.pageError.draw };
    this.listen();
  }

  // add(path: string, cb: () => void) {
  //   this.routes.push({
  //     path,
  //     cb,
  //   });
  //   return this;
  // }

  listen() {
    console.log(this.clearSlashes(decodeURI(window.location.pathname + window.location.search)));
    // window.addEventListener('popstate', () => {
    //   this.changePage();
    // });
    this.checkUrl();

    window.onpopstate = (event) => {
      console.log('location: ' + document.location + ', state: ' + JSON.stringify(event.state));
      this.checkUrl();
    };
  }

  changePage() {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();
    console.log('current', this.current);
    if (this.routes[this.current]) {
      this.routes[this.current]();
    }
    // this.routes.some((route) => {
    //   const match = this.current.match(route.path);

    //   if (match) {
    //     match.shift();
    //     //      route.cb.apply({}, match);
    //     return match;
    //   }
    //   return false;
    // });
  }

  checkUrl() {
    this.changePage();
  }

  // remove(path: string) {
  //   for (let i = 0; i < this.routes.length; i += 1) {
  //     if (this.routes[i].path === path) {
  //       this.routes.slice(i, 1);
  //       return this;
  //     }
  //   }
  //   return this;
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

  // flush() {
  //   this.routes = [];
  //   return this;
  // }
}
