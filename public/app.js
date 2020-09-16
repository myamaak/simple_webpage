const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);



firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;

        user.getIdToken(true).then(function(idToken) {
          document.getElementById("nothing").innerText = JSON.stringify(
            //json 형식을 string 형태로 읽어준다
            //stringify(읽기,다시쓰기, 빈공간);
            {displayName: displayName,
             email: email,
             emailVerified: emailVerified,
             phoneNumber: phoneNumber,
             photoURL: photoURL,
             uid: uid,
             idToken: idToken,
             providerData: providerData
            }, null, '  ');

          console.log();
          // var csrfToken = getCookie('csrfToken');
          //일단 안 썼음
          //return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
        }).catch(function(error){
          console.log(error);
        });


//         firestore.collection("Users").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(alluser) {
//         // doc.data() is never undefined for query doc snapshots
//         alluser.data().Email
//
//
//     });
// });
        const userRef = firestore.collection("Users").doc(uid);
                  //유저가 firestore엡 없는 경우에만
        userRef.get().then(function(doc){
          console.log(doc.exists);
        
          if(doc.exists == false){
                //프로바이더 네임으로 데이터베이스 정보 자꾸만 오버라이팅 되면..안되니까....
                //첫 가입시에만 여기서 정보 받아오기
              userRef.set({
                Name: displayName,
                Email: email,
                emailVerified: emailVerified,
                PhoneNumber: phoneNumber,
                Confirmation : false
              }).then(function(){
                console.log("user saved in firestore");
              }).catch(function(error){
                console.log("There's an Error happening->", error);
              });


            }else{
              console.log("user already in firestore");
            }



          if(doc.exists && doc.data().Admin == true){
              document.getElementById('only').style.display = 'block';
            }
          }).catch(function(error){
            console.log(error);
          });

      } else {
        console.log("user is not signed in")
        console.log();
      }
    });
    //document.getElementById('signout').addEventListener('click', signout, false);


function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

function signout(){
     firebase.auth().signOut().then(function() {
      alert("User logged out.");
      // app.post('/sessionLogout', (req, res) => {
      //   res.clearCookie('session');
      //   res.redirect('/login');
      // });
      location.replace("index.html");
     }).catch(function(error) {
      alert("Failed to log out. Try again.");
     });
   }

function VerifyEmail() {
              firebase.auth().currentUser.sendEmailVerification().then(function(){
              alert("You can Verify your account through the link within the email we sent you!");
              //location.assign("index.html");
            }).catch(function(error){
              console.log(error);
            });
            var user=  firebase.auth().currentUser;
            console.log(user.emailVerified);
          }



  function deleteAccount() {
                var deleteuser = firebase.auth().currentUser;
                deleteuser.delete().then(function(){
                alert(deleteuser.displayName+", your account is deleted. Bye!");
                location.replace("index.html");



      //TODO TODO TODO TODO TODO TODO firestore에 저장된 정보도 날리....나...? TODO TODO TODO TODO TODO TODO


                }).catch(function(error) {
                  if (error.code == 'auth/requires-recent-login') {
                  firebase.auth().signOut().then(function() {
                  setTimeout(function() {
                  alert('Please sign in again to delete your account.');
                  location.replace("index.html");
                  }, 1);
                  });
                  }
                  });
                }
if(location.pathname=='user_page.html'){
  location.replace('success.html');
}


//세션 끝나면 로그아웃???에러체크 후 코드 수정 필요
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
