
function loadPage() {
	checkLogIn()
}

function checkLogIn(){
    if (sessionStorage.user == null) {
        document.getElementById("loginLogout").innerHTML = "Login";
        document.getElementById('loginModal').style.display = "block";
        document.getElementById('registerModal').style.display = "none";
    }  else {
        document.getElementById("loginLogout").innerHTML = "Logout";
    }
}


function addBook() {
        var user = JSON.parse(sessionStorage.user)
        var addBookUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/books/addbook";
        var xmlHttp = new XMLHttpRequest();
        var title = "'" +  document.getElementById("title").value + "'";
        if (document.getElementById("title").value.length == 0 || document.getElementById("author").value.length == 0 ||  document.getElementById("isbn").value.length == 0
            || document.getElementById("url").value.length == 0 || document.getElementById("description").value.length == 0 || document.getElementById("genre").value.length == 0
            || document.getElementById("review").value.length == 0){
          alert("All spaces can not be null !");
          return;
        }
        var author ="'" +  document.getElementById("author").value + "'";
        var isbn = document.getElementById("isbn").value;
        var url = "'" + document.getElementById("url").value + "'";
        var description ="'" + document.getElementById("description").value + "'";
        var genre = "'" + document.getElementById("genre").value+ "'";
        var review ="'" +  document.getElementById("review").value + "'";

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var responseString = JSON.parse(xmlHttp.responseText);
                var response = JSON.parse(responseString)
                if (response.content == "true"){
                    alert("Add book successfully !");
                    window.location.replace("index.html");
                }else {
                    alert("Error: "+ response.content);
                }
            }
        };
        xmlHttp.open("POST", addBookUrl, true);
        xmlHttp.send(JSON.stringify({"title":title, "author":author, "ISBN": isbn, "description":description,
            "imageUrl":url, "genre":genre, "content":review,"email":user.email}));
}