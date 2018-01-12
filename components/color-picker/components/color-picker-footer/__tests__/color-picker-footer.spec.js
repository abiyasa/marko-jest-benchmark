const path = require('path');
const { initComponent, createTestSandbox } = require('marko-jest/test-utils');

describe('color-picker-footer', () => {
  const componentClass = initComponent(path.resolve(__dirname, '../index.marko'));

  let testSandbox;
  let component;

  beforeEach(() => {
    testSandbox = createTestSandbox();
  });

  afterEach(() => {
    testSandbox.reset();
  });

  describe('on rendering', () => {
    const model = {
      colors: [
        '#333745',
        '#E63462',
        '#FE5F55',
        '#C7EFCF',
        '#EEF5DB',
        '#00B4A6',
        '#007DB6',
        '#FFE972',
        '#9C7671',
        '#0C192B'
      ]
    };
    beforeEach(async () => {
      component = await testSandbox.renderComponent(componentClass, model);
    });

    it('should render the component with the right class', () => {
      expect(component.el.classList.contains('color-picker-footer')).toBeTruthy();
    });

    it('should render color selection view for every given colors', () => {
      expect(component.el.querySelectorAll('.color-picker-selection').length).toEqual(model.colors.length);
    });

    describe('when selecting a color selection', () => {
      beforeEach(() => {
        spyOnColorSelected = jest.fn();
        component.on('colorSelected', spyOnColorSelected);

        component.onColorSelected(model.colors[3]);
      });

      it('should trigger colorSelected event containing the color value', () => {
        expect(spyOnColorSelected).toHaveBeenCalledWith(model.colors[3]);
      });
    });

    describe('on handling text input for entering color input', () => {
      beforeEach(() => {
        spyOnColorSelected = jest.fn();
        component.on('colorSelected', spyOnColorSelected);
      });

      describe('given correct hex color value', () => {
        beforeEach(() => {
          setTextInputValue('#ff8080');
          component.onHexInput();
        });

        it('should trigger colorSelected event containing the hex color value', () => {
          expect(spyOnColorSelected).toHaveBeenCalledWith('#ff8080');
        });
      });

      describe('given hex color value without prefix "#"', () => {
        beforeEach(() => {
          setTextInputValue('ff8080');
          component.onHexInput();
        });

        it('should trigger colorSelected event containing the hex color value with prefix "#"', () => {
          expect(spyOnColorSelected).toHaveBeenCalledWith('#ff8080');
        });
      });

      describe('given invalid hex color value', () => {
        beforeEach(() => {
          setTextInputValue('zdfard');
          component.onHexInput();
        });

        it('should trigger colorSelected event containing the default hex color value', () => {
          expect(spyOnColorSelected).toHaveBeenCalledWith(model.colors[0]);
        });
      });

      function setTextInputValue(newValue) {
        component.getEl('hexInput').value = newValue;
      }
    });
  });
});
