<template>
    <div class="prev-m-index__category">
        <div class="prev-h2 prev-m-index__title">{{title }}</div>

        <isotope
          :options='options'
          item-selector="prev-m-index__item"
          :list="list"
          ref="isotope"
          class="prev-m-index__items"
          @filter="filterOption=arguments[0]"
          @sort="sortOption=arguments[0]">
          <div v-for="item in list"
            :key="item.id"
            class="gradient-border"
            :class="{'is-flagged' : dependencies.length > 1}"
            :data-name="item.name"
            :data-type="item.type"
            :data-path="item.path"
            :id="item.name">
            <card-item @updated="onCardUpdated" :name="item.name" :type="item.type" :item="item" :facets="facets">
                <span slot="name">{{ item.name }}</span>
            </card-item>
          </div>
        </isotope>

    </div>
</template>

<script>
  import isotope from 'vueisotope';
  import FuzzySet from 'fuzzyset.js'
  import { mapActions, mapState } from 'vuex';

  import facetMixin from '../libs/vue/facetMixin';

  export default {
    components: { isotope },
    mixins: [facetMixin('card-list')],
    props: {
      category: {
        type: String,
      },
      items: {
        type: Array,
        default: () => [],
      },
      title: {
        type: String,
        default: '',
      },
      sortOption: {
        type: String,
        default: 'id',
      }
    },

    data() {
      return {
        masonry: null,
        arr1d: [],
        isMounted: false,
        highestElement: null,
        list: this.items,
        addedItems: [],
        options: {
          getSortData: {
              name: "name",
              id: "id"
          },
          sortBy : "name",
          getFilterData: {
            "show all": function(el) {
              return true;
            },
            "search": (el) => {
              let fuzzySet = FuzzySet(),
                  fuzzyCheck;

              fuzzySet.add(this.search);
              fuzzyCheck = fuzzySet.get(el.name);

              if(!fuzzyCheck) {
                return el.name.includes(this.search)
              }

              if(fuzzyCheck[0][0]>0.2) {
                return true;
              }

              return false;
            },
            "dependencies": (el) => {
              if(this.arr1d.includes(el.path)) {
                return true
              }

              return false;
            },
          }
        }
      };
    },

    computed: {
      ...mapState('filter-list', ['search']),
      ...mapState('filter-list', ['dependencies']),
      ...mapState('filter-list', ['registeredLayouts']),
    },

    methods: {
      ...mapActions('filter-list', ['setListLayoutReady']),

      onCardUpdated() {
        this.$nextTick(() => {
            if(this.$refs.isotope) this.$refs.isotope.arrange();
        });
      },
      onLayoutReady() {
        // register layout state as ready
        var arr = this.registeredLayouts.slice(0);
        arr.push(this.title);
        this.setListLayoutReady({ registeredLayouts: arr });
      }
    },

    watch: {
      search() {
        this.$refs.isotope.filter('search');
      },
      dependencies() {
        let mapArr = this.dependencies.map(dep => ( [ dep.name, dep.parent ] )) ;
        this.arr1d = [].concat(...mapArr);

        if(this.arr1d.length<1) {
          this.$refs.isotope.filter('show all');
          return;
        }

        this.$refs.isotope.iso.once('layoutComplete', ()=>{
          this.onLayoutReady();
        });

        this.$refs.isotope.filter('dependencies');
      },
    },
  };
</script>
