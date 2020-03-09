import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';
import Voice from 'react-native-voice';

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
import Geolocation from '@react-native-community/geolocation';

let mag = {};
let gps = {};
let coordsArr = [];

const toggleMeasurements = isRunning => {
  const magSubscription = magnetometer.subscribe(
    ({x, y, z, timestamp}) => (mag[timestamp] = {x: x, y: y, z: z}),
    error => console.log('magnetometer not available'),
  );
  if (!isRunning) {
    magSubscription.unsubscribe();
  }
};

const submitMeasures = (mag, isRunning, myRide) => {
  console.log('submiting to database');
  if (isRunning) {
    mag = toggleMeasurements(false);
  }
  myRide.doc('magnemometer').set(mag, {merge: true});
  myRide.doc('gps').set(gps, {merge: true});
};

const InRide = ({route}) => {
  const {myRide} = route.params;

  setUpdateIntervalForType(SensorTypes.magnetometer, 400); // defaults to 100ms
  setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms
  setUpdateIntervalForType(SensorTypes.gyroscope, 400); // defaults to 100ms
  setUpdateIntervalForType(SensorTypes.barometer, 400); // defaults to 100ms

  const [isRunning, setIsRunning] = useState();
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // const [error, setError] = useState("");
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [voiceState, setVoice] = useState({
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
  })
  Voice.onSpeechStart = e => {
    //Invoked when .start() is called without error
    console.log("I heard a voice")
    console.log('onSpeechStart: ', e);
    setVoice({
      started: '√',
    });
  };

  Voice.onSpeechEnd = e => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    setVoice({
      end: '√',
    });
  };

  Voice.onSpeechError = e => {
    //Invoked when an error occurs. 
    console.log('onSpeechError: ', e);
    setVoice({
      error: JSON.stringify(e.error),
    });
  };

  Voice.onSpeechResults = e => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    setVoice({
      results: e.value,
    });
  };

  Voice._onSpeechRecognized = e => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    setVoice({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = e => {
    //Invoked when pitch that is recognized changed
    console.log('onSpeechVolumeChanged: ', e);
    setVoice({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    
    setVoice({
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });

    try {
      await Voice.start('en-US');
      console.log("compltednwaitt")
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
      console.log("Stoped")
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
    setVoice({
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      pos => {
        if (isRunning) {
          gps[pos.timestamp] = pos.coords;
          coordsArr = [
            {
              longitude: pos.coords.longitude,
              latitude: pos.coords.latitude,
            },
            ...coordsArr,
          ];
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        }
        setRegion({
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        });
      },
      e => console.log(e.message),
      {
        timeout: 20000,
        enableHighAccuracy: true,
        maximumAge: 0,
        distanceFilter: 0.1,
      },
    );
    return () => Geolocation.clearWatch(watchId);
  }, [isRunning]);

  const playPause = () => {
    toggleMeasurements(isRunning, myRide);
    setIsRunning(!isRunning);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Polyline
          coordinates={coordsArr}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          // strokeColors={[
          //   '#7F0000',
          //   '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
          //   '#B24112',
          //   '#E5845C',
          //   '#238C23',
          //   '#7F0000',
          // ]}
          strokeWidth={6}
        />
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={playPause}
          style={[
            styles.button,
            isRunning === true ? styles.clickedButton : styles.unClickedButton,
          ]}>
          <Text style={styles.text}>
            {isRunning === true ? 'pause ride' : 'start ride'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{_startRecognizing()}}
            style={[
              styles.button,
              isRunning === true ? styles.clickedButton : styles.unClickedButton,
            ]}>
            <Text style={styles.text}>
              Microphone
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{_stopRecognizing()}}
            style={[
              styles.button,
              isRunning === true ? styles.clickedButton : styles.unClickedButton,
            ]}>
            <Text style={styles.text}>
              stop mic
          </Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.submit]}
          onPress={() => {
            submitMeasures(mag, isRunning, myRide);
          }}>
          <Text style={styles.text}>send to database</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    paddingHorizontal: 30,
    alignSelf: 'center',
    bottom: 50,
  },
  text: {
    fontSize: 15,
    color: Colors.white,
  },
  clickedButton: {
    backgroundColor: '#72574a',
  },
  unClickedButton: {
    backgroundColor: '#4A6572',
  },
  submit: {
    marginTop: 10,
    backgroundColor: '#F9AA33',
  },
  button: {
    alignItems: 'center',
    paddingHorizontal: 30,
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
