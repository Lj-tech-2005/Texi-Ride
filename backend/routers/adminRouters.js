const express = require("express");
const adminRouters = express.Router();
const adminController = require("../controllers/adminControllers")



adminRouters.post("/login", adminController.login);
adminRouters.post("/register", adminController.register);
adminRouters.get("/logout", (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
});



module.exports = adminRouters;