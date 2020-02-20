import React, {useState} from 'react';
import {
  TextInput
} from 'react-native';



const UserInput= (text, setText) => {

    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => {setText(text)}}
        value={text}
      />

    );
  };

export default UserInput;
