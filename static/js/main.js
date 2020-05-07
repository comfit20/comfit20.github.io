var sequence = []
var counter = 0;
var audiowork = new Audio('./static/sounds/AirHorn-SoundBible.com-964603082.wav');
var audiorest = new Audio('./static/sounds/BikeHorn-SoundBible.com-602544869.wav');

$(document).ready(function(){
    var workoutFile = "";
    let searchParams = new URLSearchParams(window.location.search)
    if(searchParams.has('workout')) {
        workoutFile = searchParams.get('workout');
    }else{
        console.log("Could not find workout in URL Use default workout1.json")
        workoutFile = "workout1.json"
    }
    //console.log(jsonObject);
    fetch('./static/data/'+workoutFile)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

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

            var time_list = [startTime]
            var old_time = startTime;
            data['elements'].forEach(function (item, index) {
                item.timeStamp = old_time.add(item.duration,'seconds')
                old_time = item.timeStamp
            });

            createCarousel(data);
            parseResults(data);

        });

    $("#wo_bar").hide()

    $('#start').on('click', function(event) {
        event.preventDefault(); // To prevent following the link (optional)
        var fiveMinutes = 60 * 0.1,
            display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
        $(this).hide();
        $("#wo_bar").show();
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
           content = $('<div class="carousel-item"><h2 id="name-'+elem.id+'">'+elem.name+'</h2>' +
                '<video onloadeddata="this.play();"  playsinline loop muted preload autoplay>\n' +
                '    <source src="'+elem.gifpath+'" type="video/mp4" />\n' +
                '    Your browser does not support the video tag or the file format of this video.\n' +
                '</video>'+
                '<div id=timer-'+elem.id+'></div>')
        }

            content.appendTo('.carousel-inner');
        $('<li data-targe="#carousel" data-slide-to="' + elem.id + '"></li>').appendTo('.carousel-indicators');
    })
    // ------------    SHOW CAROUSEL    -------------
    $('#carousel').carousel();
    $('.carousel-indicators > li').first().addClass('active');
    $('.carousel-item').first().addClass('active');
}

// var audio = new Audio('audio_file.mp3');
// audio.play();



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
    if(element['sound']=="audiowork"){
        audiowork.play();
        console.log('playaudiowork')
    }
    if(element['sound']=="audiorest"){
        audiorest.play();
        console.log('playaudiorest')
    }


    if(element.expired){
        console.log("Element is expired. Dont start timer")
        $(".carousel.active").empty()
        $('.carousel').carousel(element.carousel_index)
        startJqueryTimer(startTime);
        return;
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