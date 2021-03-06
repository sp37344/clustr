var express = require('express');
var router = express.Router();

var userDb = require('../api/users');
var activitiesDb = require('../api/activities');

// Users API
router.get('/api/clustr/users', userDb.getAllUsers);
router.get('/api/clustr/users/:id', userDb.getUser);
router.put('/api/clustr/users/:id/status', userDb.updateStatus);
router.put('/api/clustr/users/:id/time', userDb.updateTime);

// Activities API
router.get('/api/clustr/activities/:id', activitiesDb.getAllActivities);
router.post('/api/clustr/activities/:id', activitiesDb.addActivity);
router.put('/api/clustr/activities/:id', activitiesDb.editActivity);
router.delete('/api/clustr/activities/:id', activitiesDb.deleteActivity);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clustr Home Page' });
});

module.exports = router;