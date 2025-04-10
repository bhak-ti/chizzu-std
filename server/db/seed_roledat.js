// server/db/seed_roledat.js
const pool = require("./pool");

const seedRoles = `
  INSERT INTO ROLEDAT (ROLEDESC, ROLETAG, ROLELEVEL, ROLEINFO)
  VALUES 
    ('Super Admin', 'SUPER', 1, 'Full access to all system features and management.'),
    ('Admin', 'ADMIN', 2, 'Standard admin privileges with limited access.'),
    ('Member', 'MEMBER', 3, 'Basic access for project collaboration.')
`;

pool.query(seedRoles)
  .then(() => console.log("✅ ROLEDAT table seeded!"))
  .catch((err) => console.error("❌ Error seeding ROLEDAT table:", err))
  .finally(() => pool.end());
