const IPFS = require('ipfs')
const node = new IPFS()
 
 var fil
node.on('ready', () => {
  console.log('ready');
  // Ready to use!
  // See https://github.com/ipfs/js-ipfs#core-api
  
  node.files.cat("QmS9cBdHjFLqAeNK2XdenxNTWwZFCSK9kBCsqkqmcoDJ62", function (err, file) {
    if (err) {
        throw err
      }
      
    console.log(file.toString('utf8'))
  })

})

console.log('Straring');