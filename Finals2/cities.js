var mytime = moment.tz();
        // log it out
        console.log(mytime.format());
        // append the time to the ny span -- formatting documention at http://momentjs.com/docs/#/displaying/
        $('button').append(" " + mytime.format('MMMM Do YYYY, h:mm:ss a'));
        // convert the current time to la timezone
		// JavaScript Document
	