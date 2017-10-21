import * as firebase from 'firebase';

const config = {
     apiKey: "AIzaSyBq2k7GAWz0juIU1JiBBmXXHx3RmjIg9sA",
    authDomain: "commerceapp-8f00b.firebaseapp.com",
    databaseURL: "https://commerceapp-8f00b.firebaseio.com",
    projectId: "commerceapp-8f00b",
    storageBucket: "commerceapp-8f00b.appspot.com",
    messagingSenderId: "896862484190"
  };
 export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();