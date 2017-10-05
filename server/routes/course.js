var express = require('express');
var router = express.Router();

var Course = require('../../models/course');

// Store in the back end
// You only reach this route when you hav course route before hand
// Such as course/
router.post('/', function (req, res, next) {
  consol.log(
    'i got to the routes'
  );
  var course = new Course({
    registrationNumber: req.body.registrationNumber,
    title: req.body.title,
    dateCreated: req.body.dateCreated,
    dateUpdated: req.body.dateUpdated,
    schoolName: req.body.schoolName
  });
  consol.log(course);
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

module.exports = router;
