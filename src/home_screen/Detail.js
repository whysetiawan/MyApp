import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import styles from '../../components/style.js';
import firebase from '../../components/Firebase.js';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Detail extends Component {

	constructor(){
		super();
		this.state= {
			name: '',
			title: '',
			description: '',
			image: '',
			price: '',
			stock: '',
			loading: true,
			user: {},
			payment: 0,
		}
	}
	componentWillMount(){
		AsyncStorage.getItem('userData').then((user) => {
            let userData = JSON.parse(user)
            this.setState({
                user: userData,
           })
        firebase.database().ref('users').child(this.state.user.uid).on('value', (snap) => {
        	console.log(snap.val())
			this.setState({ payment: snap.val().payment })
		})
        })
		let { params } = this.props.navigation.state;
		const data = params.data
		this.setState({
			name: data.author,
			title: data.title,
			description: data.description,
			image: data.image,
			price: data.price,
			stock: data.stock,
		})
		this.setState({ loading:false })
	}

	toCart(){
		let a = this.state.price + this.state.payment
		firebase.database().ref('users').child(this.state.user.uid).update({
			payment: a
		})
		firebase.database().ref('Orders').child(this.state.user.uid).push({
			name: this.state.name,
			title: this.state.title,
			description: this.state.description,
			image: this.state.image,
			price: this.state.price
		})
		this.props.navigation.navigate('Menu')
	}

	render() {
		if (this.state.loading){
            return <ActivityIndicator size="large" />
        }
		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
    return (
    		<View style={styles.conDetailProduct}>
                <View style={styles.headDetailProduct}>        
                    <Text style={styles.textTitleProduct}> {this.state.title} </Text>  
                    <Text style={styles.textNameProduct}> {this.state.name}</Text>              
                </View>
                <Image source={{ uri: this.state.image }} 
                 style={{height:200, width:400, alignSelf: 'center'}}
                />
                <Text style={styles.textDescProduct}> {this.state.description} </Text>
                <Text style={styles.textDescProduct}> Price : {this.state.price} </Text>
                <Text style={styles.textDescProduct}> {this.state.stock} items remain </Text>
                <View style={styles.postButton}>
                <TouchableOpacity 
		         style={styles.button}
		         onPress={this.toCart.bind(this)}
		         >
		            <Text style={styles.textButtonProduct}> Add to cart <Icon name='md-cart' size={30} color='#eee'/></Text>
        		</TouchableOpacity>
        		</View>
        	</View>
    );
  }
}