var config = {
    apiKey: "AIzaSyCVFt-wU_Ap8hNj3YUrJCq7CFXA7TYiOc0",
    authDomain: "nacarato-s.firebaseapp.com",
    databaseURL: "https://nacarato-s.firebaseio.com",
    projectId: "nacarato-s",
    storageBucket: "nacarato-s.appspot.com",
    messagingSenderId: "916033923262"
};

firebase.initializeApp(config);

window.onload = function() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(!firebaseUser){
            window.location.href = "login.html";
        }
    });
}

function cadastrar(){
    var email = document.getElementById("emailCadastro").value;
    var password = document.getElementById("passwordCadastro").value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    
}
