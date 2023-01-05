export default class PageError {
  draw() {
    const main = document.querySelector('.main') as Element;
    main.innerHTML = 'page not found';
    console.log('error', main);
  }
}
