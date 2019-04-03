/* eslint-disable */

/**
 * Safari
 *
 */
Modernizr.addTest('safari', () => {
  const isSafari = navigator.userAgent.indexOf('Safari') > -1;
  const isChrome = navigator.userAgent.indexOf('Chrome') > -1;
  return !isChrome && isSafari;
});

/**
 * MS Internet Explorer 11
 *
 */
Modernizr.addTest('ie', () => false || !!document.documentMode); // eslint-disable-line spaced-comment

/**
 * Edge Case ¯\_(ツ)_/¯
 *
 */
Modernizr.addTest('edge', () => {
  const isIE = /*@cc_on!@*/false || !!document.documentMode; // eslint-disable-line spaced-comment
  return !isIE && !!window.StyleMedia;
});

/**
 * Old FF
 *
 * Check for old Firefox Version
 *
 */
Modernizr.addTest('firefox-lt-50', () => {
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    if (navigator.userAgent.split('Firefox/')[1].split('.')[0] < 50) {
      return true;
    }
  }
  return false;
});

/**
 * Touch
 *
 * Set Touchclass on first touch event.
 * Avoid wrong settings on hybrid devices (Mouse&Touch|e.g Surface).
 *
 */
(function touchDetection() {
  document.documentElement.classList.add('no-touchdevice');
  Modernizr.touch = false;

  window.addEventListener('touchstart', function setHasTouch() {
    Modernizr.touch = true;
    document.documentElement.classList.add('touchdevice');
    document.documentElement.classList.remove('no-touchdevice');

    // Remove event listener once fired, otherwise it'll kill scrolling performance
    window.removeEventListener('touchstart', setHasTouch);
  }, false);
}());
