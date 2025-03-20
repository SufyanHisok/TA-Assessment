import express from "express";
import { currencyConverter, getCurrencies } from "../controllers/currency-converter.controller";

export const currencyRoutes = express.Router();

currencyRoutes.get("/convert-currency", currencyConverter);
currencyRoutes.get("/currencies", getCurrencies);