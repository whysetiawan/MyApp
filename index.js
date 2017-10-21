import { AppRegistry } from 'react-native';
import App from './App';
global.PaymentRequest = require('react-native-payments').PaymentRequest;

AppRegistry.registerComponent('MyApp', () => App);
