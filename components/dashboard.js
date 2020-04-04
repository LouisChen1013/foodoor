import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';
import { Icon, SearchBar } from "react-native-elements";

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            uid: ''
        }
    }

    render() {
        return (
            // <View style={styles.container}>
            //     <Text style={styles.textStyle}>
            //         Hello, {this.state.displayName}
            //     </Text>

            //     <Button
            //         color="#3740FE"
            //         title="Logout"
            //         onPress={() => this.signOut()}
            //     />
            // </View>
            <View style={styles.container}>
                <View style={styles.topContainer}>

                </View>
                <View style={styles.middleContainer}>
                    <TouchableOpacity style={styles.requestDriver} onPress={() => this.props.navigation.navigate("DriverInformation")}>
                        <Text style={styles.textstyle}>Request Driver</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.buttomContainer1}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Dashboard")}>
                            <Icon name="home" type="material" size={35} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttomContainer2}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("")}>
                            <Icon name="directions-car" type="material" size={35} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttomContainer3}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Account")}>
                            <Icon name="account-circle" type="material" size={35} color={'white'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         display: "flex",
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 35,
//         backgroundColor: '#fff'
//     },
//     textStyle: {
//         fontSize: 15,
//         marginBottom: 20
//     }
// });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textstyle: {
        color: 'white'
    },
    topContainer: {
        height: '75%'
    },
    middleContainer: {
        height: '15%'
    },
    requestDriver: {
        backgroundColor: 'black',
        height: 50,
        width: 120,
        borderRadius: 25 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        height: '10%',
        color: 'grey',
    },
    buttomContainer1: {
        flex: 1,
        backgroundColor: 'black',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 0.5,
        borderRightColor: 'white',
    },
    buttomContainer2: {
        flex: 1,
        backgroundColor: 'black',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 0.5,
        borderRightColor: 'white',
    },
    buttomContainer3: {
        flex: 1,
        backgroundColor: 'black',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 0.5,
        borderRightColor: 'white',
    },
})
