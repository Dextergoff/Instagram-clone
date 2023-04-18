const express = require("express");
const cookie = require("cookie");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const router = express.Router();
router.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;

  const body = JSON.stringify({ email, password });
  try {
    const apiRes = await fetch("http://127.0.0.1:8000/auth/token/", {
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
        cookie.serialize("access", data.access, {
          httpOnly: true,
          maxAge: 60 * 30,
          path: "/auth/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        }),
        cookie.serialize("refresh", data.refresh, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          path: "/auth/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        }),
      ]);
      return res.status(apiRes.status).json(data);
    }else{
      return  res.status(apiRes.status).json(data);
    }
  } catch (err){
    return res.status(500).json(500);
  }
});

module.exports = router;
