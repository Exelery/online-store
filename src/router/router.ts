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

type IRouteCB = (arr: object | undefined, match: RegExpMatchArray | null | undefined) => void;

export default class Router {
  routes: { path: string; cb: IRouteCB }[] = [];
  root = '/';
  current = '';
  intervalControl: ReturnType<typeof setInterval>;
  constructor() {
    this.listen();
  }

  add(path: string, cb: () => void) {
    this.routes.push({
      path,
      cb,
    });
    return this;
  }

  listen() {
    console.log('test');
    window.addEventListener('popstate', () => {
      this.changePage();
    });
  }

  changePage() {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some((route) => {
      const match = this.current.match(route.path);

      if (match) {
        match.shift();
        //      route.cb.apply({}, match);
        return match;
      }
      return false;
    });
  }

  remove(path: string) {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  }

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
    return this;
  };

  flush() {
    this.routes = [];
    return this;
  }
}
