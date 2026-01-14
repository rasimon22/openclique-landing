import { sql } from "@vercel/postgres";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.join(__dirname, "../.env") });

const migrationsDir = path.join(__dirname, "../prisma/migrations");

async function runMigrations() {
  try {
    // Create migrations table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Get all migration files
    const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql"));

    if (files.length === 0) {
      console.log("No migrations found");
      return;
    }

    // Sort files by name (they should be numbered)
    files.sort();

    for (const file of files) {
      // Check if migration has been run
      const result = await sql`SELECT id FROM migrations WHERE name = ${file}`;

      if (result.rows.length > 0) {
        console.log(`✓ Migration already applied: ${file}`);
        continue;
      }

      // Read and execute migration
      const filePath = path.join(migrationsDir, file);
      const content = fs.readFileSync(filePath, "utf-8");

      console.log(`→ Running migration: ${file}`);

      // Split by semicolon and execute each statement
      const statements = content.split(";").filter((stmt) => stmt.trim());

      for (const statement of statements) {
        if (statement.trim()) {
          await sql.query(statement);
        }
      }

      // Record migration
      await sql`INSERT INTO migrations (name) VALUES (${file})`;
      console.log(`✓ Migration completed: ${file}`);
    }

    console.log("\n✓ All migrations applied successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();
