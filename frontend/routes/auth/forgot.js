const express = require("express");
const cookie = require("cookie");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const router = express.Router();
router.post("/auth/users/forgot", async (req, res) => {
  const { email } = req.body;

  const body = JSON.stringify({ email });
  try {
    const apiRes = await fetch("http://127.0.0.1:8000/auth/users/forgot", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await apiRes.json();

    if (apiRes.status === 200) {
      res.setHeader("Set-Cookie", [
        cookie.serialize("token", data.token, {
          httpOnly: true,
          maxAge: 60 * 30,
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        }),
      ]);
      return res.status(apiRes.status).json(data);
    } else {
      return res.status(500).json({
        error: data,
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: { error: "account with this email does not exist" },
    });
  }
});

module.exports = router;
