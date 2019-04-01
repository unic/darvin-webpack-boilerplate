<template>
    <div class="prev-m-filterbar">
      <div v-if="dependencies.length > 0" class="prev-m-filterbar__dependencymode">
        <span>Dependency Mode</span>
        <a tabindex="0" @click="resetDependencies"><i class="ico i-close"></i></a>
      </div>
      <div v-else class="prev-m-filterbar__categories">
        <div class="prev-m-filterbar__category prev-m-filterbar__checkbox" v-for="filter in filters" :key="filter.value">
          <input class="prev-m-filterbar__input"
            type="checkbox"
            name="selectedFilters"
            v-model="selectedFilters"
            :value="filter"
            :checked="true"
            :id="filter">
            <label class="prev-m-filterbar__lbl check" :for="filter">
                <svg width="18px" height="18px" viewBox="0 0 18 18">
                  <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                  <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
                <span>{{ filter }}</span>
            </label>
        </div>
        <div class="prev-m-filterbar__search">
          <input type="text" v-model="categorySearch" placeholder=".." spellcheck="false"/>
        </div>
        <div class="prev-m-filterbar__mode">
          <input id="prev-layout" class="prev-m-filterbar__modeinput" type="checkbox" v-model="darkmodeTrigger" value="dark" checked="false">
          <label class="prev-m-filterbar__lbl prev-m-filterbar__modelbl" for="prev-layout">
            <i v-if="!darkmodeTrigger" class="ico i-night"></i>
            <i v-if="darkmodeTrigger" class="ico i-sun"></i>
          </label>
       </div>
      </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    import facetMixin from '../libs/vue/facetMixin';

    export default {
        mixins: [facetMixin('card-filter')],
        props: {},

        data() {
            return {
                selectedFilters: [],
                categorySearch: '',
                darkmodeTrigger: false
            };
        },

        computed: {
            ...mapState('filter-list', ['search']),
            ...mapState('filter-list', ['darkmode']),
            ...mapState('filter-list', ['selectedFilter']),
            ...mapState('filter-list', ['filters']),
            ...mapState('filter-list', ['dependencies']),
        },

        methods: {
            ...mapActions('filter-list', ['setSelectedFilter']),
            ...mapActions('filter-list', ['setSearch']),
            ...mapActions('filter-list', ['setDarkmode']),
            ...mapActions('filter-list', ['setDependencies']),

            resetDependencies() {
              this.setDependencies({ dependencies: [] });
            }
        },

        watch: {
            selectedFilter() {
              this.selectedFilters = this.selectedFilter;
            },
            selectedFilters(val) {
              if(val.length<1) {
                  val = [];
              }

              this.setSelectedFilter({ filter: val });
            },
            categorySearch(val) {
              this.setSearch({ search: val});
            },
            darkmodeTrigger(val) {
              if(val) {
                this.setDarkmode({ darkmode: true});
                localStorage.setItem("darvin-darkmode", "true");
              } else {
                this.setDarkmode({ darkmode: false});
                localStorage.setItem("darvin-darkmode", "false");
              }
            }
        },

        mounted() {
          // darkmode
          if(this.darkmode) {
            this.darkmodeTrigger = true;
          }
        }
    };
</script>
