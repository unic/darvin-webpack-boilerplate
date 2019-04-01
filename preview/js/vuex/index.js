import Vuex from 'vuex';
import filterListModule from './filter-list';


export default function () {
  return new Vuex.Store({
    modules: {
      'filter-list': filterListModule,
    }
  });
}
