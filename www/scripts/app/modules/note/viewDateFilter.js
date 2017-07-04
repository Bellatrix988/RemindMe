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