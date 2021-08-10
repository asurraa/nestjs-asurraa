export function omit(obj: Object, path: Array<string>) {
  if (obj === undefined) return {};

  for (const p of path) {
    Object.keys(obj).map((key) => {
      if (p === key) {
        delete obj[key];
      }
    });
  }

  return obj;
}
