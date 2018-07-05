/* jshint node: true */
"use strict";

const twit = require("twit");
const config = require("./config.json");

const Twitter = new twit(config.auth);

let now = new Date().toLocaleString(config.post.dateLocale, {
	"timeZone": config.post.timeZone
});

function popRandomItem(arr) {
	return arr[Math.floor(Math.random() * Math.floor(arr.length))];
}

exports.handler = function(_, context){
	// Check last
	Twitter.get("statuses/user_timeline", {
		count: 1,
	}, function(err, data){
		if (err){
			context.fail(err);
			return;
		}
		let lastTweet = "";
		if (data.length > 0){
			let last = new Date(data[0].created_at);
			let minute = new Date();
			minute.setMinutes(minute.getMinutes() - config.post.rateLimitMinute);
			if (last >= minute){
				context.fail(err);
				return;
			}
			lastTweet = data[0].text;
		}
		// Pick a tweet
		let tweet = popRandomItem(config.post.contents);
		while(lastTweet.includes(tweet)){
			tweet = popRandomItem(config.post.contents);
		}
		console.log(tweet);
		// Ok. Send tweet
		Twitter.post("statuses/update", {
			status: `${tweet} ${now}`
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
