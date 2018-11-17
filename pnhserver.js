const express = require('express')
const fileUpload = require('express-fileupload');

const util = require('util');
const fs = require('fs');

const app = express()
const port = 3000

const IPFS = require('ipfs')
const node = new IPFS()

//-----------------

const path = "uploads/database.json";

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
