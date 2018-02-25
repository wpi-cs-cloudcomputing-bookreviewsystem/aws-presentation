

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

            console.log(book)
            document.getElementById("book_title").innerHTML = book.title
            document.getElementById("book_author").innerHTML = book.author
            document.getElementById("book_image").src = book.imageUrl
            document.getElementById("book_description").innerHTML = book.description
            
        }
    };  
    xmlHttp.open("POST", bookUrl, true);     
    xmlHttp.send(JSON.stringify(isbn));
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
    alert("submitNewReview clicked!")
}

function showReviewerDetails() {
    alert("reviewerName is selected!")
}

function LoadPageDefault() {
    if (sessionStorage.user == null) {
        document.getElementById("loginLogout").innerHTML = "Login";
    }
    else {
        document.getElementById("loginLogout").innerHTML = "Logout";
    }
}

