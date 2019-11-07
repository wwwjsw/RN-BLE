import React, { useState, useEffect } from "react";
import { View, TouchableHighlight, Text, FlatList } from 'react-native';
import BleManager from 'react-native-ble-manager';

const App = () => {
    const [scanning, setScanning] = useState(false);
    const [devices, setDevices] = useState(new Map());
    const [appState, setAppState] = useState();
    useEffect(() => {
        BleManager.start({showAlert: false});
    });

    const list = Array.from(devices.values());

    const startScan = () => {
        if (!scanning) {
            setDevices({devices: new Map()});
            BleManager.scan([], 10, true).then((results) => {
            console.log('Scanning...');
            setScanning({scanning:true});
          });
        }
    }
    return (
        <View>
            <TouchableHighlight onPress={() => startScan() }>
                <Text>Scan Bluetooth ({scanning ? 'on' : 'off'})</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.retrieveConnected() }>
                <Text>Retrieve connected peripherals</Text>
            </TouchableHighlight>
            <View>
                {(list.length == 0) &&
                <View style={{flex:1, margin: 20}}>
                    <Text style={{textAlign: 'center'}}>No peripherals</Text>
                </View>
                }
                <FlatList
                    data={list}
                    renderItem={({ item }) => this.renderItem(item) }
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
};

export default App;