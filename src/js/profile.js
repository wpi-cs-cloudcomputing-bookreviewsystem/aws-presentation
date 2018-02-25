
function loadPage() {
	loadUserDetails()
}

function loadUserDetails() {
    if (sessionStorage.user == null) {
        document.getElementById("loginLogout").innerHTML = "Login";
        document.getElementById('loginModal').style.display = "block";
        document.getElementById('registerModal').style.display = "none";
    }
    else {
        document.getElementById("loginLogout").innerHTML = "Logout";
        var user = JSON.parse(sessionStorage.user)
        var profileUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/profile";
        var xmlHttp = new XMLHttpRequest();   
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {                
                var responseString = JSON.parse(xmlHttp.responseText);
                var response = JSON.parse(responseString)
                console.log(response)
                var userDetail = JSON.parse(response.content)
                document.getElementById("myUsername").innerHTML = "Username: " + userDetail.username
                document.getElementById("myEmail").innerHTML = "Email: " + userDetail.email               
            }
            else if (xmlHttp.status == 401) {
                alert("Not Authorized")
            }
        };  
        xmlHttp.open("POST", profileUrl, true);
        xmlHttp.setRequestHeader("Authorization", user.idToken);  
        xmlHttp.send(JSON.stringify(JSON.stringify(user)));
    }   
}