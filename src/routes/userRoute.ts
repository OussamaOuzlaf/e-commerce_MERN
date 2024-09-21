import express from "express";
import { logIn, register } from "../services/userServices";

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, pass } = req.body;
        const { statusCode, data } = await register({ firstName, lastName, email, pass })
        res.status(statusCode).send(data)
    } catch {
        res.status(500).send("Something wont wrong!")
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body;
        const { statusCode, data } = await logIn({ email, pass })
        res.status(statusCode).send(data)
    } catch {
        res.status(500).send("Something wont wrong!")
    }
})

export default router;