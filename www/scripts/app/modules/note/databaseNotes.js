var arrayH = [];
var dataBase = {};

var failure = function () {
    alert("Error calling MyPlugin");
}
var errCallback = function () {
    alert("Error in DataBase!");
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
    dataBase.transaction(function (tx) {
        tx.executeSql("SELECT * FROM dbNotes", [], function (tx, result) {
            for (var i = 0; i < result.rows.length; i++) {
                arrayH.push(new Note(result.rows.item(i).ID, result.rows.item(i).title, result.rows.item(i).text, result.rows.item(i).set_date));
            }
            console.log("length arrayH " + arrayH.length);
            console.log(result.rows.length)
            loadNote(); // êîïèðóåò çíà÷åíèå èç âñïîìîãàòåëüíîãî ìàññèâà â ìàññèâ array
        }, errCallback);
    });
}

init = function () {
    openDB();
    selectWrite();
}

//region Methods for DataBase

    function selectTODO(){
        var res = [];
        dataBase.transaction(function (tx) {
            tx.executeSql("SELECT * FROM dbNotes", [], function(tx,result){
                result.rows.forEach(function(item){
                    res.push(new Note(item.ID, item.title, item.text, item.setDate));
                })
            });
        });
        return res;
    }

    function insertTODO(title, text, setDate){
        dataBase.transaction(function (tx) {
            tx.executeSql("INSERT INTO dbNotes (title, text, set_date, create_date) VALUES (?,?,?,?)", [title, text, setDate, new Date()]);
        });
    }

    function updateTODO(title, text, setDate, id) {
        dataBase.transaction(function (tx) {
            tx.executeSql("UPDATE dbNotes SET title = ?, text = ?, set_date = ? WHERE ID = ?", [title, text, setDate, id]);
        });
    }

    function deleteTODO(id) {
        dataBase.transaction(function (tx) {
            tx.executeSql("DELETE FROM dbNotes WHERE ID = ?", [id]);
        });
    }

    function deleteAllTODO() {
        dataBase.transaction(function (tx) {
            tx.executeSql("DELETE FROM dbNotes");
        });
    }
//endregion