const bcrypt = require("bcrypt");
const getConnection = require("../db/db-connection");

const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  const connection = getConnection(); // Get the connection instance

  console.log('Register request received:', { name, email });

  // Check if the user already exists
  connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error checking user existence:", err);
      return res.status(500).send("Error checking user existence");
    }

    if (results.length > 0) {
      console.log('User already exists:', email);
      return res.status(400).send("User already exists");
    }

    // Generate a salt for password hashing
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error("Error generating salt:", err);
        return res.status(500).send("Error generating salt");
      }

      // Hash the password using the generated salt
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).send("Error hashing password");
        }

        connection.query(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, hash],
          (err, results) => {
            if (err) {
              console.error("Error registering user:", err);
              return res.status(500).send("Error registering user");
            }

            console.log('User registered successfully:', { name, email });
            res.status(201).send("User Registered Successfully");
          }
        );
      });
    });
  });
};

const getUser = (req, res) => {
  const connection = getConnection(); // Get the connection instance

  connection.query("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).send("Error fetching users");
    }

    res.send(rows);
  });
};

module.exports = { registerUser, getUser };
