

function loadPage() {
    LoadPageDefault()
    loadBookByISBN()
}


function loadBookByISBN() {
    
    let url = new URL(window.location.href)
    let searchParams = new URLSearchParams(url.search);
    isbn = searchParams.get('isbn')  
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



        }
    };  
    xmlHttp.open("POST", bookUrl, true);     
    xmlHttp.send(JSON.stringify({"isbn":isbn}));
};

function thumbUp() {
    alert("thumbUp Clicked!");
}

function recommendToFriends() {
    alert("recommendToFriends Clicked!");
}

function flagReview() {
    alert("flagReview Clicked!");
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
                    loadPage();
                }else {
                    alert("Error: "+ response.content);
                }
                // var book = JSON.parse(response.content)
                // console.log(book)
                // document.getElementById("book_title").innerHTML = book.title
                // document.getElementById("book_author").innerHTML = book.author
                // document.getElementById("book_image").src = book.imageUrl
                // document.getElementById("book_description").innerHTML = book.description

            }
        };
        xmlHttp.open("POST", reviewUrl, true);
        console.log(JSON.stringify({"content":reviewText, "email":user.email, "isbn":isbn}));
        xmlHttp.send(JSON.stringify({"content":reviewText, "email":user.email, "isbn":isbn}));
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
                // var book = JSON.parse(response.content)
                // console.log(book)
                // document.getElementById("book_title").innerHTML = book.title
                // document.getElementById("book_author").innerHTML = book.author
                // document.getElementById("book_image").src = book.imageUrl
                // document.getElementById("book_description").innerHTML = book.description

            }
        };
        xmlHttp.open("POST", rateUrl, true);
        xmlHttp.send(JSON.stringify({"score":rateNumber, "email":user.email, "isbn":isbn}));
    }
}



function LoadPageDefault() {
    if (sessionStorage.user == null) {
        document.getElementById("loginLogout").innerHTML = "Login";
    }
    else {
        document.getElementById("loginLogout").innerHTML = "Logout";
    }
}

