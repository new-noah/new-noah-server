// import * as dcorejs from 'dcorejs';
 
dcorejs = require('dcorejs');
 
const config = {
    dcoreNetworkWSPaths: ['wss://localhost:8090'],
    chainId: 'b199702d9a4eb386536754dc136117943475ff742c0e5f63afbbc467e5ddf871'
};
 
dcorejs.initialize(config);
console.log("connection");
const connection = dcorejs.connection();
 
// ...
 console.log("closeConnection");
connection.closeConnection();
 
// ...
 console.log("openConnection");
connection.openConnection()
    .then(res => {
      console.log("res");
      console.log(res);
        // connection opened, connection.isConnected === true
    })