const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const router = require("./routes");

//连接 mongodb
const dbConnect = require("./db/connect");
const dbAddress = require("./db/conf").address;
dbConnect(dbAddress);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//注册路由
router(app);

module.exports = app;
