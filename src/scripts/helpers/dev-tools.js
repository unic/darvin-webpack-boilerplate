class DevTools {
    constructor(options) {
        const defaults = {
            body: document.body,
            devToolContainer: document.getElementById('dev-tools'),
            devModeButton: document.getElementById('dev-tools__btn'),
            devActiveClass: 'dev-mode',
            breakpointActiveClass: 'breakpoint-mode',
            keyMap: {88: false, 16: false, 17: false, 91: false}
        };
        this.settings = Object.assign({}, defaults, options);
        this._bindEvents();
    }

    _bindEvents() {
        // Toggle dev tools on key combination of Cmd(91) + Shift(16) + X(88)
        window.onkeydown = (e) => {
            if (e.keyCode in this.settings.keyMap) {
                this.settings.keyMap[e.keyCode] = true;

                if (this.settings.keyMap[88] && (this.settings.keyMap[17] || this.settings.keyMap[91])) {
                    e.preventDefault();
                    this._toggleBreakpointMode();
                }
            }
        };

        window.onkeyup = (e) => {
            if (e.keyCode in this.settings.keyMap) {
                this.settings.keyMap[e.keyCode] = false;
            }
        };
    }

    _toggleDevMode() {
        this.settings.body.classList.toggle(this.settings.devActiveClass);
    }

    _toggleBreakpointMode() {
        this.settings.body.classList.toggle(this.settings.breakpointActiveClass);
    }
}

export default DevTools;
