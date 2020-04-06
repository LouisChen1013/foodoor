import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { Icon, SearchBar, Card } from "react-native-elements";
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';




export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            locationPermission: 'unknown',
            position: 'unkown',
            keyword: '',
            isLoading: true,
            data: [],
            sort: ''
        }
    }

    async componentDidMount() {
        try {
            const result = await axios.request({
                method: 'get',
                url: 'https://developers.zomato.com/api/v2.1/search?lat=' + this.props.navigation.state.params.lat + '&lon=' + this.props.navigation.state.params.long,
                // url: 'https://developers.zomato.com/api/v2.1/search?lat=49.2252619709647&lon=-123.01240031849',
                headers: {
                    'Content-Type': 'application/json',
                    'user-key': '69406d022b48d028657df578276b458e'
                },
            });
            this.setState({
                data: result.data.restaurants,
                isLoading: false
            });
            // console.log(this.state.data)
        } catch (err) {
            this.setState({ isLoading: false });
            console.log(err);
        }
    }

    updateSearch = input => {
        this.setState({ keyword: input });
    };

    searchReq = async () => {
        try {
            const result = await axios.request({
                method: 'get',
                // url: 'https://developers.zomato.com/api/v2.1/search?q=' + this.state.keyword + '&lat=' + this.props.navigation.state.params.lat + '&lon=' + this.props.navigation.state.params.long,
                url: 'https://developers.zomato.com/api/v2.1/search?q=' + this.state.keyword + '&lat=' + this.props.navigation.state.params.lat + '&lon=' + this.props.navigation.state.params.long + '&sort=' + this.state.sort + '&order=descs',
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

        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <SearchBar
                        containerStyle={styles.searchbar}
                        placeholder="Search By Keyword"
                        value={this.state.keyword}
                        onChangeText={this.updateSearch}
                        onSubmitEditing={this.searchReq}
                        round
                    />
                </View>
                <View style={styles.middleContainer}>
                    {
                        this.state.isLoading ?
                            <View style={styles.preloader}>
                                <ActivityIndicator size="large" color="#9E9E9E" />
                            </View> :
                            (
                                this.state.data.length == 0 ?
                                    <View style={styles.noData}>
                                        <Text style={{ color: '#000', fontWeight: 'bold' }}>No restaurants available from your search</Text>
                                    </View> :
                                    <FlatList
                                        data={this.state.data}
                                        renderItem={({ item }) => (
                                            <Card containerStyle={{
                                                borderRadius: 15, shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 4,
                                                },
                                                shadowOpacity: 0.30,
                                                shadowRadius: 4.65,
                                                elevation: 8,
                                            }}
                                                title={item.restaurant.name}
                                                image={{ uri: item.restaurant.thumb }}
                                                imageStyle={{
                                                    height: 150
                                                }}
                                                imageProps={{ resizeMode: 'contain' }}
                                            >
                                                <Text style={{ marginBottom: 10 }}>
                                                    Cuisines: {item.restaurant.cuisines}{"\n"}
                                                    Rate: {item.restaurant.user_rating.aggregate_rating}{"\n"}
                                                    Pirce Range: {item.restaurant.price_range}{"\n"}
                                                    Average Cost For Two: ${item.restaurant.average_cost_for_two}{"\n"}
                                                    Locattion: {item.restaurant.location.address}{"\n"}


                                                </Text>
                                                <Button
                                                    icon={<Icon name='info-circle'
                                                        type='font-awesome'
                                                        color='white' />}
                                                    title='   VIEW DETAILS'
                                                // onPress={() =>
                                                //     this.props.navigation.navigate('Details', {
                                                //         eventName: item.name,
                                                //         date: item.dates.start.localDate,
                                                //         eventImage: item.images[0].url,
                                                //         distance: item.distance,
                                                //         url: item.url,
                                                //         info: item.info
                                                //     })}
                                                />
                                            </Card>
                                        )
                                        }
                                        keyExtractor={item => item.restaurant.id}
                                    />
                            )
                    }
                </View>
                <View style={styles.sortContainer}>
                    <View style={pickerSelectStyles.sortBox}>
                        <RNPickerSelect
                            style={{
                                ...pickerSelectStyles
                            }}
                            placeholder={{
                                label: 'Sort By...',
                                value: null,
                            }}
                            onValueChange={(value) => {
                                this.setState({
                                    sort: value,
                                });
                            }}
                            onDonePress={this.searchReq}
                            items={[
                                { label: 'By Rating', value: 'rating' },
                                { label: 'By Cost', value: 'cost' }
                            ]}
                        />
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.buttomContainer1}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Dashboard")}>
                            <Icon name="home" type="material" size={35} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttomContainer2}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("")}>
                            <Icon name="directions-car" type="material" size={35} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttomContainer3}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Account")}>
                            <Icon name="account-circle" type="material" size={35} color={'white'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
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
    topContainer: {
        height: '10%',
    },
    middleContainer: {
        height: '70%'
    },
    sortContainer: {
        flex: 1,
        height: '10%',
        justifyContent: "center",
        alignItems: "center",
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
    noData: {
        flex: 1,
        padding: 20,
        marginTop: 100
    }
});

const pickerSelectStyles = StyleSheet.create({
    sortBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputIOS: {
        backgroundColor: 'black',
        color: 'white',
        height: 50,
        width: 100,
        borderRadius: 25 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
    },
    inputAndroid: {
        backgroundColor: 'black',
        color: 'white',
        height: 50,
        width: 100,
        borderRadius: 25 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
    },
});



