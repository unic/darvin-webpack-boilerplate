let darkmode = false;

if (localStorage.getItem("darvin-darkmode")) {
  if (localStorage.getItem("darvin-darkmode") == 'true') {
    darkmode = true;
  }
}

export default {
  filters: [],

  selectedFilter: [],

  search: '',

  activity: {},

  isMobileVisible: false,

  darkmode: darkmode,

  dependencies: [],

  registeredLayouts: [],
}
