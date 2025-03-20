"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const curreny_converter_route_1 = require("./routes/curreny-converter.route");
const app = (0, express_1.default)();
const port = 3000;
//middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
//routes
app.get('/', (req, res) => {
    res.send('Server started successfully! Welcome to the main page.');
});
app.use("/api/currency-converter", curreny_converter_route_1.currencyRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
