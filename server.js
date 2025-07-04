const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static("."));

// Applications system has been removed and replaced with Google Forms

// Serve index.html for any non-API routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`OceanCrest Entertainment server running on port ${port}`);
  console.log(`Connected to Neon database: oceancrest-applications`);
});
