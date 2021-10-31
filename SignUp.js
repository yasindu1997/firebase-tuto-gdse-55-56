import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default class SignUp extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            username: ''
        };
        // auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         console.log('User display name: ', user.displayName);
        //     }
        // });
    }

    registerUser = () => {
        auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((createdUser) => {
                createdUser.user.updateProfile({
                    displayName: this.state.username
                })

                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.constainer}>
                <Text style={styles.label}> React Native Firebase Tutorial User Register</Text>

                <TextInput
                    label="Enter Email"
                    value={this.state.email}
                    onChangeText={text => this.setState(
                        { email: text }
                    )}
                    style={styles.input}
                />

                <TextInput
                    label="Enter Username"
                    value={this.state.username}
                    onChangeText={text => this.setState(
                        { username: text }
                    )}
                    style={styles.input}
                />

                <TextInput
                    label="Enter Password"
                    value={this.state.password}
                    onChangeText={text => this.setState(
                        { password: text }
                    )}
                    style={styles.input}
                />

                <Button style={styles.btn} mode="contained" onPress={this.registerUser}>
                    Register User
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
        marginBottom: 150,
        marginTop: 50
    }
})
