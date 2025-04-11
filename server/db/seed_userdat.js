const bcrypt = require("bcryptjs");
const pool = require("./pool");

async function seedUser() {
  try {
    const hashedPassword = await bcrypt.hash("bhakti", 10);

    const insertQuery = `
      INSERT INTO USERDAT (
        USERNAME, USERPWD, USEREMAIL, USERFULLNAME,
        USERSTATUS, CREATED_AT, UPDATED_AT
      ) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    const values = [
      "bhakti",
      hashedPassword,
      "bhakti@chizzu.com",
      "Bhakti Ganteng",
      "ACT"
    ];

    await pool.query(insertQuery, values);
    console.log("✅ Super Admin inserted!");
  } catch (err) {
    console.error("❌ Error inserting user:", err);
  } finally {
    pool.end();
  }
}

seedUser();
