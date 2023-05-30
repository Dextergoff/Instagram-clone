const express = require("express");
const cookie = require("cookie");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const router = express.Router();

router.post("/auth/users/authorizereset", async (req, res) => {
  const { uid } = req.body;
  const body = JSON.stringify({ uid });
  try {
    const apiRes = await fetch(
      "http://127.0.0.1:8000/auth/users/authorizereset",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      }
    );
    const data = await apiRes.json();

    if (apiRes.status === 200) {
      return res.status(apiRes.status).json(data);
    } else {
      return res.status(500).json({
        error: { error: "something went wrong when trying to refresh token" },
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: { error: "Couldnt resetpassword" },
    });
  }
});

module.exports = router;
