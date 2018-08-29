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

//adiciona a imagem no storage
imagem.addEventListener('change', function(e) {
    //Get file
    var file = e.target.files[0];

    //Create a storage ref
    //var storageRef = firebase.storage().ref('imagens/' + file.name);
    var storageRef = firebase.storage().ref('imagens/' + document.getElementById("nomebolo").value + '.png');
    //Upload file
    var task = storageRef.put(file);
    //Completion result
    task.on('state_changed',

            function error(err) {

    },

            function complete(){

    }
           )});

function writeUserData() {
    if(document.getElementById("nomebolo").value.length){
        firebase.database().ref(document.getElementById("tipo").value+ '/' + document.getElementById("nomebolo").value).set({
            sabor: document.getElementById("sabor").value,
            recheio: document.getElementById("recheio").value,
            cobertura : document.getElementById("cobertura").value
        });
    }else{
        alert("Campo de nome vazio!");
    }
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
        deleteUserData();
        alert("Alterado com sucesso!");
    }else{alert("Campo nome vazio!")}
}

function deleteUserData(){
    database.ref(document.getElementById("tipoBusca").value + '/' + busca).remove();

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

function buscaSelfService() {
    var ref = database.ref("monteoseu/mSabor");
    ref.on('value',gotData,errData);
}

function gotData(data){
    var names = data.val();
    var keys = Object.keys(names);
    console.log("keys: "+keys);
    for (var i=0;i<keys.length;i++){
        var k = keys[i];
        var li = document.createElement('li');
        li.append(k);
        var campo = document.getElementById("buscaSabores");
        campo.appendChild(li);
    }
}

function errData(err){
    console.log('Error!');
    console.log(err);
}



/*function salvaSelfService(){

}*/