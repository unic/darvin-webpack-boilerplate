/**
 * @module m01-toggle
 */

import ModuleLoader from '../../../js/libs/module-loader';
import {IDefaultModule} from '../../../js/models/models';

interface IToggleOptions {
  toggleClass: string;
  triggerClass: string;
  openClass: string;
}

const defaults: IToggleOptions = {
  toggleClass: 'm-toggle',
  triggerClass: 'm-toggle-trigger',
  openClass: 'm-toggle__open'
};

interface IToggle extends IDefaultModule {
  el: Element;
  settings: IToggleOptions;
  trigger: Element;
  listener: EventListener;
  toggle: Function;
}

class Toggle implements IToggle {
  el: Element;
  settings: IToggleOptions;
  trigger: Element;
  listener: EventListener;

  constructor(el: Element, options = defaults) {
    this.el = el;
    this.settings = options;
    this.trigger = this.el.querySelector(`.${this.settings.triggerClass}`);

    if (this.trigger) {
      this.trigger.addEventListener('click', () => {
        this.toggle()
      });
    }
  }

  toggle() {
    if (this.el.classList.contains(this.settings.openClass)) {
      this.el.classList.remove(this.settings.openClass);
    } else {
      this.el.classList.add(this.settings.openClass);
    }
  }

  destroy() {
    this.trigger.removeEventListener('click', this.toggle);
  }
}

let module: ModuleLoader;

const initToggles = () => {
  module = new ModuleLoader(Toggle, defaults.toggleClass);
}

export default initToggles;
