// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
//importScripts('/__/firebase/init.js');

var messaging = firebase.messaging();

messaging.usePublicVapidKey("BEaoZHUsujXGU3QiWaMsgIMEbjA2qCQvNzRtFsy_AiGMjO498swiBrvGSsbmwgMq39Nx5xADyRe_HQR6AC81QMw");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': 'YOUR-SENDER-ID'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

const tokenDivId = 'token_div';
const permissionDivId = 'permission_div';


messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});








messaging.requestPermission().then(function() {
  console.log('Notification permission granted.');
  // TODO(developer): Retrieve an Instance ID token for use with FCM.
  // ...
}).catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});

// Get Instance ID token. Initially this makes a network call, once retrieved
 // subsequent calls to getToken will return from cache.
 messaging.getToken().then(function(currentToken) {
   if (currentToken) {
     sendTokenToServer(currentToken);
     updateUIForPushEnabled(currentToken);
   } else {
     // Show permission request.
     console.log('No Instance ID token available. Request permission to generate one.');
     // Show permission UI.
     updateUIForPushPermissionRequired();
     setTokenSentToServer(false);
   }
 }).catch(function(err) {
   console.log('An error occurred while retrieving token. ', err);
   showToken('Error retrieving Instance ID token. ', err);
   setTokenSentToServer(false);
 });
}


// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
  messaging.getToken().then(function(refreshedToken) {
    console.log('Token refreshed.');
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    setTokenSentToServer(false);
    // Send Instance ID token to app server.
    sendTokenToServer(refreshedToken);
    // ...
  }).catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
    showToken('Unable to retrieve refreshed token ', err);
  });
});





//포그라운드 메세징


// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': 'YOUR-SENDER-ID'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function(payload) {
  console.log('Message received. ', payload);
  // ...
});






//백그라운드 메세징-알림 메세지...아마 안쓸듯

https://fcm.googleapis.com/fcm/send
Content-Type: application/json
Authorization: key=AIzaSyC...akjgSX0e4

{ "notification": {
    "title": "Background Message Title",
    "body": "Background message body",
    "click_action" : "https://dummypage.com"
  },

  "to" : "eEz-Q2sG8nQ:APA91bHJQRT0JJ..."

}







//
// // Utility function for UTF-8 encoding a string to an ArrayBuffer.
// const utf8Encoder = new TextEncoder('utf-8');
//
// // The unsigned token is the concatenation of the URL-safe base64 encoded
// // header and body.
// const unsignedToken = .....;
//
// // Sign the |unsignedToken| using ES256 (SHA-256 over ECDSA).
// const key = {
//   kty: 'EC',
//   crv: 'P-256',
//   x: window.uint8ArrayToBase64Url(
//     applicationServerKeys.publicKey.subarray(1, 33)),
//   y: window.uint8ArrayToBase64Url(
//     applicationServerKeys.publicKey.subarray(33, 65)),
//   d: window.uint8ArrayToBase64Url(applicationServerKeys.privateKey),
// };
//
// // Sign the |unsignedToken| with the server's private key to generate
// // the signature.
// return crypto.subtle.importKey('jwk', key, {
//   name: 'ECDSA', namedCurve: 'P-256',
// }, true, ['sign'])
// .then((key) => {
//   return crypto.subtle.sign({
//     name: 'ECDSA',
//     hash: {
//       name: 'SHA-256',
//     },
//   }, key, utf8Encoder.encode(unsignedToken));
// })
// .then((signature) => {
//   console.log('Signature: ', signature);
// });
//
// Authorization: 'WebPush <JWT Info>.<JWT Data>.<Signature>'
// Crypto-Key: p256ecdsa=<URL Safe Base64 Public Application Server Key>
//
// // Simplified HKDF, returning keys up to 32 bytes long
// function hkdf(salt, ikm, info, length) {
//   // Extract
//   const keyHmac = crypto.createHmac('sha256', salt);
//   keyHmac.update(ikm);
//   const key = keyHmac.digest();
//
//   // Expand
//   const infoHmac = crypto.createHmac('sha256', key);
//   infoHmac.update(info);
//
//   // A one byte long buffer containing only 0x01
//   const ONE_BUFFER = new Buffer(1).fill(1);
//   infoHmac.update(ONE_BUFFER);
//
//   return infoHmac.digest().slice(0, length);
// }
//
// subscription.joJSON().keys.auth
// subscription.joJSON().keys.p256dh
//
// subscription.getKey('auth')
// subscription.getKey('p256dh')
