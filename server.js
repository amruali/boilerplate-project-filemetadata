var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


// The most important two lines 
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })




app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
    //console.log(req.file);

    if(!req.file){
        next();
    }
    console.log(req.file)

    result = {
        name : req.file.originalname,
        type : req.file.mimetype,
        size : req.file.size
    }

    console.log(result)
    res.json(result)
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
