var express = require('express');
//look this shit up
//var HttpStatus = require('http-status-codes');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Course = require('../../models/course')
var Announcement = require('../../models/announcement');

router.use('/',function(req,res,next){
  jwt.verify(req.query.token,
    'In Kor lies Morz, the frozen throne' +
    'Where lord’s of lakes, have made their home'
    , function(err, decoded){
    if(err){
      return res.status(401).json({
        title : 'Not Authenticated!',
        error: err
      });
    }
    next();
  })
});

router.post('/:courseID', function (req, res, next) {
  var announcement = new Announcement({
    title : req.body.title,
    announcement : req.body.announcement,
    dateCreated : new Date(),
    dateUpdated : new Date(),
  });
  announcement.save(function (err, announcement) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured when creating a announcement!',
        error: err
      });
    }
    Course.findById(req.params.courseID, function(err,course){
      if (err) {
        return res.status(500).json({
          title: 'An error occured when creating a course!',
          error: err
        });
      }
      course.announcements.push(announcement._id);
      course.save(function(err,result){
        if (err) {
          return res.status(500).json({
            title: 'An error occured when announcement was pushed to course!',
            error: err
          });
        }
        res.status(201).json({
          message: 'Saved announcement and pushed to course array!',
          obj: result
        });
      });
    });
  });
});
// router.get('/:courseID',function(req, res, next){
//   Course.findById(req.params.courseID)
//     .populate('announcements')
//     .exec(function(err,courses){
//       if(err){
//         console.log(err);
//         return res.status(500).json({
//           title: 'An error occurred!',
//           error: err
//         });
//       }
//       res.status(200).json({
//         message: 'Success',
//         obj: courses
//       });
//     });
// });
module.exports = router;