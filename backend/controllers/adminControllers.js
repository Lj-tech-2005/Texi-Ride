const adminModel = require('../models/adminModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminController = {

  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      // Check if admin already exists
      const existingAdmin = await adminModel.findOne({ email });
      if (existingAdmin) {
        return res.send({ msg: "Admin already exists", flag: 0 });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save admin
      const newAdmin = new adminModel({ name, email, password: hashedPassword });
      await newAdmin.save();

      res.send({ msg: "Admin registered successfully", flag: 1 });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).send({ msg: "Internal Server Error", flag: 0 });
    }
  },

  // ✅ Login Admin
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const admin = await adminModel.findOne({ email });
      if (!admin) {
        return res.send({ msg: "Admin does not exist", flag: 0 });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.send({ msg: "Incorrect password", flag: 0 });
      }

      const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, { expiresIn: "24h" });

      return res.send({
        msg: "Login successful",
        flag: 1,
        admin: {
          _id: admin._id,
          email: admin.email,
          name: admin.name,
        },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).send({ msg: "Internal Server Error", flag: 0 });
    }
  },
};

module.exports = adminController;
