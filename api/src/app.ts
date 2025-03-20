import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import { currencyRoutes } from "./routes/curreny-converter.route";




const app = express();
const port = 3000;

//middleware
app.use(cors())
app.use(bodyParser.json())

//routes
app.get('/', (req, res) => {
    res.send('Server started successfully! Welcome to the main page.');
  });


app.use("/api/currency-converter", currencyRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
