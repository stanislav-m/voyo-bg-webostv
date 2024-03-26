const fs = require("fs");
var pkgInfo = require("./package.json");
var Service = require("webos-service");
var service = new Service(pkgInfo.name);
var greeting = "Hello, World!";

const axios = require("axios");

service.register("url", async function (message) {
  if (message.payload.method === 'url_get') {
    console.log("fetching", message.payload.url);
    axios.get(message.payload.url, {headers: message.payload.headers}).then((res) => {
        console.log("Status Code:", res.status);
        console.log("data:", res.data);
        message.respond({returnValue: true, data: res.data});
      }).catch((err) => {
        console.log("Error: ", err.message);
        message.respond({returnValue: false, errorText: err.message, errorCode: 1});
      });
  } else {
    console.log("posting", message.payload.url);
    axios.post(message.payload.url, message.payload.data, { headers: message.payload.headers }).then((res) => {
        console.log("data:", res.data);
        message.respond({returnValue: true, data: res.data});
      }).catch((err) => {
        console.log("Error: ", err.message);
        message.respond({returnValue: false, errorText: err.message, errorCode: 1});
      });
  }
});

service.register("auth", async function (message) {
  const authHC = {
    username: "stani_mi@yahoo.com",
    password: "sTanislav73!",
    //device: "b28b1e1a68db30b2f37e33f08db4d72e",
  };
  /*
  fs.stat("user_info.json", function(err, stat) {
    if (err == null) {
      console.log('config file exists'); //great!
    } else if (err.code === 'ENOENT') {
      // file does not exist
      fs.writeFile('log.txt', 'Some log\n');
      fs.writeFile("user_info.json", authHC);
    } else {
      console.log('Some other error: ', err.code);
    }
  });
*/
  if (message.payload.action === "get") {
    fs.readFile("user_info.json", "utf-8", (err, data) => {
      if (err) {
        message.respond({
          returnValue: false,
          errorText: err.message,
          errorCode: 1,
        });
      } else {
        const auth = JSON.parse(data.toString());
        console.log("auth get", auth);
        message.respond({
          returnValue: true,
          data: auth,
        });
      }
    });
  } else {
    if (message.payload.action === "set") {
      const data = JSON.stringify(message.payload.data);
      fs.writeFile("user_info.json", data, (err) => {
        if (err) {
          message.respond({
            returnValue: true,
          });
        } else {
          console.log("auth set");
          message.respond({
            returnValue: true,
          });
        }
      });
    } else {
      message.respond({
        returnValue: false,
        errorText: err.message,
        errorCode: 1,
      });
    }
  }
});
