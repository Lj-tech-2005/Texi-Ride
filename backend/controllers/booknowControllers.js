const booknowModel = require("../models/booknowModels");

const booknowControllers = {
  async create(req, res) {
    try {
      const {
        name,
        phoneNumber,
        pickupPoint,
        dropOffPoint,
        passengerCount,
        date,
        time,
        message,
      } = req.body;

      // Basic validation (optional but recommended)
      if (
        !name ||
        !phoneNumber ||
        !pickupPoint ||
        !dropOffPoint ||
        !passengerCount ||
        !date ||
        !time
      ) {
        return res.status(400).json({
          flag: 0,
          msg: "All required fields must be filled.",
        });
      }

      // Create booking
      const newBooking = await booknowModel.create({
        name,
        phoneNumber,
        pickupPoint,
        dropOffPoint,
        passengerCount,
        date,
        time,
        message,
      });

      return res.status(201).json({
        flag: 1,
        msg: "Booking created successfully.",
        booking: newBooking,
      });

    } catch (error) {
      console.error("Booking creation failed:", error);
      return res.status(500).json({
        flag: 0,
        msg: "Internal server error.",
      });
    }
  },


  async readAll(req, res) {
    try {
      const bookings = await booknowModel.find();

      return res.status(200).json({
        flag: 1,
        msg: "Bookings fetched successfully.",
        bookings,
      });
    } catch (error) {
      console.error("Fetching bookings failed:", error);
      return res.status(500).json({
        flag: 0,
        msg: "Internal server error.",
      });
    }
  }


};

module.exports = booknowControllers;
