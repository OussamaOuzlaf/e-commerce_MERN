import { cartModel } from "../models/cartModel"

interface CreateCartForUser {
    userId: string;
}

const createActiveCartForUser = async ({ userId }: CreateCartForUser) => {
    const cart = await cartModel.create({ userId, totalAmount: 0 })
    await cart.save()
    return cart;
}

interface GetCartForUser {
    userId: string;
}

export const getActiveCartForUser = async ({ userId }: GetCartForUser) => {
    let cart = await cartModel.findOne({ userId, status: "Active" });
    if (!cart) {
        cart = await createActiveCartForUser({ userId })
    }
    return cart;
}