var abi = [ { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "keys", "outputs": [ { "name": "", "type": "uint64", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "key", "type": "uint64" } ], "name": "getRecord", "outputs": [ { "name": "owner", "type": "address" }, { "name": "time", "type": "uint256" }, { "name": "sourcezkh", "type": "address" }, { "name": "targetzkh", "type": "address" }, { "name": "status", "type": "int256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "key", "type": "uint64" }, { "name": "sourcezkh", "type": "address" }, { "name": "targetzkh", "type": "address" }, { "name": "status", "type": "int256" } ], "name": "register", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "rindex", "type": "uint256" } ], "name": "getRecordAtIndex", "outputs": [ { "name": "key", "type": "uint64", "value": "0" }, { "name": "owner", "type": "address", "value": "0x" }, { "name": "time", "type": "uint256", "value": "0" }, { "name": "sourcezkh", "type": "address", "value": "0x" }, { "name": "targetzkh", "type": "address", "value": "0x" }, { "name": "status", "type": "int256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "key", "type": "uint64" }, { "name": "newOwner", "type": "address" } ], "name": "transfer", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0xa8a467472fb141d3d8d37407a6a89168d1301020" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "numRecords", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "key", "type": "uint64" } ], "name": "isRegistered", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "rindex", "type": "uint256" } ], "name": "getConstantRecordAtIndex", "outputs": [ { "name": "key", "type": "uint64" }, { "name": "owner", "type": "address" }, { "name": "time", "type": "uint256" }, { "name": "sourcezkh", "type": "address" }, { "name": "targetzkh", "type": "address" }, { "name": "status", "type": "int256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "key", "type": "uint64" } ], "name": "getOwner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "key", "type": "uint64" } ], "name": "getTime", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "creationTime", "outputs": [ { "name": "", "type": "uint256", "value": "1483700142" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "key", "type": "uint64" }, { "name": "sourcezkh", "type": "address" }, { "name": "targetzkh", "type": "address" }, { "name": "status", "type": "int256" } ], "name": "update", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "withdraw", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "key", "type": "uint64" } ], "name": "unregister", "outputs": [], "payable": false, "type": "function" } ]
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545 "));
var contract = web3.eth.contract(abi).at("0x5981D56618af853B0fB6912C0addC3c54A76ED60")
//notaryContract.getLatest();