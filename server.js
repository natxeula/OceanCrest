const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static("."));

// Database connection
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_i1XyGU4TuRaj@ep-ancient-meadow-a88rfx44-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

// API endpoint for applications
app.get("/api/applications.js", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM applications ORDER BY submitted_at DESC",
    );
    res.json({ applications: result.rows });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

app.post("/api/applications.js", async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    const requiredFields = [
      "preferredName",
      "discordUser",
      "team",
      "specificRole",
      "generalDetails",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return res
          .status(400)
          .json({ error: `Missing required field: ${field}` });
      }
    }

    // Generate ID if not provided
    const applicationId =
      data.applicationId ||
      `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Insert into database
    const result = await pool.query(
      `INSERT INTO applications 
       (id, preferred_name, discord_user, team, specific_role, portfolio, general_details, scene_writing, additional_links, terms_agree)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, submitted_at`,
      [
        applicationId,
        data.preferredName,
        data.discordUser,
        data.team,
        data.specificRole,
        data.portfolio || "",
        data.generalDetails,
        data.sceneWriting || "",
        data.additionalLinks || "",
        data.termsAgree || false,
      ],
    );

    res.json({
      success: true,
      message: "Application submitted successfully",
      applicationId: result.rows[0].id,
      submittedAt: result.rows[0].submitted_at,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

// Catch-all handler for SPA routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`OceanCrest Entertainment server running on port ${port}`);
  console.log(`Connected to Neon database: oceancrest-applications`);
});
