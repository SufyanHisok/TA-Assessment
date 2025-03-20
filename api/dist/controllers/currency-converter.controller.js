"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencies = exports.currencyConverter = void 0;
const axios_1 = __importDefault(require("axios"));
const API_KEY = "4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2";
const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
const CURRENCY_LIST_URL = "https://api.freecurrencyapi.com/v1/currencies";
const currencyConverter = async (req, res) => {
    try {
        const from = req.query.from;
        const to = req.query.to;
        const amount = parseFloat(req.query.amount);
        if (!from || !to || isNaN(amount)) {
            res.status(400).json({ message: "Missing required parameters" });
            return;
        }
        const response = await axios_1.default.get(`${BASE_URL}`, {
            params: { apikey: API_KEY, base_currency: from }
        });
        const rates = response.data.data;
        const conversionRate = rates[to];
        if (!conversionRate) {
            res.status(400).json({ message: "Invalid currency code" });
            return;
        }
        const convertedAmount = amount * conversionRate;
        const conversionResponse = {
            from,
            to,
            amount,
            convertedAmount,
            rate: conversionRate,
            timestamp: new Date(),
        };
        res.status(200).json(conversionResponse);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
exports.currencyConverter = currencyConverter;
const getCurrencies = async (req, res) => {
    try {
        const response = await axios_1.default.get(CURRENCY_LIST_URL, {
            params: { apikey: API_KEY }
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch currencies", error: error.message });
    }
};
exports.getCurrencies = getCurrencies;
