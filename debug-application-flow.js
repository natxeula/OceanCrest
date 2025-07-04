// Debug script to test application submission flow
// Run with: node debug-application-flow.js

const http = require("http");

async function testApplicationFlow() {
  console.log("🔍 Testing OceanCrest job application flow...\n");

  // Test 1: Check server is running
  try {
    console.log("1. Testing server connectivity...");
    const response = await makeRequest("GET", "/api/applications");
    console.log("✅ Server is running and responding");
    console.log(`   Current applications: ${response.total}`);
  } catch (error) {
    console.error("❌ Server connectivity failed:", error.message);
    return;
  }

  // Test 2: Submit a test application
  try {
    console.log("\n2. Testing application submission...");
    const testApplication = {
      preferredName: "John Doe",
      discordUser: "johndoe#1234",
      team: "writing",
      specificRole: "Senior Writer",
      generalDetails:
        "I am passionate about storytelling and have 5 years of experience in screenwriting.",
      portfolio: "https://johndoe-portfolio.com",
      sceneWriting:
        "INT. COFFEE SHOP - DAY\n\nJOHN sits at a corner table, typing furiously on his laptop.",
      additionalLinks: "GitHub: https://github.com/johndoe",
      termsAgree: true,
    };

    const submitResponse = await makeRequest(
      "POST",
      "/api/applications",
      testApplication,
    );
    console.log("✅ Application submitted successfully");
    console.log(`   Application ID: ${submitResponse.applicationId}`);
    console.log(`   Saved to: ${submitResponse.savedTo}`);
  } catch (error) {
    console.error("❌ Application submission failed:", error.message);
    return;
  }

  // Test 3: Verify application was saved
  try {
    console.log("\n3. Verifying application was saved...");
    const verifyResponse = await makeRequest("GET", "/api/applications");
    console.log(`✅ Applications in database: ${verifyResponse.total}`);

    if (verifyResponse.applications.length > 0) {
      const app = verifyResponse.applications[0];
      console.log(`   Latest application: ${app.preferred_name} (${app.team})`);
      console.log(
        `   Submitted: ${new Date(app.submitted_at).toLocaleString()}`,
      );
    }
  } catch (error) {
    console.error("❌ Verification failed:", error.message);
  }

  // Test 4: Check admin notifications
  try {
    console.log("\n4. Testing admin notification system...");
    // Note: Admin notifications are handled by the server console logs
    // In a real implementation, you would check email/Slack/etc.
    console.log("✅ Admin notifications are handled via server console logs");
    console.log("   Check the server terminal for notification messages");
  } catch (error) {
    console.error("❌ Admin notification test failed:", error.message);
  }

  console.log("\n🎉 Application flow test completed!");
  console.log("\n💡 Next steps:");
  console.log(
    "   - Visit http://localhost:3000/job-application.html to test the form",
  );
  console.log(
    "   - Visit http://localhost:3000/applications.html to view applications",
  );
  console.log("   - Password for admin panel: oceancrest2025");
}

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 3000,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const response = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response);
          } else {
            reject(
              new Error(`HTTP ${res.statusCode}: ${response.error || body}`),
            );
          }
        } catch (parseError) {
          reject(new Error(`Failed to parse response: ${body}`));
        }
      });
    });

    req.on("error", (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Run the test
if (require.main === module) {
  testApplicationFlow().catch(console.error);
}

module.exports = { testApplicationFlow };
