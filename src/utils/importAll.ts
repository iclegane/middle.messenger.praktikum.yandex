export function importAll(r: __WebpackModuleApi.RequireContext) {
  const cache: Record<string, any> = {};

  r.keys().forEach((key: string) => (cache[key] = r(key)));

  return cache;
}
