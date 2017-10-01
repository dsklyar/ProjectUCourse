var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mongooseUniqueValidator =  require('mongoose-unique-validator');

var userType = {
    ADMIN       : {value : 0, name : 'Admin', code : 'A'},
    STUDENT     : {value : 1, name : 'Student', code : 'S'},
    TEACHER     : {value : 2, name : 'Teacher', code : 'T'}
}

var schema = new Schema({
    email       : {type : String, required : true, unique : true},
    password    : {type : String, required : true},
    firstName   : {type : String, required : true},
    lastName    : {type : String, required : true},
    schoolName  : {type : String, required : true},
    //type        : userType,
    //courseList  : [{type : Schema.Types.ObjectId, ref : 'Course'}]
});
schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('User',schema);