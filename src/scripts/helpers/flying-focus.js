/**
 * `Flying-Focus` plugin for better visible focus while keyboard-navigating the page
 * @author Bashir Karimi, Christian Sany
 * @copyright Unic AG
 *
 * Add offset of element
 * @returns {undefined}
 */

import fastdom from 'fastdom';
import pubsub from './pubsub';
import Modernizr from 'modernizr';

const flyingFocus = () => {
  const { documentElement, body } = document;
  const win = window;
  let ringElem = null;
  let prevFocused = null;
  let keyDownTime = 0;
  let target;
  let blurAnimationFrameId;

  const isJustPressed = () => Date.now() - keyDownTime < 500;

  /**
   * Add offset of element
   * @param {Element} elem The first number.
   * @returns {Object} top offset and left offset.
   */
  function offsetOf(elem) {
    return new Promise((resolve) => {
      fastdom.measure(() => {
        const elementOffset = { top: 0, left: 0 };

        if (elem) {
            const rect = elem.getBoundingClientRect();
            const clientTop = documentElement.clientTop || body.clientTop;
            const clientLeft = documentElement.clientLeft || body.clientLeft;
            const scrollTop = win.pageYOffset || documentElement.scrollTop || body.scrollTop;
            const scrollLeft = win.pageXOffset || documentElement.scrollLeft || body.scrollLeft;

            elementOffset.top = (rect.top + scrollTop) - clientTop;
            elementOffset.left = (rect.left + scrollLeft) - clientLeft;
        }

        resolve(elementOffset);
      })
    })
  }

  /**
   * Add flying-focus element in DOM
   * @returns {undefined}
   */
  function initialize() {
    ringElem = document.createElement('flying-focus'); // Use unique element name to decrease the chances of a conflict with website styles
    ringElem.className = 'flying-focus';
    body.appendChild(ringElem);
  }

  /**
   * Add flying-focus element on screen
   * @param {Boolean} [listen=true] -
   * @returns {undefined}
   */
  function trigger(listen = true) {
    let isFirstFocus = false;

    if (!target) {
      return;
    }

    if (blurAnimationFrameId) {
      cancelAnimationFrame(blurAnimationFrameId); // Cancles waiting blur handler
      if (prevFocused !== null) {
        prevFocused.classList.remove('flying-focus__target');
        prevFocused = null;
      }
    }

    if (!ringElem) {
      isFirstFocus = true;
      initialize();
    }

    offsetOf(target)
      .then((offset) => {

        if (listen) {
          fastdom.measure(() => {
            const styles = window.getComputedStyle(target);
            const properties = styles.transitionProperty.split(', ');
            const duration = parseFloat(styles.transitionDuration, 10) * 1000; // Carefull, this might not work when having multiple durations

            if (properties.includes('transform')) {
              const reTrigger = () =>{
                target.removeEventListener('transitionend', reTrigger);

                trigger(false);
              }

              // Handles retriggering, when transofrm transition is finished
              target.addEventListener('transitionend', reTrigger)

              // Removes listener after duration, in case that transitionend is not triggered
              setTimeout(() => {
                target.removeEventListener('transitionend', reTrigger);
              }, duration)
            }
          })
        }

        fastdom.mutate(() => {
          ringElem.style.left = `${(offset.left + 3).toString()}px`;
          ringElem.style.top = `${(offset.top + 3).toString()}px`;
          ringElem.style.width = (target) ? `${(target.offsetWidth - 6).toString()}px` : 0;
          ringElem.style.height = (target) ? `${(target.offsetHeight - 6).toString()}px` : 0;
        })

        if (isFirstFocus || !isJustPressed()) {
          return;
        }

        if (target) {
          fastdom.mutate(() => {
            target.classList.add('flying-focus__target');
            ringElem.classList.add('flying-focus--visible');
          })
          prevFocused = target;
        }
      })
  }

  /**
   * Removes flying-focus from screen
   * @returns {undefined}
   */
  function onEnd() {
    if (ringElem) {
      // No fastdom.mutate() needed, function executed inside rAF
      ringElem.classList.remove('flying-focus--visible');
    }

    if (prevFocused !== null) {
      // No fastdom.mutate() needed, function executed inside rAF
      prevFocused.classList.remove('flying-focus__target');
      prevFocused = null;
    }
  }

  // `navigator.maxTouchPoints` tests for touch capable hardware
  if (!win.addEventListener || Modernizr.touchevents || navigator.maxTouchPoints) {
    return;
  }

  documentElement.addEventListener('keydown', (event) => {
    const code = event.which;

    // Show animation only upon Tab, Enter, or Arrow keys press
    if (code === 9 || code === 13 || (code > 36 && code < 41)) {
      keyDownTime = Date.now();
    }
  }, false);

  documentElement.addEventListener('focus', (event) => {
    target = event.target; // eslint-disable-line prefer-destructuring

    if (target.id === 'flying-focus') {
      return;
    }

    if (target.dataset.focusLabel) {
      target = target.nextElementSibling;
    }

    trigger();
  }, true);

  documentElement.addEventListener('click', (event) => {
    if (ringElem && !event.target.classList.contains('flying-focus__target')) {
      fastdom.mutate(() => {
        ringElem.classList.remove('flying-focus--visible');
      })
    }
  }, true);

  documentElement.addEventListener('blur', () => {
    blurAnimationFrameId = requestAnimationFrame(() => {
      onEnd();
      blurAnimationFrameId = null;
    })
  }, true);

  win.addEventListener('resize', () => trigger(), true);

  // Subscribe to events that should re-trigger flying focus position
  pubsub.on('header.megadropdown.opened', trigger);
};

flyingFocus();
