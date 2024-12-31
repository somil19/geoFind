import express from "express";
import { reverseGeocode } from "../controllers/geoController.js";
const geoRouter = express.Router();

geoRouter.post("/reverse-geocode", reverseGeocode);

export default geoRouter;
