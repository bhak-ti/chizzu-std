const pool = require("./pool");

const createUserTable = `
  CREATE TABLE IF NOT EXISTS USERDAT (
    USERID SERIAL PRIMARY KEY,
    USERNAME VARCHAR(50) UNIQUE NOT NULL,
    USERPWD VARCHAR(255) NOT NULL,
    USEREMAIL VARCHAR(100) UNIQUE NOT NULL,
    USERFULLNAME VARCHAR(100),
    USERROLE VARCHAR(20) DEFAULT 'member',
    USERSTATUS VARCHAR(20) DEFAULT 'active',
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

(async () => {
  try {
    await pool.query(createUserTable);
    console.log("✅ USERDAT table created!");
    process.exit();
  } catch (err) {
    console.error("❌ Error creating table:", err);
    process.exit(1);
  }
})();
