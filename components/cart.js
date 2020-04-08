import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { Icon } from "react-native-elements";
// import AsyncStorage
import { AsyncStorage } from 'react-native';
// import icons
var { height, width } = Dimensions.get('window');
import firebase from '../database/firebase';
import NavHeaderLeft from '../components/navHeaderLeft';


export default class Cart extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: () =>
                <NavHeaderLeft toScreen={'Food'} buttonText={'Back'} />
        };
    };


    constructor(props) {
        super(props);
        this.state = {
            dataCart: [],
        };
    }

    // Get the data from our local storage
    componentDidMount() {
        AsyncStorage.getItem('cart').then((cart) => {
            if (cart !== null) {
                // We have data!!
                const cartfood = JSON.parse(cart)
                this.setState({ dataCart: cartfood })
            }
        })
            .catch((err) => {
                alert(err)
            })
    }

    // Send email confirmation using Post method and sendgrid API
    sendEmail = () => {
        // console.log(this.state.dataCart)
        const email_cart = [];
        for (var i = 0; i < this.state.dataCart.length; i++) {
            email_cart.push('Name: ' + this.state.dataCart[i].food.name + ' ' + 'Quantity: ' + this.state.dataCart[i].quantity + '\n');
        }
        const email_cart_string = email_cart.toString().replace(/,/g, "")
        // console.log(email_cart_string)
        let body = { "personalizations": [{ "to": [{ "email": firebase.auth().currentUser.email }], "subject": "Thank you for your order at Foodoor" }], "from": { "email": "chenhonglin1013@hotmail.com" }, "content": [{ "type": "text/plain", "value": "We've received your order, and the restaurant will have your food ready soon. Please be patient, and we will deliver the food to you as soon as possible. Below is your order summary\n\n" + email_cart_string + '\nTotal Price: ' + total_price + "\n\nIf you have any further questions, please contact customer service at 1234@gmail.com or call 123-4567-8910" }] }
        return fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + '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',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        });
    }



    // sendEmail = () => {
    //     let body = { "personalizations": [{ "to": [{ "email": firebase.auth().currentUser.email }], "subject": "Thank you for your order at Foodoor" }], "from": { "email": "chenhonglin1013@hotmail.com" }, "content": [{ "type": "text/plain", "value": "We've received your order, and the restaurant will have your food ready soon. Please be patient, and we will deliver the food to you as soon as possible. If you have any further questions, please contact customer service at 1234@gmail.com or call 123-4567-8910" }] }
    //     this.setState({
    //         dataCar: []
    //     })
    //     Alert.alert(
    //         'Thank you!',
    //         'Please check your email for your order!',
    //         [
    //             {
    //                 text: 'Got it!',
    //                 onPress: () => this.props.navigation.navigate("Dashboard")
    //             }
    //         ]
    //     )
    //     AsyncStorage.setItem('cart', "");
    //     return fetch('https://api.sendgrid.com/v3/mail/send', {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': 'Bearer ' + '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',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(body),
    //     }).then((response) => {
    //         return response;
    //     }).catch((error) => {
    //         return error;
    //     });
    // }



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.middleContainer}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 20 }} />
                        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#33c37d" }}>Your Cart</Text>
                        <View style={{ height: 10 }} />

                        <View style={{ flex: 1 }}>

                            <ScrollView>

                                {
                                    this.state.dataCart.map((item, i, index) => {
                                        return (
                                            <View style={{ width: width - 20, margin: 10, backgroundColor: 'transparent', flexDirection: 'row', borderBottomWidth: 2, borderColor: "#cccccc", paddingBottom: 10 }}>
                                                <Image resizeMode={"contain"} style={{ width: width / 3, height: width / 3 }} source={{ uri: item.food.image }} />
                                                <View style={{ flex: 1, backgroundColor: 'trangraysparent', padding: 10, justifyContent: "space-between" }}>
                                                    <View>
                                                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.food.name}</Text>
                                                        <Text>Lorem Ipsum de food</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={{ fontWeight: 'bold', color: "#33c37d", fontSize: 20 }}>${item.price * item.quantity}</Text>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <TouchableOpacity onPress={() => this.onChangeQual(i, false)}>
                                                                <Icon type='ionicon' name="ios-remove-circle" size={35} color={"#33c37d"} />
                                                            </TouchableOpacity>
                                                            <Text style={{ paddingHorizontal: 8, fontWeight: 'bold', fontSize: 18 }}>{item.quantity}</Text>
                                                            <TouchableOpacity onPress={() => this.onChangeQual(i, true)}>
                                                                <Icon type='ionicon' name="ios-add-circle" size={35} color={"#33c37d"} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                }

                                <View style={{ height: 20 }} />

                                <Text style={{ fontSize: 28, color: "#33c37d", textAlign: 'center' }}>${this.onLoadTotal()}</Text>

                                <TouchableOpacity
                                    onPress={() => { this.sendEmail(); this.emptyCart(); }}
                                    // onPress={this.sendEmail}
                                    style={{
                                        backgroundColor: "#33c37d",
                                        width: width - 40,
                                        alignItems: 'center',
                                        padding: 10,
                                        borderRadius: 5,
                                        margin: 20
                                    }}>
                                    <Text style={{
                                        fontSize: 24,
                                        fontWeight: "bold",
                                        color: 'white'
                                    }}>
                                        CHECKOUT
                                    </Text>
                                </TouchableOpacity>
                            </ScrollView>

                        </View>

                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.buttomContainer1}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Dashboard")}>
                            <Icon name="restaurant" type="material" size={35} color={'white'} />
                            <Text style={{ color: 'white' }}>Restaurants</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttomContainer2}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Cart")}>
                            <Icon name="shopping-cart" type="material" size={35} color={'white'} />
                            <Text style={{ color: 'white' }}>Cart</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttomContainer3}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Account")}>
                            <Icon name="account-circle" type="material" size={35} color={'white'} />
                            <Text style={{ color: 'white' }}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    // Calculate Total Price
    onLoadTotal = () => {
        var total = 0
        const cart = this.state.dataCart

        for (var i = 0; i < cart.length; i++) {
            total = total + (cart[i].price * cart[i].quantity)
        }
        global.total_price = total;

        return total
    }

    // Handle quantity change 
    onChangeQual(i, type) {
        const dataCar = this.state.dataCart
        let cantd = dataCar[i].quantity;

        if (type) {
            cantd = cantd + 1
            dataCar[i].quantity = cantd
            this.setState({ dataCart: dataCar })
            AsyncStorage.setItem('cart', JSON.stringify(dataCar));
        }
        else if (type == false && cantd >= 2) {
            cantd = cantd - 1
            dataCar[i].quantity = cantd
            this.setState({ dataCart: dataCar })
            AsyncStorage.setItem('cart', JSON.stringify(dataCar));
        }
        else if (type == false && cantd == 1) {
            dataCar.splice(i, 1)
            this.setState({ dataCart: dataCar })
            AsyncStorage.setItem('cart', JSON.stringify(dataCar));
        }

    }

    // Empty Cart after oder
    emptyCart = () => {

        // this.setState({
        //     dataCar: []
        // })
        Alert.alert(
            'Thank you!',
            'Please check your email for your order!',
            [
                {
                    text: 'Got it!',
                    onPress: () => {
                        this.setState({
                            dataCar: []
                        }); this.props.navigation.navigate("Dashboard")
                    }
                    // onPress: () => this.props.navigation.navigate("Dashboard")
                    // onPress={() => { this.sendEmail(); this.emptyCart(); }}
                }
            ]
        )
        AsyncStorage.setItem('cart', "");
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
    },
    textstyle: {
        color: 'white'
    },
    middleContainer: {
        height: '90%'
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
    }
});



