const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const key = "d714c3c54229cd3cc8afc85bdc3f20a2-us8";
const audId = "69998986bb";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);
  const url = "https://us8.api.mailchimp.com/3.0/lists/69998986bb";
  // const options = {
  //   method: "POST",
  //   auth: "rushil:d714c3c54229cd3cc8afc85bdc3f20a2-us8",
  // };
  // const request = https.request(url, options, (response) => {
  //   response.on("data", (d) => {
  //     console.log(JSON.parse(d));
  //     if (response.statusCode == 200) {
  //       res.sendFile(__dirname + "/success.html");
  //     } else {
  //       res.sendFile(__dirname + "/failure.html");
  //     }
  //   });
  // });
  // request.write(jsonData);
  // request.end();
  const options = {
    method: "POST",
    url: url,
    body: jsonData,
    headers: {
      Authorization: "auth d714c3c54229cd3cc8afc85bdc3f20a2 - us8",
    },
  };
  request(options, (err, response, body) => {
    console.log(JSON.parse(response.body));
    console.log(err);
    if (err) {
      res.sendFile(__dirname + "/failure.html");
    } else if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Started server on port 3000");
});
