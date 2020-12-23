import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }
    getCameraPermission=async()=>{
        const status= await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: statue==='granted',
        })
    }
    handleBarcodeScan=async({type, data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal',
        })
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState === 'clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner onBarCodeScanned={scanned?undefined: this.handleBarcodeScan}
                style={styles.absoluteFillObject}/>
            )
        } else if (buttonState === 'normal'){
            return(
                <View style={styles.container}>
                    <Text style={styles.displayText}>{hasCameraPermissions ? this.state.scannedData : "Scan Barcode"}</Text>
                    <Text style={styles.displayFineText}>Tap Scanner Icon to Request Permission</Text>
                    <TouchableOpacity
                    onPress={this.getCameraPermission}>
                        <Image style={styles.scannerImg} source={require('../assets/scanner.jpg')}/>
                    </TouchableOpacity>
                </View>
            );
        }
        
     }
    }


const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText: {
        fontSize: 25,
        color: 'deepskyblue',
        fontWeight: 'bold',
    },
    scanButton:{
        backgroundColor: '#2196f3',
        padding: 10,
        margin: 10
    },
    buttonText:{
        fontSize: 20,
        color: '#ffffff',
    },
    displayFineText:{
        fontSize: 15,
        textDecorationLine: 'underline',

    },
    scannerImg:{
        height: 100,
        width: 100,
        margin: 20,
    }
})