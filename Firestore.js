import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

export default class Firestore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            salary: ''
        };

        const subscriber = firestore()
            .collection('customers')
            .doc('f7OKCjbGkgvLexr71Svx')
            .onSnapshot(documentSnapshot => {
                console.log('User data: ', documentSnapshot.data().name);
                this.setState({
                    name: documentSnapshot.data().name
                })
            });
    }

    saveCustomer = () => {
        firestore()
            .collection('customers')
            .add({
                name: this.state.name,
                address: this.state.address,
                salary: this.state.salary
            })
            .then(() => {
                console.log('User added!');
                this.setState({
                    name: '',
                    address: '',
                    salary: ''
                })
            });
    }

    render() {
        return (
            <View style={styles.constainer}>
                <Text style={styles.label}> Firestore Tuto GDSE 55/56 </Text>

                <TextInput
                    label="Enter Name"
                    value={this.state.name}
                    onChangeText={text => this.setState(
                        { name: text }
                    )}
                    style={styles.input}
                />

                <TextInput
                    label="Enter Address"
                    value={this.state.address}
                    onChangeText={text => this.setState(
                        { address: text }
                    )}
                    style={styles.input}
                />

                <TextInput
                    label="Enter Salary"
                    value={this.state.salary}
                    onChangeText={text => this.setState(
                        { salary: text }
                    )}
                    style={styles.input}
                />

                <Button style={styles.btn} mode="contained" onPress={this.saveCustomer}>
                    Save Customer
                </Button>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 20
    },
    constainer: {
        flex: 1,
        alignItems: 'center'
    },
    input: {
        width: 300,
        marginTop: 15
    },
    label: {
        marginBottom: 100,
        marginTop: 50
    }
})
