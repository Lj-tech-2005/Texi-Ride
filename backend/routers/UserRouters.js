const express = require("express");
const UserRouters = express.Router();

const UserControllers = require("../controllers/UserControllers");





UserRouters.post("/register", UserControllers.register);




module.exports = UserRouters;