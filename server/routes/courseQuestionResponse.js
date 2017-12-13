var express = require('express');
//look this shit up
//var HttpStatus = require('http-status-codes');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Course = require('../../models/course')
var User = require('../../models/user')
var courseQuestionResponse = require('../../models/courseQuestionResponse');

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
router.post('/', function (req, res, next) {
  var courseQuestion = new CourseQuestion({
    title: req.body.title,
    courseQuestion: req.body.courseQuestion,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    courseID: req.body.courseID,
    userID: req.body.userID
  })
  courseQuestion.save(function (err, courseQuestion) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured when creating a course questuion!',
        error: err
      });
    }
    Course.findById(req.params.courseID, function (err, course) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured when creating a course!',
          error: err
        });
      }
      course.courseQuestion.push(courseQuestion._id);
      course.save(function (err, result) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured when a course question was pushed to course!',
            error: err
          });
        }
        res.status(201).json({
          message: 'Saved course question and pushed to course array!',
          obj: result
        });
      });
    })
  })
});
router.get('/:courseID', function (req, res, next) {
    Course.findById(req.params.courseID)
      .populate('courseQuestion')
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
          obj: courses.courseQuestion
        });
      });
  });
module.exports = router;
