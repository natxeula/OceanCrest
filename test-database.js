// Database connection test for OceanCrest Entertainment
// Run this with: node test-database.js

const { Pool } = require("pg");

// Database connection with environment variable fallback
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_i1XyGU4TuRaj@ep-soft-shape-a8shmx5d-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require";

async function testDatabaseConnection() {
  console.log("🔍 Testing Neon database connection...");
  console.log(
    "📡 Connection string:",
    DATABASE_URL.replace(/:[^:@]*@/, ":***@"),
  ); // Hide password

  let pool;
  try {
    // Create connection pool
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      connectionTimeoutMillis: 10000,
    });

    // Test connection
    console.log("⏳ Attempting to connect...");
    const client = await pool.connect();
    console.log("✅ Database connection successful!");

    // Test basic query
    console.log("⏳ Testing basic query...");
    const result = await client.query(
      "SELECT NOW() as current_time, version() as db_version",
    );
    console.log("✅ Query successful!");
    console.log("🕐 Current database time:", result.rows[0].current_time);
    console.log(
      "📊 Database version:",
      result.rows[0].db_version.split(" ")[0],
    );

    // Check if applications table exists
    console.log("⏳ Checking applications table...");
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'applications'
      );
    `);

    if (tableCheck.rows[0].exists) {
      console.log("✅ Applications table exists");

      // Get table info
      const tableInfo = await client.query(`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'applications' 
        ORDER BY ordinal_position;
      `);

      console.log("📋 Table schema:");
      tableInfo.rows.forEach((col) => {
        console.log(
          `   ${col.column_name}: ${col.data_type} ${col.is_nullable === "NO" ? "(required)" : "(optional)"}`,
        );
      });

      // Count existing applications
      const countResult = await client.query(
        "SELECT COUNT(*) as total FROM applications",
      );
      console.log(`📊 Existing applications: ${countResult.rows[0].total}`);
    } else {
      console.log(
        "⚠️  Applications table does not exist - will be created on server start",
      );
    }

    client.release();
    console.log("\n🎉 Database test completed successfully!");
  } catch (error) {
    console.error("❌ Database test failed:");
    console.error("   Error:", error.message);

    if (error.code) {
      console.error("   Error code:", error.code);
    }

    if (error.message.includes("timeout")) {
      console.error("💡 This might be a network connectivity issue");
    } else if (error.message.includes("authentication")) {
      console.error(
        "💡 This looks like an authentication problem - check your credentials",
      );
    } else if (error.message.includes("connection")) {
      console.error(
        "💡 This looks like a connection issue - check your connection string",
      );
    }

    process.exit(1);
  } finally {
    if (pool) {
      await pool.end();
      console.log("🔌 Database connection closed");
    }
  }
}

// Run the test
if (require.main === module) {
  testDatabaseConnection();
}

module.exports = { testDatabaseConnection };
