// Name and Password from the register-form
var uname = document.getElementById('uname');
var pw = document.getElementById('pw');
var mail = document.getElementById('mail');
var dob = document.getElementById('dob');
var url = document.getElementById('url');
var comment = document.getElementById('comment');


// storing input from register-form
function store() {
    localStorage.setItem('uname', uname.value);
    localStorage.setItem('pw', pw.value);
    localStorage.setItem('mail', mail.value);
    localStorage.setItem('dob', dob.value);
    localStorage.setItem('url', url.value);
    localStorage.setItem('comment', comment.value);
	setTimeout('redirecttologin()', 1);
}

// check if stored data from register-form is equal to entered data in the   login-form
function check() {

    // stored data from the register-form
    var storedName = localStorage.getItem('mail');
    var storedPw = localStorage.getItem('pw');

    // entered data from the login-form
    var userName = document.getElementById('username');
    var userPw = document.getElementById('userpw');

    // check if stored data from register-form is equal to data from login form
    if(userName.value == storedName && userPw.value == storedPw) {
        //document.write('You will be redirected to main page in 10 sec.');
		setTimeout('redirecttouser()', 1);
    }else {
        alert('wrong Username and Password');
    }
	
}
function redirecttologin() {
               window.location = "file:///C:/Users/kriti/OneDrive/Desktop/ishwarproject/login.html";
            }

function redirecttouser() {
               window.location = "file:///C:/Users/kriti/OneDrive/Desktop/ishwarproject/userservices.html";
            } 		


function logout()
{
		window.localStorage.clear();
		window.location = "file:///C:/Users/kriti/OneDrive/Desktop/ishwarproject/index.html";
            
}