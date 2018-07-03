/* jshint node: true */
"use strict";

const twit = require("twit");
const config = require("./config.json");

const Twitter = new twit(config.auth);

const now = new Date().toLocaleString(config.post.dateLocale, {
	"timeZone": config.post.timeZone
});

Twitter.post("statuses/update", {
	status: `${config.post.content} ${now}`
}, function(err, data){
	if (err){
		console.log(err);
	}
	console.log(data);
});