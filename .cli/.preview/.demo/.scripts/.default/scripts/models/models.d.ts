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

export interface ImageProps extends IModuleState {
  options: {
    domSelectors: {
      image: string;
    };
  };
  state: ImageInstance;
}

export interface ImageInstance extends IModuleInstance {
  ui: {
    image: Element | null;
  };
}

export interface ImageConfig {
  domSelectors: {
    moduleRoot: string;
  };
  stateClasses: {
    prepareLoading: string;
    loading: string;
  };
  hooks: {
    onBeforeLoad: Function;
    onLoad: Function;
  } | undefined;
}