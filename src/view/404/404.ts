export default class PageError {
  draw() {
    const container = document.querySelector('.main') as Element;
    container.innerHTML = 'page not found';
    console.log('error', container);
  }
}
