import express from "express";
import { logIn, register } from "../services/userServices";

const router = express.Router();

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, pass } = req.body;
    const { statusCode, data } = await register({ firstName, lastName, email, pass })
    res.status(statusCode).send(data)
})

router.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    const { statusCode, data } = await logIn({ email, pass })
    res.status(statusCode).send(data)
})

export default router;