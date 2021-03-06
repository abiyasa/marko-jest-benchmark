/* global test */
const { expect } = require('chai');

test('color-picker-selection color', (context) => {
  const { component } = context.render({
    color: '#ff8080'
  });

  expect(component.el.getAttribute('style')).to.contain('background-color:#ff8080');
});

test('color-picker-selection when clicked should emit colorSelected event', (context) => {
  const { component } = context.render({
    color: '#ff8080'
  });

  let isCalled = false;
  component.on('colorSelected', () => {
    isCalled = true;
  });

  component.el.click();

  expect(isCalled).to.equal(true);
});
