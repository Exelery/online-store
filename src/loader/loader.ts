// npx ts-node src/loader/loader.ts

import { IData } from './../utils/types';

const path = 'https://dummyjson.com/products?limit=40';

class ApiLoader {
  constructor(private path: string) {}

  async api<T>(): Promise<T> {
    return fetch(this.path).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
}

// обработка данных
const loader = new ApiLoader(path);
loader.api<IData>().then((response) => console.log(response));
