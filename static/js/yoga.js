var sequence = []
var counter = 0;

var audiowork = new Audio('./static/sounds/AirHorn-SoundBible.com-964603082.wav');
audiowork.muted = true
var audiorest = new Audio('./static/sounds/BikeHorn-SoundBible.com-602544869.wav');
audiorest.muted = true
var audiofinish = new Audio('./static/sounds/finish.wav');
audiofinish.muted = true
var audioyoga = new Audio('./static/sounds/Zymbel_18sec-1113884951.wav');
audioyoga.muted = true

// Variable to store current state of audio: mute or unmute? By default everything muted = true
var audio_mute = true;


$(document).ready(function () {

// Try to start jitsi if embedded, if not embedded (e.g. in workout.html and not workout_group.html catch exception
//  to go on with execution of script.)
try {
    const domain = 'comfit.fun';
    const options = {
        roomName: 'Comfit_Group_Yoga_Room',
        parentNode: document.querySelector('#jitsi')
    };
    const api = new JitsiMeetExternalAPI(domain, options);
      // Make tileview default: From https://github.com/jitsi/jitsi-meet/issues/5764
      api.addEventListener(`videoConferenceJoined`, () => {
    const listener = ({ enabled }) => {
      api.removeEventListener(`tileViewChanged`, listener);

      if (!enabled) {
        api.executeCommand(`toggleTileView`);
      }
    };

    api.addEventListener(`tileViewChanged`, listener);
    api.executeCommand(`toggleTileView`);
    api.executeCommand('setVideoQuality', 360);
          api.on('readyToClose', () => { //Hack: Hide jitsi frame after exit meeting to get rid of regular jitsi page
    // see https://community.jitsi.org/t/redirect-url-on-hangup/29948/23
    $('#jitsi').hide();
});
  });
}
catch (e) {
   // Exception caught. Happens in workout.html since script is not embedded.
   // console.log(e); // Fehler-Objekt an die Error-Funktion geben
}

startSiteBuilding();
});

function startSiteBuilding() {
    //Get workoutfile from URL, if not there take yoga1.json as default
    // If workoutfile is specified, load it from the file
    var workoutFile = "yoga1.json";
    var searchParams = new URLSearchParams(window.location.search)

    calcOffset()

    fetch('./static/data/ExerciseList_yoga.json')
        .then((response) => {
            return response.json();
        })
        .then((yoga_json) => {
            // If workout file specified in params, then load it and build the website based on the workout file
            if (searchParams.has('workout')) {
                console.log("from workout file")
                workoutFile = searchParams.get('workout');
                fetch('./static/data/' + workoutFile)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        buildSiteFromWorkoutFile(data, yoga_json)
                    });
            }


            // If not workout file is specified, than create the workout file using the exercise json
            if (searchParams.has('exercises')) {
                console.log("from URL")

                var exercise_list = searchParams.get('exercises');

                var selected_duration = searchParams.get("wo_duration")
                var selected_rounds = searchParams.get("wo_rounds")


                var generated_workout = generateWorkoutJson(selected_duration, yoga_json, JSON.parse(exercise_list))

                buildSiteFromWorkoutFile(generated_workout, yoga_json) // TODO extract
            }

        });}


function buildSiteFromWorkoutFile(workoutjson,yoga_json) {
    let searchParams = new URLSearchParams(window.location.search)

    if (searchParams.has('timestamp')) {
        let timestamp = searchParams.get('timestamp')
        if (timestamp == "") {
            timestamp = dayjs(getServerTime())
        }
        workoutjson.startTime = dayjs(timestamp);
    } else {
        workoutjson.startTime = 'now';
    }

    var startTime = null;
    if (workoutjson.startTime != "now") {
        workoutjson.startTime = dayjs(workoutjson.startTime)
    } else {
        workoutjson.startTime = dayjs(getServerTime())
    }

    workoutjson.elements.sort(function (a, b) {
        return a.id - b.id;
    });

    // Calculate start time for each workout. Needed if someone joins after the workout started
    var old_time = workoutjson.startTime;

    workoutjson.elements.forEach(function (item, index) {
        item.timeStamp = old_time.add(item.duration, 'seconds')
        old_time = item.timeStamp
    });

    // Crate the carousel based on the data loaded from the json
    createCarousel(workoutjson, yoga_json);

    // Start the timers for each page on the carousel
    parseResults(workoutjson);

    $("#wait-spinner").css("visibility", "hidden");
    $("#sound-button-custom").css("visibility", "visible");
    $("#spotifylink").css("visibility", "visible");

}

function createCarousel(data, exercise_json) { // todo: better name for data e.g. workout_json
    var expired_count = 0;

    $.each(data['elements'], function (index, elem) {
        console.log(dayjs(elem.timeStamp))
        console.log(dayjs(getServerTime()))
        if (dayjs(elem.timeStamp).isBefore(dayjs(getServerTime()))) {
            console.log("expired", elem.id)
            elem.expired = true;
            expired_count = expired_count + 1;
            return;
        }
        elem.expired = false;
        elem.carousel_index = index - expired_count;

        var content = null;
        if (elem.id == 0) { // Todo: this feels like a hack, change to ids or so
            var wrapper = $('<div class="carousel-item"></div>');
            var header = $('<h1 id="name-' + elem.id + '">' + elem.name + '</h1>')
            wrapper.append(header)
            var img = $('<img>',{id:'start_image',src:'./static/photo/beach_yoga_small.jpeg',class: 'main-video'})
            wrapper.append(img);
            wrapper.append('<div id=timer-' + elem.id + '></div>')
            content = wrapper;
        } else if (elem.gifpath == "") {
            var wrapper = $('<div class="carousel-item"></div>');
            var div = $('<div>',{class: 'yoga-text-content h1'})
            div.html(elem.name)

            wrapper.append(div)
            wrapper.append('<div id=timer-' + elem.id + '></div>')
            content = wrapper;
        } else {
            var webm_path = elem.gifpath.substr(0, elem.gifpath.lastIndexOf(".")) + ".webm";
            var poster_path = elem.gifpath.substr(0, elem.gifpath.lastIndexOf(".")) + ".jpg";
            content = $('<div class="carousel-item"><h1 id="name-' + elem.id + '">' + elem.name + '</h1>' +
                '<video poster='+poster_path+' id="vid-' + elem.id + '" class="yoga-video" preload="none" autoplay playsinline loop muted>\n' +
                '    <source src="' + elem.gifpath + '" type="video/mp4" />\n' +
                '    <source src="' + webm_path + '" type="video/webm" />\n' +
                '    Your browser does not support the video tag or the file format of this video.\n' +
                '</video>' +
                '<div id=timer-' + elem.id + '></div>')
        }

        content.appendTo('.carousel-inner');
        //console.log(elem.ind)
        var ind = $('<li id="ind-' + elem.id + '"data-targe="#carousel" data-slide-to="' + elem.id + '"></li>');
        if (elem.indicator == "water_break") {
            // $("#ind-"+elem.id).addClass('indicator-water');}
            ind.addClass('indicator-water');
        }

        ind.appendTo('.carousel-indicators');

        if (elem.indicator == "hidden") {
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
    if (startTime['elements'].length == 0) {
        $("#content").empty()
        $("#content").html('<h1>Yoga class over</h1>')
        $("#content").append('<h4> Please vote for ComFIT Colors! </h4>')
        $("#content").append('<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd2oFTWgx-SGEe-_CDIwf0E-mOWphH8vDf9Q7IiloPiR3vW7g/viewform?embedded=true" width="640" height="1011" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>');

        return
    }

    var element = startTime['elements'].shift()
    if (element.expired) {
        $(".carousel.active").empty()
        $('.carousel').carousel(element.carousel_index)
        startJqueryTimer(startTime);
        return;
    }

    if (element['sound'] == "audiowork") {
        audiowork.play();

    }
    if (element['sound'] == "audiorest") {
        audiorest.play();

    }

        if (element['sound'] == "audioyoga") {
        audioyoga.play();

    }

    if (element['sound'] == "audiofinish") {
        audiofinish.play();
    }

    $('#heading').text(element.heading);
    var elemId = uniqId()
    var timer_gui = $("#timer-" + element.id).text("00:00").addClass('display-4'); //
    if (element.gifpath != "" && element.id!=0) { // todo: improve checking for overview
        var myPlayer = $("#vid-" + element.id)
        myPlayer.get(0).play()
    }
    if (element.indicator == "hidden" && (element.heading !== "Rest")) {
        // If current page has no indictator, hide indicator bar
        $(".carousel-indicators").css("opacity", "15%");
    } else {
        $(".carousel-indicators").css("opacity", "100%");
    }
    console.log("Offset", offset)
    timer_gui.countdown({
        until: new Date(element['timeStamp']),
        compact: true, format: 'dhMS',
        onExpiry: function expired() {
            $('#heading').text('-');
            $(".carousel.active").empty()

            $("#ind-" + element.id).addClass('indicator-expired');
            $('.carousel').carousel(element.carousel_index + 1);
            startJqueryTimer(startTime);
        },
        alwaysExpire: true,
        serverSync: getServerTime
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
    if (audio_mute) {
        // Set all sounds to unmute
        audiowork.muted = false
        audiorest.muted = false
        audiofinish.muted = false
        audioyoga.muted = false
        audio_mute = false
        // Change text of tooltip -> This is shown if you hover over the button
        button.attr('title', 'Sound is on')
    } else {
        // Set all sounds to mute
        audiowork.muted = true
        audiorest.muted = true
        audiofinish.muted = true
        audio_mute = true
        audioyoga.muted = true
        // Change text of tooltip -> This is shown if you hover over the button
        button.attr('title', 'Sound is off')
    }
}

var offset = 0;

function calcOffset(dateStr) {
    var start = new Date().getTime();
    fetch('./static/data/fake_file_for_time_sync.json', {cache: "no-store", method: "HEAD"})
        .then((response) => {
            var date = response.headers.get('Date');
            var end = new Date().getTime();
            var duration = end - start
            if (date) {
                offset = dayjs(Date.now()).diff(dayjs(date).add(duration, 'ms'))
            }
            console.log("Offset Server->local " + offset)
            console.log("Request duration: ", duration)
        });

}

function getServerTime() {
    var date = new Date();
    date.setTime(date.getTime() - offset);
    //console.log("Offset local -> server " + offset)
    return date;
}

