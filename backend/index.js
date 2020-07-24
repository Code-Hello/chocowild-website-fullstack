require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");

const connection = require("./config/db");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const userRouter = require("./routes/users/users.route");
const authRouter = require("./routes/auth/auth.route");
const productRouter = require("./routes/products/products.route");
const categoryRouter = require("./routes/category/category.routes");

app.use(passport.initialize());
app.use(
    cors({
        origin: process.env.FRONT_URL,
    })
);

app.get("/", (req, res) => res.status(200).send("Hello"));
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", categoryRouter);

app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.listen(process.env.PORT, (err) => {
    if (err) {
        throw new Error("Something bad happened...");
    }

    console.log(`Server is listening on ${process.env.PORT}`);
});