//var arrayH = []; //new Note(1000, 0, 0, 0)
//var dataBase = {};

//var errCallback = function () {
//    alert("Error in DataBase!");
//}
//openDB = function () {

//    dataBase = openDatabase('dbNotes', '1.0', 'DataBase of Notes', 1024 * 1024 * 1);
//    if (!dataBase) { alert("Failed to connect to database."); }

//    dataBase.transaction(function (transaction) {
//        transaction.executeSql("CREATE TABLE IF NOT EXISTS dbNotes (ID INTEGER PRIMARY KEY ASC, title TEXT, text TEXT, set_date DATE, create_date DATE)", [], function () { }, errCallback)
//        console.log("create table ");
//    });
//};

//selectWrite = function () {
//    //t = SQLtransaction();
//    dataBase.transaction(function (tx) {
//        tx.executeSql("SELECT * FROM dbNotes", [], function (tx, result) {
//            for (var i = 0; i < result.rows.length; i++) {
//                arrayH.push(new Note(result.rows.item(i).ID, result.rows.item(i).title, result.rows.item(i).text, result.rows.item(i).set_date));
//            }
//            console.log("length arrayH " + arrayH.length);
//        }, errCallback);
//    });
//}

//window.onload = function () {
//    openDB();
//    selectWrite();
//    console.log("onload");
//}