
let loginURL = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/user/login"
let registerURL = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/user/register"

window.onclick = function(event) {	
    if (event.target == loginModal) {
        document.getElementById('loginModal').style.display = "none";
    }
    if (event.target == registerModal) {
        document.getElementById('registerModal').style.display = "none";
    }
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = "block";
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = "none";
}

function showRegisterModal() {
    document.getElementById('registerModal').style.display = "block";
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = "none";
}


function loginLogoutClicked() {
    if (sessionStorage.user == null) {
        closeRegisterModal()
        showLoginModal()
    }
    else {
        sessionStorage.removeItem("user")
        alert("You have been logout")
        document.getElementById("loginLogout").innerHTML = "Login"
        window.location.replace("index.html");
    }
}


function loginClicked() {
    let emailInput = document.getElementById("loginEmail").value;
    let passwordInput = document.getElementById("loginPassword").value;
    doLoginRequest(emailInput, passwordInput)
}

function doLoginRequest(email, password) {
    let user = {
        "email": email,
        "password": password
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            

            var responseString = JSON.parse(xmlHttp.responseText);
            var responseUserInfo = JSON.parse(responseString)
            console.log(responseUserInfo)
            if (responseUserInfo.status != "SUCCESS") {
                alert("Login Failed")
                return
            }

            var AWSLoginResponseMessage = JSON.parse(responseUserInfo.content)
            let user = {
                "email": email,
                "accessToken": AWSLoginResponseMessage.accessToken,
                "refreshToken": AWSLoginResponseMessage.refreshToken
            }
            sessionStorage.setItem("user", user)
            document.getElementById('loginModal').style.display = "none";
            document.getElementById('registerModal').style.display = "none";
            document.getElementById("loginLogout").innerHTML = "Logout"
        }
    };
    xmlHttp.open("POST", loginURL, true);
    xmlHttp.send(JSON.stringify(user));    
}

function registerModalClicked() {
    closeLoginModal()
    showRegisterModal()
}

function registerClicked() {
    let username = document.getElementById("registerUsername").value;
    let emailInput = document.getElementById("registerEmail").value;
    let passwordInput = document.getElementById("registerPassword").value;
    let newUser = {
        "username": username,
        "email": emailInput,
        "password": passwordInput
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

            var responseString = JSON.parse(xmlHttp.responseText);
            var responseUserInfo = JSON.parse(responseString)
            console.log(responseUserInfo)
            if (responseUserInfo.status != "SUCCESS") {
                alert("Register Failed")
                return
            }
            doLoginRequest(emailInput, passwordInput)
        }
    };
    xmlHttp.open("POST", registerURL, true);
    xmlHttp.send(JSON.stringify(newUser));    
}

function myProfileClicked() {
    if (sessionStorage.user == null) {
        showLoginModal()
    }
    else {
        window.location.replace("profile.html");
    }
}

function searchBook() {
	alert("Search book clicked!")
}

