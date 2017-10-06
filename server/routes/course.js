var express = require('express');
var router = express.Router();

var Course = require('../../models/course');

// Store in the back end
// You only reach this route when you hav course route before hand
// Such as course/
router.post('/', function (req, res, next) {
  var course = new Course({
    title: req.body.title,
    registrationNumber: req.body.regNum,
    dateCreated: req.body.dateCreated,
    dateUpdated: req.body.dateUpdated,
    description: req.body.description,
    schoolName: req.body.schoolName
  });
  course.save(function (err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured when creating a course!',
        error: err
      });
    }
    res.status(201).json({
      message: 'Saved course!',
      obj: result
    });
  });
});

router.get('/',function(req, res, next){
  Course.find()
    .populate('announcements')
    .exec(function(err,courses){
      if(err){
        console.log(err);
        return res.status(500).json({
          title: 'An error occurred!',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: courses
      });
    });
});
router.patch('/:id',function(req,res,next){
  Course.findById(req.params.id,function(err, course){
    if(err){
      return res.status(500).json({
        title: 'An error occured!',
        error: err
      });
    }
    if(!course){
      return res.status(500).json({
        title: 'No course was found!',
        error: {message: 'Course was not found!'}
      });
    }
    course.title = req.body.title;
    course.registrationNumber = req.body.regNum;
    course.dateUpdated = new Date();
    course.description = req.body.description;
    course.schoolName = req.body.schoolName;
    course.save(function(err,result){
      if(err){
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
router.delete('/:id',function(req,res,next){
  Course.findById(req.params.id, function(err,course){
    if(err){
      return res.status(500).json({
        title: 'An error occured!',
        error: err
      });
    }
    if(!course){
      return res.status(500).json({
        title: 'No course was found!',
        error: {message: 'Course was not found!'}
      });
    }
    course.remove(function(err,result){
      if(err){
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
