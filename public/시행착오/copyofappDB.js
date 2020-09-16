firebase.auth().onAuthStateChanged(function(user){

// const timestamp = snapshot.get('created_at');
// const date = timestamp.toDate();

var displayName = user.displayName;
var email = user.email;
var uid = user.uid;
var phoneNumber = user.phoneNumber;

var userRef = firestore.collection("Users").doc(uid);
//personal's ID is document name(i say so)

// userRef.set({
//   Documenttitle: uid,
//   //문서 제목은 그냥 내가 에러 검사하려고 넣은거니까 나중에 없애기
//   Name: displayName,
//   Email: email,
//   PhoneNumber: phoneNumber
// }).then(function(){
//   console.log("user saved in firestore");
// }).catch(function(error){
//   console.log("There's an Error happening->", error);
// });

//
// var whatLevel = firestore.collection("Level");
// var Lq = whatLevel.where("Level","==",0);
//
// Lq.get().then(function(doc)){
//   if(doc&&doc.exist &&)
// }
//
// function authority(){
//
//   userRef.get().then(function(doc){
//     if(doc && doc.exists &&){
//
//       console.log( doc.data());
//       const gotdata = doc.data();
//
//     }else{
//       console.log("No user data found");
//     }
//   }).catch(function(error){
//     console.log("Error : ", error);
//   });
// }
// var userQ = userRef.where("")

//datas that needs to be displayed
//these data, clients can edit themselves
var pre_uname = document.querySelector("#uname");
var pre_umail = document.querySelector("#umail");
var pre_phone = document.querySelector("#uphone");
var pre_ucorp = document.querySelector("#ucorp");

//TODO TODO TODO 개인정보에 회사 등록시 자기가 이 회사 출신이라는걸
//증명하기 위한 인증과정? 방법? 필요하지 않을까↘요↗? TODO TODO TODO

//from user collection
userRef.get().then(function(doc){
  if(doc && doc.exists){
    console.log("User Document data:", doc.data());
    const gotdata = doc.data();
    pre_uname.innerText = gotdata.Name;
    pre_umail.innerText = gotdata.Email;
    pre_phone.innerText = gotdata.phoneNumber;
    console.log("document id of user:", doc.id);
  }else{
    console.log("No user data found");
  }
}).catch(function(error){
  console.log("Error happened while trying to get the document: ", error);
});

//user data path
// var udoc = parseFloat("/Users/"+ uid);
// var tojson = parseFloat(uid);

// var corpRef = firestore.collection("Company");
// // var corpQ = corpRef.where("employee","==",험머지));
// //refering corpdata path
// //from company collection
// corpRef.get().then(function(doc){
//   if(doc && doc.exists){
//     console.log("Corp Document data:", doc.data());
//     const gotdata_c = doc.data();
//     pre_ucorp.innerText = gotdata_c.CName;
//   }else{
//     console.log("No corp data found");
//     console.log(doc);
//   }
// }).catch(function(error){
//   console.log("Error happened while trying to get the document: ", error);
// });
//

var corpRef = firestore.collection("Company");

      corpRef.get().then(function(all){
      all.forEach(function(doc){
      console.log(doc.id, "=>", doc.data());
      var corpdata = doc.data();
      if(corpdata.Level.id == "dOOfFmFm7NmVTpsdu5R5"){
        for(i =0; i<corpdata.employee.length; i++){
          var e = corpdata.employee[i];
          console.log(e);
          console.log("all the employee id for Standigm: ",e.id);
        }
      }
      });
      });

//when edit button is clicked
const editbtn = document.querySelector("#editbtn");
editbtn.addEventListener("click", function(){
  //info edit page will be shown
  document.getElementById('read').style.display = 'none';
  document.getElementById('edit').style.display = 'block';

//원래 데이터베이스 값으로 기본값 설정
userRef.get().then(function(doc){
  if(doc.exists){
    const gotdata = doc.data();
    document.getElementById('uname_after').value = gotdata.Name;
    document.getElementById('uphone_after').value = gotdata.phoneNumber;
    document.getElementById('umail_after').value = gotdata.Email;
  }else{
    console.log("No user data found");
  }
});
});

//write&update data
const newname = document.querySelector("#uname_after");
const newphone = document.querySelector("#uphone_after");
const newmail = document.querySelector("#umail_after");
var choice = document.getElementById("ucorp_after");
const newcorp = choice.options[choice.selectedIndex].text;
//getElementsByTagName('tagName')???
const confirm = document.querySelector("#confirm");
const password = document.querySelector("#psw");


confirm.addEventListener("click", function(){
 // if(){
 // 인풋이 없을때
 // }
 // if(){
 // 비밀번호를 맞게 입력하지 않았을때
 // }
 // if(){
 // 회사정보를 입력하지 않았을때
 // 회사정보를 입력하지 않으면 그에 따른 권한을 부여받지 못합니다...
 // }

  //TODO TODO TODO TODO 가장먼저 비밀번호가 맞는지 체크!!!!!!!!!!!!!!TODO TODO TODO TODO
  //TODO TODO TODO TODO 가장먼저 비밀번호가 맞는지 체크!!!!!!!!!!!!!!TODO TODO TODO TODO
  //TODO TODO TODO TODO 가장먼저 비밀번호가 맞는지 체크!!!!!!!!!!!!!!TODO TODO TODO TODO

  const savename = newname.value;
  const savephone = newphone.value;
  const savemail = newmail.value;
  //OAuth로 로그인했는데 유저가 메일 바꿔도 될까...? 비밀번호나 이메일 리셋은 어차피 oauth메일로 가고...
  //그렇지 않을 방법 찾기?
  //admin의 userlist에는 유저가 정한 메일로 가기는 함...
  //database 정보 바뀌었을때 oauth 번호 바뀌는거 어쩔ㄹ건지,,,
  const savecorp =newcorp.value;

  console.log(savename+"'s information will be updated in firestore.");
  userRef.set({
    Email: savemail,
    Name: savename,
    phoneNumber: savephone
  }).then(function(){
    console.log("user doc ok");
  }).catch(function(error){
    console.log("There's some error in user data ;-;", error);
  });

        const referU = {employee: employee};
        const corp = corpRef.where("CName"==savecorp);
        db.runTransaction(function(transaction){
          return transaction.get(corp).then(function(corpdoc){
            if(!corpdoc.data().referU){
              transaction.set({
                employee: [referU]
              });
            } else {
              const employee = corpdoc.data().employee;
              employee.push(employee);
              transaction.update(corp, {employee: employee});
            }
          });
        }).then(function(){
          console.log("transaction success");
        }).catch(function(error){
          console.log("failed: ", error);
        });


});
//회사 정보 저장
// corpQ.set({
//   CName: savecorp,
//
// }).then(function(){
//   console.log("company doc also ok");
// }).catch(function(error){
//
// })
//    console.log("There's some error in company data ;-;", error);
//  });
// 버튼 누르고 마지막에는 고쳐진 정보 유저페이지 보여주기
});

  // document.getElementById('editinfo').textContent = JSON.stringify(
  //   //json 형식을 string 형태로 읽어준다
  //   //stringify(읽기,다시쓰기, 빈공간);
  //   {displayName: displayName,
  //    email: email,
  //    emailVerified: emailVerified,
  //    phoneNumber: phoneNumber,
  //    photoURL: photoURL,
  //    uid: uid,
  //    idToken: idToken,
  //    providerData: providerData
  //   }, null, '  ');

//TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
//TODO TODO TODO TODO TODO TODO 여기까지 유저페이지 기능임 TODO TODO TODO TODO TODO TODO
//TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
