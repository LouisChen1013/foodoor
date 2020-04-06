import React, { Component } from 'react';
import { View, Button, Alert } from 'react-native';
import NavHeaderRight from '../components/NavHeaderRight';



export default class FoodDetails extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {

            headerRight: (
            <NavHeaderRight toScreen={'OrderSummary'} buttonText={'View Basket'} />
            ),
        };
    };


}
//



