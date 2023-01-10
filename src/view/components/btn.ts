export default class Btn {
  draw(btnText: string, className: string) {
    const btn = document.createElement('button');
    btn.textContent = btnText;
    btn.classList.add('btn', className);

    return btn;
  }
}
