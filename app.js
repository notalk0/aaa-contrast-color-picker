const panel = document.getElementById('#panel');
const contrast = document.getElementById('#contrast');
const themeText = document.getElementById('#themeText');
const contrastText = document.getElementById('#contrastText');
const ratioText = document.getElementById('#ratioText');

const calculateRatio = (colorA, colorB) => {
  return tinycolor.readability(colorA, colorB);
};

// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
  el: '.color-picker',

  components: {
    // Main components
    preview: true,
    opacity: true,
    hue: true,

    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      hsla: true,
      hsva: true,
      cmyk: true,
      input: true,
      clear: true,
      save: true
    }
  }
});

pickr.on('change', (...args) => {
  const color = args[0].toHEXA().toString();
  const tiny = tinycolor(color);
  let contrastColor;
  let ratio;
  let maxRatio = 1;
  let maxRatioColor = color;

  for (let i = 0; i <= 100; i++) {
    contrastColor = tiny.isDark()
      ? tiny.lighten(i).toString()
      : tiny.darken(i).toString();
    ratio = calculateRatio(color, contrastColor);
    if (ratio > maxRatio) {
      maxRatio = ratio;
      maxRatioColor = contrastColor;
    }
    if (ratio >= 7) {
      break;
    }
  }

  if (ratio < 7) {
    ratio = maxRatio;
    contrastColor = maxRatioColor;
  }

  this.panel.style.backgroundColor = color;
  this.contrast.style.backgroundColor = contrastColor;

  this.themeText.innerHTML = color;
  this.contrastText.innerHTML = contrastColor;
  this.ratioText.innerHTML = `Ratio: (1: ${ratio.toFixed(2)})`;

  this.themeText.style.color = contrastColor;
  this.contrastText.style.color = color;
});
