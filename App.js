import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import ActionBarImage from "./components/ActionBarImage";
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Account from './components/account';
import CategoryScreen from './components/categoryScreen';




const RootStack = createStackNavigator(
  {
    Signup: {
      screen: Signup
    },
    Login: {
      screen: Login
    },
    Dashboard: {
      screen: Dashboard
    },
    Account: {
      screen: Account
    },
    CategoryScreen: {
      screen: CategoryScreen
    }
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: "",
      headerLeft: () => <ActionBarImage />,
      headerStyle: {
        backgroundColor: 'black',
        height: 80
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  }
);

const AppContainer = createAppContainer(RootStack)

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

