const flatColors = require('flat-colors').colors;

const HEX_INDEX = 3;

module.exports = function getColors() {
  const colors = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    colors.push(flatColors[i][HEX_INDEX]);
  }
  return colors;
};
