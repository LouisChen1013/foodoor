import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';



export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            emailErrorMessage: '',
            passwordErrorMessage: '',
            lat: '',
            long: '',
        }
    }

    _getLocationPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationPermission: false,
            });
        } else {
            this.setState({
                locationPermission: true
            });
        }
    };

    componentDidMount() {
        this._getLocationPermissions();
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('My position: ' + position.coords.latitude + ', ' + position.coords.longitude);
            this.setState({
                // position: coordinates
                lat: position.coords.latitude,
                long: position.coords.longitude
            })
        },
            (error) => alert(JSON.stringify(error)));
    }

    // handling user input (update when user type)
    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    // handling the user login 
    userLogin = () => {
        var errorCode;
        var errorMessage;
        if (this.state.email === '' || /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(this.state.email) == false) {
            this.setState({
                emailErrorMessage: 'Please Enter Valid Email',
            })
        } else if (this.state.password === '' || this.state.password.length < 5) {
            this.setState({
                passwordErrorMessage: 'Please Enter Your Password',
                emailErrorMessage: ''

            })
        } else {
            this.setState({
                isLoading: true,
                emailErrorMessage: '',
                passwordErrorMessage: '',
            })
            firebase
                .auth()
                // method to login via Firebase API
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    console.log(res)
                    console.log('User has logged in successfully!')
                    this.setState({
                        isLoading: false,
                        email: '',
                        password: ''
                    })
                    this.props.navigation.navigate('Dashboard',
                        {
                            lat: this.state.lat,
                            long: this.state.long
                        })
                })
                .catch(error => {
                    errorCode = error.code;
                    errorMessage = error.message;
                    if (errorCode) {
                        alert(error.message);
                        this.setState({
                            isLoading: false,
                            email: '',
                            password: ''
                        })
                        this.props.navigation.navigate('Login')
                    }
                });
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Input
                    containerStyle={styles.inputContainer}
                    placeholder='Email'
                    leftIconContainerStyle={styles.iconStyle}
                    leftIcon={
                        <Icon
                            name='envelope'
                            type='font-awesome'
                            size={18}
                            color='grey'
                        />
                    }
                    value={this.state.email}
                    onChangeText={(val) => this.updateInputVal(val, 'email')}
                    errorMessage={this.state.emailErrorMessage}
                />
                <Input
                    containerStyle={styles.inputContainer}
                    placeholder='Password'
                    leftIconContainerStyle={styles.iconStyle}
                    leftIcon={
                        <Icon
                            name='lock'
                            type='font-awesome'
                            size={20}
                            color='grey'
                        />
                    }
                    value={this.state.password}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                    maxLength={15}
                    secureTextEntry={true}
                    errorMessage={this.state.passwordErrorMessage}
                />
                <Button
                    containerStyle={{ marginTop: 30 }}
                    raised
                    color="#2735e8"
                    title="Sign In"
                    onPress={() => this.userLogin()}
                />

                <Text
                    style={styles.loginText}
                    onPress={() => this.props.navigation.navigate('Signup')}>
                    Don't have account? Click here to sign up
        </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    iconStyle: {
        marginRight: 10
    }, inputContainer: {
        marginBottom: 10
    }
});