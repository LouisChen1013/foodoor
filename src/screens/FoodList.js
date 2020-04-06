import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

import NavHeaderRight from '../components/NavHeaderRight';


const foods = [
    {
        id: 1,
        name: 'Spicy Teriyaki',
        price: 19.25,
        image: require('../../images/spicy-teriyaki.jpg'),
    },
    {
        id: 2,
        name: 'Honey Garlic Chicken',
        price: 5.5,
        image: require('../../images/honey-garlic-chicken.jpg'),
        restaurant_id: 26,
    },
    {
        id: 3,
        name: 'La-La White Bee Hoon',
        price: 15.94,
        image: require('../../images/white-bee-hoon.jpg'),
    },
    {
        id: 4,
        name: 'Sesame Chicken Noodle',
        price: 15.94,
        image: require('../../images/sesame-chicken-noodle.jpg'),
    },
    {
        id: 5,
        name: 'Fried Mee Sua with Shrimps and Scallop',
        price: 15.94,
        image: require('../../images/fried-mee-sua.jpg'),

    },
    {
        id: 6,
        name: 'Pork with Vegetables',
        price: 10.5,
        image: require('../../images/pork-with-veggies.jpg'),
    },
    {
        id: 7,
        name: 'BBQ Red Pork with Egg Noodles',
        price: 12.9,
        image: require('../../images/red-bbq-pork-noodles.jpg'),
    },
    {
        id: 8,
        name: 'Vietnamese Pho',
        price: 70,
        image: require('../../images/vietnamese-pho.jpg'),
    },
    {
        id: 9,
        name: 'Rice with Roasted Pork',
        price: 20.1,
        image: require('../../images/rice-with-roasted-pork.jpg'),
    },
    {
        id: 10,
        name: 'Tori Karaage',
        price: 30,
        image: require('../../images/tori-karaage.jpg'),
    },
    {
        id: 11,
        name: 'Salmon Sashimi',
        price: 80,
        image: require('../../images/salmon-sashimi.jpg'),
    },
    {
        id: 12,
        name: 'Gyoza',
        price: 40.99,
        image: require('../../images/gyoza.jpg'),
    },
];





export default class FoodList extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Menu',

        };
    };


    constructor(props) {
        super(props);
        this.state = {
            selectedItem: {},
            cart: [],

        };
    }



    addToCart(name, price, id) {
        console.log(name)
        console.log(price)

        let cart = this.state.cart;

        let selectedItem = {
            name: name,
            price: price,
            id: id
        };

        console.log(selectedItem)



        cart.push(selectedItem);

        this.setState({
            cart: cart
        });

        console.log(this.state.cart)


    }
    ;

    emptySelectedItem() {
        let selectedItem = this.state.selectedItem;
        this.setState({
            selectedItem: {}
        })

        console.log(selectedItem)

    }

    emptyCart() {
        let cart = this.state.cart;
        this.setState({
            cart: []

        })

        console.log(cart)
    }
    ;



    renderSeparator = () => {
        return (
            <View
            style={{
                height: 1,
                width: "90%",
                backgroundColor: "#CED0CE",
                marginLeft: "5%"

            }}
            />
        );
    };


    renderItem=(data) => (

        <View style = {styles.container}>
     <Text style={styles.lightText}>{data.item.name}</Text>
     <Text style={styles.lightText}>Price:{data.item.price}</Text>
     <Button
        title="Add to Cart"
        color="#f194ff"
        onPress={this.addToCart.bind(this,
            data.item.name, data.item.price, data.item.id)
        }
        />
     <Image style={styles.item_image} source={data.item.image}/>
     </View>
    );


    render() {

        return (
            <View style = {styles.container}>
            
            <Button
            title="Empty Cart"
            color="#f194ff"
            onPress={this.emptyCart.bind(this)
            }
            />

            <Button
            title="Submit order"
            color="#f194ff"
            onPress={() => this.props.navigation.navigate("Order", {
                cart: this.state.cart,
            })

            }
            />

            <FlatList
            data= {foods}
            ItemSeparatorComponent = {this.renderSeparator}
            renderItem= {item => this.renderItem(item)}
            keyExtractor= {item => item.id.toString()}
            />
    </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',

    },

    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
    },
    list: {
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#f5f5f5"
    },

    listContainer: {
        flex: 1
    },
    paragraph: {
        margin: 0,
        fontSize: 30
    },
    item_text: {
        backgroundColor: "hotpink"
    },
    item_image: {
        padding: 10,
        height: 200,
        width: 300
    },
    bottom_margin: {
        padding: 0
    },
    title: {
        fontSize: 40
    },

    keywordsearching: {
        paddingTop: 0,
        paddingLeft: 0,
        alignSelf: 'flex-start'


    },
    distance: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: 300,
        padding: 10
    },

    dropdown: {
        width: 150
    }

});
