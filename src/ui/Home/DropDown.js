import React, {useState} from 'react';
import {
  Picker
} from 'react-native';



//
const DropDown= (option, setOption) => {

      return (
        <Picker
          selectedValue={option}
          style={{height: 50, width: 100}}
          onValueChange={(option) => setOption(option)}>
          <Picker.Item label="beginner" value="beginner" />
          <Picker.Item label="intermediate" value="intermediate" />
          <Picker.Item label="advanced" value="advanced" />
        </Picker>

      );

  };
export default DropDown;
