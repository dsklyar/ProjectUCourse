var express = require('express');
//look this shit up
//var HttpStatus = require('http-status-codes');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Assignment = require('../../models/assignment')
var AssignmentQuestion = require('../../models/assignmentQuestion');

router.use('/', function (req, res, next) {
  jwt.verify(req.query.token,
    'In Kor lies Morz, the frozen throne' +
    'Where lord’s of lakes, have made their home',
    function (err, decoded) {
      if (err) {
        return res.status(401).json({
          title: 'Not Authenticated!',
          error: err
        });
      }
      next();
    })
});

router.post('/:assignmentID', function (req, res, next) {
  var assignmentQuestion = new AssignmentQuestion({
    title: req.body.title,
    description: req.body.description,
    timeAvailable: req.body.timeAvailable,
    dateDue: req.body.dateDue,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    assignmentQuestions: req.body.assignmentQuestions
  });
  assignmentQuestion.save(function (err, assignment) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured when creating a assignmentQuestion!',
        error: err
      });
    }
  });
});
router.get('/:courseID', function (req, res, next) {
  Course.findById(req.params.courseID)
    .populate('assignments')
    .exec(function (err, courses) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          title: 'An error occurred!',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: courses.assignments
      });
    });
});
module.exports = router;