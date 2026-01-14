import { sql } from "@vercel/postgres";

export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

export async function addSubscriber(name: string, email: string) {
  try {
    const result = await sql`
      INSERT INTO subscribers (name, email)
      VALUES (${name}, ${email})
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, created_at
    `;
    return result.rows[0];
  } catch (error) {
    console.error("Error adding subscriber:", error);
    throw error;
  }
}

export async function getSubscribers() {
  try {
    const result = await sql`SELECT * FROM subscribers ORDER BY created_at DESC`;
    return result.rows;
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    throw error;
  }
}

