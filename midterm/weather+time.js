// JavaScript Document
(function ($, document, window) {
    var defaults = {
        retryLimit: 10,
        relativeTimeZone: true,
        width: 960,
    };

    $.fn.weatherFeed = function (options) {
        options = options || {};
        var tryCount = 0;
        this.each(function () {
            var $weatherTag = $(this);
            $weatherTag.css("width", options.width);
            var city = $.trim($(this).text().split(',')[0]);
            var state = $.trim($(this).text().split(',')[1]);
            var days = 5;
            var title = city + ", " + state;
            var location = "";
            var time = "";
            var image = "";
            var description = "";
            var day = "";
            var high = "";
            var low = "";
            var wind = "";
            var humidity = "";
            var dayDOM = "";
            var codeImgURL = "images/weather/";
            var searchTitle = title.replace(/\s+/g, '');

            //lets build the load bar now
            var loadBar = '<div class="loading"><span class="loadMessage" style="position:absolute; margin-left:10px; margin-top:2px">loading...</span></div>';
            $weatherTag.html(loadBar);
            $weatherTag.find(".loading").progressbar({ value: false });

            $.ajax({
                url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22" + city + "%20" + state + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?",
                dataType: "json",
                success: function (response) {
                    tryCount = 0;
                    var woeid = response.query.count > 1 ? response.query.results.place[0].woeid : response.query.results.place.woeid;
                    $.ajax({
                        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid=' + woeid + '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?',
                        dataType: "json",
                        success: function (data) {
                            //first lets get the current time by parsing the title from the data query
                            var timeIndexStart = data.query.results.channel.item.title.lastIndexOf(' at ') + 4; //4 is the size of the string " at " (whitespace included)
                            var timeIndexEnd = data.query.results.channel.item.title.length - 4; //4 is the number of characters from the end of the string (1 space + time zone)
                            var timeZoneStart = data.query.results.channel.item.title.lastIndexOf(" ") + 1;
                            //lets go ahead and store the time now
                            //format = "Conditions for "city", "state" at [time] [time zone]"
                            var time = data.query.results.channel.item.title.substring(timeIndexStart, timeIndexEnd);
                            var timeZone = data.query.results.channel.item.title.substring(timeZoneStart);
                            var d = new Date();

                            var localTime = d.getTime();

                            var localOffset = d.getTimezoneOffset() * 60000;

                            var utc = localTime + localOffset;
                            var currentTime;

                            if (options.relativeTimeZone) {
                                var timeByLocation = new Object();
								timeByLocation["CHADT"] = utc + (3600000 * +13.75);
								timeByLocation["NZDT"] = utc + (3600000 * +13);
								timeByLocation["CHAST"] = utc + (3600000 * +13);
								timeByLocation["NZST"] = utc + (3600000 * +12);
								timeByLocation["UTC"] = utc + (3600000 * +12);
								timeByLocation["UTC"] = utc + (3600000 * +11);
								timeByLocation["AEDT"] = utc + (3600000 * +11);
								timeByLocation["ACDT"] = utc + (3600000 * +10.5);
								timeByLocation["AEST"] = utc + (3600000 * +10);
								timeByLocation["UTC"] = utc + (3600000 * +10);
								timeByLocation["CST"] = utc + (3600000 * +9.5);
								timeByLocation["AWDT"] = utc + (3600000 * +9);
								timeByLocation["UTC"] = utc + (3600000 * +9);
								timeByLocation["WST"] = utc + (3600000 * +8);
								timeByLocation["UTC"] = utc + (3600000 * +8);
								timeByLocation["AWST"] = utc + (3600000 * +8);
								timeByLocation["UTC"] = utc + (3600000 * +7);
								timeByLocation["MST"] = utc + (3600000 * +6.5);
								timeByLocation["UTC"] = utc + (3600000 * +6);
								timeByLocation["NPT"] = utc + (3600000 * +5.75);
								timeByLocation["IST"] = utc + (3600000 * +5.5);
								timeByLocation["UTC"] = utc + (3600000 * +5);
								timeByLocation["MUT"] = utc + (3600000 * +4);
								timeByLocation["GST"] = utc + (3600000 * +4);
								timeByLocation["GET"] = utc + (3600000 * +4);
								timeByLocation["AZT"] = utc + (3600000 * +4);
								timeByLocation["AMT"] = utc + (3600000 * +4);
								timeByLocation["IRST"] = utc + (3600000 * +3.5);
								timeByLocation["SYOT"] = utc + (3600000 * +3);
								timeByLocation["MSK"] = utc + (3600000 * +3);
								timeByLocation["IOT"] = utc + (3600000 * +3);
								timeByLocation["IDT"] = utc + (3600000 * +3);
								timeByLocation["FET"] = utc + (3600000 * +3);
								timeByLocation["EEST"] = utc + (3600000 * +3);
								timeByLocation["EEDT"] = utc + (3600000 * +3);
								timeByLocation["EAT"] = utc + (3600000 * +3);
								timeByLocation["AST"] = utc + (3600000 * +3);
								timeByLocation["WAST"] = utc + (3600000 * +2);
								timeByLocation["SAST"] = utc + (3600000 * +2);
								timeByLocation["MEST"] = utc + (3600000 * +2);
								timeByLocation["IST"] = utc + (3600000 * +2);
								timeByLocation["EET"] = utc + (3600000 * +2);
								timeByLocation["CEDT"] = utc + (3600000 * +2);
								timeByLocation["CEST"] = utc + (3600000 * +2);
								timeByLocation["CAT"] = utc + (3600000 * +2);
								timeByLocation["BST"] = utc + (3600000 * +1);
								timeByLocation["IST"] = utc + (3600000 * +1);
								timeByLocation["WEDT"] = utc + (3600000 * +1);
								timeByLocation["WEST"] = utc + (3600000 * +1);
								timeByLocation["WAT"] = utc + (3600000 * +1);
								timeByLocation["MET"] = utc + (3600000 * +1);
								timeByLocation["CET"] = utc + (3600000 * +1);
								timeByLocation["EGST"] = utc + (0);
								timeByLocation["WET"] = utc + (0);
								timeByLocation["GMT"] = utc + (0);
								timeByLocation["AZOST"] = utc + (3600000 * -1);
								timeByLocation["CVT"] = utc + (3600000 * -1);
								timeByLocation["EGT"] = utc + (3600000 * -1);
								timeByLocation["BRST"] = utc + (3600000 * -2);
								timeByLocation["FNT"] = utc + (3600000 * -2);
								timeByLocation["GST"] = utc + (3600000 * -2);
								timeByLocation["PMDT"] = utc + (3600000 * -2);
								timeByLocation["UYST"] = utc + (3600000 * -2);
								timeByLocation["NDT"] = utc + (3600000 * -2.5);
								timeByLocation["AMST"] = utc + (3600000 * -3);
								timeByLocation["ART"] = utc + (3600000 * -3);
								timeByLocation["BRT"] = utc + (3600000 * -3);
								timeByLocation["FKST"] = utc + (3600000 * -3);
								timeByLocation["FKST"] = utc + (3600000 * -3);
								timeByLocation["GFT"] = utc + (3600000 * -3);
								timeByLocation["PMST"] = utc + (3600000 * -3);
								timeByLocation["PYST"] = utc + (3600000 * -3);
								timeByLocation["SRT"] = utc + (3600000 * -3);
								timeByLocation["UYT"] = utc + (3600000 * -3);
								timeByLocation["NST"] = utc + (3600000 * -3.3);
								timeByLocation["NT"] = utc + (3600000 * -3.3);
								timeByLocation["AMT"] = utc + (3600000 * -4);
								timeByLocation["BOT"] = utc + (3600000 * -4);
								timeByLocation["CDT"] = utc + (3600000 * -4);
								timeByLocation["CLT"] = utc + (3600000 * -4);
								timeByLocation["COST"] = utc + (3600000 * -4);
								timeByLocation["FKT"] = utc + (3600000 * -4);
								timeByLocation["GYT"] = utc + (3600000 * -4);
								timeByLocation["PYT"] = utc + (3600000 * -4);
								timeByLocation["VET"] = utc + (3600000 * -4.5);
								timeByLocation["ACT"] = utc + (3600000 * -5);
								timeByLocation["COT"] = utc + (3600000 * -5);
								timeByLocation["CST"] = utc + (3600000 * -5);
								timeByLocation["EASST"] = utc + (3600000 * -5);
								timeByLocation["ECT"] = utc + (3600000 * -5);
                                timeByLocation["EDT"] = utc + (3600000 * -5);
                                timeByLocation["EST"] = utc + (3600000 * -5);
                                timeByLocation["CDT"] = utc + (3600000 * -6);
                                timeByLocation["CST"] = utc + (3600000 * -6);
                                timeByLocation["MDT"] = utc + (3600000 * -7);
                                timeByLocation["MST"] = utc + (3600000 * -7);
                                timeByLocation["PDT"] = utc + (3600000 * -8);
                                timeByLocation["PST"] = utc + (3600000 * -8);
                                timeByLocation["AKDT"] = utc + (3600000 * -9);
                                timeByLocation["AKST"] = utc + (3600000 * -9);
								timeByLocation["HST"] = utc + (3600000 * -10);
								timeByLocation["SST"] = utc + (3600000 * -11);
                                currentTime = timeByLocation[timeZone];
                            }
                            else {
                                currentTime = localTime;
                            }



                            var today = new Date(currentTime);
                            var dstOffset = 0;
                            var hourMod = "";
                            var minMod = "";
                            var background = "";

                            if (today.dst())
                                dstOffset = 1;



                            if (today.getHours() + dstOffset < 10)
                                hourMod = "0";
                            if (today.getMinutes() < 10)
                                minMod = "0";




                            var code = parseInt(data.query.results.channel.item.forecast[0].code);
                            if (code < 18 || code > 37 || code == 35)
                                background = codeImgURL + "day(dark)_cloud.jpg";
                            else if (code < 28) {
                                if ((today.getHours() + dstOffset) > 20 || (today.getHours() + dstOffset) < 7)
                                    background = codeImgURL + "night-clear.jpg";
                                else
                                    background = codeImgURL + "day-clouds.jpg";
                            }
                            else {
                                if ((today.getHours() + dstOffset) > 20 || (today.getHours() + dstOffset) < 7)
                                    background = codeImgURL + "night-clear.jpg";
                                else
                                    background = codeImgURL + "clear-skies.jpg";
                            }
			

                            //now lets populate the forcast items
                            var weatherListItem = "<h2 class='weather'>" + title + " " + hourMod + (today.getHours() + dstOffset) + minMod + today.getMinutes() + " " + timeZone + " " + "<span class='lastUpdate'>Last Updated at " + time + " " + timeZone + "</span></h2><ul class='weatherSummary'>";
                            var tempSummary;
                            $weatherTag.find(".loadMessage").text("Generating Weather: " + title);
                            //lets create today's current weather item
                            for (var i = 0; i < data.query.results.channel.item.forecast.length && i < days; i++) {

                                if (i == 0) {
                                    day = "<p class='day'>Today</p>";
                                    image = "<img src='" + codeImgURL + data.query.results.channel.item.forecast[i].code + ".png'/>";
                                    date = "<p>" + data.query.results.channel.item.forecast[i].date + "</p>";
                                    high = "<p class='highTemp'> High: " + data.query.results.channel.item.forecast[i].high + " &deg;F</p>";
                                    low = "<p class='lowTemp'> Low: &nbsp;" + data.query.results.channel.item.forecast[i].low + " &deg;F</p>";
                                    tempSummary = high + low;
                                    description = "<p>" + data.query.results.channel.item.forecast[i].text + "</p>";
                                    dayDom = "<li class='today'>" + day + image + date + description + tempSummary + "</li>";
                                }
                                else {
                                    day = "<p class='day'>" + data.query.results.channel.item.forecast[i].day + "</p>";
                                    date = "<p>" + data.query.results.channel.item.forecast[i].date + "</p>";
                                    image = "<img src='" + codeImgURL + data.query.results.channel.item.forecast[i].code + ".png'/>";
                                    high = "<span class='highTemp'> H: " + data.query.results.channel.item.forecast[i].high + " &deg;F</span>";
                                    low = "<span class='lowTemp'> L: " + data.query.results.channel.item.forecast[i].low + " &deg;F</span>";
                                    description = "<p>" + data.query.results.channel.item.forecast[i].text + "</p>";
                                    dayDom = "<li class='fullDay forecast'>" + day + image + date + description + "<p>" + high + "&nbsp;-" + low + "</p></li>";
                                }
                                weatherListItem += dayDom;

                                //update progress bar


                            }
                            weatherListItem += "</ul>";
                            $weatherTag.html(weatherListItem);
                            $weatherTag.find(".weatherSummary").css('background-image', 'url(' + background + ')');
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            if (textStatus == 'timeout') {
                                tryCount++;
                                if (tryCount <= options.retryLimit) {
                                    //try again
                                    $.ajax(this);
                                    return;
                                }
                            }
                            else {
                                //handle error
                                alert(xhr + " " + textStatus);
                            }
                            return;
                        },
                        complete: function () {
                            $weatherTag.find(".loading").hide();
                            $weatherTag.find(".weather").show();
                            options.tryCount = 0;
                        }
                    });
                },
                error: function (xhr, status, error) {
                    tryCount++;
                    if (tryCount <= options.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                }
            });
        });
    };

    //**************************
    //   Helper Functions
    //**************************

    Date.prototype.stdTimezoneOffset = function () {
        var jan = new Date(this.getFullYear(), 0, 1);
        var jul = new Date(this.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }

    Date.prototype.dst = function () {
        return this.getTimezoneOffset() < this.stdTimezoneOffset();
    }

})(jQuery, document, window);
