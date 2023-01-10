const pathApi = 'https://dummyjson.com/products?limit=40';

export class ApiLoader {
  constructor(private path: string = pathApi) {}

  public async api<T>(): Promise<T> {
    const response = await fetch(this.path);
    const data: T = await response.json();
    return data;
  }
}
