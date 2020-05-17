const search = (needle, haystack, found = []) => {
  Object.keys(haystack).forEach((key) => {
    if(haystack[key] === needle){
      found.push(haystack.value);
      return found;
    }
    if(typeof haystack[key] === 'object'){
      search(needle, haystack[key], found);
    }
  });
  return found;
};

module.exports = {
  search: search
};
