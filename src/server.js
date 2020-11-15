const express = require("express");
const db = require("../models/index");
const cors = require("cors");

const setupExpressServer = () => {
  /* return configured express app */
  const app = express();
  //クライアントから送信されたデータを、req.body経由で会得、操作するための呪文。。。らしい
  app.use(express.json());
  app.use(cors());

  //////////////////////////////////////////
  // ここから今回作るAPI
  //////////////////////////////////////////

  // game tableを全部拾ってjson形式で返す
  app.get("/api/game", function (req, res) {
    db.game
      .findAll({
        attributes: ["name", "year", "platform", "genre", "publisher", "sale"],
      })
      .then((data) => {
        res.set({ "Access-Control-Allow-Origin": "*" }).send(data).end();
      });
  });

  // 1game拾ってjson形式で返す
  app.get("/api/game/:name", function (req, res) {
    db.game
      .findOne({
        attributes: ["name", "year", "platform", "genre", "publisher", "sale"],
        where: {
          name: req.params.name,
        },
      })
      .then((data) => {
        if (data) {
          res.set({ "Access-Control-Allow-Origin": "*" }).send(data).end();
        } else {
          res.set({ "Access-Control-Allow-Origin": "*" }).status(404).end();
        }
      });
  });

  // game tableに行を追加
  app.post("/api/game", function (req, res) {
    db.game
      .create({
        name: req.body.name,
        year: req.body.year,
        platform: req.body.platform,
        genre: req.body.genre,
        publisher: req.body.publisher,
        sale: req.body.sale,
      })
      .then(() => {
        res
          .set({ "Access-Control-Allow-Origin": "*" })
          .status(201)
          .send(req.body)
          .end();
      });
  });

  // game tableの行と列を選択し、要素を変更する
  app.patch("/api/game/:name", function (req, res) {
    const columnName = req.body.column;
    const newVal = req.body.value;
    db.game
      .update(
        {
          [columnName]: newVal,
        },
        {
          where: {
            name: req.params.name,
          },
        }
      )
      .then(() => {
        res
          .set({ "Access-Control-Allow-Origin": "*" })
          .json({
            game: req.params.name,
            column: req.body.column,
            value: req.body.value,
          })
          .status(200)
          .end();
      });
  });

  // game tableから行を削除
  app.delete("/api/game/:name", function (req, res) {
    db.game
      .destroy({
        where: {
          name: req.params.name,
        },
      })
      .then(() => {
        res
          .set({ "Access-Control-Allow-Origin": "*" })
          .json({ game: req.params.name })
          .status(200)
          .end();
      });
  });

  // 特定の発売年のgameを拾ってjson形式で返す
  app.get("/api/game/year/:year", function (req, res) {
    db.game
      .findAll({
        attributes: ["name", "year", "platform", "genre", "publisher", "sale"],
        where: {
          year: Number(req.params.year),
        },
      })
      .then((data) => {
        if (data.length) {
          res.set({ "Access-Control-Allow-Origin": "*" }).send(data).end();
        } else {
          res.set({ "Access-Control-Allow-Origin": "*" }).status(404).end();
        }
      });
  });

  // 特定のplatformのgameを拾ってjson形式で返す
  app.get("/api/game/platform/:platform", function (req, res) {
    db.game
      .findAll({
        attributes: ["name", "year", "platform", "genre", "publisher", "sale"],
        where: {
          platform: req.params.platform,
        },
      })
      .then((data) => {
        if (data.length) {
          res.set({ "Access-Control-Allow-Origin": "*" }).send(data).end();
        } else {
          res.set({ "Access-Control-Allow-Origin": "*" }).status(404).end();
        }
      });
  });

  // 特定のgenreのgameを拾ってjson形式で返す
  app.get("/api/game/genre/:genre", function (req, res) {
    db.game
      .findAll({
        attributes: ["name", "year", "platform", "genre", "publisher", "sale"],
        where: {
          genre: req.params.genre,
        },
      })
      .then((data) => {
        if (data.length) {
          res.set({ "Access-Control-Allow-Origin": "*" }).send(data).end();
        } else {
          res.set({ "Access-Control-Allow-Origin": "*" }).status(404).end();
        }
      });
  });

  // 特定のpublisherのgameを拾ってjson形式で返す
  app.get("/api/game/publisher/:publisher", function (req, res) {
    db.game
      .findAll({
        attributes: ["name", "year", "platform", "genre", "publisher", "sale"],
        where: {
          publisher: req.params.publisher,
        },
      })
      .then((data) => {
        if (data.length) {
          res.set({ "Access-Control-Allow-Origin": "*" }).send(data).end();
        } else {
          res.set({ "Access-Control-Allow-Origin": "*" }).status(404).end();
        }
      });
  });

  // TOP[n]のgameを拾ってjson形式で返す
  app.get("/api/game/sale/list", function (req, res) {
    const where = new Object();
    if (req.query.year) {
      where["year"] = req.query.year;
    }
    if (req.query.platform) {
      where["platform"] = req.query.platform;
    }
    if (req.query.genre) {
      where["genre"] = req.query.genre;
    }
    if (req.query.publisher) {
      where["publisher"] = req.query.publisher;
    }
    db.game
      .findAll({
        attributes: ["name", "year", "platform", "genre", "publisher", "sale"],
        order: [["sale", "DESC"]],
        offset: 0,
        limit: req.query.limit,
        where: where,
      })
      .then((data) => {
        if (data.length) {
          res.set({ "Access-Control-Allow-Origin": "*" }).send(data).end();
        } else {
          res.set({ "Access-Control-Allow-Origin": "*" }).status(404).end();
        }
      });
  });

  return app;
};

module.exports = { setupExpressServer };
