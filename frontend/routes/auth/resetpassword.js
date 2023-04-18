const express = require("express");
const cookie = require("cookie");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const router = express.Router();

router.post("/auth/users/resetpassword", async (req, res) => {
    const { token } = req.cookies;
    const{newpassword} = req.body
    const body = JSON.stringify({ newpassword, token});
  try {
    const apiRes = await fetch("http://127.0.0.1:8000/auth/users/resetpassword", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    });
    const data = await apiRes.json();
    if (apiRes.status === 200) {
      res.setHeader("Set-Cookie", [
        cookie.serialize("token", data.token, {
          httpOnly: true,
          expires: new Date(0),
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        }),
      ]);
      return res.status(apiRes.status).json(data);
    }else{
        return res.status(500).json({
            error: data,
          });
    }
  } catch (err) {
    return res.status(500).json({
      error:{"error": "Couldnt resetpassword"},
    });
  }
});

module.exports = router;
