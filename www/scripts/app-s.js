var todoApp = angular.module('todoApp',['routingApp','notesApp','designApp']);
var routingApp = angular.module('routingApp', ['ui.router', 'notesApp']);

    // routingApp.run(function ($state, $rootScope) {
    //         $rootScope.$state = $state;
    // });

routingApp.config(function($stateProvider, $urlRouterProvider) {
routingApp.run(function ($state, $rootScope) {
        $rootScope.$state = $state;
        // loadNote();
});
    $urlRouterProvider.otherwise('home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '../../../html-part/headPage.html'
        })

        .state('create',{
            url: '/create',
            templateUrl: '../../../html-part/createPage.html'
        })

        .state('update', {
            url: '/update',
            templateUrl: '../../../html-part/updatePage.html'
        })

        .state('help', {
            url: '/help',
            templateUrl: '../../../html-part/headPage.html'
        })

        .state('delete', {
          url: '/delete',
          templateUrl: '../../../html-part/checkNotes.html',
        })

        .state('reminder', {
            url: '/remider',
            templateUrl: '../../../html-part/reminderPage.html'     
        });
});

 angular.module('designApp', ["ngMaterial", "ngAnimate", "ngAria","mdPickers"])
		.config(function($mdThemingProvider) {
	  		$mdThemingProvider.theme('default')
	    	.primaryPalette('green')
	    	.accentPalette('grey')
		})
		.controller('generalDesignCtrl', function($scope){ //МОЖНО СДЕЛАТЬ ДИРЕКТИВУ

		})
angular.module('designApp')
       .controller('formCtrl', function($scope) {
          
       })
angular.module('designApp')
       .controller('reminderCtrl', ['$scope','$mdpDatePicker', '$mdpTimePicker', function($scope, $mdpDatePicker, $mdpTimePicker){
	       	$scope.currentDate = new Date();
		  	this.showDatePicker = function(ev) {
		    	$mdpDatePicker($scope.currentDate, {
		        targetEvent: ev
		      }).then(function(selectedDate) {
		        $scope.currentDate = selectedDate;
		      });;
		    };
		    
		    this.filterDate = function(date) {
		      return moment(date).date() % 2 == 0;
		    };
		    
		    this.showTimePicker = function(ev) {
		    	$mdpTimePicker($scope.currentTime, {
		        targetEvent: ev
		      }).then(function(selectedDate) {
		        $scope.currentTime = selectedDate;
		      });;
		    } 
       }]);
angular.module('designApp')
      .controller('sidenavCtrl', function ($scope, $timeout, $mdSidenav) {
        $scope.toggleLeft = buildToggler('left');

         var imagePath = "./../../../../images/notepadCreate.png";
        $scope.todos = [
	      {
	        icon : imagePath,
	        text : 'Календарь'
	      },
	      {
	        icon : imagePath,
	        text : 'Архив'
	      },
	      {
	        icon : imagePath,
	        text : 'Поиск'
	      },
	      {
	        icon : imagePath,
	        text : 'Тема'
	      },
	      {
	        icon : imagePath,
	        text : 'Поддержка'
	      }
	    ];

        function buildToggler(componentId) {
          return function() {
            $mdSidenav(componentId).toggle();
          };
        }
      });
angular.module('designApp')
	.controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet, $mdToast) {
	  $scope.alert = '';

	  $scope.showListBottomSheet = function() {
	    $scope.alert = '';
	    $mdBottomSheet.show({
	      templateUrl: '../../../../html-part/list_toolbar.html',
	      controller: 'ListBottomSheetCtrl'
	    }).then(function(clickedItem) {
	      $scope.alert = clickedItem['name'] + ' clicked!';
	    }).catch(function(error) {
	    });
	  };
	})
	.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
	  $scope.items = [
	    { name: 'Добавить напоминание', icon: 'fa fa-clock-o', fucClick: "", src: "reminder" },
	    { name: 'Поставить метку', icon: 'fa fa-tag', fucClick: "", src: "reminder" },
	    { name: 'Изменить цвет', icon: 'fa fa-paint-brush', fucClick: "", src: "reminder" }
	  ];

	  $scope.listItemClick = function($index) {
	    var clickedItem = $scope.items[$index];
	    $mdBottomSheet.hide(clickedItem);
	  };
	})
function Note(id, title, text, setDate,createDate) {
    this.id = id;       //id
    this.title = title; //���������
    this.text = text;   //����������
    this.setDate = new Date(setDate); //����, �� ������� ����� ��������� ����
    this.createDate = new Date(createDate);
}
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
            loadNote(); // êîïèðóåò çíà÷åíèå èç âñïîìîãàòåëüíîãî ìàññèâà â ìàññèâ array
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
angular.module("notesApp", []);
angular.module("notesApp")
       .factory('baseDB', function(){
           return {
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
       .factory('noteUP', function(){
            return {
                getNote: function(title, text, setDate, id){
                    return new Note(id, title, text, setDate);
                }
            }
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
                        window.plugins.toast.showLongBottom("����������� �����������");
                    }
                }
            }
       })
       .controller("notesController", ['$scope','baseDB','noteUP', function ($scope, baseDB, noteUP) {
            $scope.array = [];

            $scope.sortParamArray = 'setDate';
            
            $scope.data = {};
            //region of changing  the status of notes & database
                //called when adding notes
                $scope.addNote = function (title, text, setDate){
                    baseDB.insert(title, text, setDate);
                }
                //called when changing notes
                $scope.updateNote = function(title, text, setDate, id){
                    $scope.note = noteUP.getNote(title, text, setDate, id);
                    baseDB.update(title, text, setDate, id);
                }

                $scope.initNotes = function(){
                    $scope.array = arrayH.slice(0);
                }
                
                //called when loading database
                loadNote = function () {
                    $scope.$apply(function () {
                        $scope.initNotes();
                    });
                };
            //endregion

            //region of deleting notes
                $scope.arrayDeleted = [];
                $scope.addToArray = function (id) {
                    var ind = $scope.arrayDeleted.indexOf(id);
                    if (ind === -1)
                        $scope.arrayDeleted.push(id);
                    else
                        $scope.arrayDeleted.splice(ind, 1);
                }
                //Delete checked notes
                $scope.removeNotes = function () {
                    $scope.arrayDeleted.forEach(function(item){
                        baseDB.delete(item);
                    })
                    $scope.arrayDeleted = [];
                }
            //endregion

            //region view
                $scope.viewDate = function (date) {
                    if (date === null || undefined || isNaN(date))
                        return "";
                    else 
                        return new Date(date);
                }
                $scope.current_date = $scope.viewDate(new Date());
            //endregion
            
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

            // $scope.setFile = function () {
            //     if ($scope.data.typeButton == 'Create')
            //         return 'html-part/createPage.html';
            //     else if ($scope.data.typeButton == 'Update')
            //         return 'html-part/updatePage.html';
            //     else if ($scope.data.typeButton == 'Delete')
            //         return 'html-part/checkNotes.html';
            //     else if ($scope.data.typeButton == 'Reminder')
            //         return 'html-part/reminderPage.html';
            //     else if ($scope.data.typeButton == 'headPage') {
            //         return 'html-part/headPage.html';
            //     }
            //     else
            //         return 'html-part/headPage.html';
            // };

            // $scope.onBackKeyDown = function () {
            //     $scope.data.typeButton = $scope.popHistory();
            // };

            // $scope.arrayHisty = ['headPage'];

            // $scope.addToHistory = function (page) {
            //     $scope.arrayHisty.push(page);
            // }

            // $scope.popHistory = function () {
            //     if ($scope.arrayHisty.length === 0)
            //         return 'headPage';
            //     else {
            //         $scope.arrayHisty.pop();
            //         return $scope.arrayHisty.pop();
            //     }
            // }
        }]);
angular.module("notesApp")
        .filter('viewDate', function () {
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