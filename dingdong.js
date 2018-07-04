/* jshint node: true */
"use strict";

const twit = require("twit");
const config = require("./config.json");

const Twitter = new twit(config.auth);

let now = new Date().toLocaleString(config.post.dateLocale, {
	"timeZone": config.post.timeZone
});

exports.handler = function(_, context){
	// Check last
	Twitter.get("statuses/user_timeline", {
		count: 1,
	}, function(err, data){
		if (err){
			context.fail(err);
			return;
		}
		if (data.length > 0){
			let last = new Date(data[0].created_at);
			let minute = new Date();
			minute.setMinutes(minute.getMinutes() - config.post.rateLimitMinute);
			if (last >= minute){
				context.fail(err);
				return;
			}
		}
		// Ok. Send tweet
		Twitter.post("statuses/update", {
			status: `${config.post.content} ${now}`
		}, function(err, data){
			if (err){
				context.fail(err);
				return;
			}
			console.log(data);
			context.done();
		});
	});
};
