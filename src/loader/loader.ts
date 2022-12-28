const pathApi = 'https://dummyjson.com/products?limit=40';

export class ApiLoader {
  constructor(private path: string = pathApi) {}

  public async api<T>(): Promise<T> {
    return fetch(this.path).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
}
