import React from 'react';
import { StyleSheet, View } from 'react-native';
import NextableForm from 'react-native-nextable-form';
import styled from 'styled-components/native';

const StyledInput = styled.TextInput`
  padding: 20px;
  margin: 20px;
  border-color: black;
  border-width: 1;
  border-radius: 10;
  background: black;
  color: white;
`;

function StyledScreen() {
  function onDone() {
    alert('I am done with styled form!');
  }

  return (
    <View>
      <NextableForm onDone={onDone} inputComponentTypes={[StyledInput]}>
        <StyledInput placeholder="First name" />
        <StyledInput placeholder="Last name" />
        <StyledInput placeholder="Address" />
        <StyledInput placeholder="City" />
      </NextableForm>
    </View>
  );
}

StyledScreen.navigationOptions = {
  title: 'Styled components form'
};

export default StyledScreen;
