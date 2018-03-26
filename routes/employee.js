var  express = require('express');
var router = express.Router();
var Employee = require('./../models/Employee');
var multer = require('multer');
var fs  = require('fs');
var path = require('path');
// var employee = new Employee();
const imageFilter = function(req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}   // imageFilter

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
        // cb(null, Date.now())

  }
});

var upload = multer({ storage: storage ,
    limits: { fileSize: 4000000 },
    fileFilter: imageFilter
});

router.post('/employee', upload.single('imageupload'), addEmployee);
router.get('/getList', function (req, res) {
    Employee.find(function(error,docs){
        for(var i = 0; i < docs.length;i++){
           var image_url = docs[i].image; 
        }
         res.json(image_url);
    });
});

// router.post('/jade', upload.single('imageupload'),function(req, res) {
//     console.log(req.file);
//     var path = req.file;

//     res.send("File upload sucessfully.");
//   });

function addEmployee(req, res){
    var path = req.file.path;
    var pathstring = path.toString();
    var name = req.body.name;
    var fatherName = req.body.fatherName;
    var cnic = req.body.cnic;
    var jobType = req.body.jobType;
    // fs.unlink(path);    
    

    if(!name || name == "" || !fatherName || fatherName == "" || !cnic || cnic == "" || !jobType || jobType == "" ){
        return res.status(400).json({
            code: 400,
            message: 'Some parameters are invalid or missing.',
            data: {}
        });
    }

    var employee = new Employee({
        name: name,
        fatherName: fatherName,
        cnic: cnic,
        jobType: jobType,
        image: pathstring
    });

    employee.save()
            .then(doc => {
                var retunObj = doc._doc;
                // res.send(retunObj);
                res.status(200).json({
                    code: 200,
                    message: 'Employee successfully added.',
                    data: {
                        employee: retunObj
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    code: 500,
                    message: 'Something went wrong.',
                    data: {}
                });
            });
}





module.exports  = router;


