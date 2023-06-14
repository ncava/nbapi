import { MongoClient } from "mongodb";

// REMEMBER TO CHANGE THIS TO YOUR CONNECTION STRING
const connectionString = "mongodb+srv://Cava:1234@nbapi.qkcldaq.mongodb.net/";

const client = new MongoClient(connectionString);

let conn;
try {
  // Try
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("nbapi");

export default db;