const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },

    phone: {
        type: String,
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    },

    address: {
        type: String,
        default: "",
    },

    role: {
        type: String,
        enum: ["user", "admin", "driver"],
        default: "user",
    },

    profileImage: {
        type: String, // Path to profile image
        default: "",
    },

    isBlocked: {
        type: Boolean,
        default: false,
    }

}, {
    timestamps: true
});

const UserModels = mongoose.model("User", userSchema);

module.exports = UserModels;