var express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  middleware = require('./middleware');


var AssignmentQuestionAnswer = require('../../models/assignmentQuestionAnswer.js');

router.get('/:assignmentID', middleware, function (req, res, next) {
  AssignmentQuestionAnswer.find({
    assignmentID: req.params.assignmentID,
    // where the question is completed
    completed : true
  },
  // select tries used, assignmentQuestionID,  and score only
  'triesUsed score assignmentQuestionID'
  )
    .exec(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred!',
          error: err
        });
      }
      console.log(result);
      res.status(200).json({
        message: 'Success',
        obj: result
      });
    });
});

module.exports = router;