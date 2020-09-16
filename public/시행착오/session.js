// auth-sessions/app.js

function attachCsrfToken(url, cookie, value) {
  return function(req, res, next) {
    if (req.url == url) {
      res.cookie(cookie, value);
    }
    next();
  }
}

/**
 * Checks if a user is signed in and if so, redirects to profile page.
 * @param {string} url The URL to check if signed in.
 * @return {function} The middleware function to run.
 */

function checkIfSignedIn(url) {
  return function(req, res, next) {
    if (req.url == url) {
      var sessionCookie = req.cookies.session || '';
      // User already logged in. Redirect to profile page.
      admin.auth().verifySessionCookie(sessionCookie).then(function(decodedClaims) {
        res.redirect('/profile');
      }).catch(function(error) {
        next();
      });
    } else {
      next();
    }
  }
}

// // Initialize Admin SDK.
// admin.initializeApp({
//   credential: admin.credential.cert('serviceAccountKeys.json')
// });
// Support JSON-encoded bodies.
// app.use(bodyParser.json());
// // Support URL-encoded bodies.
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// // Support cookie manipulation.
// app.use(cookieParser());
// // Attach CSRF token on each request.
// app.use(attachCsrfToken('/', 'csrfToken', (Math.random()* 100000000000000000).toString()));
// // If a user is signed in, redirect to profile page.
app.use(checkIfSignedIn('/',));
// Serve static content from public folder.
// app.use('/', express.static('public'));

/** Get profile endpoint. */
app.get('/success', function (req, res) {
  // Get session cookie.
  var sessionCookie = req.cookies.session || '';
  // Get the session cookie and verify it. In this case, we are verifying if the
  // Firebase session was revoked, user deleted/disabled, etc.
  admin.auth().verifySessionCookie(sessionCookie, true /** check if revoked. */)
    .then(function(decodedClaims) {
      // Serve content for signed in user.
      return serveContentForUser('/profile', req, res, decodedClaims);
    }).catch(function(error) {
      // Force user to login.
      res.redirect('/');
    });
});

/** Session login endpoint. */
app.post('/sessionLogin', function (req, res) {
  // Get ID token and CSRF token.
  var idToken = req.body.idToken.toString();
  var csrfToken = req.body.csrfToken.toString();

  // Guard against CSRF attacks.
  if (!req.cookies || csrfToken !== req.cookies.csrfToken) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
    return;
  }
  // Set session expiration to 5 days.
  var expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // We could also choose to enforce that the ID token auth_time is recent.
  admin.auth().verifyIdToken(idToken).then(function(decodedClaims) {
    // In this case, we are enforcing that the user signed in in the last 5 minutes.
    if (new Date().getTime() / 1000 - decodedClaims.auth_time < 5 * 60) {
      return admin.auth().createSessionCookie(idToken, {expiresIn: expiresIn});
    }
    throw new Error('UNAUTHORIZED REQUEST!');
  })
  .then(function(sessionCookie) {
    // Note httpOnly cookie will not be accessible from javascript.
    // secure flag should be set to true in production.
    var options = {maxAge: expiresIn, httpOnly: true, secure: false /** to test in localhost */};
    res.cookie('session', sessionCookie, options);
    res.end(JSON.stringify({status: 'success'}));
  })
  .catch(function(error) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
  });
});

/** User signout endpoint. */
app.get('/logout', function (req, res) {
  // Clear cookie.
  var sessionCookie = req.cookies.session || '';
  res.clearCookie('session');
  // Revoke session too. Note this will revoke all user sessions.
  if (sessionCookie) {
    admin.auth().verifySessionCookie(sessionCookie, true).then(function(decodedClaims) {
      return admin.auth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then(function() {
      // Redirect to login page on success.
      res.redirect('/');
    })
    .catch(function() {
      // Redirect to login page on error.
      res.redirect('/');
    });
  } else {
    // Redirect to login page when no session cookie available.
    res.redirect('/');
  }
});

/** User delete endpoint. */
app.get('/delete', function (req, res) {
  var sessionCookie = req.cookies.session || '';
  res.clearCookie('session');
  if (sessionCookie) {
    // Verify user and then delete the user.
    admin.auth().verifySessionCookie(sessionCookie, true).then(function(decodedClaims) {
      return admin.auth().deleteUser(decodedClaims.sub);
    })
    .then(function(success) {
      // Redirect to login page on success.
      res.redirect('index.html');
    })
    .catch(function(error) {
      // Redirect to login page on error.
      res.redirect('index.html');
      console.log(error);
    });
  } else {
    // Redirect to login page when no session cookie available.
    res.redirect('index.html');
  }
});



var handleSignedInUser = function(user) {
  // Set session cookie
  user.getIdToken().then(function(idToken) {
    // Session login endpoint is queried and the session cookie is set.
    // CSRF token should be sent along with request.
    var csrfToken = getCookie('csrfToken')
    return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken)
      .then(function() {
        // Redirect to profile on success.
        window.location.assign('success.html');
      }, function(error) {
        // Refresh page on error.
        // In all cases, client side state should be lost due to in-memory
        // persistence.
        window.location.assign('index.html');
        console.log(error);
      });
  });
};

var postIdTokenToSessionLogin = function(url, idToken, csrfToken) {
  // POST to session login endpoint.
  return $.ajax({
    type:'POST',
    url: url,
    data: {idToken: idToken, csrfToken: csrfToken},
    contentType: 'application/x-www-form-urlencoded'
  });
};
