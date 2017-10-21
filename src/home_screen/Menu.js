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
        }
    }
    componentWillMount(){
        AsyncStorage.getItem('userData').then((user) => {
            let userData = JSON.parse(user)
            this.setState({
                user: userData,
            })
        firebase.database().ref('Orders').child(userData.uid).on('value', (snap) => {
        })
        })
        firebase.database().ref('Posts').limitToFirst(10).on('value', (snap) => {
            console.log('new', snap.val())
            snap.forEach((child) => {
                this.state.items.push({
                    title: child.val().title,
                    key: child.key,
                    author: child.val().authorName,
                    image: child.val().picture,
                    price: child.val().price,
                    description: child.val().description,
                    stock: child.val().stock,
                    authorId: child.val().authorId
                });
            });
            this.setState({ 
                dataSource: this.state.dataSource.cloneWithRows(this.state.items),
                loading:false
            });
        });
    }

    componentWillUnmount() {
  		firebase.database().ref('Posts').limitToFirst(10).off('value');
  		firebase.database().ref('Orders').off('value');
	}

    logOut(){
    	AsyncStorage.removeItem('userData').then(() => {
    		firebase.auth().signOut();
    			this.props.navigation.navigate('Index')
    	})
    }

    renderRow(data) {
        return (
        <View style={styles.listProduct} key={data.key}>
            <TouchableOpacity 
             onPress={() => this.props.navigation.navigate('Detail', {data})}
            >
            <Text style={styles.titleProduct}> {data.title} </Text>
            <Text style={styles.textProduct}>{data.author}</Text>
            <Image
             source={{ uri:data.image }}
             style={{
                height: 150,
                width: 150,
                alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
        <View style={styles.postInfo}>
          <Text style={styles.textProduct}>Rp.{data.price}</Text>
        </View>
        </View>
        )
    }

    render(){
        if (this.state.loading){
            return <ActivityIndicator size="large" />
        }

        console.ignoredYellowBox = ['Remote debugger'];
        console.ignoredYellowBox = ['Setting a timer'];
        console.log(this.state.user)
        const { navigate } = this.props.navigation
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                	<TouchableOpacity onPress={()=> this.props.navigation.navigate('Checkout')}>
                    <Icon name='md-cart' size={30} color='#eee'/>
                    </TouchableOpacity>
                    <View>
                    <TouchableOpacity onPress={this.logOut.bind(this)}>                    
                    <Icon name='ios-log-out-outline' size={30} color='#eee' />
                    </TouchableOpacity>
                    </View>

                    <View style={styles.addItem}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Add')}>
                    <Icon name='md-add' size={30} color='#eee' />
                    </TouchableOpacity>
                    </View>               
                </View>

                    <ListView
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow.bind(this)}
                      enableEmptySections={true}
                      />
            </View>
            </ScrollView>
        )
    }
}
