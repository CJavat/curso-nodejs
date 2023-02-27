const nodemailer = require("nodemailer");
const emailConfig = require("../config/db");
const fs = require("fs");
const util = require("util");
const ejs = require("ejs");

let transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

exports.enviarEmail = async (opcinoes) => {};
