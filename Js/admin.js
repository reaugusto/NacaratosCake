//https://stackoverflow.com/questions/41305051/how-do-i-make-a-firebase-form

// Initialize Firebase
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
var imagem = document.getElementById("imagem");
var file;
var campo;
var buscaMonte;

//adiciona a imagem no storage
imagem.addEventListener('change', function(e) { //no momento de upload, pega o evento e guarda em uma variavel que sera depois o parametro passado para salvar no storage
    //Get file
    file = e.target.files[0];
    /*task.on('state_changed',

            function error(err) {

    },

            function complete(){

    }
           )*/
});

function writeUserData() { //tudo pronto
    if(document.getElementById("nomebolo").value.length){
        firebase.database().ref(document.getElementById("tipo").value+ '/' + document.getElementById("nomebolo").value).set({
            sabor: document.getElementById("sabor").value,
            recheio: document.getElementById("recheio").value,
            cobertura : document.getElementById("cobertura").value
        });
        var storageRef = firebase.storage().ref('imagens/' + document.getElementById("nomebolo").value + '.png');
        storageRef.put(file).then(function(snapshot) {
            alert('Uploaded a blob or file!');
        });  
        document.getElementById("nomebolo").value = "";
        document.getElementById("sabor").value = "";
        document.getElementById("recheio").value = "";
        document.getElementById("cobertura").value = "";
        document.getElementById("imagem").value = "";
    }else{
        alert("Campo de nome vazio!");
    }
}

function updateUserData(){
    if (document.getElementById("tbNome").value.length){
        var ref = database.ref(document.getElementById("tipoBusca").value);
        
        var child = ref.child(busca);
        child.once('value', function(snapshot) {
            ref.child(document.getElementById("tbNome").value).set(snapshot.val());
            child.remove();
        });
    }else{alert("Campo nome vazio!")}
}



function updateUserData() {
    //como nao ha jeito de atualizar a key, devera apagar o nome e criar outro logo em seguida para alterar o nome do produto
    //storageRef.child(document.getElementById("imagem"))
    if (document.getElementById("tbNome").value.length){
        /*if(document.getElementById("tbNome").value != document.getElementById("buscaproduto").value){//má pratica, devera procurar entre todos no banco em vez de usar o que foi escrito no campo buscao como referencia, ERROR.
            var ref = database.ref();
            var child = ref.child(document.getElementById("buscaproduto").value);
            child.once('value', function(snapshot) {    
                ref.child(document.getElementById("tbNome").value).set(snapshot.val());
                child.remove();*/
        /*var ref = database.ref(document.getElementById("tipoBusca").value);
            ref.child(document.getElementById("tbNome").value).once('value').then(function(snap) {
                var data = snap.val();
                var update = {};
                update[document.getElementById("buscaproduto").value] = null;
                update[document.getElementById("tbNome").value] = data;
                return ref.update(update);
            });
            }else{}*/   

        firebase.database().ref(document.getElementById("tipoBusca").value + '/' + document.getElementById("tbNome").value).set({
            sabor: document.getElementById("tbSabor").value,
            recheio: document.getElementById("tbRecheio").value,
            cobertura : document.getElementById("tbCobertura").value
        });
        if(document.getElementById("tbNome").value != busca){
            deleteUserData();//ARRUMAR ERRO AQUI
        }
        console.log(document.getElementById("tbNome").value);
        console.log(busca);
    }else{alert("Campo nome vazio!")}
}

function deleteUserData(){
    database.ref(document.getElementById("tipoBusca").value + '/' + busca).remove(); //ARRUMAR ERRO AQUI

    //apagar a imagem relacionada no storage tb (storageRef nome do bolo.remove() )

    document.getElementById("tbNome").value = "";//ERRO AQUI
    document.getElementById("tbSabor").value = "";//AQUI
    document.getElementById("tbRecheio").value = "";//AQUI
    document.getElementById("tbCobertura").value = "";//AQUI
}

function buscaComida(){
    busca = document.getElementById("buscaproduto").value;
    var dados;
    //document.getElementById("tbSabor").textContent = busca;
    var ref = firebase.database().ref(document.getElementById("tipoBusca").value);
    ref.orderByKey().equalTo(busca).on("child_added", function(snapshot) {
        document.getElementById("tbNome").value = busca;
        document.getElementById("tbSabor").value = snapshot.val().sabor;
        document.getElementById("tbRecheio").value = snapshot.val().recheio;
        document.getElementById("tbCobertura").value = snapshot.val().cobertura;
    });
    document.getElementById("buscaproduto").value = "";//ERRO AQUI
}

function mostraComida(){
    var ref = database.ref("bolo/");
    campo = document.getElementById("mostraTodosBolos");
    ref.on('value',gotData,errData);

    ref = database.ref("cupcake/");
    campo = document.getElementById("mostraTodosCupcakes");
    ref.on('value',gotData,errData);

    ref = database.ref("bolo de pote/");
    campo = document.getElementById("mostraTodosBolosdepote");
    ref.on('value',gotData,errData);
}


//MONTE O SEU

function writeSelfService(){
    //console.log(document.getElementById("mBolo").checked); //var monteSabor = document.getElementById("monteSabor").checked;
    //console.log(document.getElementById("mCupcake").checked); //var monteRecheio = document.getElementById("monteRecheio").checked;
    //console.log(document.getElementById("mBolodepote").checked); //var monteCobertura = document.getElementById("monteCobertura").checked;

    if(document.getElementById("monteSabor").value.length){//trata a condicao de o campo estar vazio
        database.ref("monteoseu/mSabor/" + document.getElementById("monteSabor").value).set({
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

function mostraTodosSelfService() {
    var ref = database.ref("monteoseu/mSabor");
    campo = document.getElementById("buscaSabores");
    ref.on('value',gotData,errData);

    ref = database.ref("monteoseu/mRecheio");
    campo = document.getElementById("buscaRecheios");
    ref.on('value',gotData,errData);

    ref = database.ref("monteoseu/mCobertura");
    campo = document.getElementById("buscaCoberturas");
    ref.on('value',gotData,errData);
}


function gotData(data){
    var names = data.val();
    console.log(campo);
    var keys = Object.keys(names);
    console.log("keys: "+keys);
    for (var i=0;i<keys.length;i++){
        var k = keys[i];
        var li = document.createElement('li');
        li.append(k);

        campo.appendChild(li);//no primeiro clique, recebe apenas a ultima atualizacao que campo recebeu, nos outros cliques funciona como deveria
    }
}

function errData(err){
    console.log('Error!');
    console.log(err);
}

function buscaSelfService(){
    buscaMonte = document.getElementById("buscaMonteOSeu").value;
    var ref = database.ref("monteoseu/m" + document.getElementById("tipoMonte").value);
    ref.orderByKey().equalTo(document.getElementById("buscaMonteOSeu").value).on("child_added", function(snapshot) {
        document.getElementById("buscaMonteAlterar").value = document.getElementById("buscaMonteOSeu").value;
        document.getElementById("aBolo").checked = snapshot.val().bolo;
        document.getElementById("aCupcake").checked = snapshot.val().cupcake;
        document.getElementById("aBolodepote").checked = snapshot.val().bolodepote;
    });
}

function deletaSelfService(){
    var ref = database.ref("monteoseu/m" + document.getElementById("tipoMonte").value + "/" + document.getElementById("buscaMonteAlterar").value);
    ref.remove();//ARRUMAR ERRO AQUI

    document.getElementById("buscaMonteAlterar").value = "";//AQUI
}

function salvaSelfService(){
    database.ref("monteoseu/m" + document.getElementById("tipoMonte").value + "/" + document.getElementById("buscaMonteAlterar").value).set({
        bolo: document.getElementById("aBolo").checked,
        cupcake: document.getElementById("aCupcake").checked,
        bolodepote: document.getElementById("aBolodepote").checked
    });
    console.log("buscaMonte: "+buscaMonte);
    console.log("Campo busca: "+document.getElementById("buscaMonteAlterar").value);
    if(document.getElementById("buscaMonteAlterar").value != buscaMonte){
        database.ref("monteoseu/m" + document.getElementById("tipoMonte").value + "/" + buscaMonte).remove();
    }



    document.getElementById("buscaMonteAlterar").value = "";//AQUI
    document.getElementById("aBolo").checked = false;
    document.getElementById("aCupcake").checked = false;
    document.getElementById("aBolodepote").checked = false;
}