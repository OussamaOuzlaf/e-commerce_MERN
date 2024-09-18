import express from 'express'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute';
import productsRoute from './routes/productsRoute';
import { seedInitialProducts } from './services/productsServices';

const app = express();
const port = 3001;
app.use(express.json())

mongoose.
    connect("mongodb://localhost:27017/ecommercelearn").
    then(() => console.log("Mongo Connected")).
    catch((err) => console.log("Failed to Connected!!!!!!!", { err }))

seedInitialProducts();
app.use('/user', userRoute)
app.use('/product', productsRoute)

app.listen(port, () => {
    console.log("Your server is Working!!");
})