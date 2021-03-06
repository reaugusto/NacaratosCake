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

window.onload = function() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(!firebaseUser){
            window.location.href = "login.html";
        }
    });
}

var database = firebase.database();
var storage = firebase.storage();

var imagem = document.getElementById("imagem");
var novaFoto = document.getElementById("fotoUpdate");

var file;
var fileUpdate;

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


novaFoto.addEventListener('change', function(e) { //no momento de upload, pega o evento e guarda em uma variavel que sera depois o parametro passado para salvar no storage
    var imageUpdate = document.getElementById("fotoProduto");
    var fileReader = new FileReader();
    //Get file
    fileUpdate = e.target.files[0];
    imageUpdate.src = "";
    imageUpdate.style.display = "none";

});

function writeUserData() {
    tipo = document.getElementById("tipo").value;

    if(document.getElementById("nomebolo").value.length){
        var refBasicos = database.ref(tipo + '/' + document.getElementById("nomebolo").value).set({
            massa: document.getElementById("massa").value,
            recheio: document.getElementById("recheio").value,
            cobertura : document.getElementById("cobertura").value
        });
        var storageRef = firebase.storage().ref('imagens/'+ tipo + "/" + document.getElementById("nomebolo").value + '.png');
        storageRef.put(file).then(function(snapshot) {
            alert('Uploaded a blob or file!');
        });


        document.getElementById("nomebolo").value = "";
        document.getElementById("massa").value = "";
        document.getElementById("recheio").value = "";
        document.getElementById("cobertura").value = "";
        document.getElementById("imagem").value = "";
    }else{
        alert("Campo de nome vazio!");
    }
}

function buscaComida(fromClick, k,campo){
    var imageUpdate = document.getElementById("fotoProduto");

    if(fromClick){
        busca = k;
        tipoBusca = campo;
    } else {
        busca = document.getElementById("buscaproduto").value;
        tipoBusca = document.getElementById("tipoBusca").value;
    }



    var pathReference = storage.ref('imagens/'+ tipoBusca +'/' + busca + ".png");

    pathReference.getDownloadURL().then(function(url){
        imageUpdate.src = url;
        imageUpdate.height = "300";
        imageUpdate.width = "300";
        imageUpdate.style.display = "block";
    });

    var ref = database.ref(tipoBusca);
    ref.orderByKey().equalTo(busca).on("child_added", function(snapshot) {
        document.getElementById("tbNome").value = busca;
        document.getElementById("tbMassa").value = snapshot.val().massa;
        document.getElementById("tbRecheio").value = snapshot.val().recheio;
        document.getElementById("tbCobertura").value = snapshot.val().cobertura;
    });
    document.getElementById("buscaproduto").value = "";//ERRO AQUI
}


function updateUserData() {
    var ref = database.ref(tipoBusca + '/' + busca);
    var updates = {};
    var postData = {
        massa: document.getElementById("tbMassa").value,
        recheio: document.getElementById("tbRecheio").value,
        cobertura : document.getElementById("tbCobertura").value
    };

    var storageRef = firebase.storage().ref('imagens/'+ tipoBusca + "/" + document.getElementById("tbNome").value + '.png');

    if(fileUpdate){
        storageRef.put(fileUpdate).then(function(snapshot) {
            alert('Updated a blob or file!');
        });
    }

    if (document.getElementById("tbNome").value != busca){
        ref.remove();
        updates[tipoBusca + '/' + document.getElementById("tbNome").value] = postData;
        storage.ref('imagens/'+ tipoBusca + '/' + busca + '.png').delete();
        return firebase.database().ref().update(updates);
    } else {
        updates[tipoBusca + '/' + document.getElementById("tbNome").value] = postData;
        return firebase.database().ref().update(updates);
    }

}

function deleteUserData(){
    database.ref(tipoBusca+'/'+busca).remove();
    //apagar a imagem relacionada no storage
    storage.ref('imagens/'+ tipoBusca + '/' + busca + '.png').delete().then(function() {
        console.log("File deleted successfully");
    }).catch(function(error) {
        console.log("Uh-oh, an error occurred!");
    });
}

function mostraComida(botao){
    var ref = database.ref("bolo/");
    campo1 = document.getElementById("mostraTodosBolos");
    ref.on('child_added', function(data){
        console.log(data.key);
        var k = data.key;
        var li = document.createElement('li');
        li.className = "list-group-item";
        li.onclick = function (){
            buscaComida(true,k,"bolo");
        };

        li.append(k);
        campo1.appendChild(li);//no primeiro clique, recebe apenas a ultima atualizacao que campo recebeu, nos outros cliques funciona como deveria
    });

    ref = database.ref("cupcake/");
    campo2 = document.getElementById("mostraTodosCupcakes");
    ref.on('child_added', function(data){
        console.log(data.key);
        var k = data.key;
        var li = document.createElement('li');
        li.className = "list-group-item";

        li.onclick = function (){
            buscaComida(true,k,"cupcake");
        };

        li.append(k);
        campo2.appendChild(li);//no primeiro clique, recebe apenas a ultima atualizacao que campo recebeu, nos outros cliques funciona como deveria
    });

    ref = database.ref("bolo de pote/");
    campo3 = document.getElementById("mostraTodosBolosdepote");
    ref.on('child_added', function(data){
        console.log(data.key);
        var k = data.key;
        var li = document.createElement('li');
        li.className = "list-group-item";

        li.onclick = function (){
            buscaComida(true,k,"bolo de pote");
        };

        li.append(k);
        campo3.appendChild(li);//no primeiro clique, recebe apenas a ultima atualizacao que campo recebeu, nos outros cliques funciona como deveria
    });

    //dar disable aqui no botao logo apos para nao criar listas indefinidamente
    botao.disabled = true;
}
