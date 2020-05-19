var sequence = []
var counter = 0;

var audiowork = new Audio('./static/sounds/AirHorn-SoundBible.com-964603082.wav');
audiowork.muted = true
var audiorest = new Audio('./static/sounds/BikeHorn-SoundBible.com-602544869.wav');
audiorest.muted = true
var audiofinish = new Audio('./static/sounds/finish.wav');
audiofinish.muted = true

// Variable to store current state of audio: mute or unmute? By default everything muted = true
var audio_mute = true;



$(document).ready(function(){
    //Get workoutfile from URL, if not there take workout1.json as default
    var workoutFile = "workout1.json";
    var searchParams = new URLSearchParams(window.location.search)
    if(searchParams.has('workout')) {
        workoutFile = searchParams.get('workout');
    }

    // Load workoutfile
    fetch('./static/data/'+workoutFile)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            // If workout file loaded, check if timestamp is in URL
            // If not, set time to now TODO: Clean this up
            let searchParams = new URLSearchParams(window.location.search)
            if(searchParams.has('timestamp')) {
                let timestamp = searchParams.get('timestamp')
                console.log("Timestamp found!!")
                data.startTime = dayjs(timestamp);
            }else{
                data.startTime = 'now';
            }

            var startTime = null;
            if(data.startTime!="now"){
                startTime = dayjs(data.startTime)
            }else{
                startTime = dayjs(Date.now())
            }
            data.elements.sort(function(a, b){
                return a.id - b.id;
            });

            // Calculate start time for each workout. Needed if someone joins after the workout started
            var time_list = [startTime]
            var old_time = startTime;
            data['elements'].forEach(function (item, index) {
                item.timeStamp = old_time.add(item.duration,'seconds')
                old_time = item.timeStamp
            });

            // Crate the carousel based on the data loaded from the json
            createCarousel(data);

            // Start the timers for each page on the carousel
            parseResults(data);

        });

});

function createCarousel(data) {
    var expired_count = 0;
    $.each (data['elements'], function(index,elem) {
        if(dayjs(elem.timeStamp).isBefore(dayjs(Date.now()))) {
            console.log("expired");
            elem.expired = true;
            expired_count = expired_count +1;
            return;
        }
        elem.expired = false;
        elem.carousel_index = index-expired_count;

        var content = null;
        console.log(elem.gifpath)
        if(elem.gifpath==""){
            var wrapper = $('<div class="carousel-item"></div>');
            var ol = $("<ol class='list-group'></ol>")
            var lst = elem.name;
            $.each (lst, function(index,elem) {
                ol.append("<li style='background-color: #555 ' class=\"list-group-item\"><b>"+elem+"</b></li>");

            });
            wrapper.append(ol)
            wrapper.append('<div id=timer-'+elem.id+'></div>')
            content = wrapper;
        }else {
           content = $('<div class="carousel-item"><h1 id="name-'+elem.id+'">'+elem.name+'</h1>' +
                '<video class="main-video" onloadeddata="this.play();"  playsinline loop muted preload autoplay>\n' +
                '    <source src="'+elem.gifpath+'" type="video/mp4" />\n' +
                '    Your browser does not support the video tag or the file format of this video.\n' +
                '</video>'+
                '<div id=timer-'+elem.id+'></div>')
        }

            content.appendTo('.carousel-inner');
            //console.log(elem.ind)
            var ind = $('<li id="ind-'+elem.id +'"data-targe="#carousel" data-slide-to="' + elem.id + '"></li>');
            if(elem.indicator == "water_break"){
               // $("#ind-"+elem.id).addClass('indicator-water');}
                ind.addClass('indicator-water');}
                
            ind.appendTo('.carousel-indicators');
            
            if(elem.indicator == "hidden"){
                ind.hide();
                //ind-"+element.id).addClass('indicator-expired');
                
        }
    })
    // ------------    SHOW CAROUSEL    -------------
    $('#carousel').carousel();
    //$('.carousel-indicators > li').first().addClass('active');
    $('.carousel-item').first().addClass('active');
}




function parseResults(data) {
    startJqueryTimer(data);
}

function startJqueryTimer(startTime) {
    console.log(startTime);
    if(startTime['elements'].length==0){
        $("#content").empty()
        $("#content").html('<h1>!!! Workout over !!!!</h1>')
        return
    }

    var element = startTime['elements'].shift()
    if(element.expired){
        console.log("Element is expired. Dont start timer")
        $(".carousel.active").empty()
        $('.carousel').carousel(element.carousel_index)
        startJqueryTimer(startTime);
        return;
    }

    if(element['sound']=="audiowork"){
        audiowork.play();

    }
    if(element['sound']=="audiorest"){
        audiorest.play();
        
    }

    if(element['sound']=="audiofinish"){
        audiofinish.play();
        console.log(audiofinish)
    }

    $('#heading').text(element.heading);
    var elemId = uniqId()
    var timer_gui = $("#timer-"+element.id).text("00:00").css('font-size', 'xx-large');

    timer_gui.countdown({
        until: new Date((element['timeStamp'])),
        compact: true, format: 'dhMS',
        onExpiry: function expired() {
            console.log("expired"+element.id)
            $('#heading').text('-');
            $(".carousel.active").empty()
            
            $("#ind-"+element.id).addClass('indicator-expired');
            $('.carousel').carousel(element.carousel_index+1);
            console.log('carousel go to next')
            startJqueryTimer(startTime);
        },
        alwaysExpire: true
    });
}

function uniqId() {
    return Math.round(new Date().getTime() + (Math.random() * 100));
}

function toggleSound() {
    var icon = $("#sound-icon");
    var button = $("#sound-button-custom");
    // Change icon from volume up to volume mute (see font-awesome) or the other way around
    icon.toggleClass('fa-volume-up fa-volume-mute');
    if(audio_mute){
        console.log("Audio from mute to unmute")
        // Set all sounds to unmute
        audiowork.muted = false
        audiorest.muted = false
        audiofinish.muted = false
        audio_mute = false
        // Change text of tooltip -> This is shown if you hover over the button
        button.attr('title','Sound is on')
    }else{
        console.log("Audio from unmute to mute")
        // Set all sounds to mute
        audiowork.muted = true
        audiorest.muted = true
        audiofinish.muted = true
        audio_mute = true
        // Change text of tooltip -> This is shown if you hover over the button
        button.attr('title','Sound is off')
    }
}