import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import setUpUser from '../../arch/setUpUser';
import writeData from '../../arch/writeData';

import {
  magnetometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

let mag = [];

const toggleMeasurements = (collecting, myRide) => {
  const magSubscription = magnetometer.subscribe(
    ({x, y, z, timestamp}) =>
      (mag = mag.concat({timestamp: timestamp, points: {x: x, y: y, z: z}})),
  );
  if (!collecting) {
    magSubscription.unsubscribe();
    myRide.set({mag: mag});
  }
};

// const acc_subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
//   compileData(x,y,z, timestamp)
// );
// const gyr_subscription = gyroscope.subscribe(({ x, y, z, timestamp }) =>
//   compileData(x,y,z, timestamp)
// );
// const bar_subscription = barometer.subscribe(({ pressure }) =>
//   compileData(x,y,z, timestamp)
// );

const InRide = props => {
  const {route} = props;
  const {params} = route;
  const {myRide} = params;
  setUpdateIntervalForType(SensorTypes.magnetometer, 400); // defaults to 100ms
  setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms
  setUpdateIntervalForType(SensorTypes.gyroscope, 400); // defaults to 100ms
  setUpdateIntervalForType(SensorTypes.barometer, 400); // defaults to 100ms

  const [collect, setCollect] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Hello World!</Text>
      <TouchableOpacity
        onPress={() => {
          toggleMeasurements(collect, myRide);
          setCollect(!collect);
        }}
        style={[
          styles.button,
          collect === true ? styles.clickedButton : styles.unClickedButton,
        ]}>
        <Text
          style={collect === true ? styles.clickedText : styles.unClickedText}>
          {collect === true ? 'start ride' : 'pause ride'}
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={[styles.button, styles.submit]}
        onPress={() => submitMeasures()}>
        <Text>Send ride data to database</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  clickedText: {
    color: Colors.white,
  },
  unClickedText: {
    color: Colors.black,
  },
  clickedButton: {
    backgroundColor: '#4A6572',
  },
  unClickedButton: {
    backgroundColor: Colors.lighter,
  },
  submit: {
    marginTop: 40,
    backgroundColor: '#F9AA33',
  },
  button: {
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 20,
    marginVertical: 5,
    borderRadius: 8,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default InRide;
