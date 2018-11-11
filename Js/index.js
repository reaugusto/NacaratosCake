var config = {
    apiKey: "AIzaSyCVFt-wU_Ap8hNj3YUrJCq7CFXA7TYiOc0",
    authDomain: "nacarato-s.firebaseapp.com",
    databaseURL: "https://nacarato-s.firebaseio.com",
    projectId: "nacarato-s",
    storageBucket: "nacarato-s.appspot.com",
    messagingSenderId: "916033923262"
};
firebase.initializeApp(config);
var database = firebase.database();
var storage = firebase.storage();

window.onload = function() {
    mostraProdutosBolo();
    mostraProdutosCupcake();
    mostraProdutosBolodepote();
}

function mostraProdutosBolo(){
    var x = document.getElementsByClassName("conteudo-produtos");//USAR ID E MAIS EFETIVO
    //quando clicar em um, dar hidden nas outras 2 telas
    var ref = database.ref("bolo/");
    ref.on("child_added", function (data){
        
        //criar os cards aqui dentro usando os valores abaixo
        var pathReference = storage.ref('imagens/bolo/' + data.key + ".png");

        pathReference.getDownloadURL().then(function(url){
            //recuperando a imagem no storage
            console.log(data.key);
            console.log(url);
            console.log(" ");
            
            //colocando a imagem em um elemento da pagina
            
//            var img = document.getElementById('myimg');
//            img.src = url;

        }).catch(function(error) {
            switch (error.code) {
                case 'storage/object-not-found':
                    console.log("File doesn't exist");
                    break;
                case 'storage/unauthorized':
                    console.log("User doesn't have permission to access the object");
                    break;

                case 'storage/canceled':
                    console.log("User canceled the upload");
                    break;

                case 'storage/unknown':
                    console.log("Unknown error occurred, inspect the server response");
                    break;
            }
        });

        console.log("nome: " + data.key);
        console.log("cobertura: " + data.val().cobertura);
        console.log("sabor: " + data.val().sabor);
        console.log("recheio: " + data.val().recheio);
        console.log(" ");
        //x[0].style.backgroundColor = "red"; //usar isso apenas se for por classe
    });
}

function mostraProdutosCupcake(){
    var ref = database.ref("cupcake/");

    //var x = document.getElementsByClassName("conteudo-produtos");// cada um precisa ter seu proprio lugar de popular
    //quando clicar em um, dar hidden nas outras 2 telas
    
    ref.on("child_added", function (data){
        
        //criar os cards aqui dentro usando os valores abaixo
        var pathReference = storage.ref('imagens/cupcake/' + data.key + ".png");

        pathReference.getDownloadURL().then(function(url){
            //recuperando a imagem no storage
            console.log(data.key);
            console.log(url);
            console.log(" ");
            
            //colocando a imagem em um elemento da pagina
            
//            var img = document.getElementById('myimg');
//            img.src = url;

        }).catch(function(error) {
            switch (error.code) {
                case 'storage/object-not-found':
                    console.log("File doesn't exist");
                    break;
                case 'storage/unauthorized':
                    console.log("User doesn't have permission to access the object");
                    break;

                case 'storage/canceled':
                    console.log("User canceled the upload");
                    break;

                case 'storage/unknown':
                    console.log("Unknown error occurred, inspect the server response");
                    break;
            }
        });

        console.log("nome: " + data.key);
        console.log("cobertura: " + data.val().cobertura);
        console.log("sabor: " + data.val().sabor);
        console.log("recheio: " + data.val().recheio);
        console.log(" ");
        //x[0].style.backgroundColor = "red"; //usar isso apenas se for por classe
    });

}

function mostraProdutosBolodepote(){
    var ref = database.ref("bolo de pote/");

    //var x = document.getElementsByClassName("conteudo-produtos");// cada um precisa ter seu proprio lugar de popular
    //quando clicar em um, dar hidden nas outras 2 telas
    
    ref.on("child_added", function (data){
        
        //criar os cards aqui dentro usando os valores abaixo
        var pathReference = storage.ref('imagens/bolo de pote/' + data.key + ".png");

        pathReference.getDownloadURL().then(function(url){
            //recuperando a imagem no storage
            console.log(data.key);
            console.log(url);
            console.log(" ");
            
            //colocando a imagem em um elemento da pagina
            
//            var img = document.getElementById('myimg');
//            img.src = url;

        }).catch(function(error) {
            switch (error.code) {
                case 'storage/object-not-found':
                    console.log("File doesn't exist");
                    break;
                case 'storage/unauthorized':
                    console.log("User doesn't have permission to access the object");
                    break;

                case 'storage/canceled':
                    console.log("User canceled the upload");
                    break;

                case 'storage/unknown':
                    console.log("Unknown error occurred, inspect the server response");
                    break;
            }
        });

        console.log("nome: " + data.key);
        console.log("cobertura: " + data.val().cobertura);
        console.log("sabor: " + data.val().sabor);
        console.log("recheio: " + data.val().recheio);
        console.log(" ");
        //x[0].style.backgroundColor = "red"; //usar isso apenas se for por classe
    });
}
