const bcrypt = require("bcryptjs");
const pool = require("./pool");

async function seedUser() {
  try {
    const hashedPassword = await bcrypt.hash("supersecret123", 10);

    const insertQuery = `
      INSERT INTO USERDAT (
        USERNAME, USERPWD, USEREMAIL, USERFULLNAME,
        USERROLE, USERSTATUS, CREATED_AT, UPDATED_AT
      ) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    const values = [
      "SUPER.CHIZZU",
      hashedPassword,
      "super@chizzu.com",
      "Super Chizzu",
      1,
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
