import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import NextableForm from 'react-native-nextable-form';

const styles = StyleSheet.create({
  input: {
    padding: 20,
    margin: 20,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderRadius: 10,
  },

  label: {
    paddingLeft: 20
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
  }
});

const CustomInput = forwardRef(({ label, ...props }, ref) => {
  return (
    <React.Fragment>
      <Text style={styles.label}>{label}</Text>
      <TextInput ref={ref} style={styles.input} {...props} />
    </React.Fragment>
  );
});

function CustomComponentScene() {
  function onDone() {
    alert('I am done with this form!');
  }

  return (
    <View>
      <NextableForm onDone={onDone} inputComponentTypes={[CustomInput, TextInput]}>
        <CustomInput autoFocus label="First name" />
        <CustomInput label="Last name" />

        <View style={styles.divider} />

        {/* Mixing components */}
        <TextInput style={styles.input} placeholder="Standard react native TextInput" />
      </NextableForm>
    </View>
  );
}

CustomComponentScene.navigationOptions = {
  title: 'Custom components form',
};

export default CustomComponentScene;
