angular.module("notesApp", []);
angular.module("notesApp")
       .factory('baseDB', function(){
           return {
                select: function(){
                    return selectTODO();
                },
                insert: function (title, text, setDate) {
                    if(!title)
                        title = text.substring(0, 15) + "...";
                    insertTODO(title, text, setDate);
                },
                update: function(title, text, setDate, id){
                    updateTODO(title, text, setDate, id);
                },
                delete: function(id){
                    deleteTODO(id);
                }

           };
       })
       .controller("baseOperOfNotesCTRL", function ($scope) {

            $scope.addNote = function (title, text, setDate) {
                if(!title)
                    title = text.substring(0, 15) + "...";
                
                insertTODO(title, text, setDate);

                $scope.array.push(new Note($scope.array.length + 1, title, text, setDate, new Date()));
                // $scope.data.typeButton = 'headPage';
                // $scope.addToHistory('headPage');
            };

            $scope.updateNote = function (id, title, text, setDate) {
                var index = $scope.array.indexOf(current_note);
                if (title == null) {
                    if (text.length >= 15)
                        var p = text.substring(0, 15) + "...";
                    else
                        var p = text.substring(0, text.length);
                    title = p;
                }
                
                updateTODO(title, text, setDate, id);

                $scope.array.splice(index, 1, new Note(id, title, text, setDate));
                $scope.data.typeButton = 'headPage';
                $scope.addToHistory('headPage');
            };

            $scope.deleteNote = function (id) {
                deleteTODO(id);
            };

            $scope.deleteAllNote = function () {
                deleteAllTODO();
            };
        })
       .controller("mobileOper", function($scope){
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
                            sound: "file://sounds/message.mp3",
                            at: _time,
                            led: "FF0000"
                        });
                        $scope.updateNote(_id, _title, _text, _time);
                        window.plugins.toast.showLongBottom("Напоминание установлено");
                    }
                }
            }
       })
       .controller("notesController", ['$scope','baseDB', function ($scope, baseDB) {
            $scope.array = [];
            // $scope.array = [new Note(666, "Hello", "000", new Date()), new Note(667, "Hello1", "000", new Date())];
            $scope.sortParamArray = 'setDate';
            $scope.data = {};

            $scope.addNote = function (title, text, setDate){
                baseDB.insert(title, text, setDate);
                $scope.array = baseDB.select();
            }
            $scope.updateNote = function(title, text, setDate, id){
                baseDB.update(title, text, setDate, id);
                $scope.array = baseDB.select();
            }
            $scope.initNotes = function(){
                $scope.array = baseDB.select();
                console.log("WOW");
                $scope.$apply(function () {
                    $scope.array = baseDB.select();
                    console.log("WOW");
                });
            }

            $scope.setFile = function () {
                if ($scope.data.typeButton == 'Create')
                    return 'html-part/createPage.html';
                else if ($scope.data.typeButton == 'Update')
                    return 'html-part/updatePage.html';
                else if ($scope.data.typeButton == 'Delete')
                    return 'html-part/checkNotes.html';
                else if ($scope.data.typeButton == 'Reminder')
                    return 'html-part/reminderPage.html';
                else if ($scope.data.typeButton == 'headPage') {
                    return 'html-part/headPage.html';
                }
                else
                    return 'html-part/headPage.html';
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

            $scope.viewDate = function (date) {
                if (date === null || undefined || isNaN(date))
                    return "";
                else 
                    return new Date(date);
            }

            $scope.current_date = $scope.viewDate(new Date());

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

            //Delete checked notes
            $scope.deleteChekedNotes = function () {
                $scope.arrayDeleted.forEach(function(item){
                    baseDB.delete(item);
                    var ind = $scope.array.indexOf(getNoteID(item));
                    $scope.array.splice(ind, 1);
                })

                $scope.arrayDeleted.splice(0, $scope.arrayDeleted.length);
            }
        }]);