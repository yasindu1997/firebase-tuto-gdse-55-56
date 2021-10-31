import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '182236100766-aj807fpqhltejj7mmbvs58gjrd1ts9v4.apps.googleusercontent.com',
});

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    userLogin = () => {
        auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                console.log(user);
                console.log('User loged in!');
            })
            .catch(error => {
                console.log('Login unsuccessfull !');
            });
    }

    onGoogleButtonPress = async () => {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const user = auth().signInWithCredential(googleCredential);
        console.log((await user).user);
    }

    render() {
        return (
            <View style={styles.constainer}>
                <Text style={styles.label}> React Native Firebase Tutorial User Login</Text>

                <TextInput
                    label="Enter Email"
                    value={this.state.email}
                    onChangeText={text => this.setState(
                        { email: text }
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

                <Button style={styles.btn} mode="contained" onPress={this.userLogin}>
                    Login
                </Button>

                <GoogleSigninButton
                    style={{ width: 192, height: 60 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this.onGoogleButtonPress}
                />
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

