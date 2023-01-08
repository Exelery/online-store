import { IProductCount } from '../../utils/types';

export default class CartTotal {
  create(data: IProductCount[]) {
    const cartInner = document.querySelector('.cart__inner');

    if (cartInner) {
      const cartTotal = document.createElement('div');
      cartTotal.classList.add('cart__total', 'total');
      cartInner.append(cartTotal);

      const totalTitle = document.createElement('h2');
      totalTitle.classList.add('total__title');
      totalTitle.textContent = 'Total';
      cartTotal.append(totalTitle);

      const totalPrice = document.createElement('div');
      totalPrice.classList.add('total__price');
      totalPrice.textContent = `$ ${data.reduce((acc, val) => (acc += val.price), 0)}`;
      cartTotal.append(totalPrice);

      const totalCountText = document.createElement('div');
      totalCountText.classList.add('total__count-text');
      totalCountText.textContent = 'Products: ';
      cartTotal.append(totalCountText);

      const totalCount = document.createElement('span');
      totalCount.classList.add('total__count');
      totalCount.textContent = `${data.length}`;
      totalCountText.append(totalCount);

      const totalInput = document.createElement('input');
      totalInput.classList.add('total__input');
      totalInput.type = 'text';
      totalInput.placeholder = 'Enter promo code';
      cartTotal.append(totalInput);

      const totalTestPromo = document.createElement('p');
      totalTestPromo.classList.add('total__text-promo');
      totalTestPromo.textContent = "Promo for test: 'RSS', 'EPM'";
      cartTotal.append(totalTestPromo);

      const totalCheckout = document.createElement('button');
      totalCheckout.classList.add('total__checkout', 'btn');
      totalCheckout.textContent = 'CHECKOUT';
      cartTotal.append(totalCheckout);
    }
  }

  checkPromo() {
    const input = document.querySelector('.total__input');

    if (input && input instanceof HTMLInputElement) {
      input.addEventListener('input', () => {
        if (
          (input.value === 'RSS' && !input.classList.contains('RSS')) ||
          (input.value === 'EPM' && !input.classList.contains('EPM'))
        ) {
          const totalPromo = document.createElement('div');
          totalPromo.classList.add('total__promo');
          totalPromo.textContent = `"${input.value}" - 10% discount`;
          input.after(totalPromo);

          const totalApplyPromo = document.createElement('button');
          totalApplyPromo.classList.add('total__add-promo', 'apply', 'btn');
          totalApplyPromo.textContent = 'APPLY';
          totalPromo.append(totalApplyPromo);
        } else if (input.nextElementSibling?.classList.contains('total__promo')) {
          input.nextElementSibling.remove();
        }
      });
    }
  }

  addRemovePromo() {
    const cartTotal = document.querySelector('.cart__total');
    const input: HTMLInputElement | null = document.querySelector('.total__input');

    if (cartTotal && input) {
      cartTotal.addEventListener('click', (e: Event) => {
        if (e.target && e.target instanceof HTMLButtonElement) {
          if (e.target.classList.contains('apply')) {
            const currentPromo = e.target.parentElement;
            const clone = currentPromo?.cloneNode(true);
            if (clone && clone.lastChild && clone.lastChild instanceof HTMLButtonElement) {
              clone.lastChild.classList.remove('apply');
              clone.lastChild.classList.add('drop');
              clone.lastChild.textContent = 'DROP';
              currentPromo?.remove();
              input.classList.add(input.value);
              input.value = '';
              input.before(clone);
              this.addNewPrice();
            }
          } else if (e.target.classList.contains('drop')) {
            const classToRemove = e.target.previousSibling?.textContent?.slice(1, 4);
            if (classToRemove) input.classList.remove(classToRemove);
            e.target.parentElement?.remove();
            this.removePrice();
          }
        }
      });
    }
  }

  addNewPrice() {
    const price = document.getElementsByClassName('total__price');

    if (price) {
      const lastPrice = price[price.length - 1];
      const clone = lastPrice.cloneNode(true);
      console.log(lastPrice);
      if (clone.textContent) {
        const priceValue = clone.textContent.slice(clone.textContent.indexOf(' '));
        lastPrice.classList.add('old');
        clone.textContent = `$ ${(+priceValue * 0.9).toFixed(2)}`;
        lastPrice.after(clone);
      }
    }
  }

  removePrice() {
    const price = document.getElementsByClassName('total__price');

    if (price) {
      price[price.length - 2].classList.remove('old');
      price[price.length - 1].remove();
    }
  }

  draw(data: IProductCount[]) {
    this.create(data);
    this.checkPromo();
    this.addRemovePromo();
  }
}
