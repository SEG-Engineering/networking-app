import { Pool } from 'pg'

async function testConnection() {
  // Method 1: Basic Connection
  const pool1 = new Pool({
    user: 'admin_db',
    password: '2DSb8He*htIxf5Mt3$s6&',
    host: 'networking-app-db.cveokqaoony7.us-east-1.rds.amazonaws.com',
    database: 'networking_app',
    port: 5432,
  })

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
  })

  // Method 3: Connection String
  const pool3 = new Pool({
    connectionString: 'postgresql://admin_db:2DSb8He*htIxf5Mt3$s6&@networking-app-db.cveokqaoony7.us-east-1.rds.amazonaws.com:5432/networking_app'
  })

  try {
    console.log('Testing Method 1...')
    const result1 = await pool1.query('SELECT NOW()')
    console.log('Method 1 Success:', result1.rows[0])
  } catch (err) {
    console.error('Method 1 Failed:', err instanceof Error ? err.message : 'Unknown error')
  }

  try {
    console.log('Testing Method 2...')
    const result2 = await pool2.query('SELECT NOW()')
    console.log('Method 2 Success:', result2.rows[0])
  } catch (err) {
    console.error('Method 2 Failed:', err instanceof Error ? err.message : 'Unknown error')
  }

  try {
    console.log('Testing Method 3...')
    const result3 = await pool3.query('SELECT NOW()')
    console.log('Method 3 Success:', result3.rows[0])
  } catch (err) {
    console.error('Method 3 Failed:', err instanceof Error ? err.message : 'Unknown error')
  }

  // Close all pools
  await Promise.all([
    pool1.end(),
    pool2.end(),
    pool3.end()
  ])
}

testConnection().catch(err => {
  console.error('Test failed:', err instanceof Error ? err.message : 'Unknown error')
  process.exit(1)
})