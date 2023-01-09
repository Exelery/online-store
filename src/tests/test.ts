// // import App from '../components/app/app';
// import Model from '../components/model/model';
// import { ApiLoader } from '../loader/loader';
// import { IData } from '../utils/types';
// import
// // import fetch, { Response } from 'node-fetch';

// interface IJsonResponse {
//   data: {
//     newAccessToken: string | undefined;
//   };
// }
// interface IResponse {
//   json: () => IJsonResponse;
// }

// let mockTokenFromAPI: string | undefined;

// jest.mock(`node-fetch`, () => {
//   const generateResponse = (): IResponse => {
//     return {
//       json: (): IJsonResponse => ({
//         data: { newAccessToken: mockTokenFromAPI },
//       }),
//     };
//   };

//   return jest.fn().mockResolvedValue(generateResponse());
// });

// // const app = new App();
// const model = new Model();
// const apiLoader = new ApiLoader();

// // let data:
// beforeAll(async () => {
//   const dataJson: IData = await apiLoader.api();
//   console.log(dataJson);
// });

// test('My first test', () => {
//   console.log(model.productsAll);
// });
