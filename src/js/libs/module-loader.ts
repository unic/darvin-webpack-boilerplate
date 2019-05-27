class ModuleLoader {
  instances: any[] = [];

  constructor(Module: any, moduleCssClass: string) {
    document.querySelectorAll(`.${moduleCssClass}`).forEach(el => {
      this.instances.push(new Module(el));
    })
  }

  destroy = () => {
    for (const instance of this.instances) {
      instance.destroy()
    }
  }
}

export default ModuleLoader;
