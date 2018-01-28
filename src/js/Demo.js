



function listAllBooks() {
    var demoUrl = "https://cejosbrm2g.execute-api.us-east-2.amazonaws.com/test/books";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var allBookContentsElement = document.getElementById("AllBooksContentId");
            allBookContentsElement.innerHTML = xmlHttp.responseText;
        }
    };
    xmlHttp.open("GET", demoUrl, true);
    xmlHttp.send(null);
}
