export interface Observer {
  on: Function;
  off: Function;
  trigger: Function;
}

export interface IModuleInstance {
  init: Function;
  destroy: Function;
  readonly $observer?: Observer;
}

export interface IModuleState {
  readonly el: HTMLElement;
  readonly state: IModuleInstance;
}
