export default class DualSliderFilter {
  create(name: string, arr: number[]) {
    const filters = document.querySelector('.filters.products__filter');

    if (filters !== null) {
      const filtersBlock = document.createElement('div');
      filtersBlock.classList.add('filters__block', 'wrapper');
      filters.append(filtersBlock);

      const filtersName = document.createElement('h3');
      filtersName.classList.add('filters__name');
      filtersName.textContent = name;
      filtersBlock.append(filtersName);

      const filtersRange = document.createElement('div');
      filtersRange.classList.add('filters__range', 'values');
      filtersBlock.append(filtersRange);

      const filtersLower = document.createElement('span');
      filtersLower.classList.add('filters__lower');
      filtersLower.id = 'range1';
      filtersLower.textContent = '';
      filtersRange.prepend(filtersLower);

      const filtersUpper = document.createElement('span');
      filtersUpper.classList.add('filters__lower');
      filtersUpper.id = 'range2';
      filtersUpper.textContent = '';
      filtersRange.append(filtersUpper);

      const filtersDualRange = document.createElement('div');
      filtersDualRange.classList.add('filters__dual-range');
      filtersBlock.append(filtersDualRange);

      const sliderTrack = document.createElement('div');
      sliderTrack.classList.add('slider-track');
      filtersDualRange.append(sliderTrack);

      const filtersLowerRange = document.createElement('input');
      filtersLowerRange.classList.add('filters__lower-range');
      filtersLowerRange.type = 'range';
      filtersLowerRange.min = `${arr[0]}`;
      filtersLowerRange.max = `${arr[1]}`;
      filtersLowerRange.value = `${arr[0]}`;
      filtersLowerRange.id = 'slider-1';
      filtersDualRange.append(filtersLowerRange);

      const filtersUpperRange = document.createElement('input');
      filtersUpperRange.classList.add('filters__upper-range');
      filtersUpperRange.type = 'range';
      filtersUpperRange.min = `${arr[0]}`;
      filtersUpperRange.max = `${arr[1]}`;
      filtersUpperRange.value = `${arr[1]}`;
      filtersUpperRange.id = 'slider-2';
      filtersDualRange.append(filtersUpperRange);
    }
  }

  control() {
    const sliderOne = document.getElementById('slider-1') as HTMLInputElement;
    const sliderTwo = document.getElementById('slider-2') as HTMLInputElement;
    const displayValOne = document.getElementById('range1') as HTMLSpanElement;
    const displayValTwo = document.getElementById('range2') as HTMLSpanElement;
    const sliderTrack = document.querySelector('.slider-track') as HTMLDivElement;
    const sliderMaxValue = sliderOne.max;
    const minGap = 1;

    sliderOne.addEventListener('input', slideOne);
    sliderTwo.addEventListener('input', slideTwo);

    function slideOne() {
      if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = (parseInt(sliderTwo.value) - minGap).toString();
      }
      displayValOne.textContent = sliderOne.value;
      fillColor();
    }
    function slideTwo() {
      if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = (parseInt(sliderOne.value) + minGap).toString();
      }
      displayValTwo.textContent = sliderTwo.value;
      fillColor();
    }
    function fillColor() {
      const percent1 = (+sliderOne.value / +sliderMaxValue) * 100;
      const percent2 = (+sliderTwo.value / +sliderMaxValue) * 100;
      sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
    }

    slideOne();
    slideTwo();
  }
}
