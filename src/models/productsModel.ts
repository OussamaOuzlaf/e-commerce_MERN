import mongoose, { Schema, Document } from "mongoose";

export interface IProducts extends Document {
    title: string
    image: string
    price: number
    stoke: number
}

const productsSchema = new Schema<IProducts>({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stoke: { type: Number, required: true, default: 0 },
})

export const productsModel = mongoose.model<IProducts>("Products" ,productsSchema)