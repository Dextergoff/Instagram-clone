const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const router = express.Router();
router.post("/auth/users/register", async (req, res) => {
  const {  username, email, password } = req.body;

  const body = JSON.stringify({ username, email, password });

  try {
    const registerRes = await fetch(
      "http://127.0.0.1:8000/auth/users/register",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      }
    );
    const data = await registerRes.json();
    return res.status(registerRes.status).json(data);
    
  } catch (err) {
    return res.status(500).json({
      error: {"error":"Something went wrong while registering"},
    });
  }
});

module.exports = router;
