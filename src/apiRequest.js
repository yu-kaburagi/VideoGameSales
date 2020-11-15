const button = document.getElementById("click");
const resetButton = document.getElementById("resetClick");
const deleteButton = document.getElementById("deleteClick");
const addButton = document.getElementById("addClick");
const modifyButton = document.getElementById("modifyClick");
const gen = document.getElementById("gen");
var table = document.createElement("table");

// ボタンをクリックしたらイベント発動

// 表の表示をリセット
resetButton.addEventListener("click", () => {
  console.log("=====================");
  table.innerHTML = "";
  gen.innerText = "Output Reset";
});

// ゲームの追加
addButton.addEventListener("click", () => {
  var name = document.getElementById("aName").value;
  var year = document.getElementById("aYear").value;
  var platform = document.getElementById("aPlatform").value;
  var genre = document.getElementById("aGenre").value;
  var publisher = document.getElementById("aPublisher").value;
  var sale = document.getElementById("aSale").value;
  const newGameObj = new Object();
  newGameObj.name = name;
  newGameObj.year = Number(year);
  newGameObj.platform = platform;
  newGameObj.genre = genre;
  newGameObj.publisher = publisher;
  newGameObj.sale = Number(sale);
  const newGame = JSON.stringify(newGameObj);

  gen.innerText = "";
  table.innerHTML = "";
  if (name) {
    fetch(`http://localhost:3000/api/game`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: newGame,
    }) // APIのURL
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        gen.innerText = "GAME ADDED: " + name;
      })
      .catch((error) => {
        console.log("Failed ADD");
        gen.innerText = "Failed ADD";
      });
  } else {
  }
  gen.innerText = "Delete game " + name;
});

// ゲームの修正
modifyButton.addEventListener("click", () => {
  var name = document.getElementById("mName").value;
  var column = document.getElementById("mColumn").value;
  var value = document.getElementById("mValue").value;
  const modifyGameObj = new Object();
  modifyGameObj.column = column;
  modifyGameObj.value = value;
  const modifyGame = JSON.stringify(modifyGameObj);

  gen.innerText = "";
  table.innerHTML = "";
  if (name) {
    fetch(`http://localhost:3000/api/game/${name}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: modifyGame,
    }) // APIのURL
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        gen.innerText = "GAME MODIFYED: " + name;
      })
      .catch((error) => {
        console.log("Failed MODIFY");
        gen.innerText = "Failed MODIFY";
      });
  } else {
  }
  gen.innerText = "Delete game " + name;
});

// ゲームの削除
deleteButton.addEventListener("click", () => {
  var name = document.getElementById("dName").value;
  console.log("=====================");
  gen.innerText = "";
  table.innerHTML = "";
  if (name) {
    fetch(`http://localhost:3000/api/game/${name}`, { method: "delete" }) // APIのURL
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        gen.innerText = "GAME DELETED: " + name;
      })
      .catch((error) => {
        console.log(name + " doesnt exist");
        gen.innerText = name + " doesnt exist";
      });
  } else {
  }
  gen.innerText = "Delete game " + name;
});

button.addEventListener("click", () => {
  var name = document.getElementById("name").value;
  var num = document.getElementById("num").value;
  var year = document.getElementById("year").value;
  var platform = document.getElementById("platform").value;
  var genre = document.getElementById("genre").value;
  var publisher = document.getElementById("publisher").value;
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
