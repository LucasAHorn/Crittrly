const express = require("express");
const crypto = require("crypto");
const router = express.Router();

console.log("user.js active");

// Utility function: SHA-256 password hashing
function sha256Hash(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// GET user by username and password (via URL query params)
router.get("/", async (req, res) => {
  const { username, password } = req.query;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password needed" });
  }

  const hashedPassword = sha256Hash(password);
  const db = req.app.locals.db;

  try {
    const [results] = await db.query(
      "SELECT * FROM user_info WHERE username = ? AND password_hash = ?",
      [username, hashedPassword]);

      if (results.length === 0) {
        return res.status(401).json({ error: "Username and password not found together" });
      }
      const user = results[0];
      delete user.password_hash;  // Don't return the password hash
      res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

// POST create user
router.post("/", async (req, res) => {
  const {
    username,
    email,
    birth_city,
    first_pet_name,
    address_line_1,
    address_line_2_optional,
    address_line_3,
    address_line_4,
    password,
  } = req.body;

  // Check for required fields
  if (
    !username || !email || !birth_city || !first_pet_name ||
    !address_line_1 || !address_line_3 || !address_line_4 || !password
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const password_hash = sha256Hash(password);
  const db = req.app.locals.db;

  const query = `
    INSERT INTO user_info (
      username, email, birth_city, first_pet_name,
      address_line_1, address_line_2_optional,
      address_line_3, address_line_4, password_hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    username,
    email,
    birth_city,
    first_pet_name,
    address_line_1,
    address_line_2_optional,
    address_line_3,
    address_line_4,
    password_hash,
  ];
  try {
    const [result] = await db.query(query, values);
    res.status(200).json({ message: "User created", user_id: result.insertId });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "User creation failed" });
  }
});

// PUT update user info
router.put("/", async (req, res) => {
  const {
    username,
    password,
    email,
    address_line_1,
    address_line_2_optional,
    address_line_3,
    address_line_4,
  } = req.body;

  if (
    !username || !password || !email ||
    !address_line_1 || !address_line_3 || !address_line_4
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const hashedPassword = sha256Hash(password);
  const db = req.app.locals.db;
    try {
      const [results] = await db.query(
      "SELECT * FROM user_info WHERE username = ? AND password_hash = ?",
      [username, hashedPassword]);

      if (results.length === 0)
        return res.status(401).json({ error: "Invalid username or password" });

      const query = `
        UPDATE user_info SET
          email = ?,
          address_line_1 = ?, address_line_2_optional = ?,
          address_line_3 = ?, address_line_4 = ?
        WHERE username = ? AND password_hash = ?
      `;
      const values = [
        email,
        address_line_1, address_line_2_optional,
        address_line_3, address_line_4,
        username, hashedPassword,
      ];

      await db.query(query, values);
      res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      console.error("Error in PUT /user:", err);
      res.status(500).json({error:"Server error and User update failed"});
    }
});

// DELETE user by username and password (via URL query params)
router.delete("/", async (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password needed" });
  }

  const hashedPassword = sha256Hash(password);
  const db = req.app.locals.db;
  try {
    await db.query(
      "SELECT * FROM user_info WHERE username = ? AND password_hash = ?",
      [username, hashedPassword]);

    await db.query(
        "DELETE FROM user_info WHERE username = ? AND password_hash = ?",
        [username, hashedPassword]);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
      return res.status(500).json({ error: "Server error" });
  }
});

// PUT password update via 2FA (pet name + city)
router.put("/password", async (req, res) => {
  const { username, birth_city, first_pet_name, new_password } = req.body;

  if (!username || !birth_city || !first_pet_name || !new_password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const db = req.app.locals.db;

  try{
    const [results] = await db.query(
    "SELECT * FROM user_info WHERE username = ? AND birth_city = ? AND first_pet_name = ?",
    [username, birth_city, first_pet_name]);
    
    if (results.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const newPasswordHash = sha256Hash(new_password);
    const query = "UPDATE user_info SET password_hash = ? WHERE username = ?";
    const values = [newPasswordHash, username];

    await db.query(query, values);
    
    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;