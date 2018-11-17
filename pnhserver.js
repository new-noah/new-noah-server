const express = require('express')
const fileUpload = require('express-fileupload');

const util = require('util');
const fs = require('fs');

const app = express()
const port = 3000

const IPFS = require('ipfs')
const node = new IPFS()

 
app.use(fileUpload());

node.on('ready', () => {
  console.log('ready ipfs');
})


app.get('/', function (req, res) {
  res.send('Rock! NOAH Server Stareted');
});

app.get('/get_images', function (req, res) {
  res.json([
      {
        name: "name 1",
        uri: "QmS9cBdHjFLqAeNK2XdenxNTWwZFCSK9kBCsqkqmcoDJ62"
      }, {
        name: "name 2",
        uri: "QmS9cBdHjFLqAeNK2XdenxNTWwZFCSK9kBCsqkqmcoDJ62"
      }
  ]);
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

//Upload image to IPFS
app.post('/upload_image', function (req, res, next) {
  node.files.add(req.files.avatar.data, function (err, file) {
    res.json({
      result: 'ok'
    })
  });
})


app.listen(port, () => console.log(`NOAH Server listening on port ${port}!`))
