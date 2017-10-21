import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Image,
  AsyncStorage,
  ActivityIndicator,
  Button,
  ScrollView,
  Platform
} from 'react-native';
import styles from '../../components/style.js';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../../components/Firebase.js';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';

export default class Menu extends Component {
    constructor(){
        super();
        this.state = {
            user: {},
            loading: true,
            author: '',
            title: '',
            description: '',
            picture: '',
            price: null,
            stock: null,
            uploading: true
        }
    }
    componentWillMount(){
        AsyncStorage.getItem('userData').then((user) => {
            let userData = JSON.parse(user)
            this.setState({
                user: userData,
                loading:false
            })
        })
    }

    addImage(){
    const Blob = RNFetchBlob.polyfill.Blob
	const fs = RNFetchBlob.fs
	window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
	window.Blob = Blob

	const uploadImage = (uri, mime = 'images/jpg') => {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null
      const sessionId = new Date().getTime()

      const imageRef = firebase.storage().ref('Products').child(`${this.state.user.uid}/Pic-${sessionId}`)

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
  }

    	const options = {
		title: 'Upload by'
	};
	ImagePicker.showImagePicker(options, (response) => {
		uploadImage(response.uri).then((url) => {
			this.setState({
				uploading:false,
				picture: url
			})
			alert('uploaded')
			})
		})
	}

	post(){
		let price = parseInt(this.state.price);
		let stock = parseInt(this.state.stock);
		firebase.database().ref().child('Posts').push({
			authorName: this.state.user.displayName,
			authorId: this.state.user.uid,
			title: this.state.title,
			description: this.state.description,
			picture: this.state.picture,
			price: price,
			stock: stock,
		}).then(() => {
			this.props.navigation.navigate('Menu')
		})
	}

    render(){
		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
        if (this.state.loading){
            return <ActivityIndicator size="large" />
        }
        console.log(this.state.user)
        return(
            <View style={styles.container}>
            	<ScrollView>
                <Text style={styles.title}> Add Your Products </Text>

                <TextInput 
	    		 style={styles.loginInput}
	    		 onChangeText={(title) => this.setState({title})}
	    		 value={this.state.title}
	    		 underlineColorAndroid='transparent'
	    		 placeholder='Title'
    			/>

                <TextInput 
	    		 style={styles.multipleInput}
	    		 onChangeText={(description) => this.setState({description})}
	    		 value={this.state.description}
	    		 underlineColorAndroid='transparent'
	    		 placeholder='Description'
	    		 multiline={true}
	    		 numberOfLines={10}
	    		 blurOnSubmit={false}
	    		/>

	    		<View style={styles.multipleAdd}>

	    		<TextInput 
	    		 style={styles.multipleTextInput}
	    		 onChangeText={(price) => this.setState({price})}
	    		 value={this.state.price}
	    		 underlineColorAndroid='transparent'
	    		 placeholder='Price'
	    		 keyboardType='numeric'
    			/>

    			<TextInput 
	    		 style={styles.multipleTextInput}
	    		 onChangeText={(stock) => this.setState({stock})}
	    		 value={this.state.stock}
	    		 underlineColorAndroid='transparent'
	    		 placeholder='Stock'
	    		 keyboardType='numeric'
    			/>

    			<TouchableHighlight onPress={this.addImage.bind(this)} style={{margin: 10}}>
    				<Icon name='md-images' size={30} color='#000000'/>
    			</TouchableHighlight>

    			<TouchableHighlight
    	 		 onPress={this.post.bind(this)}
    	 		 style={styles.button}
    	 		 >
    	 		 	<Text style={styles.buttonText}> Post </Text>
    	 		 </TouchableHighlight>

    			</View>
    	 		</ScrollView>
            </View>
        )
    }
}