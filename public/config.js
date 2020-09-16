//initialize
var config = {
  apiKey: "AIzaSyDaiWiO6Px0ufB5AAaz2N-7cYpSDolV8gM",
  authDomain: "standigmtrial.firebaseapp.com",
  databaseURL: "https://standigmtrial.firebaseio.com",
  projectId: "standigmtrial",
  storageBucket: "standigmtrial.appspot.com",
  messagingSenderId: "1057146187860"
};
firebase.initializeApp(config);
//
// var user = firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         var user
//       }else{
//
//       }).catch(function(error){
//         console.error();
//       });

//TODO make cookie? token? with information of
//TODO authed loginuser to expire it after setTimeout function
//TODO and use the variable with user info throughout the js&html files
