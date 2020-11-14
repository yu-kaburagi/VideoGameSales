const Sequelize = require("sequelize");
const assert = require("assert");
const db = require("../app/db/dbConfig");

describe("postgresqlに接続するテスト", () => {
  let sequelize;

  after(() => {
    sequelize.close();
  });

  it("とりあえず接続", (done) => {
    const Project = sequelize.define("project", {
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
    });
    Project.sync()
      .then(() => {
        assert.ok(true);
        done();
      })
      .catch(done);
  });
});
