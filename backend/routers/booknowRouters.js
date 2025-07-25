

const express = require("express");
const booknowControllers = require("../controllers/booknowControllers");
const booknowRouters = express.Router();






booknowRouters.post("/", booknowControllers.create);
booknowRouters.get("/readall", booknowControllers.readAll);






module.exports = booknowRouters;
