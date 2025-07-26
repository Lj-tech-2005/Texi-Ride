const BooknowModel = require("../models/booknowModels");
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
  },

  async deleteBooking(req, res) {
    try {
      const id = req.params.id;
      const deleted = await BooknowModel.findByIdAndDelete(id);

      if (!deleted) {
        return res.json({ flag: 0, msg: 'Booking not found' });
      }

      res.json({ flag: 1, msg: 'Booking deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ flag: 0, msg: 'Server error' });
    }
  },

  async updateStatus(req, res) {
    try {
      const id = req.params.id;
      const { status } = req.body;

      const updated = await booknowModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updated) {
        return res.json({ flag: 0, msg: 'Booking not found' });
      }

      res.json({ flag: 1, msg: `Booking ${status ? 'activated' : 'deactivated'} successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ flag: 0, msg: 'Server error' });
    }

  }
};

module.exports = booknowControllers;
