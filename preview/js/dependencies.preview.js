/**
 * @file Darvin Element Dependencies
 * @author Tobias Frei
 *
 * @module activity
 */

let instance = {},
      defaults = {
        container: '.prev-m-index'
      };

// Module Variables
let settings = {},
    container,
    colors = ['#e8175d','#e8175d'],
    anchors = [["Top", "Top"], ["Bottom", "Bottom"]],
    moduleCards,
    counter = 0;

let j = require("../../node_modules/jsplumb/dist/js/jsplumb.js").jsPlumb.getInstance({
  Connector: ["Bezier", {curviness: 100, stub: 10}, {cssClass:"connectorClass", lineWidth:2, strokeStyle:'blue'}],
  Anchor: "Bottom",
  endpoint:[ "Dot", { radius: 1 } ],
  ConnectionOverlays: [
    [ "Arrow", { location: 0, width: 10, length: 7, foldbackPoint: 0.62, direction:-1 }]
]
});

// Private Functions
const initCard = (el) => {
  if(el.querySelector('a[data-dep]')) {
    el.querySelector('a[data-dep]').addEventListener('click', initClick);
  }
},
initClick = (e) => {
  let button = e.currentTarget,
      el = button.closest('.prev-m-index__item'),
      path = el.getAttribute('data-path'),
      url = `${path}/log/dependencies.json`,
      name = el.getAttribute('data-name'),
      type = el.getAttribute('data-type');


  if(button.getAttribute('data-init')==null) {
    loadFile(url, name, type, el, path, button);
  } else {
    prepareData({ data: JSON.parse(el.getAttribute('data-dep')) });
  }
},
loadFile = (url, name, type, el, path, button) => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return Promise.resolve(response);
      }
      else {
        return Promise.reject(new Error('Failed to load'));
      }
    })
    .then(response => response.json())
    .then((data) => {

      el.setAttribute('data-dep', JSON.stringify(data));
      button.setAttribute('data-init', '');

      prepareData({ data: data });
    })
    .catch(function() {});

},
prepareData = ({ data = {}} = {}) => {
  data.dependencies.forEach((dependency) => {
    connect(dependency.parent, dependency.name);
  });
},
connect = (source, target) => {

  source = document.querySelector('.prev-m-index__item[data-path="' + source + '"]');
  target = document.querySelector('.prev-m-index__item[data-path="' + target + '"]');

  counter++;

  let settings = {
    paintStyle:{
      stroke: colors[counter%2],
      strokeWidth:2,
      curviness: 300,
      stub: 20
    },
    anchors: anchors[counter%2],
    endpoint:[ "Dot", { radius: 3 } ],
    source: source,
    target: target
  };

  j.connect(settings);
};

/**
 * Initialize module
 *
 * @param {object} options - Override default settings with options object.
 * @return {object|undefined} Instance of created module.
 */

instance.init = (options) => {
  Object.assign(settings, defaults, options);

  // Public Code
  container = document.querySelector(settings.container);

  if(!container) return;

  moduleCards = container.querySelectorAll('.prev-m-index__item');

  if(!moduleCards) return;

  [...moduleCards].forEach((moduleCard) => {
    initCard(moduleCard);
  });

  j.setContainer(document.querySelector('.prev-m-index'));

  return instance;
};

export default instance;
