/**
 * Lock screen
 * Function locking screen scrolling, e.g for modals, menus or other
 *
 * @author Christian Sany
 * @copyright Unic AG
 */

import fastdom from 'fastdom';

const doc = document.documentElement;
const body = document.body;
let scrollTop;
let isLocked = false;

const ScreenLock = {
  /**
   * lock
   * @return {undefined}
   */
  lock() {
    if (isLocked) {
      return;
    }

    fastdom.measure(() => {
      const windowHeight = window.innerHeight;
      scrollTop = window.scrollY;
      isLocked = true;

      fastdom.mutate(() => {
        doc.style.height = `${windowHeight}px`;
        doc.style.overflow = 'hidden';
        body.style.height = `${windowHeight + scrollTop}px`;
        body.style.overflow = 'hidden';
        body.style.marginTop = `-${scrollTop}px`;
      });
    });
  },

  /**
   * unlock
   * @return {undefined}
   */
  unlock() {
    if (isLocked) {
      fastdom.mutate(() => {
        doc.removeAttribute('style');
        body.removeAttribute('style');
        window.scrollTo(0, scrollTop);
        isLocked = false;
      });
    }
  },
};

export default ScreenLock;
