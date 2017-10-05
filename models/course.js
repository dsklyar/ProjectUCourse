var mongoose = require('mongoose'),
Schema = mongoose.Schema,
    Announcement = require('./announcement.js'),
    AnnouncementSchema = mongoose.model('Announcement').schema
;
var mongooseUniqueValidator =  require('mongoose-unique-validator');


var schema = new Schema({
    registrationNumber      : {type : String, required : true, unique : true},
    title                   : {type : String, required : true},
    dateCreated             : {type : Date, required : true},
    dateUpdated             : {type : Date, required : true},
    schoolName              : {type : String, required : true},
    description             : {type : String, required : true},
    assignments             : [{type : Schema.Types.ObjectId, ref : 'Assignment'}],
    announcements           : [{type : Schema.Types.ObjectId, ref : 'Announcement'}]

});
schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Course',schema);