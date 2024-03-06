const fs = require('fs')
var pkgInfo = require('./package.json');
var Service = require('webos-service');
var service = new Service(pkgInfo.name);
var greeting = "Hello, World!";

const axios = require('axios');

// a method that always returns the same value
service.register("hello", function(message) {
	console.log("In hello callback");
	message.respond({
		returnValue: true,
		message: greeting
	});
});

// set some state in the service
service.register("/config/setGreeting", function(message) {
	console.log("In setGreeting callback");
	if (message.payload.greeting) {
		greeting = message.payload.greeting;
	} else {
		message.respond({
			returnValue: false,
			errorText: "argument 'greeting' is required",
			errorCode: 1
		});
	}
	message.respond({
		returnValue: true,
		greeting: greeting
	});
});

service.register("url_get", async function(message) {
	console.log("In url_get callback");
	if (message.payload.url) {
		console.log('fetching', message.payload.url);
		axios.get(message.payload.url)
		.then(res => {
		  console.log('Status Code:', res.status);
		  console.log('data:', res.data);
		  message.respond({
			returnValue: true,
			data : res.data
			});
		})
		.catch(err => {
		  console.log('Error: ', err.message);
		  message.respond({
			returnValue: false,
			errorText: err.message,
			errorCode: 1
		});
	});
	} else {
		message.respond({
			returnValue: false,
			errorText: err.message,
			errorCode: 1
		});
	}
});

service.register("url_post", async function(message) {
	console.log("In url_post callback");
	if (message.payload.url) {
		console.log('fetching', message.payload.url);
		axios.get(message.payload.url)
		.then(res => {
		  console.log('Status Code:', res.status);
		  console.log('data:', res.data);
		  message.respond({
			returnValue: true,
			data : res.data
			});
		})
		.catch(err => {
		  console.log('Error: ', err.message);
		  message.respond({
			returnValue: false,
			errorText: err.message,
			errorCode: 1
		});
	});
	} else {
		message.respond({
			returnValue: false,
			errorText: err.message,
			errorCode: 1
		});
	}
});

service.register("auth", async function(message) {
	const authHC = {
		username: "stani_mi@yahoo.com",
		password: "sTanislav73!",
		device: "b28b1e1a68db30b2f37e33f08db4d72e",
	};
	if (message.payload.action === 'get') {
		fs.readFile('user_info.json', 'utf-8', (err, data) => {
			if (err) {
				message.respond({
					returnValue: false,
					errorText: err.message,
					errorCode: 1
				});
			} else {
				const auth = JSON.parse(data.toString())
				console.log('auth get', auth);
				message.respond({
					returnValue: true,
					data : auth
					});
			}
		  })		
	} else {
		if (message.payload.action === 'set') {
			const data = JSON.stringify(message.payload.data)
			fs.writeFile('user_info.json', data, err => {
			if (err) {
				message.respond({
					returnValue: true,
					});
				} else {
			console.log('auth set');
			message.respond({
				returnValue: true,
				});
			}
		});
		} else {
			message.respond({
				returnValue: false,
				errorText: err.message,
				errorCode: 1
			});
		}
	}
});
