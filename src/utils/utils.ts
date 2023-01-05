import { IProduct } from './types';

export function getList(
  data: IProduct[],
  allData: IProduct[],
  type: 'brand' | 'category'
): { [key: string]: [number, number] } {
  const list: { [key: string]: [number, number] } = {};
  allData.forEach((el) => {
    if (el[type] in list) {
      list[el[type]][1] += 1;
    } else {
      list[el[type]] = [0, 1];
    }
  });
  data.forEach((val) => {
    if (val[type] in list) {
      list[val[type]][0] += 1;
    }
  });

  return list;
}
