export default class Input {
  create(type: string, placeholder: string) {
    const fragment = document.createDocumentFragment();

    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal__wrapper');
    fragment.append(modalWrapper);

    const modalInput = document.createElement('input');
    modalInput.classList.add('modal__input', placeholder);
    modalInput.type = type;
    modalInput.placeholder = placeholder;
    modalWrapper.append(modalInput);

    return fragment;
  }
}
