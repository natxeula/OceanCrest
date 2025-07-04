// Simple API handler for applications using Neon database
const { Pool } = require("pg");

// Connection configuration for Neon
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_i1XyGU4TuRaj@ep-soft-shape-a8shmx5d-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

// CORS headers for all responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

async function handleRequest(request) {
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (request.method === "GET") {
      // Get all applications
      const result = await pool.query(
        "SELECT * FROM applications ORDER BY submitted_at DESC",
      );

      return new Response(JSON.stringify({ applications: result.rows }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (request.method === "POST") {
      // Create new application
      const data = await request.json();

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
          return new Response(
            JSON.stringify({ error: `Missing required field: ${field}` }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          );
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

      return new Response(
        JSON.stringify({
          success: true,
          message: "Application submitted successfully",
          applicationId: result.rows[0].id,
          submittedAt: result.rows[0].submitted_at,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
}

// Export for different environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = { handleRequest };
} else if (typeof addEventListener !== "undefined") {
  // Cloudflare Workers environment
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
}
