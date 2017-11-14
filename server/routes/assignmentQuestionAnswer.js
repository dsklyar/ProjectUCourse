var express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    middleware = require('./middleware');

var User = require('../../models/user.js');
var AssignmentQuestion = require('../../models/assignmentQuestion.js');
var AssignmentQuestionAnswer = require('../../models/assignmentQuestionAnswer.js');

router.post('/', middleware, function (req, res, next) {
    var assignmentQuestionAnswer = new AssignmentQuestionAnswer({
        userID: req.body.userID,
        assignmentQuestionID: req.body.assignmentQuestionID,
        studentAnswerObject: req.body.studentAnswerObject,
        triesUsed: req.body.triesUsed,
        score: req.body.score,
        completed: req.body.completed,
        dateSaved: req.body.dateSaved,
        assignmentID: req.body.assignmentID
    });
    assignmentQuestionAnswer.save(function (err, assignmentQuestionAnswer) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured when creating a assignmentQuestion!',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved assignmentQuestionAnswer!',
            obj: assignmentQuestionAnswer
        });
    });
});
router.get('/:userID/:assignmentID', middleware, function (req, res, next) {
    AssignmentQuestionAnswer.find({
        userID: req.params.userID,
        assignmentID: req.params.assignmentID
    })
        .exec(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred!',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: result
            });
        });
});

router.patch('/:id', middleware, function (req, res, next) {
    AssignmentQuestionAnswer.findById(req.params.id, function (err, assignmentQuestionAnswer) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured!',
                error: err
            });
        }
        if (!assignmentQuestionAnswer) {
            return res.status(500).json({
                title: 'No assignmentQuestionAnswer was found!',
                error: {
                    message: 'assignmentQuestionAnswer was not found!'
                }
            });
        }
        assignmentQuestionAnswer.studentAnswerObject = req.body.studentAnswerObject;
        assignmentQuestionAnswer.triesUsed = req.body.triesUsed;
        assignmentQuestionAnswer.score = req.body.score;
        assignmentQuestionAnswer.completed = req.body.completed;
        assignmentQuestionAnswer.dateSaved = req.body.dateSaved;
        assignmentQuestionAnswer.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured!',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated assignmentQuestionAnswer',
                obj: result
            });
        });
    });
})

module.exports = router;