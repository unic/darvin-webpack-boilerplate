/**
 * @module m01-toggle
 */

import {IModuleInstance} from '../../../js/models/models';

interface IToggleOptions {
  triggerClass: string;
  openClass: string;
}

const defaults: IToggleOptions = {
  triggerClass: 'm-toggle-trigger',
  openClass: 'm-toggle__open'
};

function toggle(e: MouseEvent) {
  const trigger = <Element>e.target;
  if (trigger && trigger.classList.contains(settings.triggerClass)) {
    const container = <Element>trigger.parentNode;
    container.classList.toggle(settings.openClass);
  }
}

function bindEvents(elements: Element[]) {
  elements.forEach((el: Element) => el.addEventListener('click', toggle));
}

function unbindEvents(elements: Element[]) {
  elements.forEach((el: Element) => el.removeEventListener('click', toggle));
}

let settings: IToggleOptions;
let toggles: Element[] = [];

const instance: IModuleInstance = {
  init(options?: IToggleOptions) {
    settings = {...defaults, ...options};
    document.querySelectorAll(`.${settings.triggerClass}`).forEach((el: Element) => {
      toggles.push(el);
    })
    bindEvents(toggles);
  },
  destroy() {
    unbindEvents(toggles);
  }
};

export default instance;
