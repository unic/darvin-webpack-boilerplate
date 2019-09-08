<template>
    <article class="card-item prev-m-index__itemwrap" v-bind:class = "(item.config.flag)?'is-flagged':''">
          <canvas class="canvas" width="360" height="100"></canvas>
          <div class="prev-m-index__panel">
            <div class="prev-m-index__itemcol prev-m-index__itemcol--grow">
              <div class="prev-m-index__itemrow">
                <a v-if="item.variants >= 1" class="prev-m-index__itemtitle" :href="item.path + '/' + item.previews[0] + '.html'">{{ name }}</a>
                <span v-else class="prev-m-index__itemtitle" style="opacity: 0.64;">{{ name }}</span>
              </div>
            </div>
          </div>

          <footer class="prev-m-index__itemfooter">
            <div class="prev-m-index__itemrow">
              <div class="prev-c-ledbox">
                <div class="prev-c-led"></div>
              </div>
              <div class="prev-m-index__metalbl prev-m-index__lastupdate" data-update>&nbsp;</div>
            </div>
            <div class="prev-m-index__itemrow">
              <a class="prev-m-index__minibtn" data-tippy-content="Dependencies" data-dep @click="getDep" v-if="this.dependencies.length < 1 && item.type != 'pages' && trigger"><i class="i i-target"></i></a>
              <a v-if="item.config.design" data-tippy-content="Design" class="prev-m-index__speclink prev-m-index__speclink--design" :href="item.config.design" target="_blank">D</a>
              <a v-if="item.config.jira" data-tippy-content="Jira" class="prev-m-index__speclink prev-m-index__speclink--jira" :href="item.config.jira" target="_blank">J</a>
              <a v-if="item.config.confluence" data-tippy-content="Confluence" class="prev-m-index__speclink prev-m-index__speclink--confluence" :href="item.config.confluence" target="_blank">C</a>
            </div>
          </footer>

    </article>
</template>

<script>
  import facetMixin from '../../libs/vue/facetMixin';
  import { mapActions, mapState } from 'vuex';
  import axios from 'axios';
  import tippy from 'tippy.js';

  let bodyStyle = getComputedStyle(document.body);

  let settings = {
    days: 20,
    height: 100,
    width: 360,
    maxHeight: '80',
    colors: {
      grey1: bodyStyle.getPropertyValue("--activity-bg"),
      grey2: bodyStyle.getPropertyValue("--activity-grid"),
      grey3: bodyStyle.getPropertyValue("--activity-graph")
    }
  },
  counter = 0,
  timer,
  canvas,
  colors = ['#e8175d','#e8175d'],
  anchors = [["Bottom", "Top"], ["Bottom", "Bottom"]],
  moduleCards;

  export default {
    mixins: [facetMixin('card-item')],

    props: {
        largestHeight: {
            type: Number,
            default: null,
        },
        name: {
            type: String
        },
        type: {
            type: String
        },
        item: {
            type: Object
        },
    },

    data() {
        return {
            isOpen: false,
            hasDescription: true,
            deltaArr: [],
            pointArr: [],
            valArr: new Array(20),
            timer: {},
            counter: 0,
            cardDependencies: [],
            dependenciesLoaded: false,
            trigger: true
        };
    },

    computed: {
      ...mapState('filter-list', ['activity']),
      ...mapState('filter-list', ['darkmode']),
      ...mapState('filter-list', ['dependencies']),

      cardActivity() {
          return this.activity[this.name]
      },
    },

    watch: {
      dependencies() {
        this.showDepTrigger();
      },
      cardDependencies() {
          this.prepareData();
      },
      descr() {
          this.hasDescription = false;
      },
      darkmode() {
          this.updateLayout();
      },
    },

    methods: {
      ...mapActions('filter-list', ['setDependencies']),

      showDepTrigger() {
        if(this.dependenciesLoaded && this.cardDependencies.length >= 1) {
          if(this.dependencies.length > 1) {
            this.trigger = false;
          } else {
             this.trigger = true;
          }
        } else if (!this.dependenciesLoaded && this.dependencies.length < 1) {
          this.trigger = true;
        } else {
          this.trigger = false;
        }
      },

      prepareData() {
        document.body.classList.add('dependency-darkmode');

        this.setDependencies({ dependencies: this.cardDependencies });

        /*cardDependencies.forEach((dependency) => {
          this.connect(dependency.parent, dependency.name);
        });*/
      },
      updateLayout() {
        settings.colors = {
          grey1: bodyStyle.getPropertyValue("--activity-bg"),
          grey2: bodyStyle.getPropertyValue("--activity-grid"),
          grey3: bodyStyle.getPropertyValue("--activity-graph")
        };
        this.draw(this.$el.querySelector('canvas').getContext('2d'), this.name, 1);
      },
      getDep() {
        axios.get('./' + this.type + '/' + this.name + '/log/dependencies.json')
        .then((response) => {
          this.cardDependencies = response.data.dependencies;
          this.dependenciesLoaded = true
        });
      },
      initVisualizer() {
        if(document.documentElement.classList.contains('ie')) {
          return;
        }
        let name = this.name;
        let el = this.$el;
        let data = this.activity[this.name];

        let canvas = el.querySelector('canvas');

        let ctx = canvas.getContext('2d');

        // loop trough the last 20 days
        for (var i = 0; i < settings.days; i++) {
          let calcDay = new Date(new Date().getTime() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
          this.valArr[i] = ('0'); // default zero

          // search for matching commits
          for (var j = 0; j < data.all.length; j++) {
            if (data.all[j].date.split(' ')[0] == calcDay) {
              this.valArr[i] = parseInt(this.valArr[i]) + 10;

              if (parseInt(this.valArr[i]) > 80) {
                this.valArr[i] = settings.maxHeight;
              }
            }
          }
        }

        this.valArr.reverse();

        if (data.latest) {
          let latestCommitSplits = data.latest.date.split(' ');
          let flagRangeStart = new Date(new Date().getTime() - (2 * 24 * 60 * 60 * 1000));
          let flagRangeEnd = new Date(latestCommitSplits[0]);

          if (flagRangeEnd >= flagRangeStart) {
            el.querySelector('.prev-c-led').classList.add('prev-c-led--green');
          }

          el.querySelector('.prev-m-index__lastupdate[data-update]').innerHTML = latestCommitSplits[0] + ' <span>' + latestCommitSplits[1] + '</span>';
        } else {
          el.querySelector('.prev-c-led').classList.add('prev-c-led--blue');
          el.querySelector('.prev-m-index__lastupdate[data-update]').innerHTML = 'New Module';
        }


        this.timer = setInterval(() => {
          this.draw(ctx, name, 60);
        }, 30);

      },
      draw(ctx, name, killSwitch) {
        if(this.counter == killSwitch) {
          // kill draw intervall
          clearInterval(this.timer);
          this.counter++;
        }  else if(this.counter < killSwitch) {
          this.counter++;
        }

        ctx.fillStyle = settings.colors.grey1;
        ctx.strokeStyle = settings.colors.grey2;
        ctx.save();
        this.drawGrid(ctx, settings.width, settings.height, 10, 10);

        for (let i = 0; i < this.valArr.length; i++) {
          if (isNaN(this.pointArr[i])) {
            this.pointArr[i] = settings.height;
          }

          ctx.lineWidth = 1;
          let larg = (settings.width - 20) / (this.valArr.length - 1);
          this.deltaArr[i] = (settings.height - this.valArr[i]) - this.pointArr[i];
          this.pointArr[i] += this.deltaArr[i] / (i + 10);

          ctx.strokeStyle = settings.colors.grey1;
          ctx.fillStyle = settings.colors.grey3;
          this.drawingLines(ctx, larg, this.pointArr, i);
        }
      },
      drawingLines(ctx, width, points, i) {
        ctx.beginPath();
        ctx.globalAlpha = i * 0.04;
        ctx.moveTo(((i - 1) * width + 10), points[i - 1]);
        ctx.lineTo(i * width + 10, points[i]);
        ctx.lineTo(i * width + 10, settings.height);
        ctx.lineTo(((i - 1) * width + 10), settings.height);
        ctx.lineTo(((i - 1) * width + 10), points[i - 1]);
        ctx.fill();
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.moveTo(((i - 1) * width + 10), points[i - 1]);
        ctx.lineTo(i * width + 10, points[i]);
        ctx.stroke();
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = ctx.strokeStyle;
        ctx.arc(i * width + 10, points[i], 2, 0, Math.PI * 2)
        ctx.fill();
        ctx.restore();
      },
      drawGrid(ctx, width, height, colun, line) {
        ctx.fillRect(0, 0, width, height);
        ctx.save();
        for (var i = 1; i < (width / colun); i++) {
          ctx.beginPath();
          ctx.moveTo(i * colun, 0);
          ctx.lineTo(i * colun, height);
          ctx.stroke();
        }
        for (var l = 1; l < (height / line); l++) {
          ctx.beginPath();
          ctx.moveTo(0, l * line);
          ctx.lineTo(width, l * line);
          ctx.stroke();
        }
      },
    },

    mounted() {
      this.counter = 0;

      if(this.activity[this.name]) {
        this.initVisualizer();
      }

      // darkmode
      if(this.darkmode) {
        this.updateLayout();
      }

      tippy('.prev-m-index__speclink, .prev-m-index__minibtn', {
        theme: 'darvin',
      });

    }
  };
</script>
