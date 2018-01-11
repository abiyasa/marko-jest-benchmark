const path = require('path');
const { initComponent, createTestSandbox } = require('marko-jest/test-utils');

describe('color-picker-selection', () => {
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
    beforeEach(async () => {
      component = await testSandbox.renderComponent(componentClass, { color: '#333745' });
    });

    it('should render the component with inline style containing the bg color', () => {
      expect(component.el.getAttribute('style')).toContain('background-color:#333745');
    });

    describe('when clicked', () => {
      let spyOnColorSelected;
      beforeEach(() => {
        spyOnColorSelected = jest.fn();
        component.on('colorSelected', spyOnColorSelected);

        component.el.click();
      });

      it('should emit event "colorSelcted"', () => {
        expect(spyOnColorSelected).toHaveBeenCalled();
      });
    });
  });
});
