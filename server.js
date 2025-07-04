const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");
const {
  notifyAdmin,
  initializeNotifications,
} = require("./admin-notifications");

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static("."));

// Database connection with environment variable fallback
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_i1XyGU4TuRaj@ep-soft-shape-a8shmx5d-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require";

let pool;
let databaseAvailable = false;

// Initialize database connection
async function initializeDatabase() {
  try {
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      // Connection timeout and retry settings
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
      max: 10,
    });

    // Test connection
    const client = await pool.connect();
    console.log("✅ Connected to Neon database successfully");

    // Create table with updated schema matching form data
    await client.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id VARCHAR(50) PRIMARY KEY,
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        preferred_name VARCHAR(255) NOT NULL,
        discord_user VARCHAR(255) NOT NULL,
        team VARCHAR(100) NOT NULL,
        specific_role VARCHAR(255) NOT NULL,
        portfolio VARCHAR(500),
        general_details TEXT NOT NULL,
        scene_writing TEXT,
        additional_links TEXT,
        terms_agree BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

        -- Add indexes for better performance
        INDEX idx_submitted_at (submitted_at),
        INDEX idx_team (team),
        INDEX idx_preferred_name (preferred_name)
      )
    `);

    console.log("✅ Database table initialized successfully");
    client.release();
    databaseAvailable = true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.log("📝 Applications will be saved to local files as fallback");
    databaseAvailable = false;
  }
}

// Initialize on startup
initializeDatabase();

const fs = require("fs").promises;
const fsSync = require("fs");

// File backup system for when database is unavailable
const APPLICATIONS_FILE = "./applications_backup.json";

// Ensure backup file exists
function ensureBackupFile() {
  try {
    if (!fsSync.existsSync(APPLICATIONS_FILE)) {
      fsSync.writeFileSync(APPLICATIONS_FILE, JSON.stringify([]));
    }
  } catch (error) {
    console.error("Error creating backup file:", error);
  }
}

// Load applications from file
async function loadApplicationsFromFile() {
  try {
    const data = await fs.readFile(APPLICATIONS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Save applications to file
async function saveApplicationsToFile(applications) {
  try {
    await fs.writeFile(
      APPLICATIONS_FILE,
      JSON.stringify(applications, null, 2),
    );
    return true;
  } catch (error) {
    console.error("Error saving to file:", error);
    return false;
  }
}

// Send admin notification (placeholder for email service)
async function notifyAdmin(application) {
  console.log(`🔔 NEW APPLICATION RECEIVED:
  Name: ${application.preferred_name}
  Team: ${application.team}
  Role: ${application.specific_role}
  Discord: ${application.discord_user}
  Submitted: ${new Date().toLocaleString()}

  👉 Check admin panel at: /applications.html`);

  // TODO: Implement email notification here
  // Example: await sendEmail({
  //   to: 'admin@oceancrest.studio',
  //   subject: 'New Job Application',
  //   body: `New application from ${application.preferred_name}...`
  // });
}

// Initialize backup file
ensureBackupFile();

// API endpoint for applications
app.get("/api/applications", async (req, res) => {
  try {
    let applications = [];

    if (databaseAvailable && pool) {
      // Try database first
      try {
        const result = await pool.query(
          "SELECT * FROM applications ORDER BY submitted_at DESC",
        );
        applications = result.rows;
        console.log(
          `📊 Loaded ${applications.length} applications from database`,
        );
      } catch (dbError) {
        console.error(
          "Database query failed, falling back to file:",
          dbError.message,
        );
        databaseAvailable = false;
      }
    }

    // Fallback to file if database unavailable
    if (!databaseAvailable) {
      applications = await loadApplicationsFromFile();
      console.log(
        `📊 Loaded ${applications.length} applications from backup file`,
      );
    }

    res.json({
      applications: applications,
      source: databaseAvailable ? "database" : "file",
      total: applications.length,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({
      error: "Failed to fetch applications",
      applications: [],
      source: "error",
    });
  }
});

app.post("/api/applications", async (req, res) => {
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
      if (!data[field] || data[field].toString().trim() === "") {
        return res.status(400).json({
          error: `Missing required field: ${field}`,
          field: field,
        });
      }
    }

    // Generate ID if not provided
    const applicationId =
      data.applicationId ||
      `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const applicationData = {
      id: applicationId,
      submitted_at: new Date().toISOString(),
      preferred_name: data.preferredName.toString().trim(),
      discord_user: data.discordUser.toString().trim(),
      team: data.team.toString().trim(),
      specific_role: data.specificRole.toString().trim(),
      portfolio: data.portfolio ? data.portfolio.toString().trim() : "",
      general_details: data.generalDetails.toString().trim(),
      scene_writing: data.sceneWriting
        ? data.sceneWriting.toString().trim()
        : "",
      additional_links: data.additionalLinks
        ? data.additionalLinks.toString().trim()
        : "",
      terms_agree: Boolean(data.termsAgree),
      created_at: new Date().toISOString(),
    };

    let savedToDatabase = false;
    let savedToFile = false;

    // Try to save to database first
    if (databaseAvailable && pool) {
      try {
        const result = await pool.query(
          `INSERT INTO applications
           (id, submitted_at, preferred_name, discord_user, team, specific_role, portfolio, general_details, scene_writing, additional_links, terms_agree, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
           RETURNING id, submitted_at`,
          [
            applicationData.id,
            applicationData.submitted_at,
            applicationData.preferred_name,
            applicationData.discord_user,
            applicationData.team,
            applicationData.specific_role,
            applicationData.portfolio,
            applicationData.general_details,
            applicationData.scene_writing,
            applicationData.additional_links,
            applicationData.terms_agree,
            applicationData.created_at,
          ],
        );

        savedToDatabase = true;
        console.log(`✅ Application ${applicationId} saved to database`);
      } catch (dbError) {
        console.error("Database save failed:", dbError.message);
        databaseAvailable = false;
      }
    }

    // Always save to file as backup
    try {
      const applications = await loadApplicationsFromFile();
      applications.push(applicationData);
      savedToFile = await saveApplicationsToFile(applications);

      if (savedToFile) {
        console.log(`💾 Application ${applicationId} saved to backup file`);
      }
    } catch (fileError) {
      console.error("File save failed:", fileError.message);
    }

    // Notify admin
    await notifyAdmin(applicationData);

    if (savedToDatabase || savedToFile) {
      res.json({
        success: true,
        message: "Application submitted successfully",
        applicationId: applicationData.id,
        submittedAt: applicationData.submitted_at,
        savedTo: savedToDatabase ? "database" : "file",
      });
    } else {
      throw new Error("Failed to save application to any storage method");
    }
  } catch (error) {
    console.error("Application submission error:", error);
    res.status(500).json({
      error: "Failed to submit application",
      message: error.message,
      details: "Please try again or contact support if the problem persists",
    });
  }
});

// DELETE endpoint for applications
app.delete("/api/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let deletedFromDatabase = false;
    let deletedFromFile = false;

    // Try to delete from database
    if (databaseAvailable && pool) {
      try {
        const result = await pool.query(
          "DELETE FROM applications WHERE id = $1 RETURNING id",
          [id],
        );

        if (result.rows.length > 0) {
          deletedFromDatabase = true;
          console.log(`🗑️ Application ${id} deleted from database`);
        }
      } catch (dbError) {
        console.error("Database delete failed:", dbError.message);
      }
    }

    // Also delete from file backup
    try {
      const applications = await loadApplicationsFromFile();
      const initialLength = applications.length;
      const filteredApplications = applications.filter((app) => app.id !== id);

      if (filteredApplications.length < initialLength) {
        deletedFromFile = await saveApplicationsToFile(filteredApplications);
        console.log(`🗑️ Application ${id} deleted from backup file`);
      }
    } catch (fileError) {
      console.error("File delete failed:", fileError.message);
    }

    if (deletedFromDatabase || deletedFromFile) {
      res.json({
        success: true,
        message: "Application deleted successfully",
        deletedFrom: deletedFromDatabase ? "database" : "file",
      });
    } else {
      res.status(404).json({ error: "Application not found" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete application" });
  }
});

// DELETE all applications endpoint
app.delete("/api/applications", async (req, res) => {
  try {
    let clearedDatabase = false;
    let clearedFile = false;

    // Clear database
    if (databaseAvailable && pool) {
      try {
        await pool.query("DELETE FROM applications");
        clearedDatabase = true;
        console.log("🗑️ All applications cleared from database");
      } catch (dbError) {
        console.error("Database clear failed:", dbError.message);
      }
    }

    // Clear file backup
    try {
      clearedFile = await saveApplicationsToFile([]);
      console.log("🗑️ All applications cleared from backup file");
    } catch (fileError) {
      console.error("File clear failed:", fileError.message);
    }

    if (clearedDatabase || clearedFile) {
      res.json({
        success: true,
        message: "All applications deleted successfully",
        clearedFrom: clearedDatabase ? "database" : "file",
      });
    } else {
      throw new Error("Failed to clear applications from any storage");
    }
  } catch (error) {
    console.error("Clear error:", error);
    res.status(500).json({ error: "Failed to delete applications" });
  }
});

// Serve index.html for any non-API routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`OceanCrest Entertainment server running on port ${port}`);
  console.log(`Connected to Neon database: oceancrest-applications`);
});
