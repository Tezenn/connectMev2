const router = require('express').Router();
const userController = require('./controllers/userController');
const auth = require('./auth').auth;

router.get('/check', auth);
router.post('/user', userController.createUser);
router.put('/user', userController.addTopics);
router.get('/login', userController.login);

module.exports = router;
