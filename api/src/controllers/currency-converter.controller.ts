import { Request, Response } from "express";
import axios from "axios";
import { CurrencyConversionResponse } from "../models/currency-converter.model";

const API_KEY = "4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2";
const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
const CURRENCY_LIST_URL = "https://api.freecurrencyapi.com/v1/currencies";

export const currencyConverter = async (req: Request, res: Response):  Promise<void> => {
    try {
        const from = req.query.from as string;
        const to = req.query.to as string;
        const amount = parseFloat(req.query.amount as string);

        if (!from || !to || isNaN(amount)) {
            res.status(400).json({ message: "Missing required parameters" });
            return
        }

        const response = await axios.get(`${BASE_URL}`, {
            params: { apikey: API_KEY, base_currency: from }
        });

        const rates = response.data.data;
        const conversionRate = rates[to as string];

        if (!conversionRate) {
            res.status(400).json({ message: "Invalid currency code" });
            return;
        }

        const convertedAmount = amount * conversionRate;

        const conversionResponse: CurrencyConversionResponse = {
            from,
            to,
            amount,
            convertedAmount,
            rate: conversionRate,
            timestamp: new Date(),
        };

        res.status(200).json(conversionResponse);

    } catch (error:any) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getCurrencies = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get(CURRENCY_LIST_URL, {
            params: { apikey: API_KEY }
        });

        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(500).json({ message: "Failed to fetch currencies", error: error.message });
    }
};
