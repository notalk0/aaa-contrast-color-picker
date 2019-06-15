const panel = document.getElementById('#panel');
const contrast = document.getElementById('#contrast');
const themeText = document.getElementById('#themeText');
const contrastText = document.getElementById('#contrastText');

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
  const contrastColor = tiny.isDark()
    ? tiny.lighten(70).toString()
    : tiny.darken(70).toString();

  this.panel.style.backgroundColor = color;
  this.contrast.style.backgroundColor = contrastColor;

  this.themeText.innerHTML = color;
  this.contrastText.innerHTML = contrastColor;

  this.themeText.style.color = contrastColor;
  this.contrastText.style.color = color;
});
