
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require("cors");



const UserRouters = require("./routers/UserRouters")

// Middlewares
server.use(cors());
server.use(express.json());
server.use("/user", UserRouters)


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