var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');


var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// embedded schema for comment



var EmployeeSchema = mongoose.Schema({
    name: { type: String, default: "" },
    fatherName: { type: String, default: "" },
    cnic: {type: String, default:""}, 
    jobType: {type: String, default:""},
    image:{type: String},
    createdAt: { type: Date, default: Date.now },
});

var Employee = module.exports = mongoose.model('Employee', EmployeeSchema);