import { describe, it, expect } from 'vitest';
import { useKeyboardInteractionState } from '@/presentation/components/Scripts/View/Tree/TreeView/Node/UseKeyboardInteractionState';
import { expectExists } from '@tests/shared/Assertions/ExpectExists';
import { executeInComponentSetupContext } from '@tests/shared/Vue/ExecuteInComponentSetupContext';

describe('useKeyboardInteractionState', () => {
  describe('isKeyboardBeingUsed', () => {
    it('`false` initially', () => {
      // arrange
      const expectedValue = false;
      // act
      const { returnObject } = mountWrapperComponent();
      // assert
      const actualValue = returnObject.isKeyboardBeingUsed.value;
      expect(actualValue).to.equal(expectedValue);
    });

    it('`true` after any key is pressed', () => {
      // arrange
      const expectedValue = true;
      // act
      const { returnObject } = mountWrapperComponent();
      triggerKeyPress();
      // assert
      const actualValue = returnObject.isKeyboardBeingUsed.value;
      expect(actualValue).to.equal(expectedValue);
    });

    it('`false` after any key is pressed once detached', () => {
      // arrange
      const expectedValue = false;
      // act
      const { wrapper, returnObject } = mountWrapperComponent();
      wrapper.unmount();
      triggerKeyPress(); // should not react to it
      // assert
      const actualValue = returnObject.isKeyboardBeingUsed.value;
      expect(actualValue).to.equal(expectedValue);
    });
  });
});

function triggerKeyPress() {
  const eventSource: EventTarget = document;
  const keydownEvent = new KeyboardEvent('keydown', { key: 'a' });
  eventSource.dispatchEvent(keydownEvent);
}

function mountWrapperComponent() {
  let returnObject: ReturnType<typeof useKeyboardInteractionState> | undefined;
  const wrapper = executeInComponentSetupContext({
    setupCallback: () => {
      returnObject = useKeyboardInteractionState();
    },
    disableAutoUnmount: true,
  });
  expectExists(returnObject);
  return {
    returnObject,
    wrapper,
  };
}
