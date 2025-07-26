
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require("cors");




const booknowRouters = require('./routers/booknowRouters');
const adminRouters = require('./routers/adminRouters');

const corsOptions = {
  origin: "http://localhost:3000", // Only allow this frontend
  credentials: true,              // Allow cookies/authorization headers
};
// Middlewares
server.use(cors(corsOptions));
server.use(express.json());
server.use("/booknow",booknowRouters)
server.use("/admin",adminRouters)


mongoose.connect(process.env.MONGODB_URL, { dbName: "texiride" }).then(

    () => {

        console.log("mongodb connect successfully")

        server.listen(

            8000,
            () => {

                console.log("server is running on http://localhost:8000")

            }

        )

    }
).catch(
    (err) => {
        console.log("mongodb connection error:", err)
    }

)