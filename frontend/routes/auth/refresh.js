const express = require("express");
const cookie = require("cookie");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.get("/auth/token/refresh", async (req, res) => {
  const { refresh } = req.cookies;

  const body = JSON.stringify({
    refresh: refresh,
  });
  try {
    const apiRes = await fetch("http://127.0.0.1:8000/auth/token/refresh/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await apiRes.json();
    if (apiRes.status === 200) {
      res.setHeader("Set-Cookie", [
        cookie.serialize("access", data.access, {
          httpOnly: true,
          maxAge: 60 * 30,
          path: "/auth/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        }),
      ]);
      return res.status(apiRes.status).json(data);
    } else {
      return res.status(500).json({
        error: {"error":"something went wrong when trying to refresh token"},
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: {"error":"something went wrong when trying to verify account"},
    });
  }
});

module.exports = router;
