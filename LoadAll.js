import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default class LoadAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const subscriber = firestore()
            .collection('customers')
            .onSnapshot(querySnapshot => {
                const customers = [];

                querySnapshot.forEach(documentSnapshot => {
                    customers.push({
                        name: documentSnapshot.data().name,
                        address: documentSnapshot.data().address,
                        salary: documentSnapshot.data().salary,
                        key: documentSnapshot.id,
                    });
                });

                this.setState({
                    data: customers
                })

            });
    }

    render() {
        return (
            <View>
                <Text> LoadAll Data </Text>

                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <View style={{ height: 150, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Name: {item.name}</Text>
                            <Text>Address: {item.address}</Text>
                            <Text>Salary: {item.salary}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => {
                        item.key
                    }}
                />
            </View >
        );
    }
}
