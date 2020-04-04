import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';


export default class Signup extends Component {

    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            isLoading: false,
            emailErrorMessage: '',
            passwordErrorMessage: '',
            usernameErrorMessage: ''
        }
    }

    // handling user input (update when user type)
    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    // handling the user registration 
    registerUser = () => {
        if (this.state.displayName === '') {
            this.setState({
                usernameErrorMessage: 'Please Enter Your Name'
            })
        }
        else if (this.state.email === '' || /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(this.state.email) == false) {
            this.setState({
                emailErrorMessage: 'Please Enter Valid Email',
                usernameErrorMessage: ''
            })
        } else if (this.state.password === '' || this.state.password.length < 5) {
            this.setState({
                passwordErrorMessage: 'Please Enter Your Password (at least 6 characters)',
                usernameErrorMessage: '',
                emailErrorMessage: ''

            })
        }
        else {
            this.setState({
                isLoading: true,
                emailErrorMessage: '',
                passwordErrorMessage: '',
                usernameErrorMessage: ''
            })
            firebase
                .auth()
                // method to sign up via Firebase API
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: this.state.displayName
                    })
                    console.log('User registered successfully!')
                    alert("You have registered successfully! Please login")
                    this.setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: ''
                    })
                    this.props.navigation.navigate('Login')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#2119bf" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Input
                    containerStyle={styles.inputContainer}
                    placeholder='Name'
                    leftIconContainerStyle={styles.iconStyle}
                    leftIcon={
                        <Icon
                            name='user'
                            type='font-awesome'
                            size={20}
                            color='grey'
                        />
                    }
                    value={this.state.displayName}
                    onChangeText={(val) => this.updateInputVal(val, 'displayName')}
                    errorMessage={this.state.usernameErrorMessage}
                />
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
                    title="Sign Up"
                    onPress={() => this.registerUser()}
                />
                <Text
                    style={styles.loginText}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    Already Registered? Click here to login
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
    inputContainer: {
        marginBottom: 10
    },
    loginText: {
        color: '#3740FE',
        marginTop: 35,
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
    }
});