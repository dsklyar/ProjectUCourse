var express = require('express');
//look this shit up
//var HttpStatus = require('http-status-codes');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Course = require('../../models/course');
var User = require('../../models/user');

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
// this will bind the course to the instructor creating it
router.post('/:userID', function (req, res, next) {
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
router.get('/:userID', function (req, res, next) {
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
router.patch('/:id', function (req, res, next) {
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
// TODO:
// delete all assignments and announcments and other inhereted ids
// when course is deleted
router.delete('/:id', function (req, res, next) {
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
    course.remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured!',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted course',
        obj: result
      });
    });
  });
})

module.exports = router;
