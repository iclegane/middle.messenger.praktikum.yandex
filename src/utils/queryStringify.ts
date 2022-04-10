type StringIndexed = Record<string, any>;

export function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== 'object') {
    throw new Error('input must be an object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = data[key];
    const del = index < keys.length - 1 ? '&' : '';

    if (Array.isArray(value)) {
      const dataArray = value.reduce((_acc, el, index) => ({
        ..._acc,
        [`${key}[${index}]`]: el,
      }), {});

      return `${result}${queryStringify(dataArray)}${del}`;
    }

    if (typeof value === 'object') {
      let tempValue: any = {};

      if (value) {
        tempValue = value;
      }

      const dataObject = Object.keys(tempValue).reduce((_acc, el) => ({
        ..._acc,
        [`${key}[${el}]`]: tempValue[el],
      }), {});

      return `${result}${queryStringify(dataObject)}${del}`;
    }

    return `${result}${key}=${value}${del}`;
  }, '');
}
