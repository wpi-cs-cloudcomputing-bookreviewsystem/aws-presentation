
function loadPage() {
	LoadPageDefault()
	loadUserInbox()
}

function loadUserInbox() {

}

function LoadPageDefault() {
    if (sessionStorage.user == null) {
        document.getElementById("loginLogout").innerHTML = "Login";
    }
    else {
        document.getElementById("loginLogout").innerHTML = "Logout";
    }
}
