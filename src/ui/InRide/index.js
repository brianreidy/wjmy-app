import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import setUpUser from '../../arch/setUpUser';
import writeData from '../../arch/writeData';


import {
  magnetometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import Geolocation from "@react-native-community/geolocation";

let mag = {};
let gps = {};

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



const submitMeasures = (mag, collect, myRide) => {
  console.log("submiting to database")
  if (collect) {
    mag = toggleMeasurements(false)
  } 
  myRide.doc("magnemometer").set(mag, {merge: true})
  myRide.doc("gps").set(gps, {merge: true})
}

const InRide = ({route}) => {
  const {myRide} = route.params;

  setUpdateIntervalForType(SensorTypes.magnetometer, 400); // defaults to 100ms
  setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms
  setUpdateIntervalForType(SensorTypes.gyroscope, 400); // defaults to 100ms
  setUpdateIntervalForType(SensorTypes.barometer, 400); // defaults to 100ms

  const [collect, setCollect] = useState(true);
  // const [error, setError] = useState("");
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  });
  useEffect(() => {
    console.log("using effect)")
    const watchId = Geolocation.watchPosition(
      pos => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
        if (collect) {
          (gps[pos.timestamp]=pos.coords)
        }
        //console.log(pos.coords)
        //console.log(pos.timestamp)
      },
      e => console.log(e.message),
      {
        timeout: 20000,
        enableHighAccuracy: true,
        maximumAge: 0,
        distanceFilter: .1
      },
    );
    console.log(watchId)
    return () => Geolocation.clearWatch(watchId), console.log("done");
  }, []);
  //Geolocation.clearWatch(watchId)
    // return () => ;
  //}, []);


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
