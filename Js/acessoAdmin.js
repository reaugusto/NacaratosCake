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

function produtos(){
    window.location.href = "adminP.html";
}

function MOS(){
    window.location.href="adminMOS.html"
}

function cadastro(){
    window.location.href="cadastrar.html"
}

function sair(){
    firebase.auth().signOut().then(function() {
        window.location.href = "/index.html";
    }).catch(function(error) {
        alert("An error happened."+error);
    });
}
