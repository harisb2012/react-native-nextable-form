import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import NextableForm from 'react-native-nextable-form';

const styles = StyleSheet.create({
  input: {
    padding: 20,
    margin: 20,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderRadius: 10
  }
});

function BasicScreen() {
  function onDone() {
    alert('I am done with this form!');
  }

  return (
    <View>
      <NextableForm onDone={onDone}>
        <TextInput style={styles.input} placeholder="First name" />
        <TextInput style={styles.input} placeholder="Last name" />
        <TextInput style={styles.input} placeholder="Address" />
        <TextInput style={styles.input} placeholder="City" />
      </NextableForm>
    </View>
  );
}

BasicScreen.navigationOptions = {
  title: 'Standard form'
};

export default BasicScreen;
