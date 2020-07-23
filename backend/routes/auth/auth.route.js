require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connection = require("../../config/db");

const secret = process.env.SECRET;
const hash = Number(process.env.HASH);
const { check, validationResult } = require("express-validator");

var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            session: false,
        },
        function(email, password, done) {
            connection.query("SELECT * FROM user WHERE email = ?", email, function(
                err,
                user
            ) {
                if (err) {
                    return done(err);
                }
                if (!user || !validatePassword(user, password)) {
                    return done(null, false, { errors: "Incorrect email ou password." });
                }
                return done(null, user);
            });
        }
    )
);

// MIDDLEWARES TO CHECK
const userValidationInscription = [
    check("firstname").isLength({ min: 2 }),
    check("lastname").isLength({ min: 2 }),
    check("email").isEmail(),
    check("password").isLength({ min: 8 }),
];

const userValidationModificationMdp = [
    check("email").isEmail(),
    check("password").isLength({ min: 8 }),
];

const validatePassword = (user, password) => {
    const hashedPassword = bcrypt.hashSync(password, hash);
    if (user.password === hashedPassword) {
        return true;
    }
    return false;
};

router.post(
    "/signin",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/signin",
        failureFlash: true,
        session: false,
    })
);

//ADD A USER
router.post("/signup", userValidationInscription, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let userData = req.body;
    userData.password = bcrypt.hashSync(userData.password, hash);

    connection.query("INSERT INTO user SET ?", userData, (err, results) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    error: "Email already exists",
                });
            }
            return res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        } else {
            connection.query(
                "SELECT * FROM user WHERE id = ?",
                results.insertId,
                (errBis, resultsBis) => {
                    if (errBis) {
                        res.status(500).json({
                            error: errBis.message,
                            sql: errBis.sql,
                        });
                    } else {
                        const insertedUser = resultsBis[0];
                        const host = req.get("host");
                        const location = `http://${host}${req.url}/${insertedUser.id}`;
                        return res.status(201).set("Location", location).json(insertedUser);
                    }
                }
            );
        }
    });
});

module.exports = router;