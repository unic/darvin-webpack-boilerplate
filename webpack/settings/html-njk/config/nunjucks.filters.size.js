module.exports = function(val) {
  let config = val;
  const res = [];

  global.breakpoints.forEach((breakpoint) => {
    if (config[breakpoint.name]) {
      const value = config[breakpoint.name];
      const media = breakpoint.value === 0 ? '' : `(min-width: ${breakpoint.value / 16}em)`;
      const base = breakpoint.value === 1440 ? `${breakpoint.value / 16}rem` : '100vw';

      if (typeof value === 'string' || value instanceof String) {
        res.push(`${media} ${value}`);
      } else {
        res.push(`${media} calc((${value} * (${base} - ((${breakpoint.cols} - 1) * ${breakpoint.gap / 16}rem)) / ${breakpoint.cols}) + (${value} - 1) * ${breakpoint.gap / 16}rem)`);
      }
    }
  })

  return res.reverse().join(",\n");
};
