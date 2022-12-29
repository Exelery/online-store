export function transformToURLParams<T extends object>(filters: T): string {
  const query = Object.entries(filters)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join('&');

  return `?${query}`;
}
