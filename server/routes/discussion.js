var express = require('express');
//look this shit up
//var HttpStatus = require('http-status-codes');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Course = require('../../models/course')
var Discussion = require('../../models/discussion');

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
  Discussion.findOneAndRemove({'_id' : req.params.id},
    function (err, discussion) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured!',
          error: err
        });
      }
      if (!discussion) {
        return res.status(500).json({
          title: 'No discussion was found!',
          error: {
            message: 'discussion was not found!'
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
          course.discussions.splice(course.discussions.indexOf(req.params.id), 1);
          course.save(function (err, result) {
            if (err) {
              return res.status(500).json({
                title: 'An error occured!',
                error: err
              });
            }
            res.status(200).json({
              message: 'Deleted discussion and update course',
              obj: result
            });
          });
        });
    });
})
router.post('/:courseID', function (req, res, next) {
  var discussion = new Discussion({
    title: req.body.title,
    discussion: req.body.discussion,
    dateCreated: new Date(),
    dateUpdated: new Date(),
  });
  discussion.save(function (err, discussion) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured when creating a discussion!',
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
      course.discussion.push(discussion._id);
      course.save(function (err, result) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured when discussion was pushed to course!',
            error: err
          });
        }
        res.status(201).json({
          message: 'Saved discussion and pushed to course array!',
          // returning result object here wil lreturn the course object and not the announcement
          obj: discussion
        });
      });
    });
  });
});
router.get('/:courseID', function (req, res, next) {
  Course.findById(req.params.courseID)
    .populate('discussions')
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
        obj: courses.discussions
      });
    });
});

router.patch('/:id', function (req, res, next) {
  Discussion.findById(req.params.id, function (err, discussion) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured!',
        error: err
      });
    }
    if (!discussion) {
      return res.status(500).json({
        title: 'No discussion was found!',
        error: {
          message: 'discussion was not found!'
        }
      });
    }
    discussion.title = req.body.title;
    discussion.dateUpdated = new Date();
    discussion.discussion = req.body.discussion;
    discussion.save(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured!',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated discussion',
        obj: result
      });
    });
  });
})
module.exports = router;
