var app = {
    initialize: function () {
        init();
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {

        document.addEventListener("backbutton", onBackButtonDown, false);

        var newDate = new Date();
        $('.nativedatepicker').focus(function (event) {
            var currentField = $(this);
            var myNewDate = Date.parse(currentField.val()) || new Date();

            // Same handling for iPhone and Android
            window.plugins.datePicker.show({
                date: myNewDate,
                mode: 'date', // date or time or blank for both
                allowOldDates: true
            }, function (returnDate) {
                newDate = new Date(returnDate);
                currentField.val(newDate.toString("dd/MMM/yyyy"));

                // This fixes the problem you mention at the bottom of this script with it not working a second/third time around, because it is in focus.
                currentField.blur();
            });
        });

        newDate.setTime(new Date().getTime());

        $('.nativetimepicker').focus(function (event) {
            var currentField = $(this);
            var time = currentField.val();
            var myNewTime = new Date();

            console.log(myNewTime);

            myNewTime.setHours(time.substr(0,2));
            myNewTime.setMinutes(time.substr(3, 2));

            // Same handling for iPhone and Android
            plugins.datePicker.show({
                date: myNewTime,
                mode: 'time', // date or time or blank for both
                allowOldDates: true
            }, function (returnDate) {
                // returnDate is generatezd by .toLocaleString() in Java so it will be relative to the current time zone
                var newDate = myNewTime.setTime(returnDate);
                currentField.val(newDate.toString("HH:mm"));
                currentField.blur();
            });
        });
    }
};

window.onload = function () {
    app.initialize();
}