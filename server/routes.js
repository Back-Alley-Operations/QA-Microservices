const router = require('express').Router();
const controller = require('./controller');

router.get('/questions/:product_id', controller.questions.get);

router.post('/questions/:product_id', controller.questions.post);

router.patch('/questions/:question_id/helpful', controller.questions.helpful);

router.patch('/questions/:question_id/report', controller.questions.report);

router.get('/questions/:question_id/answers', controller.answers.get);

router.post('/questions/:question_id/answers', controller.answers.post);

router.patch('/questions/:answer_id/helpful', controller.answers.helpful);

//router.patch('/questions/:answer_id/report', controller.answers.report);

module.exports = router;