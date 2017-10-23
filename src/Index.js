import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  AsyncStorage
} from 'react-native';
import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import styles from '../components/style.js';
import firebase from '../components/Firebase.js';



export default class Signin extends Component {
	constructor(){
		super();
			this.state={
				email:'',
				password: ''
		}
	}

  componentWillMount(){
    this.props.navigation.navigate('Checkout')
  }

  	signIn(){
  		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((userData) => {
  			AsyncStorage.setItem('userData', JSON.stringify(userData), (user) => {
          console.log(user)
        })
        this.props.navigation.navigate('Menu')
  			alert("Sign in Success")
  		}).catch((e) => {
  			alert(e)
  		})
  	}

	Signout() {
    GoogleSignin.signOut()
    .then(() => {
      console.log('out');
    })
    .catch((err) => {

    });
  }
	render() {
		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
    	const { navigate } = this.props.navigation;
    return (
    <View style={styles.container}>
    	<Text style={styles.title}> Miraichlous Store </Text>

    		<TextInput 
    		 style={styles.loginInput}
    		 onChangeText={(email) => this.setState({email})}
    		 value={this.state.email}
    		 underlineColorAndroid='transparent'
    		 placeholder='Email'
    		/>

    		<TextInput 
    		 style={styles.loginInput}
    		 onChangeText={(password) => this.setState({password})}
    		 value={this.state.password}
    		 underlineColorAndroid='transparent'
    		 placeholder='Password'
    		 secureTextEntry
    		/>
    		<View style={styles.main}>
    		<TouchableOpacity
    			style={styles.button}
    			onPress={this.signIn.bind(this)}
    		>
    		<Text style={styles.buttonText}> Sign In </Text>
    		</TouchableOpacity>

    		<TouchableOpacity
    			style={styles.button}
    			onPress={() => navigate('Register')}
    		>
    		<Text style={styles.buttonText}> Register </Text>
    		</TouchableOpacity>

    		</View>
      </View>
    );
  }
}