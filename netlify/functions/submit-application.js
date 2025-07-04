exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST",
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

    // TODO: Save to database
    // You can connect to databases here using:
    // - Neon (serverless Postgres)
    // - Prisma with PostgreSQL
    // - Any other database service

    // For now, we'll log the application (in production, you'd save to a database)
    console.log("New job application received:", application);

    // In a real implementation, you might:
    // 1. Save to a database
    // 2. Send notification emails
    // 3. Add to a CRM system
    // 4. Integrate with Slack/Discord for notifications

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
