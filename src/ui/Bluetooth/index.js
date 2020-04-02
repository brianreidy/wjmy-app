import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, View, Button} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import {Table, Row, Rows} from 'react-native-table-component';

type Props = {};

const targetDeviceId = 'B8:27:EB:6F:C7:33';
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      scanning: false,
      findBeacons: [],
      tableHead: ['ID', 'NAME', 'RSSI', 'SERVICE UUID'],
      tableData: [],
    };
    this.manager = new BleManager();
    this.device = null;
    this.ring = this.ring.bind(this);
    this.cancelConnection = this.cancelConnection.bind(this);
    this.checkConnection = this.checkConnection.bind(this);
    this.connect = this.connect.bind(this);
  }

  componentWillMount() {
    const subscription = this.manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        console.log('startScan');
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(`SCAN_ERROR: ${error}`);
        // Handle error (scanning will be stopped automatically)
        return;
      }
      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      console.log('name: ', device.name, 'deviceId:', device.id);
      const row = [device.id, device.name, device.rssi, device.serviceUUIDs];

      if (device.id === targetDeviceId && this.device === null) {
        this.device = device;
        console.log('connected');
        // this.connectTo(device)
        this.setState(prevState => ({
          tableData: [row, ...prevState.tableData],
        }));
      }

      if (device.name === 'TI BLE Sensor Tag' || device.name === 'SensorTag') {
        // Stop scanning as it's not necessary if you are scanning for one device.
        this.manager.stopDeviceScan();

        // Proceed with connection.
      }
    });
  }

  ring() {
    this.manager
      .writeCharacteristicWithResponseForDevice(
        this.device.id,
        '8A17CFBC-83BB-4288-A850-51FCE4842CA8',
        'BEB5483E-36E1-4688-B7F5-EA07361B26A8',
        'YWJjZGVmZw==',
      )
      .then(res => {
        console.log(`WRITE RES ${res}`);
      })
      .catch(error => {
        console.log(`WRITE ERROR ${error}`);
      });
  }

  connect() {
    this.device
      .connect()
      .then(dev => {
        console.log('try to connect');
        return dev.discoverAllServicesAndCharacteristics();
      })
      .then(dev => {
        console.log('success to connect');
      })
      .catch(error => {
        console.log('connect error:' + error);
      });
  }

  cancelConnection() {
    this.device
      .cancelConnection()
      .then(res => {
        console.log('connection cancel');
        console.log(res);
      })
      .catch(err => {
        console.log('connection cancel error:' + err);
      });
  }

  checkConnection() {
    this.device
      .isConnected()
      .then(res => {
        console.log('connection check:' + res);
      })
      .catch(err => {
        console.log('connection check:' + err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row
            data={this.state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          <Rows data={this.state.tableData} textStyle={styles.text} />
        </Table>
        <Button title="Ring" onPress={this.ring}></Button>
        <Button title="Connect" onPress={this.connect}></Button>
        <Button
          title="Cancel Connection"
          onPress={this.cancelConnection}></Button>
        <Button
          title="Check Connection"
          onPress={this.checkConnection}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
