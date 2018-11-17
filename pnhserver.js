const express = require('express')
const fileUpload = require('express-fileupload');

const util = require('util');
const fs = require('fs');

const app = express()
const port = 3000

const IPFS = require('ipfs')
const node = new IPFS()

const dcorejs = require('dcorejs');
const config = {
    dcoreNetworkWSPaths: ['wss://hackathon2.decent.ch:8090'],
    chainId: '9c54faed15d4089d3546ac5eb0f1392434a970be15f1452ce1e7764f70f02936'
};

 
dcorejs.initialize(config, false);

//-----------------

const path = "uploads/database.json";

const ion = "1.2.350"
const rod = "1.2.367";

const pkIon = "5KDqnXc2ZXRMB6xTLjUgDYisvriavyN9BPxGJ5ZXytVjoHHSBn1";
const pkRod = "5JdXHn4AppfhqJYAWsCoBJsPPetDWVpdb7MryC4c48Hu8fVVraX";

//----------------- 

app.use(fileUpload());

node.on('ready', () => {
  console.log('ready ipfs');
})


app.get('/', function (req, res) {
  res.send('Rock! NOAH Server Stareted');
});

app.get('/get_images', function (req, res) {
  fs.readFile(path, handleFile)

  // Write the callback function
  function handleFile(err, data) {
      var d;
      if (err) {
        res.json({
          result: 'failed'
        })
      } else {
        d = JSON.parse(data);
        res.json(d);
      }
  }
});

//Get image from IPFS
app.get('/get_image/:image_id', function (req, res) {
  node.files.cat(req.params.image_id.split('.')[0], function (err, file) {
    
    if (err) {
        throw err
      }
    res.setHeader("Content-Type", 'image/jpeg');
    res.send(file);
  })
})


        
app.get("/pay", function(req, res) {

  dcorejs.account().transfer(100, "DCT", ion, rod, "Memo", pkIon)
          .then(result => {
              console.log('payment done success');
              res.json({
                  result: "ok"
                })
          })
          .catch(err => {
            console.log('payment failed');
            console.log("error");
              console.error(err);
              res.json({
                  result: "fail"
                })
          });

});

app.get("/get_user_balance", function(req, res) {
  dcorejs.account().getBalance(ion)
          .then(res1 => {
              res.json({
                result: "ok",
                balance: res1
              })
          })
          .catch(err => {
              console.error(err);
              // output.innerHTML = '<p style="color: red;">Error loading user account</p>';
          });
});

app.get("/get_contract_balance", function(req, res) {
  dcorejs.account().getBalance(rod)
          .then(res1 => {
              res.json({
                result: "ok",
                balance: res1
              })
          })
          .catch(err => {
              console.error(err);
              // output.innerHTML = '<p style="color: red;">Error loading user account</p>';
          });
});


//Upload image to IPFS
app.post('/upload_image', function (req, res, next) {
  node.files.add(req.files.avatar.data, function (err, file) {
    
    if(err) {
      res.json({
        result: "fail"
      })
    } else {
      
      fs.readFile(path, handleFile)

      // Write the callback function
      function handleFile(err, data) {
          var d;
          if (err) {
            res.json({
              result: 'failed'
            })
          } else {
            d = JSON.parse(data);
            console.log(d)
            d.push({
              name: 'asdasd',
              uri: file[0].path
            })
            
            fs.writeFile(path, JSON.stringify(d), 'utf8', function(err, res1) {
              res.json({
                uri: file[0].path,
                size: file[0].size,
                result: 'ok'
              })
            });
          }
      }
      
      
    }
    
  });
})


app.listen(port, () => console.log(`NOAH Server listening on port ${port}!`))
