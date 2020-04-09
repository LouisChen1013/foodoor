import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { Icon } from "react-native-elements";
// import AsyncStorage
import { AsyncStorage } from 'react-native';
// import icons
var { height, width } = Dimensions.get('window');


export default class Food extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataFood: [],
            selectCatg: 0
        }
    }


    // Fetch the menu from API(tutofox)
    componentDidMount() {
        const url = "http://tutofox.com/foodapp/api.json"
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataFood: responseJson.food
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        const { navigation } = this.props;
        const restaurantName = navigation.getParam("restaurantName", 'No Restaurant Name');
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.text}>{restaurantName}</Text>
                </View>
                <View style={styles.middleContainer}>
                    <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
                        <View style={{ width: width, borderRadius: 20, backgroundColor: 'white' }}>
                            <FlatList
                                //horizontal={true}
                                data={this.state.dataFood}
                                numColumns={2}
                                renderItem={({ item }) => this._renderItemFood(item)}
                                keyExtractor={(item, index) => index.toString()}
                            />
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

    // Disply Food Item
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
                    <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                        {item.name}
                    </Text>
                    <Text style={{ fontSize: 14, textAlign: 'center' }}>Descp Food and Details</Text>
                    <Text style={{ fontSize: 20, color: "green" }}>${item.price}</Text>

                    <TouchableOpacity
                        onPress={() => this.onClickAddCart(item)}
                        style={{
                            width: (width / 2) - 40,
                            backgroundColor: '#339e66ff',
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

    // Add item to the cart in local storage, and can be retrieve after 
    onClickAddCart(data) {

        const itemcart = {
            food: data,
            quantity: 1,
            price: data.price
        }

        AsyncStorage.getItem('cart').then((datacart) => {
            if (datacart !== null) {
                // We have data!!
                const cart = JSON.parse(datacart)
                cart.push(itemcart)
                AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
            else {
                const cart = []
                cart.push(itemcart)
                AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
            alert("Add Cart")
        })
            .catch((err) => {
                alert(err)
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 15,
        // alignItems: "center",
    },
    textstyle: {
        color: 'white'
    },
    topContainer: {
        flex: 1,
        height: '5%',
        alignItems: "center"
    },
    middleContainer: {
        height: '85%'
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
    imageFood: {
        width: ((width / 2) - 20) - 10,
        height: ((width / 2) - 20) - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    divFood: {
        width: (width / 2) - 20,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        shadowOpacity: 0.3,
        shadowRadius: 50,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    }

});



