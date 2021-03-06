var promise = require('bluebird');

var options = {
	// Initialization options
	promiseLib : promise
}

// For testing
var localhost = 'http://192.168.42.154';

var pgp = require('pg-promise')(options);
var db = pgp({
	host: 'localhost',
	// host: '192.168.42.154',
	port: 5432,
	database: 'clustr',
	user: 'postgres',
	password: 'c1ustR!17'
});

// QUERY FUNCTIONS

// Get all the activities attributed to a single user
function getAllActivities(req, res, next) {
	var userId = parseInt(req.params.id);
	db.any('SELECT * FROM activities WHERE user_id = $1', userId).then(function(data) {
		res.status(200).json({
			status: 'success',
			data: data,
			message: 'Retrieved ALL user activities'
		});
	}).catch(function(err) {
		return next(err);
	});
};

// Add an activity to a user's suggested activities list
function addActivity(req, res, next) {
	db.none('INSERT INTO activities(user_id, name)' +'values(${user_id}, ${name})', req.body).then(function() {
		res.status(200).json({
			status: 'success',
			message: 'Created a new activity for the user'
		});
	}).catch(function(err) {
		return next(err);
	});
};

// Edit an activity in the user's suggested activities list
function editActivity(req, res, next) {
	db.none('UPDATE activities SET name=$1 WHERE id=$2', [req.body.name, parseInt(req.params.id)]).then(function() {
		res.status(200).json({
			status: 'success',
			message: 'Updated activity'
		});
	}).catch(function(err) {
		return next(err);
	});
};

// Delete an activity from a user's suggested activities list
function deleteActivity(req, res, next) {
	var activityId = parseInt(req.params.id);
	db.result('DELETE FROM activities WHERE id = $1', activityId).then(function(result) {
		res.status(200).json({
			status: 'success',
			message: `Removed ${result.rowCount} activity`
		});
	}).catch(function(err) {
		return next(err);
	});
};

// Export all functions
module.exports = {
	getAllActivities: getAllActivities,
	addActivity: addActivity,
	editActivity: editActivity,
	deleteActivity: deleteActivity
}