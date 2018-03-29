function loadPage() {
    LoadPageDefault()
    listAllBooks()
}

function listAllBooks() {
    var demoUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/books"
    var xmlHttp = new XMLHttpRequest();

    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    page = searchParams.get('page');
    console.log(page);

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

            var responseString = JSON.parse(xmlHttp.responseText);
            var response = JSON.parse(responseString);
            books = JSON.parse(response.content);

            console.log(books);
            if (page == null) page = 1;
            for (i = 6 * (page - 1); i < Math.min(6 * page, books.length); i++) {
                book = books[i]
                let bookTitleId = "book_" + (i - 6 * (page - 1))+ "_title"
                let bookTitleElement = document.getElementById(bookTitleId);
                bookTitleElement.innerHTML = book.title
                //   bookTitleElement.href = demoUrl + "/" + book.ISBN
                bookTitleElement.href = "bookReview.html?isbn=" + book.ISBN

                let bookDescriptionId = "book_" + (i - 6 * (page - 1)) + "_description"
                let bookDescriptionElement = document.getElementById(bookDescriptionId);
                bookDescriptionElement.innerHTML = book.description


                let bookImageId = "book_" + (i - 6 * (page - 1)) + "_image"
                let bookImageElement = document.getElementById(bookImageId);
                bookImageElement.src = book.imageUrl
                bookImageElement.height = 420

                let bookHref = "book_" + (i - 6 * (page - 1)) + "_href"
                document.getElementById(bookHref).href = "bookReview.html?isbn=" + book.ISBN
            }


            var pageArea = document.getElementById("page-area");
            for (j = 1; j <= ((books.length - 1) / 6 + 1); j++) {
                let li = document.createElement("li");
                li.setAttribute("class", "page-item");
                li.setAttribute("id", "page-item-" + j);
                let a = document.createElement("a");
                a.setAttribute("class", "page-link")
                a.href = "index.html?page=" + j;
                a.innerHTML = j;
                a.onclick = function () {
                    listAllBooks();
                }
                li.appendChild(a);
                pageArea.appendChild(li);
            }
        }
    };
    xmlHttp.open("GET", demoUrl, true);
    xmlHttp.send(null);
}



function LoadPageDefault() {
    if (sessionStorage.user == null) {
        document.getElementById("loginLogout").innerHTML = "Login";
    }
    else {
        document.getElementById("loginLogout").innerHTML = "Logout";
    }
}

function searchBook() {
    var keyword = document.getElementById("search-keyword").value;
    if (keyword.length == 0){
        alert("Can not be null !");
        return;
    }
    console.log(keyword);
    var searchUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/books/search"
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseString = JSON.parse(xmlHttp.responseText);
            var response = JSON.parse(responseString)
            books = JSON.parse(response.content)
            console.log(books);
            for (i = 0; i < books.length; i++) {
                book = books[i]
                let bookTitleId = "book_" + i+ "_title"
                let bookTitleElement = document.getElementById(bookTitleId);
                bookTitleElement.innerHTML = book.title
                bookTitleElement.href = "bookReview.html?isbn=" + book.ISBN

                let bookDescriptionId = "book_" + i + "_description"
                let bookDescriptionElement = document.getElementById(bookDescriptionId);
                bookDescriptionElement.innerHTML = book.description


                let bookImageId = "book_" + i + "_image"
                let bookImageElement = document.getElementById(bookImageId);
                bookImageElement.src = book.imageUrl
                bookImageElement.height = 420

                let bookHref = "book_" + i + "_href"
                document.getElementById(bookHref).href = "bookReview.html?isbn=" + book.ISBN
            }
            for (;i < 6; i++){
                let bookTitleId = "book_" + i+ "_title"
                let bookTitleElement = document.getElementById(bookTitleId);
                bookTitleElement.innerHTML = null;


                let bookDescriptionId = "book_" + i + "_description"
                let bookDescriptionElement = document.getElementById(bookDescriptionId);
                bookDescriptionElement.innerHTML =null;


                let bookImageId = "book_" + i + "_image"
                let bookImageElement = document.getElementById(bookImageId);
                bookImageElement.innerHTML =null;

                let bookHref = "book_" + i + "_href"
                document.getElementById(bookHref).innerHTML = null;
            }
            document.getElementById("page-area").innerHTML = null;
        }
    };
    xmlHttp.open("GET", searchUrl + "?keyword=" + keyword, true);
    xmlHttp.send(null);
}


