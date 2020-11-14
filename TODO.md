API テスト記載

- `GET /api/game` **DONE**
  - ゲームの完全なリストを返す。
- `GET /api/game/:name` **DONE**
  - 指定した name のゲームを返す。
- `POST /api/game` **DONE**
  - ゲームを追加する。
- `PATCH /api/game/:name/:column` **DONE**
  - 指定した game の指定した column の要素を変更する
- `DELETE /api/game/:name` **DONE**
  - 指定した game を削除する。
- `GET /api/game/year/:year` **DONE**
  - 指定した年に発売されたゲームのリストを返す。
- `GET /api/game/platform/:platform` **DONE**
  - 指定したプラットフォームのゲームのリストを返す。
- `GET /api/game/genre/:genre` **DONE**
  - 指定したジャンルのゲームのリストを返す。
- `GET /api/game/publisher/:publisher` **DONE**
  - 指定した会社のゲームのリストを返す。
- `GET /api/game/sale/list` **DONE**
  - query で limit,year,platform,genre,publisher を指定し、セールストップ(limit 数)のゲームリストを返す。
  <!-- - `GET /api/game/sale/list/year/:y`
  - query で limit=n を指定し、y 年のセールストップ n のゲームリストを返す。
- `GET /api/game/sale/list/platform/:p`
  - query で limit=n を指定し、プラットフォーム p のセールストップ n のゲームリストを返す。
- `GET /api/game/sale/list/genre/:g`
  - query で limit=n を指定し、g ジャンルのセールストップ n のゲームリストを返す。
- `GET /api/game/sale/list/publisher/:pub`
  - query で limit=n を指定し、会社 pub のセールストップ n のゲームリストを返す。 -->
