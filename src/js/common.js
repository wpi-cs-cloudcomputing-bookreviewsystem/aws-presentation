



window.onclick = function(event) {
	let loginModal = document.getElementById('loginModal')
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}

function myProfileClicked() {
    // need to check login
    var isLogin = false
    if (!isLogin) {
        let loginModal = document.getElementById("loginModal");
        loginModal.style.display = "block";
    }    
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = "none";
}

function searchBook() {
	alert("Search book clicked!")
}


