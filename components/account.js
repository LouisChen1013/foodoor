import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';
import { Icon, Button } from "react-native-elements";

export default class Account extends Component {
    constructor() {
        super();
        this.state = {
            uid: ''
        }
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('Login')
        })
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        this.state = {
            displayName: firebase.auth().currentUser.displayName,
            uid: firebase.auth().currentUser.uid,
            email: firebase.auth().currentUser.email
        }
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.textStyle}>
                        Hello, {this.state.displayName}
                    </Text>
                    <Text style={styles.textStyle}>{this.state.email}</Text>
                    <Button
                        color="#3740FE"
                        title="Logout"
                        onPress={() => this.signOut()}
                    />
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textStyle: {
        fontSize: 20,
        marginBottom: 10
    },
    topContainer: {
        height: '90%',
        justifyContent: "center",
        alignItems: "center",
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
