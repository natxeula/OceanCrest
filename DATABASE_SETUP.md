# Database Setup for Job Applications

The job application system currently saves to localStorage. For production use, consider these database options:

## Option 1: MCP Server Integration (Recommended)

Connect to a database using Builder.io's MCP servers:

### **Click the "MCP Servers" button under the chat input field to connect to:**

- **Neon**: Serverless Postgres database
- **Prisma Postgres**: Database management with ORM

### Benefits:

- Full database control
- Query applications programmatically
- Advanced filtering and reporting
- Integration with other business tools

## Option 2: Custom Backend (Advanced)

1. Create a custom backend API
2. Add environment variables for database connection
3. Install necessary dependencies

### Example with Neon/PostgreSQL:

```javascript
// In your backend API
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// In the handler function:
const result = await pool.query(
  "INSERT INTO applications (id, submitted_at, preferred_name, discord_user, team, specific_role, portfolio, general_details, scene_writing, additional_links, terms_agree) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
  [
    application.id,
    application.submittedAt,
    application.preferredName,
    application.discordUser,
    application.team,
    application.specificRole,
    application.portfolio,
    application.generalDetails,
    application.sceneWriting,
    application.additionalLinks,
    application.termsAgree,
  ],
);
```

## Current Status

✅ **Forms now submit to server** (instead of just localStorage)
✅ **Backward compatible** (still saves locally for immediate admin access)
✅ **Ready for database integration**

## Next Steps

1. Choose your preferred option above
2. If using MCP servers, click the "MCP Servers" button in the chat interface
3. Configure your database schema to match the application fields
4. Test the integration

## Schema for Database

```sql
CREATE TABLE applications (
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Environment Variables Needed

```
DATABASE_URL=your_database_connection_string
NOTIFICATION_EMAIL=admin@oceancrest.studio (optional)
```
