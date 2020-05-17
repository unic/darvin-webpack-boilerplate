/**
 * @file helper module for dom manipulation
 * @author Tobias Frei
 *
 * @module helpers/helper-dom.js
 */

const instance = {};

/**
 * Get previous sibling by classname
 *
 * @param {HTMLElement} element - The element to start search.
 * @param {string} classname - The classname of the sibling element.
 * @return {HTMLElement} The previous node with the specific classname.
 */
instance.prevSibling = (element, classname) => {
  let sibling;
  let temp;

  // eslint-disable-next-line
  while ((element = element.previousSibling) !== null) {
    temp = element;
    if (temp.classList && temp.classList.contains(classname)) {
      sibling = temp;
      break;
    }
  }

  return sibling;
};


/**
 * Get next sibling by classname
 *
 * @param {HTMLElement} element - The element to start search.
 * @param {string} classname - The classname of the sibling element.
 * @return {HTMLElement} The previous node with the specific classname.
 */
instance.nextSibling = (element, classname) => {
  let sibling;
  let temp;

  // eslint-disable-next-line
  while ((element = element.nextSibling) !== null) {
    temp = element;
    if (temp.classList && temp.classList.contains(classname)) {
      sibling = temp;
      break;
    }
  }

  return sibling;
};


/**
 * Get the level of an element in a ul>li wrapper
 *
 * @param {HTMLElement} element - The element for finding level depth.
 * @param {string} id - The wrapper id.
 * @param {string} waypoint - The classname of the waypoint.
 * @param {number=} counter - The level counter.
 * @return {string} The level of the element
 */
instance.getLevelDepth = (element, id, waypoint, counter) => {
  counter = counter || 0;
  if (element.id.indexOf(id) >= 0) {
    return counter;
  }
  if (element.classList.contains(waypoint)) {
    counter += 1;
  }
  return element.parentNode && instance.getLevelDepth(element.parentNode, id, waypoint, counter);
};

/**
 * Check if element or event target has parent with specific id
 *
 * @param {Object} e - The child element or browser event.
 * @param {string} id - The id to check in parent node.
 * @return {boolean} The level of the element
 */
instance.hasParent = (e, id) => {
  if (!e) return false;
  let el = e.target || e.srcElement || e || false;
  while (el && el.id !== id) {
    el = el.parentNode || false;
  }
  return (el !== false);
};

instance.innerHtmlToNode = (content) => {
  const temp = document.createElement('div');
  temp.innerHTML = content;

  return temp.firstElementChild;
};

instance.createIntersectionObserver = (callback, unsubscribe, settings) => {
  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (unsubscribe) {
          intersectionObserver.unobserve(entry.target);
        }
        callback(entry);
      }
    });
  }, settings);
  return intersectionObserver;
};

export default instance;
