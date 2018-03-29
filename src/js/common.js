
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
//    window.location.replace("index.html");
}

function cancelRegisterClicked() {
    closeRegisterModal()
//    window.location.replace("index.html");
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
            
            console.log(xmlHttp.responseText);
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
            window.location.reload();
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

// function searchBook() {
//     var keyword = document.getElementById("search-keyword").value;
//     if (keyword.length == 0){
//         alert("Can not be null !");
//         return;
//     }
//     console.log(keyword);
//     var searchUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/books/search"
//     var xmlHttp = new XMLHttpRequest();
//
//     let url = new URL(window.location.href)
//     let searchParams = new URLSearchParams(url.search);
//     page = searchParams.get('page')
//
//
//     xmlHttp.onreadystatechange = function () {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//             console.log(keyword);
//             var responseString = JSON.parse(xmlHttp.responseText);
//             var response = JSON.parse(responseString)
//             books = JSON.parse(response.content)
//
//             console.log(books);
//             if (page == null) page = 1;
//             for (i = 6 * (page - 1); i < Math.min(6 * page, books.length); i++) {
//                 book = books[i]
//                 let bookTitleId = "book_" + (i - 6 * (page - 1))+ "_title"
//                 let bookTitleElement = document.getElementById(bookTitleId);
//                 bookTitleElement.innerHTML = book.title
//                 //   bookTitleElement.href = demoUrl + "/" + book.ISBN
//                 bookTitleElement.href = "bookReview.html?isbn=" + book.ISBN
//
//                 let bookDescriptionId = "book_" + (i - 6 * (page - 1)) + "_description"
//                 let bookDescriptionElement = document.getElementById(bookDescriptionId);
//                 bookDescriptionElement.innerHTML = book.description
//
//
//                 let bookImageId = "book_" + (i - 6 * (page - 1)) + "_image"
//                 let bookImageElement = document.getElementById(bookImageId);
//                 bookImageElement.src = book.imageUrl
//                 bookImageElement.height = 420
//
//                 let bookHref = "book_" + (i - 6 * (page - 1)) + "_href"
//                 document.getElementById(bookHref).href = "bookReview.html?isbn=" + book.ISBN
//             }
//
//
//             var pageArea = document.getElementById("page-area");
//             for (j = 1; j <= ((books.length - 1) / 6 + 1); j++) {
//                 let li = document.createElement("li");
//                 li.setAttribute("class", "page-item");
//                 li.setAttribute("id", "page-item-" + j);
//                 let a = document.createElement("a");
//                 a.setAttribute("class", "page-link")
//                 a.href = "index.html?page=" + j;
//                 a.innerHTML = j;
//                 a.onclick = function () {
//                     listAllBooks();
//                 }
//                 li.appendChild(a);
//                 pageArea.appendChild(li);
//             }
//         }
//     };
//     xmlHttp.open("GET", searchUrl + "?keyword=" + keyword, true);
//     xmlHttp.send(null);
// }

