
function listAllBooks() {

    var demoUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/books"
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            
            var responseString = JSON.parse(xmlHttp.responseText);
            var response = JSON.parse(responseString)
            var books = JSON.parse(response.content)

            console.log(books)
            for (i = 0; i < books.length; i++) {
                book = books[i]

                let bookTitleId = "book_" + i + "_title"
                let bookTitleElement = document.getElementById(bookTitleId);
                bookTitleElement.innerHTML = book.title
                bookTitleElement.href = demoUrl + "/" + book.ISBN

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
        }
    };
    xmlHttp.open("GET", demoUrl, true);
    xmlHttp.send(null);
}





