var express = require('express');
//look this shit up
//var HttpStatus = require('http-status-codes');
var router = express.Router();
var jwt = require('jsonwebtoken');
var middleware = require('./middleware');

var Assignment = require('../../models/assignment')
var AssignmentQuestion = require('../../models/assignmentQuestion');


router.post('/:assignmentID',middleware, function (req, res, next) {
  var assignmentQuestion = new AssignmentQuestion({
    title: req.body.title,
    description: req.body.description,
    questionType: req.body.questionType,
    numberOfChoices: req.body.numberOfChoices,
    numberOfTries: req.body.numberOfTries,
    pointsLostPerTry: req.body.pointsLostPerTry,
    pointsAvailable: req.body.pointsAvailable,
    questionBody: req.body.questionBody,
    questionArray: req.body.questionArray,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    assignmentQuestions: req.body.assignmentQuestions
  });
  assignmentQuestion.save(function (err, assignmentQuestion) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured when creating a assignmentQuestion!',
        error: err
      });
    }
    Assignment.findById(req.params.assignmentID, function (err, assignment) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured when finding a assignment!',
          error: err
        });
      }
      assignment.assignmentQuestions.push(assignmentQuestion._id);
      assignment.save(function (err, result) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured when assignmentQuestion was pushed to assignment!',
            error: err
          });
        }
        res.status(201).json({
          message: 'Saved assignmentQuestion and pushed to assignment array!',
          obj: assignmentQuestion
        });
      });
    });
  });
});
router.get('/:assignmentID',middleware, function (req, res, next) {
  Assignment.findById(req.params.assignmentID)
    .populate('assignmentQuestions')
    .exec(function (err, assignment) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          title: 'An error occurred!',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: assignment.assignmentQuestions
      });
    });
});
module.exports = router;