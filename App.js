import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import FoodList from './src/screens/FoodList';
import FoodDetails from './src/screens/FoodDetails';
import OrderSummary from './src/screens/OrderSummary';

const RootStack = createStackNavigator(
    {

        Menu: {

            screen: FoodList,
        },

        Order: {
            screen: OrderSummary,
        }
    },
    {
        initialRouteName: 'Menu',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}