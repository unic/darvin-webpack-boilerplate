/**
 * @file Darvin Headerbar
 * @author Tobias Frei
 *
 * TODO!: cleanup and refactor
 *
 * @module headerbar
 */

import Prism from 'prismjs';
import MarkdownIt from 'markdown-it';
import createModule from '@scripts/libs/create-module';

export default createModule({
  options: () => ({
    container: '.prev-m-servicenav',
  }),

  /**
   * createVueModule
   * @param {Object} module - Module
   * @param {Element} module.el - Element
   * @param {Object} module.state - State
   * @param {Object} module.options - Options
   * @return {Object} state
   */
  constructor({ el, state }) {
    let container,
    triggerBtns,
    overlay,
    md = new MarkdownIt(); // eslint-disable-line

    // Private Functions
    const clickHandler = (e) => {
      [...triggerBtns].forEach((el) => {
        el.classList.remove('is-open');
      });
      let targetOverlay = e.currentTarget.getAttribute('data-target');
      if(targetOverlay=='readme') {
        if(document.body.getAttribute('data-active') ==='readme') {
          // is active
          resetOverlay();
          return;
        }
        getReadme(e.currentTarget);
      } else if(targetOverlay=='source') {
        if(document.body.getAttribute('data-active') ==='source') {
          // is active
          resetOverlay();
          return;
        }
        getSource(e.currentTarget);
      } else if(targetOverlay=='servicenav') {
        document.body.classList.toggle('servicenav--show');
      }
    },
    resetOverlay = () => {
      document.body.setAttribute('data-active', '');
      document.querySelector('.prev-m-overlay').classList.remove('is-active');
      document.body.classList.remove('preview__content--off');
    },
    getReadme = (el) => {
      let overlay = document.querySelector('.prev-m-overlay'),
      overlaySlot = overlay.querySelector('.prev-m-overlay__item[data-readme]');

      if(overlaySlot.getAttribute('data-init')) {
        document.body.setAttribute('data-active', 'readme');
        overlay.classList.add('is-active');
        el.classList.add('is-open');
        document.body.classList.add('preview__content--off');
        return;
      }

      fetch('/' + document.body.getAttribute('data-path') + '/meta/readme.md')
        .then(response => {
          if (response.ok) {
            return Promise.resolve(response);
          }
          else {
            return Promise.reject(new Error('Failed to load'));
          }
        })
        .then(response => response.text()) // parse response as JSON
        .then(data => {
          // success
          overlaySlot.innerHTML = md.render(data); // markdown to html
          overlaySlot.setAttribute('data-init', 'true');

          document.body.setAttribute('data-active', 'readme');
          overlay.classList.add('is-active');
          el.classList.add('is-open');
        })
        .catch(function() {});

        document.body.classList.add('preview__content--off');


    },
    getSource = (el) => {
      let overlay = document.querySelector('.prev-m-overlay'),
      overlaySlot = overlay.querySelector('.prev-m-overlay__item[data-source]');

      if(overlaySlot.getAttribute('data-init')) {
        document.body.setAttribute('data-active', 'source');
        overlay.classList.add('is-active');
        el.classList.add('is-open');
        document.body.classList.add('preview__content--off');
        return;
      }

      fetch('/' + document.body.getAttribute('data-path') + '/' + document.body.getAttribute('data-name') + '.' + document.body.getAttribute('data-ext'))
        .then(response => {
          if (response.ok) {
            return Promise.resolve(response);
          }
          else {
            return Promise.reject(new Error('Failed to load'));
          }
        })
        .then(response => response.text()) // parse response as JSON
        .then(data => {
          // success
          overlaySlot.innerHTML = '<pre class="language-javascript"><code class="language-javascript">' + Prism.highlight(data, Prism.languages.javascript, 'javascript') + '</code></pre>';
          overlaySlot.setAttribute('data-init', 'true');

          document.body.setAttribute('data-active', 'source');
          overlay.classList.add('is-active');
          el.classList.add('is-open');
        })
        .catch(() => {});
            document.body.classList.add('preview__content--off');
        };

    /**
     * init
     * @return {undefined}
     */
    state.init = () => {
      container = el;
      if(!container) return;

      triggerBtns = document.querySelectorAll('.prev-m-servicenav__link[data-trigger]');
      if(!triggerBtns) return;

      overlay = document.querySelector('.prev-m-overlay');
      if(!overlay) return;

      [...triggerBtns].forEach((btn) => {
        btn.addEventListener('click', clickHandler);
      });
    };

    state.init();

    return state;
  },
});
