declare global {
  interface Window {
    loadModule: (scope: HTMLElement) => void;
    loadSpecificModule: (name: string, scope: HTMLElement) => void;
  }
}

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

export type DynamicImport = any;

export interface ModuleMap {
  [key: string]: Module;
}

export interface Module {
  name: string;
  selector: string;
  lazy: boolean;
  features: string[];
  handler: ModuleHandler;
  instances: any[];
  init: Function;
}

export interface ModuleDeclarationMap {
  modules: ModuleDeclaration;
}

export interface ModuleDeclaration {
  [key: string]: ModuleHandler;
}

export type ModuleHandler = ModuleHandlerExtended | ModuleHandlerSimple;

export interface ModuleHandlerExtended {
  lazy: boolean;
  handler: Function;
  features: string[];
}

export type ModuleHandlerSimple = Function;


/* DEMO */

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
