var express = require('express');
//look this shit up
//var HttpStatus = require('http-status-codes');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Course = require('../../models/course')
var Announcement = require('../../models/announcement');

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
router.delete('/:id/:courseID', function (req, res, next) {
  // MUST DO IT THIS WAY
  Announcement.findOneAndRemove({'_id' : req.params.id},
    function (err, announcement) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured!',
          error: err
        });
      }
      if (!announcement) {
        return res.status(500).json({
          title: 'No announcement was found!',
          error: {
            message: 'announcement was not found!'
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
          course.announcements.splice(course.announcements.indexOf(req.params.id), 1);
          course.save(function (err, result) {
            if (err) {
              return res.status(500).json({
                title: 'An error occured!',
                error: err
              });
            }
            console.log(course.announcements);
            res.status(200).json({
              message: 'Deleted announcement and update course',
              obj: result
            });
          });
        });
    });
})
router.post('/:courseID', function (req, res, next) {
  var announcement = new Announcement({
    title: req.body.title,
    announcement: req.body.announcement,
    dateCreated: new Date(),
    dateUpdated: new Date(),
  });
  announcement.save(function (err, announcement) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured when creating a announcement!',
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
      course.announcements.push(announcement._id);
      course.save(function (err, result) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured when announcement was pushed to course!',
            error: err
          });
        }
        res.status(201).json({
          message: 'Saved announcement and pushed to course array!',
          // returning result object here wil lreturn the course object and not the announcement
          obj: announcement
        });
      });
    });
  });
});
router.get('/:courseID', function (req, res, next) {
  Course.findById(req.params.courseID)
    .populate('announcements')
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
        obj: courses.announcements
      });
    });
});

router.patch('/:id', function (req, res, next) {
  Announcement.findById(req.params.id, function (err, announcement) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured!',
        error: err
      });
    }
    if (!announcement) {
      return res.status(500).json({
        title: 'No announcement was found!',
        error: {
          message: 'announcement was not found!'
        }
      });
    }
    announcement.title = req.body.title;
    announcement.dateUpdated = new Date();
    announcement.announcement = req.body.announcement;
    announcement.save(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured!',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated announcement',
        obj: result
      });
    });
  });
})
module.exports = router;
