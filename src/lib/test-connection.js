// src/lib/test-connection.js
const { Pool } = require('pg');

async function testConnection() {
  // Method 1: Basic Connection
  const pool1 = new Pool({
    user: 'admin_db',
    password: '2DSb8He*htIxf5Mt3$s6&',
    host: 'networking-app-db.cveokqaoony7.us-east-1.rds.amazonaws.com',
    database: 'networking_app',
    port: 5432,
  });

  // Method 2: Connection with SSL
  const pool2 = new Pool({
    user: 'admin_db',
    password: '2DSb8He*htIxf5Mt3$s6&',
    host: 'networking-app-db.cveokqaoony7.us-east-1.rds.amazonaws.com',
    database: 'networking_app',
    port: 5432,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Testing Method 1...');
    const result1 = await pool1.query('SELECT NOW()');
    console.log('Method 1 Success:', result1.rows[0]);
  } catch (err) {
    console.error('Method 1 Failed:', err.message);
  }

  try {
    console.log('Testing Method 2...');
    const result2 = await pool2.query('SELECT NOW()');
    console.log('Method 2 Success:', result2.rows[0]);
  } catch (err) {
    console.error('Method 2 Failed:', err.message);
  }

  // Close pools
  await Promise.all([
    pool1.end(),
    pool2.end()
  ]);
}

testConnection().catch(err => {
  console.error('Test failed:', err.message);
  process.exit(1);
});