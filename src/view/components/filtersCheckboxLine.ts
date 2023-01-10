export default class FiltersCheckboxLine {
  createItem(data: [string, [number, number]], category: string[]) {
    const filtersItem = document.createElement('li');
    filtersItem.classList.add('filters__item');

    const input = document.createElement('input');
    input.id = data[0];
    input.type = 'checkbox';
    if (category.includes(data[0])) {
      input.checked = true;
    }
    filtersItem.append(input);

    const label = document.createElement('label');
    label.setAttribute('for', input.id);
    label.textContent = input.id;
    filtersItem.append(label);

    const span = document.createElement('span');
    const actualCount = document.createElement('span');
    const allCount = document.createElement('span');
    actualCount.classList.add('actual');
    actualCount.textContent = `${data[1][0]}`;
    allCount.textContent = `/ ${data[1][1]}`;
    span.append(actualCount);
    span.append(allCount);
    // span.textContent = ``;
    filtersItem.append(span);

    return filtersItem;
  }
}
