const express = require("express");
const Cheese = require("./cheese-model.js");

const server = express();

server.use(express.json());


server.get("/", (req, res) => {
    res.status(200).json({ api: "running" });
  });

  server.get("/cheese", (req, res) => {
    Cheese.getAll()
      .then(cheese => {
        res.status(200).json(cheese);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  server.get("/cheese/:id", async (req, res) => {
    res.json(await Cheese.getById(req.params.id))
  });
  
  server.post("/cheese", async (req, res) => {
    res
    .status(201)
    .json(await Cheese.insert(req.body))
  });

  server.delete("/cheese/:id", async (req, res) => {
      res.status(200).json(await Cheese.remove(req.params.id))
  })

  module.exports = server;
