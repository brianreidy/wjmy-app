/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import setUpUser from '../../arch/setUpUser';
import getFitbitData from './getFitbitData';

// import firebase from '@react-native-firebase/app';
// import database from '@react-native-firebase/database';
const submitMeasures = (gps, mag, gyro, bar, acc, voice, heartRate, myRide) => {
  if (heartRate == null) {
    Alert.alert(
      'Fitbit data not gathered',
      'Do you want to send to the database anyway',
      [
        {
          text: "Don't Send",
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'SEND',
          onPress: () => {
            let obj = {}
              try {
                myRide.doc('magnemometer').set(Object.assign(obj, mag), {merge: true});
              } catch {
                console.log("Magnemometer data not collected")
              }
              obj = {}
              try {
                myRide.doc('gyroscope').set(Object.assign(obj, gyro), {merge: true});
              } catch {
                console.log("Gyroscope data not collected")
              }
              obj = {}
              try {
                myRide.doc('barometer').set(Object.assign(obj, bar), {merge: true});
              } catch {
                console.log("Barometer data not collected")
              }
              obj = {}
              try {
                myRide.doc('accelerometer').set(Object.assign(obj, acc), {merge: true});
              }
              catch {
                console.log("Accelerometer data not collected")
              }
              obj = {}
              try {
                myRide.doc('gps').set(Object.assign(obj, gps), {merge: true});
              } catch {
                console.log("GPS data not collected")
              }
              obj = {}
              try {
                myRide.doc('voice').set(Object.assign(obj, voice), {merge: true});
              } catch {
                console.log("Voice data not collected")
              }
  
          },
        },
      ],
      {cancelable: false},
    );
  } else {
    let obj = {}
    try {
      myRide.doc('magnemometer').set(Object.assign(obj, mag), {merge: true});
    } catch {
      console.log("Magnemometer data not collected")
    }
    obj = {}
    try {
      myRide.doc('gyroscope').set(Object.assign(obj, gyro), {merge: true});
    } catch {
      console.log("Gyroscope data not collected")
    }
    obj = {}
    try {
      myRide.doc('barometer').set(Object.assign(obj, bar), {merge: true});
    } catch {
      console.log("Barometer data not collected")
    }
    obj = {}
    try {
      myRide.doc('accelerometer').set(Object.assign(obj, acc), {merge: true});
    }
    catch {
      console.log("Accelerometer data not collected")
    }
    obj = {}
    try {
      myRide.doc('gps').set(Object.assign(obj, gps), {merge: true});
    } catch {
      console.log("GPS data not collected")
    }
    obj = {}
    try {
      myRide.doc('voice').set(Object.assign(obj, voice), {merge: true});
    } catch {
      console.log("Voice data not collected")
    }
    myRide.doc('heartrate').set(heartRate, {merge: true});
  }
};

const submitSensors = () => {
  
};

const Results: () => React$Node = ({route, navigation: {navigate}}) => {
  const {name, level, mag, gps, gyro, bar, voice, acc} = route.params;
  const [myRide, setRide] = useState();
  const [heartRate, setHeartRate] = useState();

  useEffect(() => {
    setRide(setUpUser(name, level));
  }, [name, level]);

  // const subscription = magnetometer.subscribe(({x, y, z, timestamp}) =>
  //   console.log({x, y, z, timestamp}),
  // );
  console.log('im hur ', heartRate);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Questions</Text>
              <Text style={styles.highlight}>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum."
              </Text>
              <TouchableOpacity
                style={[
                  styles.button,
                  level === 0 ? styles.clickedButton : styles.unClickedButton,
                ]}>
                <Text
                  style={
                    level === 0 ? styles.clickedText : styles.unClickedText
                  }>
                  Lorem ipsum dolor sit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  level === 1 ? styles.clickedButton : styles.unClickedButton,
                ]}>
                <Text
                  style={
                    level === 1 ? styles.clickedText : styles.unClickedText
                  }>
                  consectetur adipiscing elit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  level === 2 ? styles.clickedButton : styles.unClickedButton,
                ]}>
                <Text
                  style={
                    level === 2 ? styles.clickedText : styles.unClickedText
                  }>
                  sed do eiusmod tempor incididunt
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  level === 3 ? styles.clickedButton : styles.unClickedButton,
                ]}>
                <Text
                  style={
                    level === 3 ? styles.clickedText : styles.unClickedText
                  }>
                  Ut enim ad minim veniam, quis
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Go to Fitbit</Text>
              <TouchableOpacity
                style={[styles.button, styles.clickedButton]}
                onPress={() => getFitbitData(setHeartRate)}>
                <Text style={styles.clickedText}>Get Data From Fibit</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => submitMeasures(gps, mag, gyro, bar, acc, voice, heartRate, myRide)}
              style={[styles.button, styles.submit]}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
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
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  highlight: {
    paddingVertical: 5,
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default Results;
