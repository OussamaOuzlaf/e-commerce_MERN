import express from 'express'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute';

const app = express();
const port = 3001;
app.use(express.json())
mongoose.
    connect("mongodb://localhost:27017/ecommercelearn").
    then(() => console.log("Mongo Connected")).
    catch((err) => console.log("Failed to Connected!!!!!!!", {err}))

app.use('/user', userRoute)

app.listen(port, () => {
    console.log("Your server is Working!!");
})