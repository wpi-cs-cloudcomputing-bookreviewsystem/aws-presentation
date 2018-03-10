

function loadPage() {
    LoadPageDefault()
    loadBookByISBN()
}


function loadBookByISBN() {
    
    let url = new URL(window.location.href)
    let searchParams = new URLSearchParams(url.search);
    isbn = searchParams.get('isbn')
    page = searchParams.get('page')
    if (page == null) page = 1;
    console.log(isbn) 
    var bookUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/books";
    var xmlHttp = new XMLHttpRequest();    
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseString = JSON.parse(xmlHttp.responseText);
            var response = JSON.parse(responseString)
            var book = JSON.parse(response.content)
            console.log(book);
            document.getElementById("book_title").innerHTML = book.title;
            document.getElementById("book_author").innerHTML = book.author;
            document.getElementById("book_image").src = book.imageUrl;
            document.getElementById("book_description").innerHTML = book.description;
            var score = book.score;
            document.getElementById("score").innerHTML = "Score: "+ score;
            document.getElementById("score_star").style = "width:"+ score*10 + "%";
            reviews = book.reviews;
            console.log(reviews);
            console.log(page);
            for (i = 10 * (page - 1); i < Math.min(10 * page, reviews.length); i++) {
                review = reviews[i];
                let reviewContent = document.getElementById("review-" + (i - 10 * (page - 1)));
                reviewContent.innerHTML = review.content;
                let reviewName = document.getElementById("review-name-" + (i - 10 * (page - 1)));
                reviewName.innerHTML = review.reviewer.username;
                reviewName.href =  "profile.html?email=" + review.reviewer.email + "&username=" + review.reviewer.username;
                let reviewThumbUpIcon = document.getElementById("review-thumbup-icon-" + (i - 10 * (page - 1)));
                reviewThumbUpIcon.setAttribute("class","fa fa-thumbs-o-up");
                let reviewThumbUp = document.getElementById("review-thumbup-" + (i - 10 * (page - 1)));
                reviewThumbUp.innerHTML = review.thumbUpNumber;
                let reviewFlagIcon = document.getElementById("review-flag-icon-" + (i - 10 * (page - 1)));
                reviewFlagIcon.setAttribute("class","fa fa-flag-o");
            }

            var pageArea = document.getElementById("page-area");
            for (j = 1; j <= ((reviews.length - 1) / 10 + 1); j++) {
                if (document.getElementById("page-item-" + j))   continue;
                var li = document.createElement("li");
                li.setAttribute("class", "page-item");
                li.setAttribute("id", "page-item-" + j);
                var a = document.createElement("a");
                a.setAttribute("class", "page-link")
                a.href =  "bookReview.html?isbn=" + isbn + "&page=" + j;
                a.innerHTML = j;
                a.onclick = function () {
                    loadBookByISBN()
                }
                li.appendChild(a);
                pageArea.appendChild(li);
            }



        }
    };  
    xmlHttp.open("POST", bookUrl, true);     
    xmlHttp.send(JSON.stringify({"isbn":isbn}));
};


function thumbUp(id) {
    // if(sessionStorage.user == null){
    //     alert("You should log in at first!");
    // }else {
        var index = Number(id.substring(20)) + 10 * (page - 1);
        console.log(index);
        console.log(reviews[index]);
        var reviewId = reviews[index].reviewId;
        var num = reviews[index].thumbUpNumber;
        var thumbupUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/review/thumbup";
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var responseString = JSON.parse(xmlHttp.responseText);
                var response = JSON.parse(responseString)
                if (response.content == "true"){
                    alert("thumb up!");
                     loadPage();
                }else {
                    alert("Error: "+ response.content);
                }

            }
        };
        xmlHttp.open("POST", thumbupUrl, true);
        xmlHttp.send(JSON.stringify({"reviewId": reviewId, "num": num}));

    // }
}

function recommendToFriends() {
    alert("recommendToFriends Clicked!");
}

function flagReview() {
    let url = new URL(window.location.href)
    let searchParams = new URLSearchParams(url.search);
    isbn = searchParams.get('isbn')
    page = searchParams.get('page')
    if (page == null) page = 1;
    console.log(isbn)
    var flagUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/review/";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseString = JSON.parse(xmlHttp.responseText);
            var response = JSON.parse(responseString)
            var book = JSON.parse(response.content)
            console.log(book);



        }
    };
    xmlHttp.open("GET", flagUrl + page, true);
    xmlHttp.send(null);
}

function selectPage(pageNumber) {
    if (pageNumber == "-1") {
        alert("more page is selected!");
    }else{
        alert("page " + pageNumber + " is selected!");
    }
}

function submitNewReview() {
    if(sessionStorage.user == null){
        alert("You should log in at first!");
    }else{
        let url = new URL(window.location.href);
        let searchParams = new URLSearchParams(url.search);
        isbn = searchParams.get('isbn');
        reviewText = document.getElementById("review_text").value;
        console.log(reviewText);
        var user = JSON.parse(sessionStorage.user);
        var reviewUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/review";
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

                var responseString = JSON.parse(xmlHttp.responseText);
                console.log(xmlHttp.responseText);
                var response = JSON.parse(responseString)
                console.log(response);
                if (response.content == "true"){
                    alert("You have reviewed !");
                    document.getElementById("review_text").value = "";
                    loadPage();
                }else {
                    alert("Error: "+ response.content);
                }
            }
        };
        reviewText = "'" + reviewText + "'";
        xmlHttp.open("POST", reviewUrl, true);
        xmlHttp.send(JSON.stringify({"content":reviewText, "email":user.email, "isbn":isbn}));
        console.log(JSON.stringify({"content":reviewText, "email":user.email, "isbn":isbn}));
    }
}

function showReviewerDetails() {
    alert("reviewerName is selected!")
}

function rateBook(rateNumber) {
    if(sessionStorage.user == null){
        alert("You should log in at first!");
    }else{
        let url = new URL(window.location.href);
        let searchParams = new URLSearchParams(url.search);
        isbn = searchParams.get('isbn');
        var user = JSON.parse(sessionStorage.user);

        var rateUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/books/rate";
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var responseString = JSON.parse(xmlHttp.responseText);
                var response = JSON.parse(responseString);
                var score = JSON.parse(response.content).score;
                document.getElementById("score").innerHTML = "Score: "+ score;
                document.getElementById("score_star").style = "width:"+ score*10 + "%";
                alert("You have rated!");
            }
        };
        xmlHttp.open("POST", rateUrl, true);
        xmlHttp.send(JSON.stringify({"score":rateNumber, "email":user.email, "isbn":isbn}));
    }
}
//
// function otherUserProfileClicked(url) {
//     if (sessionStorage.user == null) {
//         showLoginModal()
//     }
//     else {
//         window.location.replace(url);
//     }
// }

function LoadPageDefault() {
    if (sessionStorage.user == null) {
        document.getElementById("loginLogout").innerHTML = "Login";
    }
    else {
        document.getElementById("loginLogout").innerHTML = "Logout";
    }
}

