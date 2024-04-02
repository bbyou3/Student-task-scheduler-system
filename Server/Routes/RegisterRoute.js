// RegisterRoute.js
import express from 'express';
import con from "../utils/db.js";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    con.query(sql, [email, password], (err, result) => {
        if(err) {
            console.error("Error executing SQL query:", err);
            return res.json({ registerStatus: false, Error: "Failed to register user" });
        }
        // Generate JWT token for the registered user
        const token = jwt.sign(
            { role: "user", email: email },
            "jwt_secret_key",
            { expiresIn: "1d" }
        );
        res.cookie('token', token);
        res.json({ registerStatus: true });
    });
});

export { router as registerRouter };
