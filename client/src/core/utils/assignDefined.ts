// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const assignDefined = (a: any, b: any): any =>
  Object.keys(b).reduce((result, key) => {
    if (typeof b[key] !== 'undefined') {
      return {
        ...result,
        [key]: b[key],
      };
    }
    return result;
  }, a);

export default assignDefined;
