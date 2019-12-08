import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDFuO5UzIigl3PFgbaIyukivik8YTdUmAU",
    authDomain: "agendamento-67cf3.firebaseapp.com",
    databaseURL: "https://agendamento-67cf3.firebaseio.com",
    projectId: "agendamento-67cf3",
    storageBucket: "agendamento-67cf3.appspot.com",
    messagingSenderId: "934480292122",
    appId: "1:934480292122:web:e726179eea92efaf2c24a3"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;