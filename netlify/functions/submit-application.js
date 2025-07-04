const fs = require("fs").promises;
const path = require("path");

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, GET",
      },
    };
  }

  // Handle GET requests to read applications
  if (event.httpMethod === "GET") {
    try {
      const applicationsPath = path.join("/tmp", "applications.json");

      // Check if file exists
      try {
        const data = await fs.readFile(applicationsPath, "utf8");
        const applications = JSON.parse(data);

        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          body: JSON.stringify({ applications }),
        };
      } catch (readError) {
        // File doesn't exist or is empty, return empty array
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          body: JSON.stringify({ applications: [] }),
        };
      }
    } catch (error) {
      console.error("Error reading applications:", error);
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ error: "Failed to read applications" }),
      };
    }
  }

  // Only allow POST requests for submission
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, GET",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse form data
    const body = JSON.parse(event.body);

    // Validate required fields
    const requiredFields = [
      "preferredName",
      "discordUser",
      "team",
      "specificRole",
      "generalDetails",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return {
          statusCode: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          body: JSON.stringify({ error: `Missing required field: ${field}` }),
        };
      }
    }

    // Create application object
    const application = {
      id:
        body.applicationId ||
        `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: body.submittedAt || new Date().toISOString(),
      preferredName: body.preferredName,
      discordUser: body.discordUser,
      team: body.team,
      specificRole: body.specificRole,
      portfolio: body.portfolio || "",
      generalDetails: body.generalDetails,
      sceneWriting: body.sceneWriting || "",
      additionalLinks: body.additionalLinks || "",
      termsAgree: body.termsAgree === "true" || body.termsAgree === true,
    };

    // Save to JSON file
    const applicationsPath = path.join("/tmp", "applications.json");

    let applications = [];
    try {
      // Try to read existing applications
      const existingData = await fs.readFile(applicationsPath, "utf8");
      applications = JSON.parse(existingData);
    } catch (readError) {
      // File doesn't exist or is empty, start with empty array
      applications = [];
    }

    // Add new application
    applications.push(application);

    // Write back to file
    await fs.writeFile(applicationsPath, JSON.stringify(applications, null, 2));

    console.log("Application saved to file:", application.id);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        success: true,
        message: "Application submitted successfully",
        applicationId: application.id,
      }),
    };
  } catch (error) {
    console.error("Error processing application:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        error: "Internal server error",
        message: "Failed to process application",
      }),
    };
  }
};
