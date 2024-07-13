const getConnection = require("../db/db-connection");
const db = getConnection();

const savePlace = (req, res) => {
  const { title, description, date } = req.body;
  const image = req.file ? req.file.filename : null;
  
  const sql = "INSERT INTO place (title, description, date, image) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, date, image], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error inserting place");
    } else {
      res.send("Place inserted");
    }
  });
};

const getPlace = (req, res) => {
  db.query("SELECT * FROM place", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching places");
    } else {
      res.json({ places: rows }); 
    }
  });
};

const deletePlace = (req, res) => {
  db.query("DELETE FROM place WHERE pid=?", [req.params.pid], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting place");
    } else {
      res.send("Place deleted!");
    }
  });
};

const updatePlace = (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : req.body.image;
  
  db.query(
    "UPDATE place SET title=?, description=?, image=? WHERE pid=?",
    [title, description, image, req.params.pid],
    (err, rows, fields) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating place");
      } else {
        res.send("Place updated successfully!");
      }
    }
  );
};

module.exports = { savePlace, getPlace, deletePlace, updatePlace };
