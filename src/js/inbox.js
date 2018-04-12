function loadPage() {
    LoadPageDefault()
    loadUserInbox()
}

function loadUserInbox() {
    user = JSON.parse(sessionStorage.user);
    var inboxUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/usernetwork";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseString = JSON.parse(xmlHttp.responseText);
            var response = JSON.parse(responseString);
            messages = JSON.parse(response.content);
            console.log(messages);
            for (i = 0; i < messages.length; i++) {
                message = messages[i];
                let str_prefix = "<li class=\"list-group-item\">"
                    + "<div class=\"row\">"
                    + "<div class=\"col-xs-10 col-md-11\">"
                    + "<div>"
                    + "<p id = \"message-title\">"
                    + message.title
                    + "</p>"
                    + "<div class=\"mic-info\">"
                    + "By: <a href=\""+ "profile.html?email=" + message.senderEmail + "&username=" + user.email +"\" id=\"message-user-and-date\">" + message.senderEmail
                    + "</a>"
                    + "</div>"
                    + "</div>"
                    + "<div class=\"comment-text\" id=\"message-text\">"
                    + message.content
                    + "</div>";

                let str_suffix =  "</div>" + "</div>" + "</li>";
                let str_middle =  (function () {
                    if (message.title == "ADD_FRIEND_REQUEST"){
                        return   "<a  href=\"#\" class=\"btn btn-sm btn-hover btn-primary\" id = \"accept-button\" style='display: none'>"
                            + "<span class=\"glyphicon glyphicon-share-alt\" style=\"padding-right:3px;\"></span>Accept</a>"
                            + "<a href=\"#\" class=\"btn btn-sm btn-hover btn-danger\" id = \"decline-button\" style='display: none'><span class=\"glyphicon glyphicon-remove\" style=\"padding-right:3px;\"></span>Decline</a>"
                            + "<a href=\"#\" class=\"btn btn-sm btn-hover btn-dark\" id = \"ignore-button\" style='display: none'><span class=\"glyphicon glyphicon-remove\" style=\"padding-right:3px;\"></span>Ignore</a>";
                    }else if (message.status == "UNOPEN"){
                        return  "<a  href=\"#\" class=\"btn btn-sm btn-hover btn-primary\" id = \"read-button\" style='display: none'>"
                            + "<span class=\"glyphicon glyphicon-share-alt\" style=\"padding-right:3px;\"></span>Read</a>"
                            + "<a href=\"#\" class=\"btn btn-sm btn-hover btn-dark\" id = \"ignore-button\" style='display: none'><span class=\"glyphicon glyphicon-remove\" style=\"padding-right:3px;\"></span>Ignore</a>";
                    }else
                        return "";
                })();




                document.getElementById("message-container").insertAdjacentHTML("afterbegin", str_prefix  + str_middle + str_suffix);
                if (message.status == "UNOPEN"){
                    if (message.title == "ADD_FRIEND_REQUEST"){
                        document.getElementById("accept-button").onclick = function () {
                            acceptFriend(message.pmId,message.senderEmail);
                        }
                        document.getElementById("accept-button").style.display="inline";
                        document.getElementById("decline-button").onclick = function () {
                            declineFriend(message.pmId,message.senderEmail);
                        }
                        document.getElementById("decline-button").style.display="inline";
                    }else {
                        document.getElementById("read-button").onclick = function () {
                            readMessage(message.pmId);
                        }
                        document.getElementById("read-button").style.display="inline";
                    }

                    document.getElementById("ignore-button").onclick = function () {
                        ignoreMessage(message.pmId);
                    }
                    document.getElementById("ignore-button").style.display="inline";
                }
            }


        }
        else if (xmlHttp.status == 401) {
            alert("Not Authorized")
        }
    };
    xmlHttp.open("GET", inboxUrl + "?email=" + user.email, true);
    xmlHttp.send(null);
}

function LoadPageDefault() {
    if (sessionStorage.user == null) {
        document.getElementById("loginLogout").innerHTML = "Login";
        document.getElementById('loginModal').style.display = "block";
        document.getElementById('registerModal').style.display = "none";
    }
    else {
        document.getElementById("loginLogout").innerHTML = "Logout";
    }
}

function acceptFriend(pmId,email) {
    var addFriendUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/usernetwork/addfriend";
    var xmlHttp = new XMLHttpRequest();
    document.getElementById("accept-button").disabled = true;
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            document.getElementById("accept-button").disabled = false;
            var responseString = JSON.parse(xmlHttp.responseText);
            console.log(xmlHttp.responseText);
            var response = JSON.parse(responseString)

            if (response.content == "true"){
                alert("Accept Friend Successfully!");
                window.location.replace("inbox.html");
            }else {
                alert("Error: "+ response.content);
            }
        }
    };
    xmlHttp.open("POST", addFriendUrl, true);
    xmlHttp.send(JSON.stringify({"pmId":pmId, "fromEmail":user.email, "toEmail":email, "title": "ADD_FRIEND_ACCEPT_RESPONSE"}));
}

function declineFriend(pmId, email) {
    document.getElementById("decline-button").disabled = true;
    var addFriendUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/usernetwork/addfriend";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        document.getElementById("decline-button").disabled = false;
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseString = JSON.parse(xmlHttp.responseText);
            console.log(xmlHttp.responseText);
            var response = JSON.parse(responseString)
            console.log("decline");
            if (response.content == "true"){
                alert("Decline Friend Successfully!");
                window.location.replace("inbox.html");
            }else {
                alert("Error: "+ response.content);
            }
        }
    };
    xmlHttp.open("POST", addFriendUrl, true);
    xmlHttp.send(JSON.stringify({"pmId":pmId, "fromEmail":user.email, "toEmail":email, "title": "ADD_FRIEND_REJECT_RESPONSE"}));
}

function ignoreMessage(pmId) {
    document.getElementById("ignore-button").setAttribute("disabled",true);
    var ignoreUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/usernetwork/ignorepm";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            document.getElementById("ignore-button").setAttribute("disabled",false);
            var responseString = JSON.parse(xmlHttp.responseText);
            console.log(xmlHttp.responseText);
            var response = JSON.parse(responseString)
            if (response.content == "true"){
                alert("Ignore Message Successfully!");
                window.location.replace("inbox.html");
            }else {
                alert("Error: "+ response.content);
            }
        }
    };
    xmlHttp.open("GET", ignoreUrl + "?pmId=" + pmId, true);
    xmlHttp.send(null);
}

function readMessage(pmId) {
    document.getElementById("read-button").disabled = true;
    var ignoreUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/usernetwork/readmessage";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            document.getElementById("read-button").disabled = false;
            var responseString = JSON.parse(xmlHttp.responseText);
            console.log(xmlHttp.responseText);
            var response = JSON.parse(responseString)
            if (response.content == "true"){
                alert("Read Message Successfully!");
                window.location.replace("inbox.html");
            }else {
                alert("Error: "+ response.content);
            }
        }
    };
    xmlHttp.open("GET", ignoreUrl + "?pmId=" + pmId, true);
    xmlHttp.send(null);
}