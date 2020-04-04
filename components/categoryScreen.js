import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { Card, Image, SearchBar, Icon } from 'react-native-elements';
import Logo from '../assets/Logo.png'
import axios from 'axios';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class CategoryScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isVisible: true,
            city: '280',
            isLoading: true,
            search: ''
        }
    }

    async componentDidMount() {
        try {
            const result = await axios.request({
                method: 'get',
                url: `https://developers.zomato.com/api/v2.1/search?city_id=280&category=11`,
                headers: {
                    'Content-Type': 'application/json',
                    'user-key': '69406d022b48d028657df578276b458e'
                }
            });
            this.setState({
                data: result.data.restaurants,
                isLoading: false
            });
        } catch (err) {
            this.setState({ isLoading: false });
            console.log(err);
        }
    }

    updateSearch = search => {
        this.setState({ search });
    };

    searchReq = async () => {
        try {
            const result = await axios.request({
                method: 'get',
                url: `https://developers.zomato.com/api/v2.1/search?city_id=280&q${this.state.search}&category=11`,
                headers: {
                    'Content-Type': 'application/json',
                    'user-key': '69406d022b48d028657df578276b458e'
                }
            });
            this.setState({ data: result.data.restaurants });
        } catch (error) {
            this.setState({ data: [] });
            console.log(error);
        }
    }

    render() {
        const { search } = this.state;
        return (
            <View>
                <View style={styles.header}>
                    <Image source={Logo} style={{ resizeMode: 'stretch', width: 50, height: 50, alignSelf: 'center', justifyContent: 'center', marginTop: 30 }} />
                    <Icon
                        raised
                        name='location'
                        type='octicon'
                        color='#f50'
                        onPress={() => this.setState({ isModalVisible: !this.state.isModalVisible })}
                        containerStyle={{ alignSelf: 'flex-end', marginRight: 20, marginTop: -60 }} />
                </View>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    onSubmitEditing={this.searchReq}
                    value={search}
                    inputStyle={{ backgroundColor: 'steelblue', color: 'white' }}
                    inputContainerStyle={{ backgroundColor: 'steelblue', fontColor: 'white' }}
                    containerStyle={{ backgroundColor: 'steelblue', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
                    placeholderTextColor='white'
                />
                {
                    this.state.isLoading ?
                        <View style={{ flex: 1, marginTop: 200 }}>
                            <ActivityIndicator style={{ color: 'red' }} />
                        </View> :
                        (
                            this.state.data.length == 0 ?
                                <View style={{ flex: 1, padding: 20, marginTop: 100 }}>
                                    <Text style={{ color: '#000', fontWeight: 'bold' }}>No restaurants from selected category</Text>
                                </View> :
                                <View style={{ flexDirection: 'column' }}>
                                    <FlatList
                                        keyExtractor={item => item.id}
                                        data={this.state.data}
                                        renderItem={({ item }) =>
                                            <TouchableOpacity onPress={() => console.log(item.restaurant.location.city)}>
                                                <Card style={{ width: SCREEN_WIDTH }}>
                                                    <Image style={{ width: SCREEN_WIDTH / 3, height: 130 }} resizeMode="stretch" source={{ uri: item.restaurant.thumb }} />
                                                    <Text style={{ color: '#000', fontWeight: 'bold' }}>{item.restaurant.name} </Text>
                                                </Card>
                                            </TouchableOpacity>
                                        }
                                    />
                                </View>
                        )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ff4714',
        height: SCREEN_HEIGHT / 8,

    },
});