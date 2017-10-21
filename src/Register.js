import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Button
} from 'react-native';
import styles from '../components/style.js';
import firebase from '../components/Firebase.js';

export default class Register extends Component {
	constructor(){
		super();
			this.state={
				name:'',
				email:'',
				password: '',
				phoneNumber: ''
		}
	}

	Signup(){
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((userData) => {
              firebase.database().ref('users/' + userData.uid)
              .set({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                payment: 0,
              })
			userData.updateProfile({
				displayName: this.state.name,
				phoneNumber: this.state.phoneNumber
			})       
            userData.sendEmailVerification();
			alert("Success Please Check Your Email For Verification")
			this.props.navigation.navigate('Login')
		})
		.catch((e) => {
			alert(e);
		})
	}

	render() {
		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
    return (
    <View style={styles.container}>
    	<Text style={styles.title}> Register </Text>

    	<TextInput 
    	 style={styles.loginInput}
    	 onChangeText={(name) => this.setState({name})}
    	 value={this.state.name}
    	 underlineColorAndroid='transparent'
    	 placeholder='Name'
    	/>

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

    	<TouchableOpacity
    		style={styles.button}
    		onPress={this.Signup.bind(this)}
    	>
    	<Text style={styles.buttonText}> Sign Up </Text>
    	</TouchableOpacity>

    </View>
    );
  }
}