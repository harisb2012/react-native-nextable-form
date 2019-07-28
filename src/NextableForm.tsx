import * as React from 'react';
import { TextInput } from 'react-native';

export interface NextableFormProps {
  children: any;

  /**
   * Called when 'done' button was pressed on the last input
   */
  onDone?: () => any;

  /**
   * Input components that we consider as input
   * Defaults to TextInput, but can simly be a wrapper around custom component
   */
  inputComponentTypes?: Array<any>;
}

const NextableForm = ({
  children,
  onDone = () => {},
  inputComponentTypes = [TextInput],
}: NextableFormProps) => {
  const allInputs: Array<any> = [];
  const allRefs: { [key: number]: any } = {};

  /**
   * This will find all nested elements in children
   * and execute custom function on them
   */
  function iterateOverAllComponents(children: React.ReactChildren, fn: Function) {
    return React.Children.map(children, (child: any) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      const validElement: JSX.Element = child;

      if (validElement.props.children) {
        child = React.cloneElement(validElement, {
          children: iterateOverAllComponents(validElement.props.children, fn),
        });
      }

      return fn(child);
    });
  }

  /**
   * This will first count all the inputs
   * so that we can decide which one is the last and make return type "done"
   */
  iterateOverAllComponents(children, (item: any) => {
    if (inputComponentTypes.indexOf(item.type) > -1) {
      allInputs.push(item);
    }

    return null;
  });

  /**
   * Clone each element that maches and add custom properties to it
   * to handle actions from keyboard
   */
  const nextChildren = iterateOverAllComponents(children, (item: any) => {
    if (inputComponentTypes.indexOf(item.type) > -1) {
      const currentInputIndex = allInputs.indexOf(item);
      const isLast = currentInputIndex === allInputs.length - 1;

      return React.cloneElement(item, {
        ref: (ref: any) => {
          allRefs[currentInputIndex] = ref;
        },

        /* The last one is 'done' */
        returnKeyType: isLast ? 'done' : 'next',

        /** This prevents rescrolling after pressing 'next' */
        blurOnSubmit: isLast ? true : false,

        onSubmitEditing: () => {
          if (isLast) {
            onDone();
          } else {
            const nextInputRef = allRefs[currentInputIndex + 1];
            if (nextInputRef) nextInputRef.focus();
          }
        },
      });
    }

    return item;
  });

  return <React.Fragment>{nextChildren}</React.Fragment>;
};

export default React.memo(NextableForm);
