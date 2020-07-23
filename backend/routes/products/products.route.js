const express = require("express");
const router = express.Router();
const connection = require("../../config/db");

//GET ALL PRODUCTS
router.get("/products", (req, res) => {
    connection.query("SELECT * FROM product", (err, results) => {
        if (err) {
            res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        }
        res.status(200).json(results);
    });
});

//GET ONE PRODUCT
router.get("/products/:id", (req, res) => {
    const idProduct = req.params.id;
    connection.query(
        "SELECT * FROM product WHERE id = ?",
        idProduct,
        (err, results) => {
            if (err) {
                res.status(500).json({
                    error: err.message,
                    sql: err.sql,
                });
            } else if (results.length === 0) {
                res.status(404).send("Product not found");
            }
            res.status(200).json(results);
        }
    );
});

//GET ALL PRODUCTS WITH CATEGORY
router.get("/products-with-category", (req, res) => {
    connection.query(
        "SELECT * FROM product JOIN category ON category.id=product.id_category",
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

//ADD A PRODUCT
router.post("/products", (req, res) => {
    connection.query("INSERT INTO product SET ?", req.body, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        } else {
            connection.query(
                "SELECT * FROM product WHERE id = ?",
                results.insertId,
                (errBis, resultsBis) => {
                    if (errBis) {
                        res.status(500).json({
                            error: errBis.message,
                            sql: errBis.sql,
                        });
                    } else {
                        const insertedProduct = resultsBis[0];
                        const host = req.get("host");
                        const location = `http://${host}${req.url}/${insertedProduct.id}`;
                        return res
                            .status(201)
                            .set("Location", location)
                            .json(insertedProduct);
                    }
                }
            );
        }
    });
});

//UPDATE A PRODUCT
router.put("/products/:id", (req, res) => {
    const idProduct = req.params.id;
    const formData = req.body;

    connection.query(
        "UPDATE product SET ? WHERE id = ?", [formData, idProduct],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    error: err.message,
                    sql: err.sql,
                });
            } else {
                connection.query(
                    "SELECT * FROM product WHERE id = ?",
                    idProduct,
                    (errBis, resultsBis) => {
                        if (errBis) {
                            res.status(500).json({
                                error: errBis.message,
                                sql: errBis.sql,
                            });
                        } else {
                            const updatedProduct = resultsBis[0];
                            const host = req.get("host");
                            const location = `http://${host}${req.url}`;
                            return res
                                .status(200)
                                .set("Location", location)
                                .json(updatedProduct);
                        }
                    }
                );
            }
        }
    );
});

//DELETE A PRODUCT
router.delete("/products/:id", (req, res) => {
    const idProduct = req.params.id;
    connection.query("DELETE FROM product WHERE id = ?", [idProduct], (err) => {
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