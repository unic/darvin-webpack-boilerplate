import createBreakpointManager from '@unic/factory-breakpoint-manager';

// Creating a new BreakpointManager (no pun intended)
export default createBreakpointManager({
  breakpoints: {
    zero: 0,
    micro: 360,
    small: 600,
    medium: 840,
    large: 1024,
    wide: 1280,
    ultra: 1440,
    epic: 2580,
    orbit: 3840,
  },
  unit: 'px'
});
