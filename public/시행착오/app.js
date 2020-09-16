//javascript about page

//content loaded and available to use firebase resources
document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();

  console.log(app)
  var firebase = require('firebase');
  var firebaseui = require('firebaseui');
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

function login(){
  //get id psw remeb
  //if wrong tell
  //if wrong over 5th stop
}

function find(){
  //아이디 찾기
  //다른 html페이지로 뺄것
  //일단은 냅두기
}

//actual availability function
function googleLogin(){
  const provider = new firebase.auth.GoogleAuthProvider();
  //promise set
  firebase.auth().signInWithPopup(provider)
  .then(result => {
    const user =result.user;
    document.write('Welcome ${user.displayName}');
    console.log(user)
    })
    .catch(console.log)
}
