const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const loginRoute = require("./routes/auth/login");
const registerRoute = require("./routes/auth/register");
const userRoute = require("./routes/auth/user");
const logoutRoute = require("./routes/auth/logout");
const verifyRoute = require("./routes/auth/verify");
const refreshRoute = require("./routes/auth/refresh");
const forgot = require("./routes/auth/forgot");
const resetPassword = require("./routes/auth/resetpassword");
const authorizereset = require("./routes/auth/authorizereset");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(registerRoute);
app.use(loginRoute);
app.use(userRoute);
app.use(logoutRoute);
app.use(verifyRoute);
app.use(refreshRoute);
app.use(forgot);
app.use(resetPassword);
app.use(authorizereset);

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server lsitening on port ${PORT}`));
