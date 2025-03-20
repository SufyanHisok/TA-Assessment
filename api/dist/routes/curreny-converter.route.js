"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const currency_converter_controller_1 = require("../controllers/currency-converter.controller");
exports.currencyRoutes = express_1.default.Router();
exports.currencyRoutes.get("/convert-currency", currency_converter_controller_1.currencyConverter);
exports.currencyRoutes.get("/currencies", currency_converter_controller_1.getCurrencies);
