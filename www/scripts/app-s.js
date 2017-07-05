var todoApp = angular.module('todoApp',['routingApp','notesApp','designApp']);
var routingApp = angular.module('routingApp', ['ui.router']);

    // routingApp.run(function ($state, $rootScope) {
    //         $rootScope.$state = $state;
    // });

routingApp.config(function($stateProvider, $urlRouterProvider) {

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
          templateUrl: '../../../html-part/checkNotes.html'
        })

        .state('reminder', {
            url: '/remider',
            templateUrl: '../../../html-part/reminderPage.html'     
        });
});

 angular.module('designApp', ['ngMaterial'])
		.config(function($mdThemingProvider) {
	  		$mdThemingProvider.theme('default')
	    	.primaryPalette('green')
	    	.accentPalette('grey')
		})
angular.module('designApp')
       .controller('formCtrl', function($scope) {
          
       })
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
    .config(function($mdIconProvider) {
    	$mdIconProvider
      .icon('share-arrow','../../../../images/notepadCreate.png', 24)
      .icon('upload', '../../../../images/notepadCreate.png', 24)
      .icon('copy', '../../../../images/notepadCreate.png', 24)
      .icon('print', '../../../../images/notepadCreate.png', 24)
      .icon('hangout', '../../../../images/notepadCreate.png', 24)
      .icon('mail', '../../../../images/notepadCreate.png', 24)
      .icon('message', '../../../../images/notepadCreate.png', 24)
      .icon('copy2', '../../../../images/notepadCreate.png', 24)
      .icon('facebook', '../../../../images/notepadCreate.png', 24)
      .icon('twitter', '../../../../images/notepadCreate.png', 24);
  	})
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
	    { name: 'Share', icon: 'share-arrow' },
	    { name: 'Upload', icon: 'upload' },
	    { name: 'Copy', icon: 'copy' },
	    { name: 'Print this page', icon: 'print' },
	  ];

	  $scope.listItemClick = function($index) {
	    var clickedItem = $scope.items[$index];
	    $mdBottomSheet.hide(clickedItem);
	  };
	})
	
	.run(function($templateRequest) {

	    var urls = [
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png'
	    ];

	    angular.forEach(urls, function(url) {
	      $templateRequest(url);
	    });

	  });
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
       .controller("notesController", ['$scope','baseDB', function ($scope, baseDB) {
            $scope.array = [];
            $scope.sortParamArray = 'setDate';
            $scope.data = {};

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
                    return 'headPage.html';
            };
             
            
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
                // $scope.data.typeButton = 'headPage';
                // $scope.addToHistory('headPage');
            }
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