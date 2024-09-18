import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    firstName: string
    lastName: string
    email: string
    pass: string
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true},
    lastName: { type: String },
    email: { type: String },
    pass: { type: String },
})

export const userModel = mongoose.model<IUser>("User" ,userSchema)