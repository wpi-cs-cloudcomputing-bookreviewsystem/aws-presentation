
function loadPage() {
	LoadPageDefault()
	loadHistory()
}

function loadHistory() {

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


