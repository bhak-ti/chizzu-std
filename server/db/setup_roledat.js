// server/db/setup_roledat.js
const pool = require("./pool");

const createRoleTable = `
  CREATE TABLE IF NOT EXISTS ROLEDAT (
    ROLEID SERIAL PRIMARY KEY,
    ROLEDESC VARCHAR(100) NOT NULL,
    ROLETAG VARCHAR(50) NOT NULL,
    ROLELEVEL INT NOT NULL,
    ROLEINFO TEXT,
    ROLESTATUS VARCHAR(10) DEFAULT 'ACT',
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

pool.query(createRoleTable)
  .then(() => console.log("✅ ROLEDAT table created!"))
  .catch((err) => console.error("❌ Error creating ROLEDAT table:", err))
  .finally(() => pool.end());
