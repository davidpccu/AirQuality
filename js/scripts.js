(function($) {
    'use strict';

    jQuery(document).ready(function() {

        /* Preloader */
        $(window).on('load', function() {
            $('body').addClass('loaded');
        });
    });
})(jQuery);

$(function() {
    $.getJSON("http://opendata.epa.gov.tw/ws/Data/REWIQA/?$orderby=SiteName&$skip=0&$top=1000&format=json&callback=?", airquality);
});


function airquality(data) {
    var data = data;
    var myUseData = new Array();
    var myTitle = ["SiteName", "County", "Pollutant", "Status", "PM2.5", "PublishTime"];
    var myCounty = ["臺北市", "新北市"]

    /* PutData to Array */
    for (var i = 0; i < data.length; i++) {
        if ($.inArray(data[i].County, myCounty) > -1) {
            myUseData[myUseData.length] = data[i];
        }
    }
    console.dir(data);

    /* Bubble Sort */
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < myUseData.length - 1; i++) {
            if (myUseData[i]['PM2.5'] < myUseData[i + 1]['PM2.5']) {
                var temp = myUseData[i];
                myUseData[i] = myUseData[i + 1];
                myUseData[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);

    /* Filter OutPut */
    var str = "<table class='table table-hover table-striped'><tr>";
    for (var name in data[0]) {
        if ($.inArray(name, myTitle) > -1) {
            str += "<th>" + name + "</th>";
        }
    }
    str += "</tr>";
    for (var i = 0; i < myUseData.length; i++) {
        str += "<tr>";
        for (var name in myUseData[i]) {
            if ($.inArray(name, myTitle) > -1) {
                str += "<td>" + myUseData[i][name] + "</td>";
            }
        }
        str += "</tr>";
    }
    str += "<table>";

    $("#data").html(str);
}