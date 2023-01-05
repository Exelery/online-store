export default class DualSliderFilter {
  minValue: number;
  maxValue: number;

  create(name: string, arr: number[]) {
    const filters = document.querySelector('.filters.products__filter');

    if (filters !== null) {
      const filtersBlock = document.createElement('div');
      filtersBlock.classList.add('filters__block', 'wrapper', name.toLowerCase());
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
      filtersLower.id = `range1-${name}`;
      filtersLower.textContent = '';
      filtersRange.prepend(filtersLower);

      const filtersUpper = document.createElement('span');
      filtersUpper.classList.add('filters__lower');
      filtersUpper.id = `range2-${name}`;
      filtersUpper.textContent = '';
      filtersRange.append(filtersUpper);

      const filtersDualRange = document.createElement('div');
      filtersDualRange.classList.add('filters__dual-range');
      filtersBlock.append(filtersDualRange);

      const sliderTrack = document.createElement('div');
      sliderTrack.classList.add('slider-track', `${name}`);
      filtersDualRange.append(sliderTrack);

      const filtersLowerRange = document.createElement('input');
      filtersLowerRange.classList.add('filters__lower-range');
      filtersLowerRange.type = 'range';
      filtersLowerRange.min = `${arr[0]}`;
      filtersLowerRange.max = `${arr[1]}`;
      filtersLowerRange.value = `${arr[0]}`;
      filtersLowerRange.id = `slider1-${name}`;
      filtersDualRange.append(filtersLowerRange);

      const filtersUpperRange = document.createElement('input');
      filtersUpperRange.classList.add('filters__upper-range');
      filtersUpperRange.type = 'range';
      filtersUpperRange.min = `${arr[0]}`;
      filtersUpperRange.max = `${arr[1]}`;
      filtersUpperRange.value = `${arr[1]}`;
      filtersUpperRange.id = `slider2-${name}`;
      filtersDualRange.append(filtersUpperRange);
    }
  }

  control(name: string, currency = '') {
    const sliderOne = document.getElementById(`slider1-${name}`) as HTMLInputElement;
    const sliderTwo = document.getElementById(`slider2-${name}`) as HTMLInputElement;
    const displayValOne = document.getElementById(`range1-${name}`) as HTMLSpanElement;
    const displayValTwo = document.getElementById(`range2-${name}`) as HTMLSpanElement;
    const sliderTrack = document.querySelector(`.slider-track.${name}`) as HTMLDivElement;
    const sliderMaxValue = sliderOne.max;
    const minGap = 0;

    sliderOne.addEventListener('input', slideOne);
    sliderTwo.addEventListener('input', slideTwo);

    function slideOne() {
      if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = (parseInt(sliderTwo.value) - minGap).toString();
      }
      displayValOne.textContent = `${currency} ${sliderOne.value}`;
      fillColor();
      // console.log(parseInt(sliderOne.value));
    }
    function slideTwo() {
      if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = (parseInt(sliderOne.value) + minGap).toString();
      }
      displayValTwo.textContent = `${currency} ${sliderTwo.value}`;
      fillColor();
      // console.log(parseInt(sliderTwo.value));
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
