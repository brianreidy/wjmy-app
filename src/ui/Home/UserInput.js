import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const UserInput = ({text, setText}) => {
  return (
    <TextInput
      style={styles.textInput}
      onChangeText={t => setText(t)}
      value={text}
    />
  );
};
const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
export default UserInput;
