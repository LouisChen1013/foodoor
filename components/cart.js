import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { Icon } from "react-native-elements";
// import AsyncStorage
import { AsyncStorage } from 'react-native';
// import icons
var { height, width } = Dimensions.get('window');
import NavHeaderRight from '../components/navHeaderRight';


export default class Cart extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: () =>
                <NavHeaderRight toScreen={'Food'} buttonText={'Back'} />
        };
    };


    constructor(props) {
        super(props);
        this.state = {
            dataCart: [],
        };
    }

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


    render() {

        return (
            <View style={styles.container}>
                <View style={styles.middleContainer}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 20 }} />
                        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#33c37d" }}>Cart food</Text>
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

                                <TouchableOpacity style={{
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


    _renderItemFood(item) {
        let catg = this.state.selectCatg
        if (catg == 0 || catg == item.categorie) {
            return (
                <TouchableOpacity style={styles.divFood}>
                    <Image
                        style={styles.imageFood}
                        resizeMode="contain"
                        source={{ uri: item.image }} />
                    <View style={{ height: ((width / 2) - 20) - 90, backgroundColor: 'transparent', width: ((width / 2) - 20) - 10 }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>
                        {item.name}
                    </Text>
                    <Text>Descp Food and Details</Text>
                    <Text style={{ fontSize: 20, color: "green" }}>${item.price}</Text>

                    <TouchableOpacity
                        onPress={() => this.onClickAddCart(item)}
                        style={{
                            width: (width / 2) - 40,
                            backgroundColor: '#33c37d',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "center",
                            borderRadius: 5,
                            padding: 4
                        }}>
                        <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Add Cart</Text>
                        <View style={{ width: 10 }} />
                        <Icon type='ionicon' name="ios-add-circle" size={30} color={"white"} />
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        }
    }

    onLoadTotal() {
        var total = 0
        const cart = this.state.dataCart

        for (var i = 0; i < cart.length; i++) {
            total = total + (cart[i].price * cart[i].quantity)
        }
        return total
    }

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



