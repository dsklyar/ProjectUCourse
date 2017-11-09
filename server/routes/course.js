var express = require('express');
//look this shit up
//var HttpStatus = require('http-status-codes');
var router = express.Router();
var jwt = require('jsonwebtoken');
var middleware = require('./middleware');

var Course = require('../../models/course');
var User = require('../../models/user');

// this will bind the course to the instructor creating it
router.post('/:userID',middleware, function (req, res, next) {
  console.log()
  User.findById(req.params.userID, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured!',
        error: err
      });
    }
    if (!user) {
      return res.status(500).json({
        title: 'No user was found!',
        error: {
          message: 'user was not found!'
        }
      });
    }
    var course = new Course({
      title: req.body.title,
      registrationNumber: req.body.regNum,
      dateCreated: req.body.dateCreated,
      dateUpdated: req.body.dateUpdated,
      description: req.body.description,
      schoolName: req.body.schoolName
    });
    course.save(function (err, course) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured when creating a course!',
          error: err
        });
      }
      user.courseList.push(course._id);
      user.save(function (err, result) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured!',
            error: err
          });
        }
        res.status(201).json({
          message: 'Saved course!',
          obj: course
        });
      });
    });
  })
});
// This will return all courses bounded to that userID
router.get('/:userID',middleware, function (req, res, next) {
  User.findById(req.params.userID)
    .populate('courseList')
    .exec(function (err, user) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured!',
          error: err
        });
      }
      if (!user) {
        return res.status(500).json({
          title: 'No user was found!',
          error: {
            message: 'user was not found!'
          }
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: user.courseList
      });
    });
});
router.patch('/:id',middleware, function (req, res, next) {
  Course.findById(req.params.id, function (err, course) {
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
    course.title = req.body.title;
    course.registrationNumber = req.body.regNum;
    course.dateUpdated = new Date();
    course.description = req.body.description;
    course.schoolName = req.body.schoolName;
    course.save(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured!',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated course',
        obj: result
      });
    });
  });
})

router.delete('/:id/:userID',middleware, function (req, res, next) {
  User.findById(req.params.userID, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred!',
        error: err
      });
    }
    if (!user) {
      return res.status(500).json({
        title: 'No user was found!',
        error: {
          message: 'user was not found!'
        }
      });
    }
    Course.findOneAndRemove({
        '_id': req.params.id
      },
      function (err, course) {
        // NOTE:
        // This is needed if you want to trigger the
        // remove function inside the course model
        // otherwise it will not automatically
        // remove assignments and announcements and etc
        course.remove();
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
              message: 'course was not found!'
            }
          });
        }
        user.courseList.splice(user.courseList.indexOf(req.params.id), 1);
        user.save(function (err, result) {
          if (err) {
            return res.status(500).json({
              title: 'An error occured!',
              error: err
            });
          }
          res.status(200).json({
            message: 'Deleted course and updated the user',
            obj: result
          });
        });
      });
  });
})
module.exports = router;
