import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import setUpUser from '../../arch/setUpUser';
import writeData from '../../arch/writeData';
import useGeolocation from '/locateRider';

import {
  magnetometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';

let mag = {};

const toggleMeasurements = (collect) => {
  const magSubscription = magnetometer.subscribe(
    ({x, y, z, timestamp}) =>
      (mag[timestamp]={x: x, y: y, z: z}),
    error => console.log('magnetometer not available'),
  );
  if (!collect) {
    magSubscription.unsubscribe();
    return mag
  }
};

const recordGPS = (collect) => {
  if (collect) {
    
  }
  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      pos => {
        setError("");
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      e => setError(e.message)
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);
}


const submitMeasures = (mag, collect, myRide) => {
  if (collect) {
    mag = toggleMeasurements(false)
  } 
  myRide.doc("magnemometer").set(mag, {merge: true})
}

const InRide = ({route}) => {
  const {myRide} = route.params;

  setUpdateIntervalForType(SensorTypes.magnetometer, 400); // defaults to 100ms
  setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms
  setUpdateIntervalForType(SensorTypes.gyroscope, 400); // defaults to 100ms
  setUpdateIntervalForType(SensorTypes.barometer, 400); // defaults to 100ms

  const [collect, setCollect] = useState(true);
  const [error, setError] = useState("");
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  });

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
      <TouchableOpacity
        style={[styles.button, styles.submit]}
        onPress={() => {submitMeasures(mag, collect, myRide)}}>
        <Text>Send ride data to database</Text>
      </TouchableOpacity>
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
