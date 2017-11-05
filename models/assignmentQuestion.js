var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var mongooseUniqueValidator =  require('mongoose-unique-validator');


var schema = new Schema({
    title                   : {type : String, required : true},
    description             : {type : String, required : true},
    questionType             : {type : String, required : true},
    numberOfChoices         : {type : Number, required : true},
    numberOfTries           : {type : Number, required : true},
    pointsLostPerTry        : {type : Number, required : true},
    pointsAvailable         : {type : Number, required : true},
    questionBody            : {type : String, required : true},
    questionArray           : [{
        choiceText          : {type : String},
        answerText          : {type : String},
        isAnswer            : {type : Boolean},
        choiceNumber        : {type : Number}
    }],
    dateCreated             : {type : Date, required : true},
    dateUpdated             : {type : Date, required : true}
});
schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('AssignmentQuestion',schema);