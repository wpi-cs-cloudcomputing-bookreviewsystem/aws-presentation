
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
            document.getElementById("myProfile").innerText = "My Profile";
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
            var userDetail = JSON.parse(response.content);
            document.getElementById("myProfile").innerText = "User Profile";
            document.getElementById("myUsername").innerHTML = "Username: " + userDetail.username;
            document.getElementById("myEmail").innerHTML = "Email: " + userDetail.email;
            console.log(userDetail.isfriend);
            document.getElementById("add-friend-button").style.display = "block";
            if (userDetail.isfriend == "true"){
                document.getElementById("add-friend-button").setAttribute("disabled","disabled");
                document.getElementById("add-friend-button").innerHTML = "already friend";
                document.getElementById("message-form").style.display = "block";
            }
        }
    };
    xmlHttp.open("GET", getFriendUrl + "?fromEmail=" + user.email + "&toEmail=" + email , true);
    xmlHttp.send(null);
}

function addFriend() {
    document.getElementById("add-friend-button").disabled = true;
    var addFriendUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/usernetwork/addfriend";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

            var responseString = JSON.parse(xmlHttp.responseText);
            var response = JSON.parse(responseString)
            console.log(response);
            if (response.content == "true"){
                alert("Adding friend request has been send!");
                document.getElementById("add-friend-button").disabled = false;
            }else {
                alert("Error: "+ response.content);
            }
        }
    };
    xmlHttp.open("POST", addFriendUrl, true);
    xmlHttp.send(JSON.stringify({"fromEmail":user.email, "toEmail":email, "title": "ADD_FRIEND_REQUEST"}));
}

function sendMessage() {
    var user = JSON.parse(sessionStorage.user);
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    email = searchParams.get('email');
    var sendMessageUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/usernetwork/sentmessage";
    var xmlHttp = new XMLHttpRequest();
    var title = "'" +  document.getElementById("message-title").value + "'";
    if (document.getElementById("message-title").value.length == 0 || document.getElementById("message-content").value.length == 0){
        alert("All spaces can not be null !");
        return false;
    }
    var content ="'" +  document.getElementById("message-content").value + "'";


    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseString = JSON.parse(xmlHttp.responseText);
            var response = JSON.parse(responseString);
            console.log(xmlHttp.responseText);
            if (response.content == "true"){
                alert("Message Send successfully !");
                window.location.reload();

            }else {
                alert("Error: "+ response.content);
            }
        }
    };
    xmlHttp.open("POST", sendMessageUrl, true);
    xmlHttp.send(JSON.stringify({"title":title, "content":content,"fromEmail":user.email, "toEmail":email, "type":"Message"}));
}

