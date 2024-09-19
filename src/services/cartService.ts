import { cartModel } from "../models/cartModel"
import { productsModel } from "../models/productsModel";

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

interface AddItemsToCart {
    productId: any;
    userId: string;
    quantity: number;
}

export const addItemsToCart = async ({ productId, userId, quantity }: AddItemsToCart) => {
    const cart = await getActiveCartForUser({ userId });
    const existInCart = cart.items.find((e) => e.product.toString() === productId)
    if (existInCart) {
        return { data: "Item already exists in cart!", statusCode: 400 }
    }
    const product = await productsModel.findById(productId);

    if (!product) {
        return { data: "Product not found!", statusCode: 400 }
    }

    if (product.stoke < quantity) {
        return { data: "Low Stoke for Item", statusCode: 400 }
    }

    cart.items.push({ product: productId, unitPrice: product.price, quantity })
    cart.totalAmount += product.price * quantity;
    const updateCart = await cart.save();
    return { data: updateCart, statusCode: 201 }
}