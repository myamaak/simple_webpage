var corpRef = firestore.collection("Company");
var userRef = firestore.collection("Users");

var table = document.getElementById('everyone');
//여기서 이프문 돌리기
//TABLE1
userRef.get().then(function(all){
  for(a=0; a<all.docs.length; a++){
            var row = table.insertRow(table.rows.length);
            var each = all.docs[a];

  for (i = 0; i < table.rows[0].cells.length; i++) {

            var cell = row.insertCell(i);
            var div = document.createElement('div'); // create DIV element
            var span = document.createElement('span');
            var button = document.createElement('button');
            var choice = document.createElement('input');

            if(i==0){
            cell.appendChild(div);
            div.appendChild(span);
            span.innerText = each.data().Name;
          }else if (i==1) {
            cell.appendChild(div);
            div.appendChild(span);
            span.innerText = each.data().Email;
          }else if (i==2) {
            cell.appendChild(div);
            div.appendChild(span);
            span.innerText = each.data().phoneNumber;
          }else if (i==3) {
            cell.appendChild(div);
            div.appendChild(span);
            span.innerText = each.data().CName;
          }else if (i==4) {
            cell.appendChild(div);
            div.appendChild(button);
            var btntext = document.createTextNode(each.data().Confirmation);
            button.appendChild(btntext);
            button.setAttribute("id", "tf"+a);
            button.setAttribute("class", "TF");
                if(each.data().Confirmation == true){
                  document.getElementById("tf"+a).style.color='blue';
                }else{
                  document.getElementById("tf"+a).style.color='red';
                }
          }else if (i==5) {
            cell.appendChild(div);
            div.appendChild(choice);
            choice.setAttribute("type", "checkbox");
            choice.setAttribute("id", "d"+a);
            choice.setAttribute("class", "Todeleteuser");
          }
    }
  }


//false-true update
var TFbtnGroup = document.querySelectorAll(".TF");
for (x=0; x < TFbtnGroup.length ; x++){
  var thisTF = document.getElementById("tf"+x);
  thisTF.addEventListener("click", function(){
        if (document.getElementById(this.id).childNodes[0].nodeValue == 'true') {
            alert("disable confimation");
            document.getElementById(this.id).style.color='red';
            document.getElementById(this.id).innerText='false';
            var final = this.id.match(/\d+/);
            userRef.doc(all.docs[final].id).update({
              "Confirmation":false
            }).then(function(){
              console.log("Document updated-false");
            });
        }else{
            alert("are you sure you want to confirm this user?");
            document.getElementById(this.id).style.color='blue';
            document.getElementById(this.id).innerText='true';
            var final = this.id.match(/\d+/);
            //get number from string
            userRef.doc(all.docs[final].id).update({
              "Confirmation":true
            }).then(function(){
              console.log("Document updated-true");
            });
        }
  });
}
//false-true update ENDs HERE

//deleteAccount -only from firestore-
var userD = document.querySelectorAll('.Todeleteuser');
console.log(userD.length);
var dbutton = document.querySelector("#uxbtn");
  dbutton.addEventListener("click", function(){
    for(y=0; y< userD.length; y++){
         var thisd = document.getElementById("d"+y);
         console.log(thisd.checked);
         if(thisd.checked != true){
           console.log("don't delete", y);
         }else{
           console.log(y, " will be compeletly deleted");
           userRef.doc(all.docs[y].id).delete().then(function(){
             console.log("user deleted");
             window.location.reload();
           }).catch(function(error){
             console.log(error);
           });
       }
      }
  });
//deleteAccount ENDs HERE

//editAccount
// var userE = document.querySelectorAll('.Toedituser');
// console.log(userE.length);
// var ebutton = document.querySelector("#uebtn");
//   ebutton.addEventListener("click", function(){
//
//     for(y=0; y< userE.length; y++){
//          var thise = document.getElementById("e"+y);
//          console.log(thise.checked);
//         if(thise.checked == true){
//           table.deleteRow(y)
//
//
//
//
//       }
//     }
//   });


//makeAccount
 var makeu = document.querySelector("#makeu");
 var list1 = document.querySelector("#list1");

 makeu.addEventListener("click", function(){
   list1.style.display='none';
   document.querySelector('#makeuform').style.display='block';
 });

var addmake = document.querySelector('#addmake');
var addTo = document.querySelector('#makepeople');
addmake.addEventListener("click", function(){
  var count = addTo.rows.length;
  var newrow = addTo.insertRow(count);

    for (j = 0; j < addTo.rows[0].cells.length; j++) {
        var newcell = newrow.insertCell(j);
        var label = document.createElement('label');
        var input = document.createElement('input');
        var span1 = document.createElement('span');
        var span2 = document.createElement('span');
        label.setAttribute("class", "inp");
        input.setAttribute("type", "text");
        input.placeholder= " ";
        span1.setAttribute("class", "iform");
        span2.setAttribute("class","inputborder");

      if(j==0){
              label.setAttribute("for", "mclient"+count);
              input.setAttribute("id", "mclient"+count);
              span1.innerHTML = "client name"+count;
              newcell.appendChild(label);
              label.appendChild(input);
              label.appendChild(span1);
              label.appendChild(span2);

            }else if (j==1) {
              label.setAttribute("for", "memail"+count);
              input.setAttribute("id", "memail"+count);
              span1.innerHTML = "Email";
              newcell.appendChild(label);
              label.appendChild(input);
              label.appendChild(span1);
              label.appendChild(span2);

            }else if (j==2) {
              label.setAttribute("for", "mphone"+count);
              input.setAttribute("id", "mphone"+count);
              span1.innerHTML = "Phone";
              newcell.appendChild(label);
              label.appendChild(input);
              label.appendChild(span1);
              label.appendChild(span2);

            }else if (j==3) {
              label.setAttribute("for", "mcorp"+count);
              input.setAttribute("id", "mcorp"+count);
              span1.innerHTML = "Organization"
              newcell.appendChild(label);
              label.appendChild(input);
              label.appendChild(span1);
              label.appendChild(span2);

            }
          }
});


var umade = document.querySelector("#umade");
umade.addEventListener("click", function(){
  for (k=0; k < addTo.rows.length; k++){
   const savemclient = document.getElementById('mclient'+k).value;
   const savememail = document.getElementById('memail'+k).value;
   const savemphone = document.getElementById('mphone'+k).value;
   const savemcorp = document.getElementById('mcorp'+k).value;

   console.log(savemclient);
   console.log(savememail);
   console.log(savemphone);
   console.log(savemcorp);
   function validform(input){
    if(input == ""){
      var warn = document.querySelector("#warn");
      warn.style.display='block';
      warn.style.fontSize='60%';
      warn.style.color = 'red';
      warn.innerHTML = "please fill in all the required entry."
      return false;
    }else{
      return true;
    }
   }

   if(validform(savemclient)==true && validform(savememail)==true && validform(savemcorp)==true){
     userRef.add({
       Name: savemclient,
       Email: savememail,
       phoneNumber: savemphone,
       CName: savemcorp,
       Confirmation: true
     }).then(function(){
       console.log("added");
       window.location.reload();
     }).catch(function(error){
       console.log("There's some error in user data ;-;", error);
     });
   }else{
    console.log( k +" Name"+ validform(savemclient));
    console.log(k+"mail"+validform(savememail));
    console.log(k +"organization"+validform(savemcorp));
   }
  }
});





});







//TABLE2

var tab = document.getElementById('everywhere');
corpRef.get().then(function(all){
  for(b=0; b<all.docs.length; b++){
          var row = tab.insertRow(tab.rows.length);
          var eachof = all.docs[b];
  //           var levelp = each.data().Level.path;
  //           firestore.doc(levelp).get().then(function(call){
  //             var eachlever = call.data().Number;
  //           });
  //           console.log(eachlever);
            for (i = 0; i < tab.rows[0].cells.length; i++) {
                      var cell = row.insertCell(i);
                      var div = document.createElement('div'); // create DIV element
                      var input = document.createElement('input');
                      var button = document.createElement('button');

                     if(i==0) {
                      cell.appendChild(div);
                      div.appendChild(button);
                      var btnvalue = document.createTextNode(eachof.data().CName);
                      button.appendChild(btnvalue);
                      button.setAttribute("id", "org"+b);
                      button.setAttribute("class","corpbtn");
                    }else if (i==1) {
                      cell.appendChild(div);
                      div.appendChild(input);
                      input.setAttribute("type", "checkbox");
                      input.setAttribute("id", "del"+b);
                      input.setAttribute("class", "Todeletecorp");
                    }else if (i==2) {
                      cell.appendChild(div);
                      div.appendChild(input);
                      input.setAttribute("type", "radio");;
                      input.setAttribute("name", "group1")
                      input.setAttribute("id", "edit"+b);
                      input.setAttribute("class", "Toeditcorp");
                    }
            }

}

//makeOrganization
//delete organization-select multiple
//edit organization-select only one

//onclick company btn
//>>> show level, and access rights
//plus some more if available


//delete company START
var orgD = document.querySelectorAll(".Todeletecorp");
console.log(orgD.length);
var dbtn = document.querySelector("#x");
  dbtn.addEventListener("click", function(){
    for(y=0; y< orgD.length; y++){
         var tod = document.getElementById("del"+y);
         console.log(tod.checked);
        if(tod.checked != true){
          console.log("don't delete", y);
        }else{
          var thislevelp = all.docs[y].data().Level.path;
          console.log(thislevelp);
          var thislevelRef = firestore.doc(thislevelp);

          console.log(y, " will be compeletly deleted");

          corpRef.doc(all.docs[y].id).delete().then(function(){
          console.log("company deleted");

            thislevelRef.delete().then(function(){
              console.log("level deleted");
            }).catch(function(error){
              console.log(error);
            });
            window.location.reload();
          }).catch(function(error){
            console.log(error);
          });
      }
    }
  });
//delete company ENDs here

// //edit company
// var corpE = document.querySelectorAll('.Toeditcorp');
// console.log(corpE.length);
// var dbutton = document.querySelector("#e");
//   dbutton.addEventListener("click", function(){
//     for(y=0; y< userD.length; y++){
//          var thisd = document.getElementById("d"+y);
//
//         if(thisd.checked == true){
//           corpRef.where().update({
// //didn't end!!!!
//           });
//         }
//     }
//   });


var makeo = document.querySelector("#makeo");
var list2 = document.querySelector("#list2");
const levelRef = firestore.collection("Level");
makeo.addEventListener("click", function(){
  list2.style.display='none';
  document.querySelector('#makecform').style.display='block';

  levelRef.get().then(function(levels){
  document.querySelector('#mlevel').innerHTML= levels.docs.length;
  });

});
//editENDS here



var addmakeC = document.querySelector('#addmakeC');
var addToC = document.querySelector('#makecorp');
addmakeC.addEventListener("click", function(){
  var count = addToC.rows.length;
  var newrow = addToC.insertRow(count);
    for (j = 0; j < addToC.rows[0].cells.length; j++) {
        var newcell = newrow.insertCell(j);
        var label = document.createElement('label');
        var input = document.createElement('input');
        var span1 = document.createElement('span');
        var span2 = document.createElement('span');
        label.setAttribute("class", "inp");
        input.setAttribute("type", "text");
        input.placeholder= " ";
        span1.setAttribute("class", "iform");
        span2.setAttribute("class","inputborder");

      if(j==2){
              label.setAttribute("for", "maccess");
              input.setAttribute("id", "maccess");
              span1.innerHTML = "Access right"+count;
              newcell.appendChild(label);
              label.appendChild(input);
              label.appendChild(span1);
              label.appendChild(span2);
            }
          }
        });




var Cmade = document.querySelector('#Cmade');
Cmade.addEventListener("click", function(){
   const levelRef = firestore.collection("Level");

   const savemCname = document.getElementById("mCname").value;
   const saveClevel = document.querySelector("#mlevel").innerHTML;
   // const saveaccess = Array.prototype.slice.call(document.querySelectorAll("#maccess").values);
   const arr = [];
   const givevalue = document.querySelectorAll("#maccess");
   for(i=0; i<givevalue.length; i++){
     arr[i] = givevalue[i].value;
   }

   console.log(arr);
   console.log(savemCname);
   console.log(saveClevel);
   //console.log(saveaccess);

           if(savemCname!=""){
             levelRef.add({
               Number: saveClevel,
               accessRight: arr
             }).then(function(){
               console.log("level saved");
             }).catch(function(error){
               console.log(error);
             });

             var typetoN = Number(saveClevel);
             console.log(typetoN);
             console.log(saveClevel)
             levelRef.where("Number","==", saveClevel)
             .get().then(function(querySnapshot){
               querySnapshot.forEach(function(doc){
                 var Refpath= firestore.doc("Level/"+doc.id);
                 var newcorpRef = corpRef.doc(savemCname);
                       newcorpRef.set({
                         CName: savemCname,
                         Level: Refpath
                       }).then(function(){
                         console.log("all saved");
                         window.location.reload();
                       }).catch(function(error){
                         console.log(error);
                       });

               });
             }).catch(function(error){
               console.log(error);
             });
           }else{
             alert("there is nothing to save");
            console.log(savemCname);
           }

        });


        var orgbtn = document.querySelectorAll(".corpbtn");
        for(c=0; c<orgbtn.length; c++){
          var thisdetail = document.getElementById("org"+c);
          thisdetail.addEventListener("click", function(){
            document.querySelector("#list2").style.display="none";
            document.querySelector("#detail").style.display='block';

            var seeinfoof = document.getElementById(this.id).childNodes[0].nodeValue;
            document.querySelector("#title").innerText = seeinfoof;
            var detailnumber = document.querySelector("#thislevel");
            var detailaccess = document.querySelector("#access");
            console.log(seeinfoof);
            console.log(detailnumber);
            console.log(document.querySelector("#detail"));
            firestore.collection("Company").where("CName", "==", seeinfoof)
            .get()
            .then(function(thisis){
              var doc = thisis.docs[0];
                var levelinfop = doc.data().Level.path;
                console.log(levelinfop);

                firestore.doc(levelinfop).get().then(function(doc){
                  var numberof = doc.data().Number;
                  var accessof = doc.data().accessRight;
                  console.log(numberof);
                  console.log(accessof);
                    detailnumber.innerHTML = numberof;
                    for(i=0; i<accessof.length; i++){
                    var span1 = document.createElement('span');
                    var span2 = document.createElement('span');
                    var br = document.createElement('br');
                    detailaccess.appendChild(span1)
                    detailaccess.appendChild(span2);
                    detailaccess.appendChild(br);
                    span1.innerHTML= i+1+")";
                    span2.innerHTML = accessof[i];


                    }
                });

            });


          });
        }





});



//trashcode
//
// firebase.auth().onAuthStateChanged(function(user){
//       var displayName = user.displayName;
//       var email = user.email;
//       var uid = user.uid;
//       var phoneNumber = user.phoneNumber;
//
//
//
//       function appendRow() {
//         var tbody = document.getElementById('BOT'), // table reference
//
//             row = tbody.insertRow(tbody.rows.length), i;
//         // insert table cells to the new row
//         for (i = 0; i < table.rows[0].cells.length; i++) {
//             createCell(row.insertCell(i), i, 'row');
//         }
//       }
//
//       // create DIV element and append to the table cell
//       function createCell(cell, text, c) {
//           var span = document.createElement('span'), // create DIV element
//           span.setAttribute('id', c);
//           cell.appendChild(span);                   // append DIV to the table cell
//       }
//
//
//   function addR(tableid){
//     const userRef = firestore.collection("Users").doc(uid);
//     const corpRef = firestore.collection("Company");
//
//     var table = document.getElementById('tableid');
//     var total = table.rows.length;
//     var row = table.insertRow(total);
//
//
//     corpRef.get().then(function(all){
//       console.log(all.docs.length);
//       for(a =0; a<all.docs.length; a++){
//       var c = all.docs[a];
//
//
//       var organization = c.data().CName;
//
//
//       var numpath = c.data().Level;
//       var levelRef = firestore.doc(numpath);
//       levelRef.get().then(function(leveldoc){
//         var num = leveldoc.data().Number;
//       });
//     }
//   }
//
//       var userRef = firestore.collection("Users");
//       userRef.get().then(function(doc){
//         for(i=0; i<doc.data().length; i++){
//
//           var ename = doc.data().Name;
//         }
//       });
//
//       var corpRef = firestore.collection("Company");
//       corpRef.get().then(function(all){
//         console.log(all.docs.length);
//         for(a =0; a<all.docs.length; a++){
//         var c = all.docs[a];
//         for(i =0; i<c.data().employee.length; i++){
//           var e = c.data().employee[i];
//           document.getElementById(e);
//           console.log(e.id, "work for", c.id);
//
//         }
//         }
//         });
//             });
//
//
// });
