import firebase from   'firebase';
// Initialize Firebase

var config = {
    apiKey: "AIzaSyAtNFnCMGVdL5MMIO4RVlvaSz8xuHr0O58",
    authDomain: "vue-firebase-tutoria.firebaseapp.com",
    databaseURL: "https://vue-firebase-tutoria.firebaseio.com",
    projectId: "vue-firebase-tutoria",
    storageBucket: "vue-firebase-tutoria.appspot.com",
    messagingSenderId: "198442544817"
  }
  firebase.initializeApp(config)
  var auth = firebase.auth()
  var database = firebase.database()

  export {
      auth,
      database
  }
  