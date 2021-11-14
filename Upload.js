import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePath: '',
            imageName: ''
        };
    }

    getimageFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            // console.log(image);
            this.setState({
                imagePath: image.path
            })

            this.setState({
                imageName: image.modificationDate
            })

            this.UploadImage()
        });
    }

    UploadImage = async () => {
        const fileName = this.state.imageName + ".jpg";

        const reference = storage().ref(`images/${fileName}`);
        await reference.putFile(this.state.imagePath);

        const url = await storage().ref(`images/${fileName}`).getDownloadURL();
        console.log(url);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>File Upload </Text>

                <Button style={{ width: 200, marginTop: 50 }} mode="contained" onPress={this.getimageFromGallery}>
                    Press me
                </Button>
            </View>
        );
    }
}
