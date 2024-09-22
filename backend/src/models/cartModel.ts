import mongoose, { Schema, ObjectId, Document } from 'mongoose';
import { IProducts } from './productsModel';

const cartStatusEnum = ["Active", "Complete"]

export interface ICartItems {
    product: IProducts;
    unitPrice: number;
    quantity: number;
}

export interface ICart extends Document {
    userId: ObjectId | string;
    items: ICartItems[];
    totalAmount: number;
    status: "Active" | "Complete"
}

const cartItemSchema = new Schema<ICartItems>({
    product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
    unitPrice: { type: Number, required: true, default: 1 },
    quantity: { type: Number, required: true }
})

const cartSchema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: cartStatusEnum, default: "Active" }
})

export const cartModel = mongoose.model<ICart>("Cart", cartSchema)