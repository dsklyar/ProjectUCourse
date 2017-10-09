var mongoose = require('mongoose'),
Schema = mongoose.Schema,
    Course = require('./course.js'),
    CourseSchema = mongoose.model('Course').schema;
var mongooseUniqueValidator =  require('mongoose-unique-validator');
const userType = ['ADMIN','STUDENT','TEACHER']
var schema = new Schema({
    email       : {type : String, required : true, unique : true},
    password    : {type : String, required : true},
    firstName   : {type : String, required : true},
    lastName    : {type : String, required : true},
    schoolName  : {type : String, required : true},
    type        : {type : String, enum : userType, required : true},
    courseList  : [{type : Schema.Types.ObjectId, ref : 'Course'}]
});
schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('User',schema);