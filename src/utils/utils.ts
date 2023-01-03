// import { IFilter } from './types';

// export function transformToURLParams(filters: IFilter): string {
//   const params = new URLSearchParams(filters);

//   return params.toString();
// }

// export function parseQuery(queryString: string) {
//   const query = new URLSearchParams(queryString);
//   const pairs = (queryString[0] === '?' ? queryString.slice(1) : queryString).split('&');
//   for (let i = 0; i < pairs.length; i++) {
//     const pair = pairs[i].split('=');
//     query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
//   }
//   return query;
// }
