/* jshint node: true */
"use strict";

const contextMock = {
	done: console.log,
	fail: console.log
};

require("./dingdong.js").handler(null, contextMock);
