
let loginURL = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/user/login"
let registerURL = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/user/register"
let registerToAppURL = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/user/registertoapp"

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

function cancelLoginClicked() {
    closeLoginModal()
    window.location.replace("index.html");
}

function cancelRegisterClicked() {
    closeRegisterModal()
    window.location.replace("index.html");
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
            
            if (responseUserInfo.status != "SUCCESS") {
                alert("Login Failed")
                return
            }

            var AWSLoginResponseMessage = JSON.parse(responseUserInfo.content)
            console.log(AWSLoginResponseMessage.idToken)
            let user = {
                "email": email,
                "accessToken": AWSLoginResponseMessage.accessToken,
                "refreshToken": AWSLoginResponseMessage.refreshToken,
                "idToken": AWSLoginResponseMessage.idToken
            }
            sessionStorage.setItem("user", JSON.stringify(user))
            document.getElementById('loginModal').style.display = "none";
            document.getElementById('registerModal').style.display = "none";
            document.getElementById("loginLogout").innerHTML = "Logout"
          //  window.location.replace("index.html");
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
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var responseString = JSON.parse(xmlHttp.responseText);
                    var responseUserInfo = JSON.parse(responseString);
                    console.log(responseUserInfo)
                    if (responseUserInfo.status != "SUCCESS") {
                        alert("Register Failed")
                        return
                    }
                     doLoginRequest(emailInput, passwordInput)
                }
            }
            xmlHttp.open("POST", registerToAppURL, true);
            xmlHttp.send(JSON.stringify(newUser));       
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

