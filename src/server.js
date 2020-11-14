const express = require("express");
const db = require("../models/index");

const setupExpressServer = () => {
  /* return configured express app */
  const app = express();
  //クライアントから送信されたデータを、req.body経由で会得、操作するための呪文。。。らしい
  app.use(express.json());

  //////////////////////////////////////////
  // ここから今回作るAPI
  //////////////////////////////////////////

  // game tableに行を追加
  app.post("/game", function (req, res) {
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
          .send(`game Data Created. game name is ${req.body.name}.`)
          .status(201)
          .end();
      });
  });

  // game tableから行を削除
  app.delete("/game/:name", function (req, res) {
    db.game
      .destroy({
        where: {
          name: req.params.name,
        },
      })
      .then(() => {
        res
          .send(`game Data Deleted. game name is ${req.params.name}.`)
          .status(200)
          .end();
      });
  });

  // game tableを全部拾ってjson形式で返す
  app.get("/game", function (req, res) {
    db.game.findAll({}).then((data) => {
      res.send(data);
    });
  });

  // game tableの1行を選択し、nameを変更する
  app.patch("/platform/:name", function (req, res) {
    db.game
      .update(
        {
          name: req.body.name,
        },
        {
          where: {
            name: req.params.name,
          },
        }
      )
      .then(() => {
        res
          .send(
            `game Data Changed. game name ${req.params.name} is modifyed to ${req.body.name}.`
          )
          .status(200)
          .end();
      });
  });

  //////////////////////////////////////////
  // ここからは参考API
  //////////////////////////////////////////
  app.get("/teapot", (req, res) => {
    res.status(418).end();
  });

  app.get("/hellojson", (req, res) => {
    res.send({ hello: "world" });
  });

  app.get("/greet", (req, res) => {
    res.send(`Hello ${req.query.name}!`);
  });

  // getリクエストのパラメータを拾うには:を使う
  app.get("/:a/plus/:b", (req, res) => {
    res.send({ result: Number(req.params.a) + Number(req.params.b) });
  });

  // Insomniaでpostリクエストボディを拾うにはURI下のフォームを使う(JSONに限らない)
  // {
  //   "sample": 3
  // }
  app.post("/echo", (req, res) => {
    res.json(req.body);
  });

  //useはhttpメソッドに関係なく呼び出される
  //nextを書いておくと下のappメソッドにも続く
  //expressメソッドは上から評価されるのでuseメソッドは基本上に書く。
  app.use("/secret", (req, res, next) => {
    if (Number(req.query.token) % 2 === 0) {
      return next();
    }
    res.status(401).end();
  });

  //InsomniaでQueryタブでクエリを編集できる
  app.get("/secret", (req, res) => {
    res.send({ token: req.query.token });
  });

  app.use("/secret/message", (req, res, next) => {
    if (Number(req.query.token) % 2 === 0) {
      return next();
    }
    res.status(401).end();
  });

  app.post("/secret/message", (req, res) => {
    const expectedBody = {
      key: 42,
      shout: "marco",
    };
    const exJson = JSON.stringify(expectedBody);
    const reqJson = JSON.stringify(req.body);
    if (exJson === reqJson) {
      res.send("polo");
    } else {
      res.status(403).end();
    }
  });
  //////////////////////////////////////////
  // ここまで参考API
  //////////////////////////////////////////

  return app;
};

module.exports = { setupExpressServer };
