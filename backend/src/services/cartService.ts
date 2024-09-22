import { ICart, ICartItems, cartModel } from "../models/cartModel"
import { IOrderItem, orderModel } from "../models/orderModel";
import { productsModel } from "../models/productsModel";

interface CreateCartForUser {
    userId: string;
}

// Create One item in DataBase

const createActiveCartForUser = async ({ userId }: CreateCartForUser) => {
    const cart = await cartModel.create({ userId, totalAmount: 0 })
    await cart.save()
    return cart;
}

interface GetCartForUser {
    userId: string;
}

// get item from database

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

interface ClearCart {
    userId: string
}

// Clear all items from database

export const clearCart = async ({ userId }: ClearCart) => {
    const cart = await getActiveCartForUser({ userId });
    cart.items = [];
    cart.totalAmount = 0;
    const updateCart = await cart.save();
    return { data: updateCart, statusCode: 200 }
}

// Add item on database

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

    // if (product.stoke < quantity) {
    //     return { data: "Low Stoke for Item", statusCode: 400 }
    // }

    cart.items.push({ product: productId, unitPrice: product.price, quantity })
    cart.totalAmount += product.price * quantity;
    const updateCart = await cart.save();
    return { data: updateCart, statusCode: 201 }
}

interface UpdateItemsToCart {
    productId: any;
    userId: string;
    quantity: number;
}

// Update item on database

export const updateItemsToCart = async ({ productId, userId, quantity }: UpdateItemsToCart) => {
    const cart = await getActiveCartForUser({ userId });
    const existInCart = cart.items.find((e) => e.product.toString() === productId)
    if (!existInCart) {
        return { data: "Item does not already exists in cart!", statusCode: 400 }
    }
    const product = await productsModel.findById(productId);
    if (!product) {
        return { data: "Product not found!", statusCode: 400 }
    }
    // if (product.stoke < quantity) {
    //     return { data: "Low Stoke for Item", statusCode: 400 }
    // }
    existInCart.quantity = quantity;
    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId)
    let total = calculateCartTotalItems({ cartItems: otherCartItems });
    total += existInCart.quantity * existInCart.unitPrice;
    cart.totalAmount = total;
    const updateCart = await cart.save();
    return { data: updateCart, statusCode: 201 }
}

interface DeleteItemsToCart {
    productId: any;
    userId: string;
}

// delete one item on database

export const deleteItemsToCart = async ({ userId, productId }: DeleteItemsToCart) => {
    const cart = await getActiveCartForUser({ userId });
    const existInCart = cart.items.find((e) => e.product.toString() === productId)
    if (!existInCart) {
        return { data: "Item does not already exists in cart!", statusCode: 400 }
    }
    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId)
    let total = calculateCartTotalItems({ cartItems: otherCartItems });
    cart.items = otherCartItems;
    cart.totalAmount = total;
    const updateCart = await cart.save();
    return { data: updateCart, statusCode: 201 }
}

interface Checkout {
    userId: string;
    address: string;
}

export const checkout = async ({ userId, address }: Checkout) => {
    if (!address) {
        return { data: "Please add the Address", statusCode: 400 }
    }

    const cart = await getActiveCartForUser({ userId });
    const orderItems: IOrderItem[] = []
    for (const item of cart.items) {
        const product = await productsModel.findById(item.product);
        if (!product) {
            return { data: "Products not found", statusCode: 400 }
        }
        const orderItem: IOrderItem = {
            productTitle: product.title,
            productImage: product.image,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        }
        orderItems.push(orderItem)
    }

    const order = await orderModel.create({
        orderItems,
        total: cart.totalAmount,
        userId,
        address: address
    })

    await order.save();
    cart.status = "Complete"
    await cart.save()

    return { data: order, statusCode: 201 }
}

// Calculate 

const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItems[] }) => {
    const total = cartItems.reduce((sum, product) => {
        sum += product.quantity * product.unitPrice;
        return sum;
    }, 0);
    return total;
};