/**
 * @jest-environment jsdom
 */
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { mount } from 'enzyme';
import NextableForm from '../src';

test('renders form with TextInputs', () => {
  const mounted = mount(
    <NextableForm>
      <TextInput placeholder="Test" testID="first" />
      <TextInput placeholder="Test 1" testID="second" />
    </NextableForm>
  );

  const first = mounted
    .find('TextInput')
    .findWhere(x => x.prop('testID') === 'first')
    .first()
    .props();

  const second = mounted
    .find('TextInput')
    .findWhere(x => x.prop('testID') === 'second')
    .first()
    .props();

  expect(first.returnKeyType).toBe('next');
  expect(first.blurOnSubmit).toBe(false);

  expect(second.returnKeyType).toBe('done');
  expect(second.blurOnSubmit).toBe(true);
});

test('renders form with custom components', () => {
  const CustomInput = React.forwardRef(({ testID, ...props }: TextInputProps, ref) => {
    return <TextInput ref={ref as any} {...props} />;
  });

  const mounted = mount(
    <NextableForm inputComponentTypes={[ CustomInput ]}>
      <CustomInput placeholder="Test" testID="first" />
      <CustomInput placeholder="Test 1" testID="second" />
    </NextableForm>
  );

  const first = mounted
    .find('CustomInput')
    .findWhere(x => x.prop('testID') === 'first')
    .first()
    .props();

  const second = mounted
    .find('CustomInput')
    .findWhere(x => x.prop('testID') === 'second')
    .first()
    .props();

  expect(first.returnKeyType).toBe('next');
  expect(first.blurOnSubmit).toBe(false);

  expect(second.returnKeyType).toBe('done');
  expect(second.blurOnSubmit).toBe(true);
});
