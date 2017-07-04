// var arrayH = [];
// var dataBase = {};

// var failure = function () {
//     alert("Error calling MyPlugin");
// }
// var errCallback = function () {
//     alert("Error in DataBase!");
// }
// openDB = function () {

//     dataBase = window.openDatabase('dbNotes', '1.0', 'DataBase of Notes', 1024 * 1024 * 5);
//     if (!dataBase) { alert("Failed to connect to database."); }

//     dataBase.transaction(function (transaction) {
//         transaction.executeSql("CREATE TABLE IF NOT EXISTS dbNotes (ID INTEGER PRIMARY KEY ASC, title TEXT, text TEXT, set_date DATE, create_date DATE)", [], function () { }, errCallback)
//         console.log("create table ");
//     });
// };

// selectWrite = function () {
//     dataBase.transaction(function (tx) {
//         tx.executeSql("SELECT * FROM dbNotes", [], function (tx, result) {
//             for (var i = 0; i < result.rows.length; i++) {
//                 arrayH.push(new Note(result.rows.item(i).ID, result.rows.item(i).title, result.rows.item(i).text, result.rows.item(i).set_date));
//             }
//             loadNote();
//         }, errCallback);
//     });
// }

// init = function () {
//     openDB();
//     selectWrite();
// }

// angular.module("notesApp")
//         .controller("notesAddController", function ($scope) {

//             $scope.addNote = function (title, text, setDate) {
//                 if (title == null) {
//                     if (text.length >= 15)
//                         var p = text.substring(0, 15) + "...";
//                     else
//                         var p = text.substring(0, text.length);
//                     title = p;
//                 }
//                 dataBase.transaction(function (tx) {
//                     tx.executeSql("INSERT INTO dbNotes (title, text, set_date, create_date) VALUES (?,?,?,?)", [title, text, setDate, new Date()]);
//                 });

//                 var len = $scope.array.length;
//                 $scope.array.push(new Note(len + 1, title, text, setDate, new Date()));
//                 $scope.data.typeButton = 'headPage';
//                 $scope.addToHistory('headPage');
//             };
//         })
