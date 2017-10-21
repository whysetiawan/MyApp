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
} from 'react-native';
import styles from '../../components/style.js';
import firebase from '../../components/Firebase.js';

export default class Payment extends Component {
    constructor(){
        super();
        this.state = {
            user: null,
            loading: true,
            number: '',
            expmonth: '',
            expyear: '',
            cvc: '',
            token: ''
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
        console.log(this.state.user)
    }

    payment() {
    	var cardDetails = {
		    "card[number]": this.state.number,
		    "card[exp_month]": this.state.expmonth,
		    "card[exp_year]": this.state.expyear,
		    "card[cvc]": this.state.cvc
		};

		var formBody = [];
		for (var property in cardDetails) {
		    var encodedKey = encodeURIComponent(property);
		    var encodedValue = encodeURIComponent(cardDetails[property]);
		    formBody.push(encodedKey + "=" + encodedValue);
		}

		formBody = formBody.join("&");

    	return fetch('https://api.stripe.com/v1/tokens', {
		  method: 'post',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/x-www-form-urlencoded',
		    'Authorization': 'Bearer ' + 'pk_test_jTdyDhKRi0XUBF12a3mALc4n'
  			},
  			body: formBody
  		}).then((response) => {
  			response.json().then((resp) => {
  				if (resp.id){
  					alert(`Success, Your token is ${resp.id}`)
  					this.setState({
  						token: resp.id
  					})
  				}
  				else {
  					alert (`Error occured, "${resp.error.message}"`)
  				}
  			}).catch((e) => {
  				console.log(e)
  			})
  		})
    }

    androidPay(){
    	const DETAILS = {
			  id: 'basic-example',
			  displayItems: [
			    {
			      label: 'Movie Ticket',
			      amount: { currency: 'USD', value: '15.00' }
			    }
			  ],
			  total: {
			    label: 'Merchant Name',
			    amount: { currency: 'USD', value: '15.00' }
			  }
			};
    	const METHOD_DATA = [{
			 supportedMethods: ['android-pay'],
    data: {
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      countryCode: 'US',
      currencyCode: 'USD',
      environment: 'TEST',
      paymentMethodTokenizationParameters: {
        tokenizationType: 'NETWORK_TOKEN',
        parameters: {
          publicKey: 'BOdoXP+9Aq473SnGwg3JU1aiNpsd9vH2ognq4PtDtlLGa3Kj8TPf+jaQNPyDSkh3JUhiS0KyrrlWhAgNZKHYF2Y='
        }
      }
    }
			}];
			const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
			paymentRequest.show()

    }

    render(){
        if (this.state.loading){
            return <ActivityIndicator size="large" />
        }
        return(
            <View style={styles.container}>
            	<ScrollView>
                <Text style={styles.title}> Payment </Text>

                <TextInput 
	    		 style={styles.loginInput}
	    		 onChangeText={(number) => this.setState({number})}
	    		 value={this.state.title}
	    		 underlineColorAndroid='transparent'
	    		 placeholder='Number'
	    		 keyboardType='numeric'
	    		 maxLength={16}
    			/>

    			<TextInput 
	    		 style={styles.loginInput}
	    		 onChangeText={(expmonth) => this.setState({expmonth})}
	    		 value={this.state.title}
	    		 underlineColorAndroid='transparent'
	    		 placeholder='EXPMONTH'
	    		 keyboardType='numeric'
	    		 maxLength={2}
    			/>

    			<TextInput 
	    		 style={styles.loginInput}
	    		 onChangeText={(expyear) => this.setState({expyear})}
	    		 value={this.state.title}
	    		 underlineColorAndroid='transparent'
	    		 placeholder='EXPYEAR'
	    		 keyboardType='numeric'
	    		 maxLength={4}
    			/>

    			<TextInput 
	    		 style={styles.loginInput}
	    		 onChangeText={(cvc) => this.setState({cvc})}
	    		 value={this.state.title}
	    		 underlineColorAndroid='transparent'
	    		 placeholder='CVC'
	    		 keyboardType='numeric'
	    		 maxLength={3}
    			/>

    			<TouchableHighlight
    	 		 onPress={this.payment.bind(this)}
    	 		 style={styles.button}
    	 		 >
    	 		 	<Text style={styles.buttonText}> Add a card </Text>
    	 		 </TouchableHighlight>

    	 		 <Text style={{alignSelf: 'center'}}> {this.state.token} </Text>

    	 		 <TouchableHighlight
                    style={styles.button}
                    onPress={this.androidPay.bind(this)}>
                    <Text style={styles.buttonText}> Android Pay </Text>
                </TouchableHighlight>

    	 		</ScrollView>
            </View>
        )
    }
}