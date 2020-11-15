const { setupExpressServer } = require("../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const gameData = require("../src/data");

// Another reason we separated creating our server from starting it
const app = setupExpressServer();

describe("The express server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(app).keepOpen();
  });

  describe("get games info", () => {
    describe("GET /api/game - get all games", () => {
      it("respose should be All game list", async () => {
        //Setup

        //Exercise
        const res = await request.get("/api/game");
        //Assert
        res.should.have.status(200);
        res.should.be.json;
        JSON.parse(res.text).length.should.be.equal(58);
      });
    });

    describe("/api/game/:name - get one game", () => {
      it("respose should be one game info", async () => {
        //Setup
        const data = gameData.game[0];
        //Exercise
        const res = await request.get("/api/game/Wii Sports");
        //Assert
        res.should.have.status(200);
        res.should.be.json;
        JSON.parse(res.text).should.deep.equal(data);
      });
    });

    describe("POST /api/game - add game", () => {
      it("respose should be added game info", async () => {
        //Setup
        const data = {
          name: "DeadSpace",
          year: 2009,
          platform: "PS3",
          genre: "Horror",
          publisher: "EA",
          sale: 60000000,
        };
        //Exercise
        const res = await request.post("/api/game").send({
          name: "DeadSpace",
          year: 2009,
          platform: "PS3",
          genre: "Horror",
          publisher: "EA",
          sale: 60000000,
        });

        //Assert
        res.should.have.status(201);
        res.should.be.json;
        JSON.parse(res.text).should.deep.equal(data);
      });
    });

    describe("PATCH /api/game/:name/ - modify game info", () => {
      it("respose should be added game info", async () => {
        //Setup
        const data = {
          name: "DeadSpace",
          year: 2009,
          platform: "PS3",
          genre: "Horror",
          publisher: "EA",
          sale: 75000000,
        };
        //Exercise
        const newVal = 75000000;
        const res = await request.patch("/api/game/DeadSpace").send({
          column: "genre",
          value: newVal,
        });

        //Assert
        const res2 = await request.get("/api/game/DeadSpace");
        res.should.have.status(200);
        res.should.be.json;
        JSON.parse(res2.text).should.deep.equal(data);
      });
    });

    describe("DELETE /api/game/:name - delete game info", () => {
      it("respose should be delete game info", async () => {
        //Setup

        //Exercise
        const res = await request.delete("/api/game/DeadSpace");

        //Assert
        const res2 = await request.get("/api/game/DeadSpace");
        res.should.have.status(200);
        res2.should.have.status(404);
      });
    });

    describe("GET /api/game/year/:year", () => {
      it("respose should be game list", async () => {
        //Setup

        //Exercise
        const res = await request.get("/api/game/year/2006");

        //Assert
        res.should.have.status(200);
        res.should.be.json;
        JSON.parse(res.text).length.should.be.equal(4);
      });
    });

    describe("GET /api/game/platform/:platform", () => {
      it("respose should be game list", async () => {
        //Setup

        //Exercise
        const res = await request.get("/api/game/platform/NES");

        //Assert
        res.should.have.status(200);
        res.should.be.json;
        JSON.parse(res.text).length.should.be.equal(3);
      });
    });

    describe("GET /api/game/genre/:genre", () => {
      it("respose should be game list", async () => {
        //Setup

        //Exercise
        const res = await request.get("/api/game/genre/Sports");

        //Assert
        res.should.have.status(200);
        res.should.be.json;
        JSON.parse(res.text).length.should.be.equal(4);
      });
    });

    describe("GET /api/game/publisher/:publisher", () => {
      it("respose should be game list", async () => {
        //Setup

        //Exercise
        const res = await request.get("/api/game/publisher/Nintendo");

        //Assert
        res.should.have.status(200);
        res.should.be.json;
        JSON.parse(res.text).length.should.be.equal(35);
      });
    });

    describe("GET /api/game/sale/list", () => {
      it("respose should be top 5 games in all games", async () => {
        //Setup

        //Exercise
        const res = await request
          .get("/api/game/sale/list")
          .query({ limit: 5 });

        //Assert
        res.should.have.status(200);
        res.should.be.json;
        JSON.parse(res.text).length.should.be.equal(5);
      });
      it("should return all games in 2009 games", async () => {
        //Setup

        //Exercise
        const res = await request
          .get("/api/game/sale/list")
          .query({ year: 2008 });

        //Assert
        res.should.have.status(200);
        res.should.be.json;
        JSON.parse(res.text).length.should.be.equal(4);
      });
      it("should return all games in Wii games", async () => {
        //Setup

        //Exercise
        const res = await request
          .get("/api/game/sale/list")
          .query({ platform: "Wii" });

        //Assert
        res.should.have.status(200);
        res.should.be.json;
        JSON.parse(res.text).length.should.be.equal(9);
      });
      it("should return all games in 2009 Wii games", async () => {
        //Setup

        //Exercise
        const res = await request
          .get("/api/game/sale/list")
          .query({ year: 2009, platform: "Wii" });

        //Assert
        res.should.have.status(200);
        res.should.be.json;
        JSON.parse(res.text).length.should.be.equal(3);
      });
      it("should return top game in 2009 Wii games", async () => {
        //Setup

        //Exercise
        const res = await request
          .get("/api/game/sale/list")
          .query({ limit: 1, year: 2009, platform: "Wii" });

        //Assert
        res.should.have.status(200);
        res.should.be.json;
        JSON.parse(res.text).length.should.be.equal(1);
      });
    });
  });
});
