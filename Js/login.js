var config = {
    apiKey: "AIzaSyCVFt-wU_Ap8hNj3YUrJCq7CFXA7TYiOc0",
    authDomain: "nacarato-s.firebaseapp.com",
    databaseURL: "https://nacarato-s.firebaseio.com",
    projectId: "nacarato-s",
    storageBucket: "nacarato-s.appspot.com",
    messagingSenderId: "916033923262"
};

firebase.initializeApp(config);

function cadastrar(){
    var email = document.getElementById("emailCadastro").value;
    var password = document.getElementById("passwordCadastro").value;

    console.log(email);
    console.log(password);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function() {
        window.location.href = "acessoAdmin.html";
    })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (error.code == 'auth/invalid-email') {
            console.log('O e-mail digitado não é valido.');
        } else if (error.code == 'auth/user-disabled') {
            console.log('O usuário está desativado.');
        } else if (error.code == 'auth/user-not-found') {
            console.log('O usuário não foi encontrado.');
        } else if (error.code == 'auth/wrong-password') {
            console.log('A senha digitada não é valida.');
        }
    });
}
