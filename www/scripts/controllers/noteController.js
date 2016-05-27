var arrayH = [];
<<<<<<< HEAD
var dataBase = {};

var failure = function () {
    alert("Error calling MyPlugin");
}
var errCallback = function () {
    alert("Error in DataBase!");
}
openDB = function () {

    dataBase = window.openDatabase('dbNotes', '1.0', 'DataBase of Notes', 1024 * 1024 * 5);
    if (!dataBase) { alert("Failed to connect to database."); }

    dataBase.transaction(function (transaction) {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS dbNotes (ID INTEGER PRIMARY KEY ASC, title TEXT, text TEXT, set_date DATE, create_date DATE)", [], function () { }, errCallback)
        console.log("create table ");
    });
};

selectWrite = function () {
    dataBase.transaction(function (tx) {
        tx.executeSql("SELECT * FROM dbNotes", [], function (tx, result) {
            for (var i = 0; i < result.rows.length; i++) {
                arrayH.push(new Note(result.rows.item(i).ID, result.rows.item(i).title, result.rows.item(i).text, result.rows.item(i).set_date));
            }
            console.log("length arrayH " + arrayH.length);
            console.log(result.rows.length)
            loadNote(); // копирует значение из вспомогательного массива в массив array
        }, errCallback);
    });
}

init = function () {
    openDB();
    selectWrite();
    console.log("onload");
}

//window.onload = function () {
//    init();
//};
var notesApp = angular.module("notesApp", []);

notesApp.controller("notesAddController", function ($scope) {

    $scope.addNote = function (title, text, setDate) {
        if (title == null) {
            if (text.length >= 15)
                var p = text.substring(0, 15) + "...";
            else
                var p = text.substring(0, text.length);
            title = p;
        }
        dataBase.transaction(function (tx) {
            tx.executeSql("INSERT INTO dbNotes (title, text, set_date, create_date) VALUES (?,?,?,?)", [title, text, setDate, new Date()]);
        });

        var len = $scope.array.length;
        $scope.array.push(new Note(len + 1, title, text, setDate, new Date()));
        $scope.data.typeButton = 'headPage';
        $scope.addToHistory('headPage');
    };
});

notesApp.controller("notesController", function ($scope) {
    $scope.array = [];
    $scope.sortParamArray = 'setDate';
    //настойка динамического представления страниц
    $scope.data = {};

    $scope.setFile = function () {
        if ($scope.data.typeButton == 'Create')
            return 'createPage.html';
        else if ($scope.data.typeButton == 'Update')
            return 'updatePage.html';
        else if ($scope.data.typeButton == 'Delete')
            return 'checkNotes.html';
        else if ($scope.data.typeButton == 'Reminder')
            return 'reminderPage.html';
        else if ($scope.data.typeButton == 'headPage') {
            return 'headPage.html';
        }
        else
            return 'headPage.html';
    };

    
     
    $scope.setNotify = function (_id, _title, _text, _time) {
        //if (window.plugins.device.platform != 'Android')
        //    exit;
        console.log("time = " + _time);
        var now = new Date();
        if (now.valueOf() > _time.valueOf())
            window.plugins.toast.showLongBottom("Into the Future :)");

        else {
            console.log("now = " + now);
            console.log("value _time = " + _time.valueOf() + " today value = " + now.valueOf());
            if (_time !== undefined || _time.getTime() !== undefined || _time.valueOf() > now.valueOf()) {
                cordova.plugins.notification.local.schedule({
                    id: _id,
                    title: _title,
                    text: _text,
                    at: _time,
                    led: "FF0000"
                });
                $scope.updateNote(_id, _title, _text, _time);
                window.plugins.toast.showLongBottom("Напоминание установлено");
            }
        }
        
    }

    onBackButtonDown = function () {
        $scope.$apply(function () {
            if ($scope.data.typeButton == 'headPage')
            {
                navigator.notification.confirm(
                    'Press back again to exit'
                  , function (button) {
                      if (button == 2 || button == 0) {
                          navigator.app.exitApp();
                      }
                  }
                  , 'Exit App?'
                  , ['No way', 'Exit']);
                return false;
            }
            else
                $scope.data.typeButton = $scope.popHistory();
        })
    };

    $scope.onBackKeyDown = function () {
        $scope.data.typeButton = $scope.popHistory();
    };

    loadNote = function () {
        $scope.$apply(function () {
            $scope.array = arrayH.slice(0);
            console.log("Watch");
            $scope.data.typeButton = 'headPage';
        });
    };

    $scope.arrayDeleted = [];

    $scope.arrayHisty = ['headPage'];

    convertDate = function (date, delim) {
        if (date === null || date === undefined || isNaN(date))
            return "";
        else {
            var res = (date.getHours() < 10 ? '0' +date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ', ' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + delim + (date.getUTCMonth() + 1 < 10 ? '0' + (date.getUTCMonth() + 1).toString() : (date.getUTCMonth()+1).toString()) + delim + date.getFullYear();
            return res;

        }
    }
    
    $scope.viewDate = function (date) {
        return convertDate(date, '.');
    }

    $scope.current_date = $scope.viewDate(new Date());

    //вспомогательная переменная для поиска заметки в массиве перед ее обновлением
    var current_note;

    $scope.updatePage = function (id, title, text, setDate) {
        current_note = getNoteID(id);
        $scope.data.typeButton = 'Update';
        $scope.addToHistory('Update');
        $scope.MYID = id;
        $scope.MYnote_title = title;
        $scope.MYnote_text = text;
        $scope.MYnote_set_date = setDate;
    }

    $scope.reminderPage = function (id, title, text, setDate) {
        current_note = getNoteID(id);
        $scope.data.typeButton = 'Reminder';
        $scope.addToHistory('Reminder');
        $scope.MYID = id;
        $scope.MYnote_title = title;
        $scope.MYnote_text = text;
        $scope.MYnote_set_date = setDate;
    }

    $scope.updateNote = function (id, title, text, setDate) {
        var index = $scope.array.indexOf(current_note);
        if (title == null) {
            if (text.length >= 15)
                var p = text.substring(0, 15) + "...";
            else
                var p = text.substring(0, text.length);
            title = p;
        }
        dataBase.transaction(function (tx) {
            tx.executeSql("UPDATE dbNotes SET title = ?, text = ?, set_date = ? WHERE ID = ?", [title, text, setDate, id]);
        });
        $scope.array.splice(index, 1, new Note(id, title, text, setDate));
        $scope.data.typeButton = 'headPage';
        $scope.addToHistory('headPage');
    };

    var index;
    getNoteID = function (id) {
        for (i = 0; i < $scope.array.length; i++) {
            if ($scope.array[i].id === id) {
                index = i;
                return $scope.array[i];
            }
        }
    }

    $scope.addToArray = function (id) {
        var ind = $scope.arrayDeleted.indexOf(id);
        if (ind === -1)
            $scope.arrayDeleted.push(id);
        else
            $scope.arrayDeleted.splice(ind, 1);
    }

    $scope.addToHistory = function (page) {
        $scope.arrayHisty.push(page);
    }

    $scope.popHistory = function () {
        if ($scope.arrayHisty.length === 0)
            return 'headPage';
        else {
            $scope.arrayHisty.pop();
            return $scope.arrayHisty.pop();
        }
    }

    $scope.deleteChekedNotes = function () {
        var k = 0;
        for (k = 0; k < $scope.arrayDeleted.length; k++) {
            $scope.deleteNote($scope.arrayDeleted[k]);
            var ind = $scope.array.indexOf(getNoteID($scope.arrayDeleted[k]));
            $scope.array.splice(ind, 1);
        }

        $scope.arrayDeleted.splice(0, $scope.arrayDeleted.length);
        $scope.data.typeButton = 'headPage';
        $scope.addToHistory('headPage');
    }

    //удалить заметку
    $scope.deleteNote = function (id) {
        dataBase.transaction(function (tx) {
            tx.executeSql("DELETE FROM dbNotes WHERE ID = ?", [id]);
        });
    };

    $scope.deleteAllNote = function () {
        dataBase.transaction(function (tx) {
            tx.executeSql("DELETE FROM dbNotes");
        })
    };
});

notesApp.filter('viewDate', function () {
    return function (date) {
        var res = convertDate(date, '.');
        if (res.length > 0) {

        var ind = res.indexOf(',');
        var now = new Date();
  
        if (Math.abs(date.valueOf() - now.valueOf()) <  86400000) {
            return res.substring(0, ind);
        } else {
            var l = res.length;
            return res.substring(ind+1,l)
        }
        }
    };
});
=======
var data_typeButton = 'headPage';
var dataBase = {};

//window.onload = function () {
init = function () {
        openDB();
        createTable();
        selectWrite();
        alert("onload");
};
    openDB = function () {
        dataBase = openDatabase('dbNotes', '1.0', 'DataBase of Notes', 1024 * 1024 * 5);
        if (!dataBase) { alert("Failed to connect to database."); }
    };
    createTable = function () {
        dataBase.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS dbNotes (ID INTEGER PRIMARY KEY ASC, title TEXT, text TEXT, set_date DATE, create_date DATE)", []);
        })
    };

    selectWrite = function () {
        dataBase.transaction(function (tx) {
            tx.executeSql("SELECT * FROM dbNotes", [], function (tx, result) {
                for (var i = 0; i < result.rows.length; i++) {
                    arrayH.push(new Note(result.rows.item(i).ID, result.rows.item(i).title, result.rows.item(i).text, result.rows.item(i).set_date));
                }
                alert("Array filled");
            });
        })
    };
    init();


    var notesApp = angular.module("notesApp", []);

    notesApp.controller("notesAddController", function ($scope) {

        //func add Notes
        $scope.addNote = function (title, text, setDate) {
            if (title == null) {
                if (text.length >= 10)
                    var p = text.substring(0, 10) + "...";
                else
                    var p = text.substring(0, text.length);
                title = p;
            }
            dataBase.transaction(function (tx) {
                tx.executeSql("INSERT INTO dbNotes (title, text, set_date) VALUES (?,?,?)", [title, text, setDate]);
            });

            var len = $scope.array.length;
            $scope.array.push(new Note(len + 1, title, text, setDate));
            $scope.data.typeButton = 'headPage';
            $scope.lengthArray++;
        };

    });

    notesApp.controller("notesController", function ($scope) {

        $scope.convertDate = function (date, delim) {
            if (date === null || date === undefined || isNaN(date))
                return "";
            else
                return date.getDate() + delim + (date.getUTCMonth() + 1).toString() + delim + date.getFullYear();
        }

        $scope.viewDate = function (date) {
            return $scope.convertDate(date, '.');
        }

        $scope.current_date = $scope.viewDate(new Date());

        $scope.array = arrayH;

        $scope.arrayDeleted = [];

        $scope.updatePage = function (id, title, text, setDate) {
            $scope.data.typeButton = 'Update';
            $scope.MYID = id;
            $scope.MYnote_title = title;
            $scope.MYnote_text = text;
            $scope.MYnote_set_date = setDate;
        }

        //Update Note
        $scope.updateNote = function (id, title, text, setDate) {
            //$scope.data.typeButton = 'Update';
            if (title == null) {
                if (text.length >= 10)
                    var p = text.substring(0, 10) + "...";
                else
                    var p = text.substring(0, text.length);
                title = p;
            }
            dataBase.transaction(function (tx) {
                tx.executeSql("UPDATE dbNotes SET title = ?, text = ?, set_date = ? WHERE ID = ?", [title, text, setDate,id]);
            });

            //location.reload();      //???
            $scope.data.typeButton = 'headPage';
        };

        $scope.addToArray = function (id) {
            var ind = $scope.arrayDeleted.indexOf(id);
            if (ind === -1)
                $scope.arrayDeleted.push(id);
            else
                $scope.arrayDeleted.splice(ind,1);
        }

        $scope.deleteChekedNotes = function () {
            for (i = 0; i < $scope.arrayDeleted.length; ++i) {
                $scope.deleteNote($scope.arrayDeleted[i]);
            }
        }

        //удалить заметку
        $scope.deleteNote = function (id) {
            dataBase.transaction(function (tx) {
                tx.executeSql("DELETE FROM dbNotes WHERE ID = ?", [id]);
            });
            $scope.data.typeButton = 'Delete';
        };

        $scope.deleteAllNote = function () {
            dataBase.transaction(function (tx) {
                tx.executeSql("DELETE FROM dbNotes");
            })
        };

        //настойка динамического представления страниц
        $scope.data = {};
        $scope.data.typeButton = data_typeButton;

        $scope.setFile = function () {
            if ($scope.data.typeButton == 'Create')
                return 'createPage.html';
            else if($scope.data.typeButton == 'Update')
                return 'updatePage.html';
            else if($scope.data.typeButton == 'Delete')
                return 'checkNotes.html';
            else if (typeof $scope.data.typeButton == "undefined" || $scope.data.typeButton == 'headPage')
                return 'headPage.html';
        };

    });

//this  Data Base
/*     var db = {
         //открыть базу данных
         open: function () {
             Note.db = openDatabase('dbNotes', '1.0', 'DataBase of Notes', 1024 * 1024 * 2);
         },

         //создать, если не существует
         createTable: function () {
             Note.db.transaction(function (tx) {
                 tx.executeSql('create table if not exists dbNotes(ID integer primary key, title text, text text, set_date date, create_date date )');
             })
         },

         //добавить заметку в базу(insert)
         addNote: function (n) {
             Note.db.transaction(function (tx) {
                 tx.executeSql('insert into dbNotes(title,text,set_date) values(?,?,?)', [n.title, n.text, n.setDate]);
             })
         },

         //получить данные заметки
         getNote: function () {
             var database = Note.db;
             database.transaction(function (tx) {
                 tx.executeSql("SELECT * FROM dbNotes", [], function (tx, result) {
                     for (var i = 0; i < result.rows.length; i++) {
                         var newNote = new Note(result.rows.item(i).ID, result.rows.item(i).title, result.rows.item(i).input_text, result.rows.item(i).set_date);
                     }
                     //ее нужно куда-то сохранить
                 })
             })
         },

         //удалить заметку
         deleteNote: function (id) {
             Note.db.transaction(function (tx) {
                 tx.executeSql('delete from dbNotes where ID = ?'[id])
             })
         }
     }
     */
>>>>>>> 87fd9b878f1de319ede1ec65b6a5a95cb28da81e
