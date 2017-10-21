import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  AsyncStorage,
  ActivityIndicator,
  ListView,
  Dimensions,
  ScrollView
} from 'react-native';
import styles from '../../components/style.js';
import firebase from '../../components/Firebase.js';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Menu extends Component {
    constructor(){
        super();
        this.state = {
            user: {},
            loading: true,
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 }),
            items: [],
            total: 0
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('userData').then((user) => {
            let userData = JSON.parse(user)
            this.setState({
                user: userData,
            })
        firebase.database().ref('users').child(this.state.user.uid).on('value', (snap) => {
        	console.log(snap.val())
        	this.setState({ total: snap.val().payment})
        })
        firebase.database().ref('Orders').child(userData.uid).on('value', (snap) => {
            snap.forEach((child) => {
                this.state.items.push({
                    title: child.val().title,
                    key: child.key,
                    name: child.val().name,
                    price: child.val().price,
                    });
            });
            this.setState({ 
                dataSource: this.state.dataSource.cloneWithRows(this.state.items),
                loading:false
            });
        });
        })
    }

    cancel(){
    	firebase.database().ref('Orders').child(this.state.user.uid).remove()
    	firebase.database().ref('users').child(this.state.user.uid).update({
    		payment: 0
    	}).then(() => {
    		this.props.navigation.navigate('Menu')
    	})
    }

    remove(data){
    	firebase.database().ref('Orders').child(`${this.state.user.uid}/${data.key}`).remove()
    	firebase.database().ref('users').child(this.state.user.uid).update({
    		payment: 0
    	})
    }

    renderRow(data) {
        return (
        <View style={styles.listProduct} key={data.key}>
        	<TouchableOpacity
        	 onPress={ ()=> this.remove(data)}>
            <Text style={styles.titleProduct}> {data.title} </Text>
            <Text style={styles.textProduct}> {data.name} </Text>
            <Text style={styles.textProduct}> Price : {data.price} </Text>
            </TouchableOpacity>
        </View>
        )
    }

    render(){
        if (this.state.loading){
            return <ActivityIndicator size="large" />
        }

        console.ignoredYellowBox = ['Remote debugger'];
        console.ignoredYellowBox = ['Setting a timer'];
        console.log(this.state.items)
        const { navigate } = this.props.navigation
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                   <Text style={styles.nameTimeline}>{this.state.user.displayName}</Text>           
                	</View>
                	<ListView
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow.bind(this)}
                      enableEmptySections={true}
                      />
                    <Text> Total : {this.state.total} </Text>

                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigate('Payment')}
                    >
                    <Text style={styles.buttonText}> Check Out </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styles.button}
                    onPress={this.cancel.bind(this)}>
                    <Text style={styles.buttonText}> Cancel Orders </Text>
                    </TouchableOpacity>
            </View>
            </ScrollView>
        )
    }
}
