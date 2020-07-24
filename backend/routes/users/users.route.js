const express = require("express");
const router = express.Router();
const connection = require("../../config/db");

const { check, validationResult } = require("express-validator");

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

//GET ALL USERS
router.get("/users", (req, res) => {
    connection.query("SELECT * FROM user", (err, results) => {
        if (err) {
            res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        }
        res.status(200).json(results);
    });
});

//GET ONE USER
router.get("/users/:id", (req, res) => {
    const idUser = req.params.id;
    connection.query(
        "SELECT * FROM user WHERE id = ?",
        idUser,
        (err, results) => {
            if (err) {
                res.status(500).json({
                    error: err.message,
                    sql: err.sql,
                });
            }
            res.status(200).json(results);
        }
    );
});

//ADD A USER
router.post("/users", userValidationInscription, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    connection.query("INSERT INTO user SET ?", req.body, (err, results) => {
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

//UPDATE A USER
router.put("/users/:id", userValidationModificationMdp, (req, res) => {
    const idUser = req.params.id;
    const formData = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    connection.query(
        "UPDATE user SET ? WHERE id = ?", [formData, idUser],
        (err, results) => {
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
                    idUser,
                    (errBis, resultsBis) => {
                        if (errBis) {
                            res.status(500).json({
                                error: errBis.message,
                                sql: errBis.sql,
                            });
                        } else {
                            const updatedUser = resultsBis[0];
                            const host = req.get("host");
                            const location = `http://${host}${req.url}`;
                            return res
                                .status(200)
                                .set("Location", location)
                                .json(updatedUser);
                        }
                    }
                );
            }
        }
    );
});

//DELETE A USER
router.delete("/users/:id", (req, res) => {
    const idUser = req.params.id;
    connection.query("DELETE FROM user WHERE id = ?", [idUser], (err) => {
        if (err) {
            return res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;