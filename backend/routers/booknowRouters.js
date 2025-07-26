

const express = require("express");
const booknowControllers = require("../controllers/booknowControllers");
const booknowRouters = express.Router();






booknowRouters.post("/", booknowControllers.create);
booknowRouters.get("/readall", booknowControllers.readAll);
booknowRouters.delete("/delete/:id", booknowControllers.deleteBooking);
booknowRouters.patch("/status/:id", booknowControllers.updateStatus);






module.exports = booknowRouters;
