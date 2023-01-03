import { IProduct } from '../../utils/types';

export default class BreadCrumbs {
  draw(data: IProduct) {
    const container = document.querySelector('.container');

    if (container !== null) {
      const breadCrumbs = document.createElement('div');
      breadCrumbs.classList.add('breadcrumbs');
      container.append(breadCrumbs);

      const points = ['store', data.category, data.brand, data.title];

      points.forEach((val, i) => {
        const span = document.createElement('span');
        span.classList.add('breadcrumbs__item');
        span.textContent = val.toUpperCase();
        breadCrumbs.append(span);

        if ((i !== points.length - 1)) {
          const spanSeparator = document.createElement('span');
          spanSeparator.classList.add('breadcrumbs__separator');
          spanSeparator.textContent = '>>';
          breadCrumbs.append(spanSeparator);
        }
      });
    }
  }
}
