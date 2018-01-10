module.exports = {
  onColorSelected(color) {
    this.emit('colorSelected', color);
  },

  onHexInput() {
    let hexInput = this.getEl('hexInput').value;

    if (!hexInput.startsWith('#')) {
      hexInput = `#${hexInput}`;
    }

    if (!isValidHexValue(hexInput)) {
      // eslint-disable-next-line prefer-destructuring
      hexInput = this.input.colors[0];
    }

    this.emit('colorSelected', hexInput);
  }
};

function isValidHexValue(hexValue) {
  return /^#[0-9A-F]{6}$/i.test(hexValue);
}
