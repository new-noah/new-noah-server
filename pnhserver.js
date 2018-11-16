const express = require('express')
const multer = require('multer')

const util = require(‘util’);
const fs = require(‘fs’);
const multer = require(‘multer’);

const app = express()
const port = 3000


app.get('/', (req, res) => res.send('Rock! NOAH Server Stareted'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
