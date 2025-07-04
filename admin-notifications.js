// Admin notification system for OceanCrest Entertainment
// This module handles notifications when new applications are received

/**
 * Configuration for admin notifications
 */
const NOTIFICATION_CONFIG = {
  // Admin email (set via environment variable or default)
  adminEmail: process.env.ADMIN_EMAIL || "admin@oceancrest.studio",

  // Notification settings
  enableEmailNotifications: process.env.ENABLE_EMAIL_NOTIFICATIONS === "true",
  enableConsoleNotifications: true,
  enableSlackNotifications: process.env.SLACK_WEBHOOK_URL ? true : false,

  // Rate limiting (prevent spam)
  maxNotificationsPerHour: 10,
  lastNotificationTimes: [],
};

/**
 * Rate limiting check
 */
function checkRateLimit() {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  // Remove old notifications
  NOTIFICATION_CONFIG.lastNotificationTimes =
    NOTIFICATION_CONFIG.lastNotificationTimes.filter(
      (time) => time > oneHourAgo,
    );

  // Check if we're under the limit
  if (
    NOTIFICATION_CONFIG.lastNotificationTimes.length >=
    NOTIFICATION_CONFIG.maxNotificationsPerHour
  ) {
    console.log("⚠️ Notification rate limit reached. Skipping notification.");
    return false;
  }

  // Add current time
  NOTIFICATION_CONFIG.lastNotificationTimes.push(now);
  return true;
}

/**
 * Format application data for notifications
 */
function formatApplicationForNotification(application) {
  const submittedDate = new Date(
    application.submitted_at || application.submittedAt,
  ).toLocaleString();

  return {
    name: application.preferred_name || application.preferredName,
    discord: application.discord_user || application.discordUser,
    team: application.team,
    role: application.specific_role || application.specificRole,
    portfolio: application.portfolio,
    submittedAt: submittedDate,
    id: application.id || application.applicationId,
  };
}

/**
 * Send console notification (always enabled)
 */
function sendConsoleNotification(application) {
  const app = formatApplicationForNotification(application);

  console.log("\n" + "=".repeat(50));
  console.log("🔔 NEW JOB APPLICATION RECEIVED");
  console.log("=".repeat(50));
  console.log(`👤 Name: ${app.name}`);
  console.log(`💬 Discord: ${app.discord}`);
  console.log(`🎯 Team: ${app.team}`);
  console.log(`💼 Role: ${app.role}`);
  console.log(`📅 Submitted: ${app.submittedAt}`);
  console.log(`🆔 ID: ${app.id}`);
  if (app.portfolio) {
    console.log(`🌐 Portfolio: ${app.portfolio}`);
  }
  console.log("\n👉 Review at: http://localhost:3000/applications.html");
  console.log("=".repeat(50) + "\n");
}

/**
 * Send email notification (if configured)
 * This is a placeholder - implement with your preferred email service
 */
async function sendEmailNotification(application) {
  if (!NOTIFICATION_CONFIG.enableEmailNotifications) {
    return;
  }

  const app = formatApplicationForNotification(application);

  // TODO: Implement with your email service
  // Examples: SendGrid, Nodemailer, AWS SES, etc.

  console.log(
    `📧 Email notification would be sent to: ${NOTIFICATION_CONFIG.adminEmail}`,
  );
  console.log(`   Subject: New Job Application - ${app.name} (${app.team})`);

  // Example implementation with SendGrid:
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
    to: NOTIFICATION_CONFIG.adminEmail,
    from: 'noreply@oceancrest.studio',
    subject: `New Job Application - ${app.name} (${app.team})`,
    html: `
      <h2>New Job Application Received</h2>
      <p><strong>Name:</strong> ${app.name}</p>
      <p><strong>Discord:</strong> ${app.discord}</p>
      <p><strong>Team:</strong> ${app.team}</p>
      <p><strong>Role:</strong> ${app.role}</p>
      <p><strong>Submitted:</strong> ${app.submittedAt}</p>
      ${app.portfolio ? `<p><strong>Portfolio:</strong> <a href="${app.portfolio}">${app.portfolio}</a></p>` : ''}
      <p><a href="http://localhost:3000/applications.html">Review Application</a></p>
    `
  };
  
  await sgMail.send(msg);
  */
}

/**
 * Send Slack notification (if configured)
 */
async function sendSlackNotification(application) {
  if (!NOTIFICATION_CONFIG.enableSlackNotifications) {
    return;
  }

  const app = formatApplicationForNotification(application);

  try {
    // TODO: Implement Slack webhook
    console.log(`💬 Slack notification would be sent`);

    // Example implementation:
    /*
    const fetch = require('node-fetch');
    
    const payload = {
      text: `🎬 New Job Application Received`,
      attachments: [{
        color: 'good',
        fields: [
          { title: 'Name', value: app.name, short: true },
          { title: 'Discord', value: app.discord, short: true },
          { title: 'Team', value: app.team, short: true },
          { title: 'Role', value: app.role, short: true },
          { title: 'Submitted', value: app.submittedAt, short: false }
        ],
        actions: [{
          type: 'button',
          text: 'Review Application',
          url: 'http://localhost:3000/applications.html'
        }]
      }]
    };
    
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    */
  } catch (error) {
    console.error("❌ Failed to send Slack notification:", error.message);
  }
}

/**
 * Main notification function
 */
async function notifyAdmin(application) {
  try {
    // Check rate limiting
    if (!checkRateLimit()) {
      return;
    }

    // Always send console notification
    if (NOTIFICATION_CONFIG.enableConsoleNotifications) {
      sendConsoleNotification(application);
    }

    // Send email notification if enabled
    await sendEmailNotification(application);

    // Send Slack notification if enabled
    await sendSlackNotification(application);
  } catch (error) {
    console.error("�� Error sending admin notifications:", error.message);
  }
}

/**
 * Initialize notification system
 */
function initializeNotifications() {
  console.log("🔔 Admin notification system initialized");
  console.log(
    `   Email notifications: ${NOTIFICATION_CONFIG.enableEmailNotifications ? "✅ Enabled" : "❌ Disabled"}`,
  );
  console.log(
    `   Slack notifications: ${NOTIFICATION_CONFIG.enableSlackNotifications ? "✅ Enabled" : "❌ Disabled"}`,
  );
  console.log(
    `   Console notifications: ${NOTIFICATION_CONFIG.enableConsoleNotifications ? "✅ Enabled" : "❌ Disabled"}`,
  );

  if (!NOTIFICATION_CONFIG.enableEmailNotifications) {
    console.log(
      "   💡 To enable email notifications, set ENABLE_EMAIL_NOTIFICATIONS=true and configure your email service",
    );
  }

  if (!NOTIFICATION_CONFIG.enableSlackNotifications) {
    console.log(
      "   💡 To enable Slack notifications, set SLACK_WEBHOOK_URL environment variable",
    );
  }
}

module.exports = {
  notifyAdmin,
  initializeNotifications,
  NOTIFICATION_CONFIG,
};
