import { IData } from '../utils/types';

const pathApi = 'https://dummyjson.com/products?limit=40';

export class ApiLoader {
  constructor(private path: string = pathApi) {}

  public async api(): Promise<IData> {
    const response = await fetch(this.path);
    const data: IData = await response.json();
    // return fetch(this.path).then((response) => {
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   return response.json();
    // });
    return data;
  }
}
