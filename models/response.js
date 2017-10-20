var mongoose = require('mongoose'),
Schema = mongoose.Schema;
    User = require('./user.js'),
    UserSchema = mongoose.model('User').schema;
    Coursequestion = require('./coursequestion.js'),
    CoursequestionSchema = mongoose.model('Coursequestion').schema;
var mongooseUniqueValidator =  require('mongoose-unique-validator');


var schema = new Schema({
    title                   : {type : String, required : true},
    dateCreated             : {type : Date, required : true},
    dateUpdated             : {type : Date, required : true},
    coursequestion          : [{type : Schema.Types.ObjectId, ref: Question}]
});
schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Response',schema);