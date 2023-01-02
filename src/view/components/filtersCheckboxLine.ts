export default class FiltersCheckboxLine {
  createItem(data: [string, number]) {
    const filtersItem = document.createElement('li');
    filtersItem.classList.add('filters__item');

    const input = document.createElement('input');
    input.id = data[0];
    input.type = 'checkbox';
    filtersItem.append(input);

    const label = document.createElement('label');
    label.setAttribute('for', input.id);
    label.textContent = input.id;
    filtersItem.append(label);

    const span = document.createElement('span');
    span.textContent = `${data[1]}/${data[1]}`;
    filtersItem.append(span);

    return filtersItem;
  }
}
