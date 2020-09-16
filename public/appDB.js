
firebase.auth().onAuthStateChanged(function(user){

// var credential = firebase.auth.EmailAuthProvider.credential(user.email, this.currentPassword);


var displayName = user.displayName;
var email = user.email;
var uid = user.uid;
var phoneNumber = user.phoneNumber;
console.log(uid);

var userRef = firestore.collection("Users").doc(uid);
var corpRef = firestore.collection("Company");


var pre_uname = document.querySelector("#uname");
var pre_umail = document.querySelector("#umail");
var pre_phone = document.querySelector("#uphone");
var pre_ucorp = document.querySelector("#ucorp");


//from user collection
userRef.onSnapshot(function(doc){
  if(doc && doc.exists){
    console.log("User Document data:", doc.data());
    const gotdata = doc.data();
    pre_uname.innerText = gotdata.Name;
    pre_umail.innerText = gotdata.Email;
    pre_phone.innerText = gotdata.phoneNumber;
          if(!gotdata.CName){
          pre_ucorp.innerText = "Null";
        }else if(gotdata.Confirmation == false){
            pre_ucorp.innerText = gotdata.CName;
            pre_ucorp.style.color = 'grey';
          }else if (gotdata.Confirmation == true) {
            pre_ucorp.innerText = gotdata.CName;
            document.getElementById('warning').style.display='none';
          }


    var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
     console.log(source, " data: ", doc.data());


  }else{
            console.log("No user data found");
          }

});
// .catch(function(error){
//   console.log("Error happened while trying to get the document: ", error);
// });



const editbtn = document.querySelector("#editbtn");

//when edit button is clicked
editbtn.addEventListener("click", function(){

  document.getElementById('read').style.display = 'none';
  document.getElementById('edit').style.display = 'block';

  //원래 데이터베이스 값으로 기본값 설정
    userRef.get().then(function(doc){
      if(doc.exists){
        const gotdata = doc.data();
        document.getElementById('uname_after').defaultValue = gotdata.Name;
        document.getElementById('uphone_after').defaultValue = gotdata.phoneNumber;
        document.getElementById('umail_after').defaultValue = gotdata.Email;
        //update email
        //https://firebase.google.com/docs/reference/js/firebase.User#updateEmail
        document.getElementById('ucorp_after').defaultValue = gotdata.CName;
        document.getElementById('ucorp_set').innerHTML= gotdata.CName;

        if(gotdata.Confirmation==true){
          document.getElementById('ucorp_after').style.display = 'none';
          document.getElementById('ucorp_set').style.display = 'block';
        }

      }else{
        console.log("No user data found");
      }



    });
});

    //write&update data via new information
    const newname = document.querySelector("#uname_after");
    const newphone = document.querySelector("#uphone_after");
    const newmail = document.querySelector("#umail_after");
    const newcorp = document.querySelector("#ucorp_after");
    const password = document.querySelector("#psw");



    const confirm = document.querySelector("#confirm");


//when submit button
confirm.addEventListener("click", function(){
  //
  const savename = newname.value;
  const savephone = newphone.value;
  const savemail = newmail.value;
  const savecorp = newcorp.options[newcorp.selectedIndex].text;

  userRef.update({
    Email: savemail,
    Name: savename,
    phoneNumber: savephone,
    CName: savecorp
  }).then(function(){
    console.log("user doc ok");
    window.location.reload();
  }).catch(function(error){
    console.log("There's some error in user data ;-;", error);
  });

  //

if(newname.defaultValue!=savecorp){
  var template_params = {
     "from_name": savename,
     "to_name": "administrator"
  }

  var service_id = "default_service";
  var template_id = "template_6JbD50jA";
  emailjs.send(service_id,template_id,template_params);
}

//reauthenticate with password to change information
  // var credential= firebase.auth.EmailAuthProvider.credential(user.email, pass);
  // user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
  //   console.log(credential, "confirmed", savename,"'s information will be updated in firestore.");
  //   //userdata set ok!
  //     userRef.set({
  //       Email: savemail,
  //       Name: savename,
  //       phoneNumber: savephone,
  //       CName: savecorp
  //     }).then(function(){
  //       console.log("user doc ok");
  //       // location.assign('idonnoyet');
  //     }).catch(function(error){
  //       console.log("There's some error in user data ;-;", error);
  //     });
  //
  // }).catch(function(error) {
  //     document.getElementById("pswmsg").innerHTML = "make sure your password is correct";
  //   console.log("credential error",error);
  // });



});

});
//데이터베이스 구조 이대로 괜찮은가

//TODO TODO TODO 개인정보에 회사 등록시 자기가 이 회사 출신이라는걸
//증명하기 위한 인증과정? 방법? 필요하지 않을까↘요↗? TODO TODO TODO

//개인정보 폼 채워넣을때
// if(){
 // 인풋이 없을때
 // }
 // if(){
 // 비밀번호를 맞게 입력하지 않았을때
 // }
 // if(){
 // 회사정보를 입력하지 않았을때
 // 회사정보를 입력하지 않으면 그에 따른 권한을 부여받지 못합니다...
// 에러 띄우기?

//TODO TODO TODO TODO폼 제출시 비밀번호가 맞는지 체크?TODO TODO TODO TODO


//OAuth로 로그인했는데 유저가 메일 바꿔도 될까...? 비밀번호나 이메일 리셋은 어차피 oauth메일로 가고...
//그렇지 않을 방법 찾기?
//admin의 userlist에는 유저가 정한 메일로 가기는 함...
//database 정보 바뀌었을때 oauth 정보랑 달라지는건 어쩔ㄹ건지,,,

//TODO TODO TODO TODO TODO TODO 회원이 탈퇴하면 firestore에 저장된 정보도 날리....나...? TODO TODO TODO TODO TODO TODO
