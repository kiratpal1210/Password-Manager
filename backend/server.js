const express = require("express");
const { MongoClient, ObjectId } = require("mongodb"); // Use ObjectId for MongoDB document IDs
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
// const { ObjectId } = require('mongodb');

const cors = require("cors");

dotenv.config();

// Connection URL
const url = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database name
const dbname = "bhooljao";
const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(cors());

client.connect();

// Get all passwords
app.get("/", async function (req, res) {
  const db = client.db(dbname);
  const collection = db.collection("passwords"); // Renamed variable
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// Save the password (create or update)
app.post("/", async function (req, res) {
  const password = req.body;

  const db = client.db(dbname);
  const collection = db.collection("passwords");

  // Insert new password
  const insertResult = await collection.insertOne(password);
  res.send({ success: true, result: insertResult });
});

// Delete a password by ID
app.delete("/", async function (req, res) {
  const { id } = req.body; // Assuming frontend sends { id: "..." }
  
  const db = client.db(dbname);
  const collection = db.collection("passwords");

  // Ensure the id is an ObjectId
  const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
  
  res.send({ success: true, result: deleteResult });
});

// Update (edit) an existing password
app.put("/", async function (req, res) {
  const { id, site, username, password } = req.body;

  try {
    const db = client.db(dbname);
    const collection = db.collection("passwords");

    // Convert the string ID to MongoDB ObjectId
    const objectId = new ObjectId(id);

    // Update the document by ID
    const updateResult = await collection.updateOne(
      { _id: objectId },  // Use ObjectId here
      { $set: { site, username, password } }
    );

    res.send({ success: true, result: updateResult });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
});



// Listening to the port
app.listen(port, function () {
  console.log(`App listening on http://localhost:${port}`); // Corrected template literal
});
