<template>
    <div class="card-index prev-m-index" :class="['prev-m-index__index--' + layoutCounter, rootClasses]">

        <template v-for="(filteredCategory, name) in filteredCategories" >
          <div class="prev-m-index__col" :class="['prev-m-index__col--' + name]" :key="name">
            <card-list class="prev-m-index__category" :facets="facets" :key="name" :title="name" :items="filteredCategory" v-if="dataReady"/>
          </div>
        </template>
    </div>
</template>


<script>

  import { mapActions, mapState } from 'vuex';
  import axios from 'axios';
  import facetMixin from '../libs/vue/facetMixin';
  import { filterCategories } from './helpers';
  import { LeaderLine } from "../libs/leader-line";

  let leaderline = LeaderLine(),
      bodyStyle = getComputedStyle(document.body);

  export default {
      mixins: [facetMixin('card-index')],
      props: {},
      data() {
        return {
          dataReady: false,
          items: {},
          categories: [],
          layoutCounter: 0,
          activity: {},
          dependencyPaths: []
        };
      },
      computed: {
        ...mapState('filter-list', ['selectedFilter']),
        ...mapState('filter-list', ['darkmode']),
        ...mapState('filter-list', ['registeredLayouts']),
        ...mapState('filter-list', ['dependencies']),

        filteredCategories() {
          if (!this.dataReady) {
              return null;
          }

          let filteredCategories = filterCategories(this.items, this.selectedFilter);

          this.$children.forEach((child) => {
            this.$nextTick(function() {
              child.onCardUpdated();
            });
          });

          this.layoutCounter = Object.keys(filteredCategories).length;

          return this.ksort(filteredCategories);
        },
      },
      methods: {
        ...mapActions('filter-list', ['setFilters', 'setSelectedFilter']),
        ...mapActions('filter-list', ['setSearch']),
        ...mapActions('filter-list', ['setActivity']),
        ...mapActions('filter-list', ['setListLayoutReady']),

        ksort( src ) {
          const keys = Object.keys( src );
          keys.sort();
          return keys.reduce(( target, key ) => {
                target[ key ] = src[ key ];
                return target;
          }, {});
        },

        initDependencyPaths() {
          window.addEventListener("resize", () => {
            /*this.dependencyPaths.forEach((line) => {
              line.position();
            });*/
          });

          this.dependencies.forEach((dependency) => {
            this.$nextTick(() => {
              this.createDependencyPath(dependency.parent, dependency.name);
            });
          });
        },

        removeDependencyPaths() {
          this.dependencyPaths.forEach((line) => {
            line.remove();
          });
          this.dependencyPaths = [];
        },

        updateDependencyPaths() {
          this.dependencyPaths.forEach((line) => {
            line.position();
          });
        },

        createDependencyPath(source, target) {
          source = document.querySelector('.prev-m-index__item[data-path="' + source + '"]');
          target = document.querySelector('.prev-m-index__item[data-path="' + target + '"]');

          if(!source) {
            console.error("no source " + source);
            return;
          }

          if(!target) {
            console.error("no target " + target);
            return;
          }

          this.dependencyPaths.push(new leaderline(
            source,
            target,
            {color: bodyStyle.getPropertyValue("--dependency-stroke"), size: 1.5, endPlugSize: 2,  path: 'arc', startSocket: 'bottom', endSocket: 'bottom' }
          ));

        },

        payload() {
          let data = window.darvinPayload;

          this.items = {};
          this.categories = Object.keys(data);

          // map categorys to array
          this.categories.forEach((category) => {
            this.items[category] = Object.keys(data[category]).map((k) => data[category][k]);
          });

          // set filter
          this.setFilters({ filters: this.categories });
          this.setSelectedFilter({ filter: this.categories });

          // set search
          this.setSearch({ search: ''});

          axios.get('./assets/log/activity-visualizer.json')
            .then((response) => {
                this.setActivity({ activity: response.data});
                this.dataReady = true;
                document.body.classList.add('is-loaded');
            })
            .catch((err) => {
              this.dataReady = true;
              document.body.classList.add('is-loaded');
            });
        }
      },
      watch: {
        darkmode() {
          document.body.classList.toggle('darkmode');
        },
        dependencies() {
          // reset drawn paths
          if(this.dependencies.length < 1) {
            this.removeDependencyPaths();
            this.setListLayoutReady({ registeredLayouts: [] });
          }
        },
        registeredLayouts() {
          if(this.registeredLayouts.length === Object.keys(this.filteredCategories).length) {
            // all layouts are arranged
            this.initDependencyPaths();
          }
        },
      },
      mounted() {
        this.payload();
      }
  };
</script>
