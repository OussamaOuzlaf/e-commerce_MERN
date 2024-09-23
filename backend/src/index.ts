import dotenv from 'dotenv';
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoute from './routes/userRoute';
import productsRoute from './routes/productsRoute';
import cartRoute from './routes/cartRoute';
import { seedInitialProducts } from './services/productsServices';
dotenv.config();
const app = express();
const port = 3001;
app.use(express.json())
app.use(cors())

mongoose.
    connect(process.env.DATABASE_URL || "").
    then(() => console.log("Mongo Connected")).
    catch((err) => console.log("Failed to Connected!!!!!!!", { err }))

seedInitialProducts();
app.use('/user', userRoute)
app.use('/product', productsRoute)
app.use('/cart', cartRoute)

app.listen(port, () => {
    console.log("Your server is Working!!");
})