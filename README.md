このリポジトリは Code Chrysalis の生徒であるときに作成しました
（This was created during my time as a student at Code Chrysalis）

# Game List Generator API

This tool enables you to generate game list or game sale ranking.

# Description

this API will be used in localhost env.
This tool is based on following. - DB
postgreSQL 12.4 - code
code.js 1.51.1 - main packages
"express": "^4.15.4"
"pg": "^8.4.0"

# Usage(prepare)

1. install psql.
2. create database "videogames" on psql.
3. create config file(./config/config.json) for connection to DB.

(example)

```
    {
  "development": {
    "username": "{your username}",
    "password": "{your password}",
    "database": "videogames",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "{your username}",
    "password": "{your password}",
    "database": "videogames",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "{your username}",
    "password": "{your password}",
    "database": "videogames",
    "host": "localhost",
    "dialect": "postgres"
  }
}
```

4. import sequelize model to DB.

```
yarn sequelize db:migrate
```

5. import seeding file to DB.

```
yarn sequelize seed:generate --name test-game
yarn sequelize db:seed:all
```

# Usage(execute API)

before using, execute following command to start express server.

```
node ./src/index.js
```

- `GET /api/game`
  - return all games info
- `GET /api/game/:name`
  - return specific game info
- `POST /api/game`
  - add game info
  - request body is required.
    (example)

```
{
    "name": "testGame",
    "year": 2020,
    "platform": "PS5",
    "genre": "Racing",
    "publisher": "Valve",
    "sale": 10000000
      }
```

- `PATCH /api/game/:name`
  - modify game info
  - request body is required.
    "column" -> name,year,platfrom,genre,publisher,sale
    "value" -> {value after change}
    (example)

```
{
    "column": "platform",
    "value": "Wii"
}
```

- `DELETE /api/game/:name`

  - delete game.

- `GET /api/game/sale/list`
  - return sale ranking.
  - you can specify year, platform, genre, publisher in API queries.
    (example)

```
http://localhost:3000/api/game/sale/list?year=2009&platform=Wii
```
