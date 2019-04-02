/**
 * @file Accordion Demo Module
 * @author mail@tobiasfrei.ch
 *
 * @module modules/accordion
 *
 */

import observer from '@unic/composite-observer';

const instance = {};

const defaults = {
  container: '#l-content',
  accordionMode: true,
  accordion: 'm-accordion',
  accordionTrigger: 'trigger',
  accordionContentbox: 'contentbox',
  accordionContent: 'content',
  openClass: 'is-open',
  boundAttr: 'data-accordion-bound',
  hooks: {
    accordion: '[data-acc]',
    accordionTrigger: '[data-acc-t]',
    accordionContentbox: '[data-acc-cb]',
    accordionContent: '[data-acc-c]',
  },
};

const pubsub = observer();

let settings;
let containers;
let disFlag = false;
let accordions;

const transitionListener = (e) => {
  // remove style after transition ends
  if (e.target.classList.contains(settings.accordionContentbox) && e.propertyName === 'height' && e.target.offsetHeight > 3) {
    const { target } = e;
    target.removeEventListener('transitionend', transitionListener, true);
    target.classList.add('no-transition');
    window.requestAnimationFrame(() => {
      target.setAttribute('style', '');
      disFlag = false;
    });
  } else if (e.target.classList.contains(settings.accordionContentbox) && e.propertyName === 'height' && e.target.offsetHeight <= 3) {
    const { target } = e;
    target.removeEventListener('transitionend', transitionListener, true);
    window.requestAnimationFrame(() => {
      disFlag = false;
    });
  }
};

const openAccordion = (accordionRoot, height) => {
  const animTarget = accordionRoot.querySelector(settings.hooks.accordionContentbox);

  // listen for transition end to set height auto
  animTarget.addEventListener('transitionend', transitionListener, true);

  // open the accordion to height value
  accordionRoot.classList.add(settings.openClass);
  animTarget.style.height = `${height}px`;

  // call tab for height change
  if (accordionRoot.closest('[data-tab]')) {
    pubsub.trigger('accordionTrigger', {
      rootTab: accordionRoot.closest('[data-tab]'),
      value: height,
    });
  }
};


const closeAccordion = (accordionRoot, cb) => {
  // set height from auto to value for transition close
  const animTarget = accordionRoot.querySelector(settings.hooks.accordionContentbox);
  const openHeight = animTarget.offsetHeight;

  animTarget.style.height = `${animTarget.offsetHeight}px`;

  requestAnimationFrame(() => {
    animTarget.classList.remove('no-transition');

    // listen for transition end to set height auto
    if (cb) {
      animTarget.addEventListener('transitionend', transitionListener, true);
    }

    requestAnimationFrame(() => {
      accordionRoot.classList.remove(settings.openClass);
      animTarget.style.height = '0px';

      // call tab for height change
      if (accordionRoot.closest('[data-tab]') && openHeight > 0) {
        pubsub.trigger('accordionTrigger', {
          rootTab: accordionRoot.closest('[data-tab]'),
          value: -1 * openHeight,
        });
      }
    });
  });
};


const closeSiblings = (rootElement) => {
  if (!settings.accordionMode) {
    return;
  }

  const mainRoot = rootElement;
  const dataAttr = settings.hooks.accordion.replace(/(\[|\])/g, '');
  // strip brackets

  const dirs = ['previousElementSibling', 'nextElementSibling'];

  let temp;

  // eslint-disable-next-lines
  for (let i = dirs.length; i--;) {
    rootElement = mainRoot;

    while ((rootElement = rootElement[dirs[i]]) !== null) {
        temp = rootElement;

        if (!temp.hasAttribute(dataAttr)) {
            break;
        } else {

            // close open sibling
            closeAccordion(temp, false);
        }
    }
}
};

const toggleClass = (e) => {
  let { target } = e;

  // set origin target
  if (!target.classList.contains(settings.accordionTrigger)) {
    target = target.closest(settings.hooks.accordionTrigger);
  }

  // get elements
  const accordionRoot = target.parentNode;
  const accordionContent = accordionRoot.querySelector(settings.hooks.accordionContent);
  const height = accordionContent.offsetHeight;

  // toggle class
  if (accordionRoot.classList.contains(settings.openClass)) {
    closeAccordion(accordionRoot, true);
  } else {
    openAccordion(accordionRoot, height);
    closeSiblings(accordionRoot);
  }
};

const clickDelegate = (e) => {
  const accordionTrigger = e.target.closest(settings.hooks.accordionTrigger);

  if (accordionTrigger) {
    if (disFlag) {
      return;
    }
    disFlag = true;
    toggleClass({
      target: accordionTrigger,
    });
  }
};

const bindEvents = () => {

  accordions.forEach((accordion) => {
    // set init flag
    accordion.setAttribute(settings.boundAttr, '');

    // flag if accordion is nested in tab
    if (accordion.closest('[data-tab]')) {
      accordion.setAttribute('data-nested', 'true');
    }

    // check for initial open
    if (accordion.classList.contains(settings.openClass)) {
      const { offsetHeight } = accordion.querySelector(settings.hooks.accordionContent);
      openAccordion(accordion, offsetHeight);
    }
  });

  containers.forEach((container) => {
    container.setAttribute(settings.boundAttr, '');
    container.addEventListener('click', clickDelegate);

  });
};


const unbindEvents = () => {
  accordions.forEach((accordion) => {
    accordion.removeAttribute(settings.boundAttr);
  });

  containers.forEach((container) => {
    container.removeAttribute(settings.boundAttr);
    container.removeEventListener('click', clickDelegate);
  });
};

/**
 * Initialize module
 *
 * @param {object} options - Override default settings with options object.
 * @return {object} Instance of created module.
 */
instance.init = (options) => {
  settings = Object.assign({}, defaults, options);

  containers = [...document.querySelectorAll(`${settings.container}:not([${settings.boundAttr}])`)];
  accordions = [...document.querySelectorAll(`${settings.container} ${settings.hooks.accordion}:not([${settings.boundAttr}])`)];

  bindEvents();

  return instance;
};

/**
 * Destroy this module.
 *
 * @return {undefined}
 */
instance.destroy = () => {
  unbindEvents();
};

export default instance;
