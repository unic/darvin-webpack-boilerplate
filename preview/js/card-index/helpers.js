export function filterCategories(items, filterArr) {
  let filteredObj = {};

  filterArr.forEach((filter) => {
    filteredObj[filter] = items[filter].slice(0);
  });

  return filteredObj;
}
