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

var database = firebase.database();
var imagem = document.getElementById("imagem"); // implementar imagem dos sabores posteriormente
var file;
var campo;
var buscaMonte;

function writeSelfService(){    //Pensar em colocar as checkboxes separada para cada uma das opcoes
    if(document.getElementById("monteMassa").value.length){//trata a condicao de o campo estar vazio
        database.ref("monteoseu/mMassa/" + document.getElementById("monteMassa").value).set({
            bolo: document.getElementById("mBolo").checked,
            cupcake: document.getElementById("mCupcake").checked,
            bolodepote: document.getElementById("mBolodepote").checked
        });
    }

    if(document.getElementById("monteRecheio").value.length){
        database.ref("monteoseu/mRecheio/" + document.getElementById("monteRecheio").value).set({
            bolo: document.getElementById("mBolo").checked,
            cupcake: document.getElementById("mCupcake").checked,
            bolodepote: document.getElementById("mBolodepote").checked
        });
    }

    if(document.getElementById("monteCobertura").value.length){
        database.ref("monteoseu/mCobertura/" + document.getElementById("monteCobertura").value).set({
            bolo: document.getElementById("mBolo").checked,
            cupcake: document.getElementById("mCupcake").checked,
            bolodepote: document.getElementById("mBolodepote").checked
        });
    }
}

function mostraTodosSelfService(botao){      //Talvez .once seja mais eficiente  //AQUI
    var ref = database.ref("monteoseu/mCobertura/");
    campo1 = document.getElementById("buscaCoberturas");
    ref.on('child_added', function(data){
        console.log(data.key);
        var k = data.key;
        var li = document.createElement('li');
        li.className = "list-group-item";

        li.onclick = function (){
            buscaSelfService(true,k,"Cobertura");
        };

        li.append(k);
        campo1.appendChild(li);//no primeiro clique, recebe apenas a ultima atualizacao que campo recebeu, nos outros cliques funciona como deveria
    });

    ref = database.ref("monteoseu/mRecheio/");
    campo2 = document.getElementById("buscaRecheios");
    ref.on('child_added', function(data){
        console.log(data.key);
        var k = data.key;
        var li = document.createElement('li');
        li.className = "list-group-item";

        li.onclick = function (){
            buscaSelfService(true,k,"Recheio");
        };

        li.append(k);
        campo2.appendChild(li);//no primeiro clique, recebe apenas a ultima atualizacao que campo recebeu, nos outros cliques funciona como deveria
    });

    ref = database.ref("monteoseu/mMassa/");
    campo3 = document.getElementById("buscaMassas");
    ref.on('child_added', function(data){
        console.log(data.key);
        var k = data.key;
        var li = document.createElement('li');
        li.className = "list-group-item";

        li.onclick = function (){
            buscaSelfService(true,k,"Massa");
        };

        li.append(k);
        campo3.appendChild(li);//no primeiro clique, recebe apenas a ultima atualizacao que campo recebeu, nos outros cliques funciona como deveria
    });

    //dar disable aqui no botao logo apos para nao criar listas indefinidamente
    botao.disabled = true;
}



function buscaSelfService(foiClicado, key, campo){

    if(foiClicado){
        tipoMonte = campo;
        buscaMonte = key;
    } else {
        tipoMonte = document.getElementById("tipoMonte").value;
        buscaMonte = document.getElementById("buscaMonteOSeu").value;
    }


    var ref = database.ref("monteoseu/m" + tipoMonte);
    ref.orderByKey().equalTo(buscaMonte).on("child_added", function(snapshot) {
        document.getElementById("buscaMonteAlterar").value = buscaMonte;
        document.getElementById("aBolo").checked = snapshot.val().bolo;
        document.getElementById("aCupcake").checked = snapshot.val().cupcake;
        document.getElementById("aBolodepote").checked = snapshot.val().bolodepote;
    });
}

function deletaSelfService(){
    var ref = database.ref("monteoseu/m" + document.getElementById("tipoMonte").value + "/" + document.getElementById("buscaMonteAlterar").value).remove();
    document.getElementById("buscaMonteAlterar").value = "";//AQUI
}

function salvaSelfService() {
    var ref = database.ref("monteoseu/m" + tipoMonte + '/' + buscaMonte);
    var updates = {};
    var postData = {
        bolo: document.getElementById("aBolo").checked,
        cupcake: document.getElementById("aCupcake").checked,
        bolodepote: document.getElementById("aBolodepote").checked
    };


    if (document.getElementById("buscaMonteAlterar").value != buscaMonte){
        ref.remove();
        updates["monteoseu/m" + tipoMonte + '/' + document.getElementById("buscaMonteAlterar").value] = postData;
        return firebase.database().ref().update(updates);
    } else {
        updates["monteoseu/m" + tipoMonte + '/' + document.getElementById("buscaMonteAlterar").value] = postData;
        return firebase.database().ref().update(updates);
    }

}
