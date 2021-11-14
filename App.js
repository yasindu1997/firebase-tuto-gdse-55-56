import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Firestore from './Firestore';
import LoadAll from './LoadAll';
import Upload from './Upload';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Upload />
    );
  }
}
