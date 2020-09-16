</>
index.html - login page <<style.css
success.html - dummy page for login success include logout and delete account button
Shows deferent message according to login status<<style.css
form.css - css for general design of website( should be included everywhere)
config.js - all the settings needed for firebase( should be on top of every html code)
app.js - general functions like logout, signout, sending email verification + log status details on console + writes user information in firestore for firest signed in users + display authorities button only to administrator + almost every Oauth functions 

appDB.js - deals with data from cloud firestore(set, get, update, etc) for user private information page

</userpage> - include html and css for userpage dropdown pages
user_page.html - display user information(to user) and allow editing information
user_page.css

</authority> - include  html and css for authority dropdown pages
userlist.html - display all the users, organization, and access level information on webpage + allow editing users¡¯ information and confirm users
userlist.js - add, delete data in firestore according to input 
userlist.css

