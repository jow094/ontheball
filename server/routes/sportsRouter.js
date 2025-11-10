import express from "express";
import { getSoccerFixtureListController, getLiveSoccerFixtureListController } from "../controllers/sportsController.js";

const router = express.Router();

export function getSoccerFixtureListRouter() {

  router.get("/soccer/list", async (req, res) => {
    const date = req.query.date;

    if (!date) return res.status(400).json({ success: false, error: "No date" });

    const data = await getSoccerFixtureListController(date);
    res.json(data);
  });

  return router;
}

export function getLiveSoccerFixtureListRouter() {

  router.get("/soccer/live", async (req, res) => {

    const data = await getLiveSoccerFixtureListController();
    res.json(data);
  });

  return router;
}