var promise = require('bluebird');

var options = {
	// Initialization options
	promiseLib : promise
}

var pgp = require('pg-promise')(options);
var db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'clustr',
	user: 'postgres',
	password: 'c1ustR!17'
});

// QUERY FUNCTIONS

// Get all the activities attributed to a single user
function getAllActivities(req, res, next) {
	var userId = req.params.id;
	db.any('select * from activities where user_id = $1', userId).then(function(data) {
		res.status(200).json({
			status: 'success',
			data: data,
			message: 'Retrieved ALL user activities'
		});
	}).catch(function(err) {
		return next(err);
	});
};

// Export all functions
module.exports = {
	getAllActivities: getAllActivities
}