var arrayH = [];
var dataBase = {};

var failure = function () {
    console.log("Error calling MyPlugin");
}
var errCallback = function () {
    console.log("Error in DataBase!");
}

//Открывает существующую или создает новую
openDB = function () {
    dataBase = window.openDatabase('dbNotes', '1.0', 'DataBase of Notes', 1024 * 1024 * 5);
    if (!dataBase) { alert("Failed to connect to database."); }

    dataBase.transaction(function (transaction) {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS dbNotes (ID INTEGER PRIMARY KEY ASC, title TEXT, text TEXT, set_date DATE, create_date DATE)", [], function () { }, errCallback)
        console.log("create table ");
    });
};

//выбирает все записи из базы и записывает их в массив
selectWrite = function () {
    arrayH = [];
    dataBase.transaction(function (tx) {
        tx.executeSql("SELECT * FROM dbNotes", [], function (tx, result) {
            for (var i = 0; i < result.rows.length; i++) {
                arrayH.push(new Note(result.rows.item(i).ID, result.rows.item(i).title, result.rows.item(i).text, result.rows.item(i).set_date));
            }
            loadNote();
        }, errCallback);
    });
}

init = function () {
    openDB();
    selectWrite();
}

//region Methods for DataBase

    function insertTODO(title, text, setDate){
        dataBase.transaction(function (tx) {
            tx.executeSql("INSERT INTO dbNotes (title, text, set_date, create_date) VALUES (?,?,?,?)", [title, text, setDate, new Date()]);
        });
        selectWrite();
    }

    function updateTODO(title, text, setDate, id) {
        dataBase.transaction(function (tx) {
            tx.executeSql("UPDATE dbNotes SET title = ?, text = ?, set_date = ? WHERE ID = ?", [title, text, setDate, id]);
        });
        selectWrite();
    }

    function deleteTODO(id) {
        dataBase.transaction(function (tx) {
            tx.executeSql("DELETE FROM dbNotes WHERE ID = ?", [id]);
        });
        selectWrite();
    }

    function deleteAllTODO() {
        dataBase.transaction(function (tx) {
            tx.executeSql("DELETE FROM dbNotes");
        });
        selectWrite();
    }
//endregion