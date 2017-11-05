var express = require('express');
//look this shit up
//var HttpStatus = require('http-status-codes');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Course = require('../../models/course')
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

router.post('/:courseID', function (req, res, next) {
  var assignment = new Assignment({
    title: req.body.title,
    description: req.body.description,
    timeAvailable: req.body.timeAvailable,
    dateDue: req.body.dateDue,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    assignmentQuestions: req.body.assignmentQuestions
  });
  assignment.save(function (err, assignment) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured when creating a assignment!',
        error: err
      });
    }
    Course.findById(req.params.courseID, function (err, course) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured when finding a course!',
          error: err
        });
      }
      course.assignments.push(assignment._id);
      course.save(function (err, result) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured when assignment was pushed to course!',
            error: err
          });
        }
        res.status(201).json({
          message: 'Saved assignment and pushed to course array!',
          // returning result object here wil lreturn the course object and not the assignment
          obj: assignment
        });
      });
    });
  });
});
router.get('/:courseID', function (req, res, next) {
  Course.findById(req.params.courseID)
    .populate('assignments')
    .exec(function (err, course) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          title: 'An error occurred!',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: course.assignments
      });
    });
});
router.delete('/:id/:courseID', function (req, res, next) {
  // MUST DO IT THIS WAY
  Assignment.findOneAndRemove({'_id' : req.params.id},
    function (err, assignment) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured!',
          error: err
        });
      }
      if (!assignment) {
        return res.status(500).json({
          title: 'No assignment was found!',
          error: {
            message: 'assignment was not found!'
          }
        });
      }
      Course.findById(req.params.courseID,
        function(err, course) {
          if (err) {
            return res.status(500).json({
              title: 'An error occured!',
              error: err
            });
          }
          if (!course) {
            return res.status(500).json({
              title: 'No course was found!',
              error: {
                message: 'Course was not found!'
              }
            });
          }
          course.assignments.splice(course.assignments.indexOf(req.params.id), 1);
          course.save(function (err, result) {
            if (err) {
              return res.status(500).json({
                title: 'An error occured!',
                error: err
              });
            }
            res.status(200).json({
              message: 'Deleted announcement and update course',
              obj: result
            });
          });
        });
    });
})
module.exports = router;