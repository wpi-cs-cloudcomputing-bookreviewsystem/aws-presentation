
function loadPage() {
    if (sessionStorage.user == null) {
        document.getElementById("loginLogout").innerHTML = "Login";
        document.getElementById('loginModal').style.display = "block";
        document.getElementById('registerModal').style.display = "none";
    }else{
        document.getElementById("loginLogout").innerHTML = "Logout";
        let url = new URL(window.location.href)
        let searchParams = new URLSearchParams(url.search);
        user = JSON.parse(sessionStorage.user);
        otherUserEmail = searchParams.get('email')
        console.log(user.email);
        console.log(otherUserEmail);
        if (otherUserEmail == null || user.email == otherUserEmail){
            loadUserDetails();
        }else{
            loadOtherUserDetails();
        }
    }

}

function loadUserDetails() {
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
    xmlHttp.send(JSON.stringify({"fromEmail":user.email,"toEmail":user.email}));
}

function loadOtherUserDetails() {
    let url = new URL(window.location.href)
    let searchParams = new URLSearchParams(url.search);
    email = searchParams.get('email')
    username = searchParams.get('username')
    var getFriendUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/profile";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseString = JSON.parse(xmlHttp.responseText);
            console.log(xmlHttp.responseText);
            var response = JSON.parse(responseString)
            var userDetail = JSON.parse(response.content)
            document.getElementById("myUsername").innerHTML = "Username: " + userDetail.username;
            document.getElementById("myEmail").innerHTML = "Email: " + userDetail.email;
            console.log(userDetail.isfriend);
            document.getElementById("add-friend-button").style.display = "inline";
            if (userDetail.isfriend == "true"){
                document.getElementById("add-friend-button").setAttribute("disabled","disabled");
                document.getElementById("add-friend-button").innerHTML = "already friend"
            }else if (userDetail.isfriend == "pending"){
                document.getElementById("add-friend-button").setAttribute("disabled","disabled");
                document.getElementById("add-friend-button").innerHTML = "pending";
            }
        }
    };
    xmlHttp.open("GET", getFriendUrl + "?fromEmail=" + user.email + "&toEmail=" + email , true);
    xmlHttp.send(null);
}

function addFriend() {
    var addFriendUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/profile/addfriend";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseString = JSON.parse(xmlHttp.responseText);
            console.log(xmlHttp.responseText);
            var response = JSON.parse(responseString)
            console.log(response);
            if (response.content == "true"){
                alert("Adding friend request has been send!");
                document.getElementById("add-friend-button").style.display = "none";
            }else {
                alert("Error: "+ response.content);
            }
        }
    };
    xmlHttp.open("POST", addFriendUrl, true);
    xmlHttp.send(JSON.stringify({"fromEmail":user.email, "toEmail":email}));
}

