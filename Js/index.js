$(document).ready(function() {
                    /* affix the navbar after scroll below header */
                    $(".navbar").affix({
                            offset: {
                                top:$(".home").outerHeight(false)
                            }

                        });
                    });

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
    setTimeout(function(){
        showBolo();
    }, 3000);
}

function showBolo(){
    var qntBolo = document.getElementsByClassName("bolo").length;
    var qntCup = document.getElementsByClassName("cupcake").length;
    var qntPote = document.getElementsByClassName("pote").length;

    
    for(let i = 0; i<qntBolo; i++){
        document.getElementsByClassName("bolo")[i].style.display = "block";
    }
        for(let i = 0; i<qntCup; i++){
        document.getElementsByClassName("cupcake")[i].style.display = "none";
        }
    for(let i = 0; i<qntPote; i++){
        document.getElementsByClassName("pote")[i].style.display = "none";
    }
}
function showCupcake(){
    var qntBolo = document.getElementsByClassName("bolo").length;
    var qntCup = document.getElementsByClassName("cupcake").length;
    var qntPote = document.getElementsByClassName("pote").length;

    
    for(let i = 0; i<qntBolo; i++){
        document.getElementsByClassName("bolo")[i].style.display = "none";
    }
        for(let i = 0; i<qntCup; i++){
        document.getElementsByClassName("cupcake")[i].style.display = "block";
        }
    for(let i = 0; i<qntPote; i++){
        document.getElementsByClassName("pote")[i].style.display = "none";
    }
}
function showPote(){
    var qntBolo = document.getElementsByClassName("bolo").length;
    var qntCup = document.getElementsByClassName("cupcake").length;
    var qntPote = document.getElementsByClassName("pote").length;

    
    for(let i = 0; i<qntBolo; i++){
        document.getElementsByClassName("bolo")[i].style.display = "none";
    }
        for(let i = 0; i<qntCup; i++){
        document.getElementsByClassName("cupcake")[i].style.display = "none";
        }
    for(let i = 0; i<qntPote; i++){
        document.getElementsByClassName("pote")[i].style.display = "block";
    }
}

function mostraProdutosBolo(){
    var divPai = document.getElementById("conteudo-produtos");//USAR ID E MAIS EFETIVO
    var card;
    
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
            
            card = document.createElement("div");
            card.className = "bolo";
            card.innerHTML = "<div class='col-sm-4 col-md-4 card card1'><div class='thumbnail'><img src="+url+" alt='...'><div class='caption'><h3>"+data.key+"</h3><p>"+data.val().cobertura+"</p><p>"+data.val().massa+"</p><p>"+data.val().recheio+"</p></div></div></div>";
            divPai.appendChild(card);
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
        console.log("massa: " + data.val().massa);
        console.log("recheio: " + data.val().recheio);
        console.log(" ");
        
        
        //x[0].style.backgroundColor = "red"; //usar isso apenas se for por classe
    });
}

function mostraProdutosCupcake(){
    var ref = database.ref("cupcake/");
    var divPai = document.getElementById("conteudo-produtos");//USAR ID E MAIS EFETIVO
    var card;

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
            
            card = document.createElement("div");
            card.className = "cupcake";
            card.innerHTML = "<div class='col-sm-4 col-md-4 card card1'><div class='thumbnail'><img src="+url+" alt='...'><div class='caption'><h3>"+data.key+"</h3><p>"+data.val().cobertura+"</p><p>"+data.val().massa+"</p><p>"+data.val().recheio+"</p></div></div></div>";
            divPai.appendChild(card);
            
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
        console.log("massa: " + data.val().massa);
        console.log("recheio: " + data.val().recheio);
        console.log(" ");
        //x[0].style.backgroundColor = "red"; //usar isso apenas se for por classe
    });

}

function mostraProdutosBolodepote(){
    var ref = database.ref("bolo de pote/");
    var divPai = document.getElementById("conteudo-produtos");//USAR ID E MAIS EFETIVO
    var card;

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
            
            card = document.createElement("div");
            card.className = "pote";
            card.innerHTML = "<div class='col-sm-4 col-md-4 card card1'><div class='thumbnail'><img src="+url+" alt='...'><div class='caption'><h3>"+data.key+"</h3><p>"+data.val().cobertura+"</p><p>"+data.val().massa+"</p><p>"+data.val().recheio+"</p></div></div></div>";
            divPai.appendChild(card);
            
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
        console.log("massa: " + data.val().massa);
        console.log("recheio: " + data.val().recheio);
        console.log(" ");
        //x[0].style.backgroundColor = "red"; //usar isso apenas se for por classe
    });
}

// API de Mapa -19.761057, -47.908803

