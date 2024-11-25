let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "illusion-bangkit",
  user: "root",
  password: "illusion25bangkit",
  database: "test-database",
  port: "3306",
});

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Connection Succuessfully!");
  }
});

module.exports = connection;
