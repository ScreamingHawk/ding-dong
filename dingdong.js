/* jshint node: true */
"use strict";

const twit = require("twit");
const config = require("./config.json");

const Twitter = new twit(config.auth);

const now = new Date().toLocaleString(config.post.dateLocale, {
	"timeZone": config.post.timeZone
});

// Check last
Twitter.get("statuses/user_timeline", {
	count: 1,
}, function(err, data){
	if (err){
		console.log(err);
		return;
	}
	if (data.length > 0){
		const last = new Date(data[0].created_at);
		let minute = new Date();
		minute.setMinutes(minute.getMinutes() - 1);
		if (last >= minute){
			console.log("Rate limited");
			return;
		}
	}
	// Ok. Send tweet
	Twitter.post("statuses/update", {
		status: `${config.post.content} ${now}`
	}, function(err, data){
		if (err){
			console.log(err);
		}
		console.log(data);
	});
});