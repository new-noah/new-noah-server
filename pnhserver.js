const express = require('express')
const util = require('util');
const fs = require('fs');


const multer = require('multer');

const app = express()
const port = 3000

const IPFS = require('ipfs')
const node = new IPFS()
 

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        console.log(file.fieldname);
        callback(null, file.fieldname + '-' + Date.now() + ".jpg");
    }
});

node.on('ready', () => {
  console.log('ready ipfs');
  // Ready to use!
  // See https://github.com/ipfs/js-ipfs#core-api

})

// var upload = multer({ storage: storage });

var upload = multer({ storage: storage }).single('avatar');

app.get('/', function (req, res) {
  res.send('Rock! NOAH Server Stareted');
});

app.get('/get_images', function (req, res) {
  res.json([
      {
        name: "name 1",
        url: "uploads/avatar-1542406728530.jpg"
      }, {
        name: "name 2",
        url: "uploads/avatar-1542406728530.jpg"
      }
  ]);
});

app.get('/ipfs', function (req, res) {
  console.log('ipfs');
  
  node.files.cat("QmS9cBdHjFLqAeNK2XdenxNTWwZFCSK9kBCsqkqmcoDJ62", function (err, file) {
    
    if (err) {
        throw err
      }
      
    console.log(file.toString('utf8'))
    
    res.json([
        {
          name: "name 1",
          url: "uploads/avatar-1542406728530.jpg",
          file: file.toString('utf8')
        }, {
          name: "name 2",
          url: "uploads/avatar-1542406728530.jpg",
          file: file.toString('utf8')
        }
    ]);
  })
  
  
});


app.post('/img', function (req, res, next) {
  // req.file - файл `img_source`
  // req.body сохранит текстовые поля, если они будут

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Случилась ошибка Multer при загрузке.
        res.send(err);
    } else {
      // При загрузке произошла неизвестная ошибка.
    }

    // Все прекрасно загрузилось.
    res.send("file saved on server");
  });


})


app.listen(port, () => console.log(`NOAH Server listening on port ${port}!`))
