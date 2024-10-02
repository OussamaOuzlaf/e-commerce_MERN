import express from "express";
import { getOrders, logIn, register } from "../services/userServices";
import { ExtendRequest } from "../Types/extendedRequest";
import validateJWT from "../middleWares/validateJWT";

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, pass } = req.body;
        const { statusCode, data } = await register({ firstName, lastName, email, pass })
        res.status(statusCode).json(data)
    } catch {
        res.status(500).send("Something wont wrong!")
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body;
        const { statusCode, data } = await logIn({ email, pass })
        res.status(statusCode).json(data)
    } catch {
        res.status(500).send("Something wont wrong!")
    }
})

router.get('/myOrder', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req?.user?._id;
        const { statusCode, data } = await getOrders({ userId })
        res.status(statusCode).send(data)
    } catch {
        res.status(500).send("Something wont wrong!")
    }
})

export default router;