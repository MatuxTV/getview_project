const { Client } = require('pg');

async function setupDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('Connected to database');
    
    // Drop existing tables
    await client.query('DROP TABLE IF EXISTS places CASCADE;');
    await client.query('DROP TABLE IF EXISTS category CASCADE;');
    console.log('Old tables dropped');
    
    // Create category table
    await client.query(`
      CREATE TABLE category (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        color TEXT,
        icon TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    console.log('Category table created');
    
    // Create places table with proper foreign key
    await client.query(`
      CREATE TABLE places (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "categoryId" INTEGER REFERENCES category(id)
      );
    `);
    console.log('Places table created');
    
    // Insert default categories
    await client.query(`
      INSERT INTO category (name, description, color, icon) VALUES
      ('Reštaurácia', 'Miesta na jedenie', '#ff6b6b', 'restaurant'),
      ('Obchod', 'Nákupné miesta', '#4ecdc4', 'shop'),
      ('Zábava', 'Miesta na zábavu', '#45b7d1', 'entertainment'),
      ('Šport', 'Športové aktivity', '#96ceb4', 'sport'),
      ('Cestovanie', 'Turistické miesta', '#ffeaa7', 'travel'),
      ('Iné', 'Ostatné miesta', '#dda0dd', 'other');
    `);
    
    console.log('Default categories inserted successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

setupDatabase();
