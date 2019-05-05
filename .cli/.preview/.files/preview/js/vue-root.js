import Vue from 'vue';
import Vuex from 'vuex';
import store from '@js/vuex';

// Components
import CardList from '@js/card-list/card-list';
import CardItem from '@js/card-list/card-item/card-item';
import CardIndex from '@js/card-index/card-index';
import FilterView from '@js/card-filter/card-filter';

Vue.use(Vuex);

Vue.component('card-list', CardList);
Vue.component('card-item', CardItem);
Vue.component('card-index', CardIndex);
Vue.component('card-filter', FilterView);

export default {
    init() {
        if (document.querySelector('.preview--index #prev-l-pagewrapper')) {
            const AppRoot = new Vue({
                comments: true,
                store: store(),
            });

            AppRoot.$mount('#prev-l-pagewrapper');
        }
    }
};
