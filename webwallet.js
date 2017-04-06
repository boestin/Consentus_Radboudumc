

var web3 = new Web3();
var global_keystore;
var currentPatient;
var bronzkh = ""
var doelzkh = ""
var BASE64_MARKER = ';base64,';
var pwDerivedKeyUint8array
function setWeb3Provider(keystore) {
  var web3Provider = new HookedWeb3Provider({
    host: "http://localhost:8545",
    transaction_signer: keystore
  });

  web3.setProvider(web3Provider);
}

function newAddresses(password) {

  if (password == '') {
    password = prompt('Enter password to retrieve addresses', 'Password');
  }

  var numAddr = parseInt(document.getElementById('numAddr').value)

  lightwallet.keystore.deriveKeyFromPassword(password, function (err, pwDerivedKey) {
    global_keystore.generateNewAddress(pwDerivedKey, numAddr);
    console.log("pwDerivedKey" + pwDerivedKey);
    pwDerivedKeyUint8array = pwDerivedKey
    var addresses = global_keystore.getAddresses();
    document.getElementById('sendFrom').innerHTML = ''
    document.getElementById('functionCaller').value = ''
    //for (var i=0; i<addresses.length; ++i) {
    //  document.getElementById('sendFrom').innerHTML += '<option value="' + addresses[i] + '">' + addresses[i] + '</option>'
    //document.getElementById('functionCallera').innerHTML += '<option value="' + addresses[i] + '">' + addresses[i] + '</option>'
    document.getElementById('functionCaller').value = addresses[0]

    //}

    getBalances();
  })
}

function getBalances() {

  var addresses = global_keystore.getAddresses();
  document.getElementById('addr').innerHTML = 'Retrieving address...'
  async.map(addresses, web3.eth.getBalance, function (err, balances) {
    async.map(addresses, web3.eth.getTransactionCount, function (err, nonces) {
      document.getElementById('addr').innerHTML = ''
      document.getElementById('functionCaller').value = addresses[0]
      currentPatient = '0x' + addresses[0]
//console.log(lightwallet.signing.signMsg(global_keystore,pwDerivedKeyUint8array, 'Hallo dit is een test', currentPatient));
//console.log(lightwallet.signing.signMsg(global_keystore, 'Password', 'Hallo', currentPatient));
      //   for (var i=0; i<addresses.length; ++i) {
      document.getElementById('addr').innerHTML += '<div> <b>0x' + addresses[0] + '</b> (Bal: ' + (balances[0] / 1.0e18) + ' ETH)' + '</div>'
      //    }
    })
  })

}

function setSeed() {
  if (document.getElementById('transactions') != null) {
    removeTransactions();
  }
  var password = 'Password';
  lightwallet.keystore.deriveKeyFromPassword(password, function (err, pwDerivedKey) {
    global_keystore = new lightwallet.keystore(
      document.getElementById('patientID').value,
      pwDerivedKey);

    //        document.getElementById('patientID').value = ''

    newAddresses(password);
    setWeb3Provider(global_keystore);
    var addresses = global_keystore.getAddresses();

    getBalances();
    verleendeConsents();
    setConsent();
    

  })
}

function newWallet() {
  var extraEntropy = document.getElementById('userEntropy').value;
  document.getElementById('userEntropy').value = '';
  var randomSeed = lightwallet.keystore.generateRandomSeed(extraEntropy);

  var infoString = 'Your new wallet seed is: "' + randomSeed +
    '". Please write it down on paper or in a password manager, you will need it to access your wallet. Do not let anyone see this seed or they can take your Ether. ' +
    'Please enter a password to encrypt your seed while in the browser.'
  var password = 'Password';

  lightwallet.keystore.deriveKeyFromPassword(password, function (err, pwDerivedKey) {

    global_keystore = new lightwallet.keystore(
      randomSeed,
      pwDerivedKey);

    newAddresses(password);
    setWeb3Provider(global_keystore);
    getBalances();

  })
}

function showSeed() {
  var password = prompt('Enter password to show your seed. Do not let anyone else see your seed.', 'Password');

  lightwallet.keystore.deriveKeyFromPassword(password, function (err, pwDerivedKey) {
    var seed = global_keystore.getSeed(pwDerivedKey);
    console.log('Your seed is: "' + seed + '". Please write it down.');



  })
}

function sendEth() {
  var fromAddr = document.getElementById('sendFrom').value
  var toAddr = document.getElementById('sendTo').value
  var valueEth = document.getElementById('sendValueAmount').value
  var value = parseFloat(valueEth) * 1.0e18
  var gasPrice = 50000000000
  var gas = 50000
  web3.eth.sendTransaction({ from: fromAddr, to: toAddr, value: value, gasPrice: gasPrice, gas: gas }, function (err, txhash) {
    console.log('error: ' + err)
    console.log('txhash: ' + txhash)
  })
}




function search(zkh) 
{
  var data = {
    "RadboudUMC": "0xd75518fabc2e839e205971d60c07c6c70ac90c44",
    "LUMC": "0xb07fd4dd057d5f2d482b490fb7f0aed91b129eee",
    "Rijnstate": "0xe3e7ae328f8f6980d7bfea7af4960eca2a0841c5",
   
  }
  return data[zkh] ;
}

function searchAddr(zkh) 
{
  var data = {
    "0xd75518fabc2e839e205971d60c07c6c70ac90c44" : "RadboudUMC" ,
    "0xb07fd4dd057d5f2d482b490fb7f0aed91b129eee" : "LUMC",
    "0xe3e7ae328f8f6980d7bfea7af4960eca2a0841c5" : "Rijnstate",
   
  }
  return data[zkh] ;
}


function functionRegister(bronzkh,doelzkh) {
  
  var fromAddr = document.getElementById('functionCaller').value
  var contractAddr = document.getElementById('contractAddr').value
  // var abi = JSON.parse(document.getElementById('contractAbi').value)

  var functionName = document.getElementById('functionName').value
  //var key = "0X54ff42c222a64589b6854b53a944a3fba6e0891f"
  var key = Date.now();
  //var sourcezkh = "0xd75518fabc2e839e205971d60c07c6c70ac90c44"
  //var targetzkh = "0xb07fd4dd057d5f2d482b490fb7f0aed91b129eee"
  var status = 1
  console.log('[' + '"' + key + '",' + '"' + fromAddr + '",' + '"' + bronzkh + '",' + '"' + doelzkh + '",' + status + ']')
  var args = JSON.parse('[' + '"' + key + '",' + '"' + bronzkh + '",' + '"' + doelzkh + '",' + status + ']')
  var valueEth = document.getElementById('sendValueAmount').value
  var value = parseFloat(valueEth) * 1.0e18
  var gasPrice = 50000000000
  var gas = 3141592
  args.push({ from: fromAddr, value: value, gasPrice: gasPrice, gas: gas })
  var callback = function (err, txhash) {
    console.log('error: ' + err)
    console.log('txhash: ' + txhash)

  }
  args.push(callback)
  console.log(args, this)
  console.log('kijk:' + contract)
  contract["register"].apply(this, args)
}





function functionCall() {

  console.log('kijk hieronder:')
  //console.log(contract.keys([1]));
  //var tijd = contract.getRecordAtIndex(0)[0]
  // var tijd = contract.getRecordAtIndex(2)[0].toNumber()
  // var owner = contract.getRecordAtIndex(2)[1]
  // var sourcezkh = contract.getRecordAtIndex(2)[3]
  // var targetzkh = contract.getRecordAtIndex(2)[4]
  // var status = contract.getRecordAtIndex(2)[5].toNumber()
  // var numRecords = contract.numRecords();


  // console.log(tijd)
  // console.log(owner)
  // console.log(sourcezkh)
  // console.log(targetzkh)
  // console.log(status)
  // console.log(numRecords.toNumber())


}


function generateTable() {


  console.log("begin van functie" + currentPatient)

  if (global_keystore != null) {
    var tijd = contract.getRecordAtIndex(2)[0].toNumber()
    var owner = contract.getRecordAtIndex(2)[1]
    var sourcezkh = contract.getRecordAtIndex(2)[3]
    var targetzkh = contract.getRecordAtIndex(2)[4]
    var status = contract.getRecordAtIndex(2)[5].toNumber()
    var numRecords = contract.numRecords().toNumber();
    var fromAddr = document.getElementById('functionCaller').value;





    if (document.getElementById('table table-hover') != null) {
      removeTransactions();
    }
    // get the reference for the body
    var body = document.getElementById('metric_result');

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    tbl.setAttribute("id", "table table-hover")
    tbl.setAttribute("class", "table table-hover")
    var tblBody = document.createElement("tbody");
    var th1 = document.createElement("th")
    var th2 = document.createElement("th")
    var th3 = document.createElement("th")
    var th4 = document.createElement("th")

    //var tr = document.getElementById('table table-hover')
    th1.innerHTML = "Tijdstip registratie";
    th2.innerHTML = "Bron ziekenhuis";
    th3.innerHTML = "Doel ziekenhuis";
    th4.innerHTML = "Status (1 = toegang)";
    tblBody.appendChild(th1);
    tblBody.appendChild(th2);
    tblBody.appendChild(th3);
    tblBody.appendChild(th4);
    
    
     
    // creating all cells
    for (var i = 0; i < numRecords; i++) {
      // creates a table row
      var row = document.createElement("tr");

      for (var j = 2; j < 6; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row

        var cell = document.createElement("td");
        //var cellText = document.createTextNode("cell in row "+i+", column "+j);
        console.log("ingelogd als" + currentPatient + " huidig record:" + contract.getRecordAtIndex(i)[1])

        //if ("0x5cfe7a0564bcb16e700b4767326f748b1467f1be" == "0x5cfe7a0564bcb16e700b4767326f748b1467f1be" )
        if (currentPatient == contract.getRecordAtIndex(i)[1]) {
          var cellText = document.createTextNode(contract.getRecordAtIndex(i)[j]);
          cell.appendChild(cellText);
          row.appendChild(cell);
          tblBody.appendChild(row);
        }

      }

      // add the row to the end of the table body

    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
  }
  console.log("einde van functie" + currentPatient)
  //laat verleende consents zien in tabel
  verleendeConsents()
}

function verleendeConsents() {

  if (document.getElementById("registreerConsentButton") == null) {
   
  }

  if (document.getElementById("buttonVerleendeToestemmingen") != null) {

    var buttonVerleendeToestemmingen = document.getElementById("buttonVerleendeToestemmingen");
    var metric_results = document.getElementById('metric_results');
    metric_results.removeChild(buttonVerleendeToestemmingen);
  }




  if (global_keystore != null) {
    // get the reference for the body

    var metric_results = document.getElementById('metric_results');
    var buttonVerleendeToestemmingen = document.createElement("button")
    var t = document.createTextNode("Bekijk reeds gemaakte consents");
    buttonVerleendeToestemmingen.appendChild(t)
    buttonVerleendeToestemmingen.setAttribute("onclick", "generateTable()")
    buttonVerleendeToestemmingen.setAttribute("id", "buttonVerleendeToestemmingen")

    metric_results.appendChild(buttonVerleendeToestemmingen)
    //<button onclick="generateTable()">Verleende toestemmingen</button>
  }
}

function removeTransactions() {
  var removeTab = document.getElementById("table table-hover");
  var parentE1 = removeTab.parentElement;
  parentE1.removeChild(removeTab);

}



function setConsent() {
   if (global_keystore != null){
document.getElementById("setConsent").style.display = "block";
console.log(" Ja")
   }
}

function pieter(innerText) {

  bronzkh = innerText

  console.log("in functie" + bronzkh)

  document.getElementById("test1").innerHTML = bronzkh


};

function pietertje(innerText) {
  doelzkh = innerText
  console.log("in functie" + doelzkh)
if (bronzkh != doelzkh) {
  document.getElementById("test1").innerHTML = "<p> Ik geef toestemming dat <b>" + bronzkh +  " (" + search(bronzkh) + ") " + "</b> mijn gegevens ter beschikking stelt aan: <b>" + doelzkh + " (" + search(doelzkh) + ") </b></p>"
 var registreerConsentDiv = document.getElementById('test1');
 var registreerConsentButton = document.createElement("button")
    var t = document.createTextNode("Leg consent vast op blockchain");
    registreerConsentButton.appendChild(t)
    registreerConsentButton.setAttribute("onclick", "functionRegister(search(bronzkh), search(doelzkh))")
    registreerConsentButton.setAttribute("id", "registreerConsentButton")
    registreerConsentDiv.appendChild(registreerConsentButton)
}
}

function convertunt(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

function johantest() {

var array1 = lightwallet.signing.signMsg(global_keystore,pwDerivedKeyUint8array, 'Hallo', currentPatient)
var r = array1.r
var s = array1.s
var v = array1.v


//recoverAddress(rawMsg, v, r, s)
console.log(lightwallet.concatSig(array1))

}