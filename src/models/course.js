var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var mongooseUniqueValidator =  require('mongoose-unique-validator');


var schema = new Schema({ //i is in course
    registrationNumber      : {type : String, required : true, unique : true},
    title                   : {type : String, required : true},
    dateCreated             : {type : Date, required : true},
    dateUpdated             : {type : Date, required : true},
    schoolName              : {type : String, required : true}
});
schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Course',schema);