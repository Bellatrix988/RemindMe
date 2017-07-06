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