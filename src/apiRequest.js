const button = document.getElementById("click");
const gen = document.getElementById("gen");
var table = document.createElement("table");

// ボタンをクリックしたらイベント発動
button.addEventListener("click", () => {
  var name = document.getElementById("name").value;
  var num = document.getElementById("num").value;
  var year = document.getElementById("year").value;
  var platform = document.getElementById("platform").value;
  var genre = document.getElementById("genre").value;
  var publisher = document.getElementById("publisher").value;
  console.log("========input========");
  console.log(name);
  console.log(num);
  console.log(year);
  console.log(platform);
  console.log(genre);
  console.log(publisher);
  console.log("=====================");
  table.innerHTML = "";
  gen.innerText = "";
  var data = [
    {
      name: "NAME",
      year: "YEAR",
      platform: "PLATFORM",
      genre: "GENRE",
      publisher: "PUBLISHER",
      sale: "SALE",
    },
  ];

  if (name) {
    fetch(`http://localhost:3000/api/game/${name}`) // APIのURL
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        const tmpArr = [myJson];
        for (var game of tmpArr) {
          data.push(game);
        }

        // 表の動的作成
        makeTable(data, "table");
      })
      .catch((error) => {
        console.log("No result");
        gen.innerText = "No result";
      });
  } else {
    const query = new Object();
    if (num) {
      query.limit = num;
    }
    if (year) {
      query.year = year;
    }
    if (platform) {
      query.platform = platform;
    }
    if (genre) {
      query.genre = genre;
    }
    if (publisher) {
      query.publisher = publisher;
    }

    // const query ={
    // "limit" : num,
    // "year" : year,
    // "platform" : platform,
    // "genre" : genre,
    // "publisher" : publisher
    // }
    const query_params = new URLSearchParams(query);
    console.log(query_params);

    fetch(`http://localhost:3000/api/game/sale/list?` + query_params) // APIのURL
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        let tmpArr;
        if (Array.isArray(myJson)) {
          tmpArr = myJson;
        } else {
          tmpArr = [myJson];
        }
        console.log(tmpArr);

        for (var game of tmpArr) {
          data.push(game);
        }

        // 表の動的作成
        makeTable(data, "table");
      })
      .catch((error) => {
        console.log("No result");
        gen.innerText = "No result";
      });
  }
});

function makeTable(data, tableId) {
  // 表の作成開始
  var rows = [];

  // 表に2次元配列の要素を格納
  for (i = 0; i < data.length; i++) {
    rows.push(table.insertRow(-1)); // 行の追加
    for (j = 0; j < Object.keys(data[0]).length; j++) {
      cell = rows[i].insertCell(-1);
      cell.appendChild(document.createTextNode(Object.values(data[i])[j]));
      // 背景色の設定
      if (i == 0) {
        cell.style.backgroundColor = "#bbb"; // ヘッダ行
      } else {
        cell.style.backgroundColor = "#ddd"; // ヘッダ行以外
      }
    }
  }
  // 指定したdiv要素に表を加える
  document.getElementById(tableId).appendChild(table);
}
