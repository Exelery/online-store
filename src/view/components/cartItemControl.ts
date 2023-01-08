import { IProductCount } from '../../utils/types';

export default class CartItemControl {
  draw(data: IProductCount, fragment: DocumentFragment) {
    const cartItem = fragment.querySelector('.item');

    if (cartItem) {
      const itemControl = document.createElement('div');
      itemControl.classList.add('item__control');
      cartItem.append(itemControl);

      const itemDec = document.createElement('button');
      itemDec.classList.add('item__dec', 'btn');
      itemDec.dataset.id = data.id.toString();
      itemDec.textContent = '\u{2013}';
      itemControl.append(itemDec);

      const itemCount = document.createElement('span');
      itemCount.classList.add('item__count');
      itemCount.textContent = data.count.toString();
      itemControl.append(itemCount);

      const itemInc = document.createElement('button');
      itemInc.classList.add('item__inc', 'btn');
      itemInc.dataset.id = data.id.toString();
      itemInc.textContent = '+';
      itemControl.append(itemInc);
    }
  }
}
