import express from 'express';
import {
    addItemsToCart, checkout, clearCart, deleteItemsToCart,
    getActiveCartForUser, updateItemsToCart
} from '../services/cartService';
import { ExtendRequest } from '../Types/extendedRequest';
import validateJWT from '../middleWares/validateJWT';

const router = express.Router();

router.get('/', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req?.user?._id;
        const cart = await getActiveCartForUser({ userId, populateProducts: true })
        res.status(200).send(cart)
    } catch {
        res.status(500).send("Something wont wrong!")
    }
})

router.post('/items', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req?.user?._id;
        const { productId, quantity } = req.body;
        const response = await addItemsToCart({ userId, productId, quantity })
        res.status(response.statusCode).send(response.data);
    } catch {
        res.status(500).send("Something wont wrong!")
    }

})

router.put('/items', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req?.user?._id;
        const { productId, quantity } = req.body;
        const response = await updateItemsToCart({ userId, productId, quantity })
        res.status(response.statusCode).send(response.data);
    } catch {
        res.status(500).send("Something wont wrong!")
    }

})

router.delete('/items/:productId', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req?.user?._id;
        const { productId } = req.params;
        const response = await deleteItemsToCart({ userId, productId })
        res.status(response.statusCode).send(response.data);
    } catch {
        res.status(500).send("Something wont wrong!")
    }
})

router.delete('/', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req?.user?._id;
        const response = await clearCart({ userId })
        res.status(response.statusCode).send(response.data);
    } catch {
        res.status(500).send("Something wont wrong!")
    }

})

router.post('/checkout', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req?.user?._id;
        const { address } = req.body;
        const response = await checkout({ userId, address })
        res.status(response.statusCode).send(response.data);
    } catch {
        res.status(500).send("Something wont wrong!")
    }
})

export default router;