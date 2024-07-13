const bcrypt = require("bcrypt");
const getConnection = require("../db/db-connection");

const userLogin = (req, res) => {
  const { email, password } = req.body;
  const connection = getConnection(); // Get the connection instance

  console.log("Request body:", req.body);  // Log the request body for debugging purposes

  // Query the database to retrieve user information
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, rows) => {
      if (err) {
        // Handle database query errors
        console.log("Error Occurred while Retrieving User: ", err);
        return res.status(500).send("Internal Server Error");
      }

      // Log the retrieved rows for debugging purposes
      console.log("Rows:", rows);

      if (rows.length === 0) {
        // Handle user not found scenario
        console.log("User Not Found");
        return res.status(404).send("User Not Found");
      }

      const user = rows[0];
      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          // Handle bcrypt comparison errors
          console.log("Error Occurred while Comparing Passwords: ", err);
          return res.status(500).send("Internal Server Error");
        }

        if (result) {
          // Return success message if password is correct
          console.log("User Authenticated");
          return res.send("User Authenticated");
        } else {
          // Handle incorrect password scenario
          console.log("Incorrect password");
          return res.status(401).send("Incorrect Password");
        }
      });
    }
  );
};

module.exports = { userLogin };
