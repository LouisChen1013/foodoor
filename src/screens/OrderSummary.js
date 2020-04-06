import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

import NavHeaderRight from '../components/NavHeaderRight';



export default class OrderSummary extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Order',
            headerRight: (
            <NavHeaderRight toScreen={'Menu'} buttonText={'Back'} />
            ),
        };
    };


    constructor(props) {
        super(props);
        this.state = {
            selectedItem: {},
            cart: [],

        };
    }

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

     </View>
    );

    render() {
        const {navigation} = this.props;
        const cart = navigation.getParam('cart', 'None')
        const newCart = [];
        cart.forEach(obj => {
            if (!newCart.some(o => o.name === obj.name)) {
                newCart.push({
                    ...obj
                })
            }

        });

        return (
            <View style = {styles.container}>
             <FlatList
            data= {newCart}
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

    containerrow: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'flex-start',
        flexDirection: 'row',

    },



});
