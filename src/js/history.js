
function loadPage() {
	LoadPageDefault()
	loadHistory()
}

function loadHistory() {

}

function LoadPageDefault() {
    if (sessionStorage.user == null) {
        document.getElementById("loginLogout").innerHTML = "Login";
    }
    else {
        document.getElementById("loginLogout").innerHTML = "Logout";
    }
}


