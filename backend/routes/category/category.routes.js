const express = require("express");
const router = express.Router();
const connection = require("../../config/db");

//GET ALL CATEGORIES
router.get("/categories", (req, res) => {
    connection.query("SELECT * FROM category", (err, results) => {
        if (err) {
            res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        }
        res.status(200).json(results);
    });
});

//GET ONE CATEGORY
router.get("/categories/:id", (req, res) => {
    const idCategory = req.params.id;
    connection.query(
        "SELECT * FROM category WHERE id = ?",
        idCategory,
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

//ADD A CATEGORY
router.post("/categories", (req, res) => {
    connection.query("INSERT INTO category SET ?", req.body, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        } else {
            connection.query(
                "SELECT * FROM category WHERE id = ?",
                results.insertId,
                (errBis, resultsBis) => {
                    if (errBis) {
                        res.status(500).json({
                            error: errBis.message,
                            sql: errBis.sql,
                        });
                    } else {
                        const insertedCategory = resultsBis[0];
                        const host = req.get("host");
                        const location = `http://${host}${req.url}/${insertedCategory.id}`;
                        return res
                            .status(201)
                            .set("Location", location)
                            .json(insertedCategory);
                    }
                }
            );
        }
    });
});

//UPDATE A CATEGORY
router.put("/categories/:id", (req, res) => {
    const idCategory = req.params.id;
    const formData = req.body;

    connection.query(
        "UPDATE category SET ? WHERE id = ?", [formData, idCategory],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    error: err.message,
                    sql: err.sql,
                });
            } else {
                connection.query(
                    "SELECT * FROM category WHERE id = ?",
                    idCategory,
                    (errBis, resultsBis) => {
                        if (errBis) {
                            res.status(500).json({
                                error: errBis.message,
                                sql: errBis.sql,
                            });
                        } else {
                            const updatedCategory = resultsBis[0];
                            const host = req.get("host");
                            const location = `http://${host}${req.url}`;
                            return res
                                .status(200)
                                .set("Location", location)
                                .json(updatedCategory);
                        }
                    }
                );
            }
        }
    );
});

//DELETE A CATEGORY
router.delete("/categories/:id", (req, res) => {
    const idCategory = req.params.id;
    connection.query("DELETE FROM category WHERE id = ?", [idCategory], (err) => {
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