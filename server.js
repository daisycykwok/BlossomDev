import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

// Use global Promise
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose
  .connect(config.mongoUri, {
    // Optional: remove if using default behavior
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  });

// Handle DB connection error
mongoose.connection.on("error", () => {
  throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});

// Test route (optional homepage)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application." });
});

// Start server
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
