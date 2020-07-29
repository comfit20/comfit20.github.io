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


$(document).ready(function () {


    calcOffset();
});

function startSiteBuilding() {
    //Get workoutfile from URL, if not there take workout1.json as default
    // If workoutfile is specified, load it from the file
    var workoutFile = "workout1.json";
    var searchParams = new URLSearchParams(window.location.search)
    fetch('./static/data/ExerciseList.json')
        .then((response) => {
            return response.json();
        })
        .then((excercise_json) => {
            // If workout file specified in params, then load it and build the website based on the workout file
            if (searchParams.has('workout')) {
                console.log("from workout file")
                workoutFile = searchParams.get('workout');
                fetch('./static/data/' + workoutFile)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        buildSiteFromWorkoutFile(data, excercise_json)
                    });
            }

            // If not workout file is specified, than create the workout file using the excercise json
            if (searchParams.has('excercises')) {
                var exercise_list = searchParams.get('excercises');

                var selected_duration = searchParams.get("wo_duration")
                var selected_rounds = searchParams.get("wo_rounds")

                var generated_workout = generateWorkoutJson(selected_duration, selected_rounds, excercise_json, JSON.parse(exercise_list))
                buildSiteFromWorkoutFile(generated_workout, excercise_json) // TODO extract
            }

        });
}


function buildSiteFromWorkoutFile(workoutjson,excercise_json) {
    let searchParams = new URLSearchParams(window.location.search)

    if (searchParams.has('timestamp')) {
        let timestamp = searchParams.get('timestamp')
        if (timestamp == "") {
            timestamp = getServerTime()
        }
        workoutjson.startTime = dayjs(timestamp);
    } else {
        workoutjson.startTime = 'now';
    }

    var startTime = null;
    if (workoutjson.startTime != "now") {
    console.log('dfjsdlkf')
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
    createCarousel(workoutjson, excercise_json);

    // Start the timers for each page on the carousel
    parseResults(workoutjson);

    $("#wait-spinner").css("visibility", "hidden");
    $("#sound-button-custom").css("visibility", "visible");
    $("#spotifylink").css("visibility", "visible");

}

function createCarousel(data, excercise_json) { // todo: better name for data e.g. workout_json
    var expired_count = 0;
    $.each(data['elements'], function (index, elem) {
        console.log('if',dayjs(elem.timeStamp))
        console.log('is before',dayjs(getServerTime()),'then expired')
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
            var intro_names = data['elements'].filter(obj => {
                return obj.heading === 'Introduction to exercises'
            })
            var name_list = []
            $.each(intro_names, function (index, elem) {
                name_list.push(elem.name);
            });
            console.log(name_list)
            // Transform id list to name list for url: TODO: switch url to only use ids (makes it shorter)
            var exercise_id_list = []
            name_list.forEach(function (item) {
                var excercise_obj = excercise_json.exercises.filter(obj => {
                    return 0 === obj.name.localeCompare(item)
                })[0]
                exercise_id_list.push(excercise_obj.id)
            });
            var overview = generateWorkoutOverview(excercise_json, exercise_id_list);
            overview.style.backgroundColor = "#555555"
            wrapper.append(overview);
            wrapper.append('<div id=timer-' + elem.id + '></div>')
            content = wrapper;

            console.log(exercise_id_list)
        } else if (elem.gifpath == "") {
            var wrapper = $('<div class="carousel-item"></div>');
            var ol = $("<ol class='list-group'></ol>")
            var lst = elem.name;
            $.each(lst, function (index, elem) {
                ol.append("<li style='background-color: #555 ' class=\"list-group-item\"><b>" + elem + "</b></li>");

            });
            wrapper.append(ol)
            wrapper.append('<div id=timer-' + elem.id + '></div>')
            content = wrapper;
        } else {
            var webm_path = elem.gifpath.substr(0, elem.gifpath.lastIndexOf(".")) + ".webm";
            content = $('<div class="carousel-item"><h1 id="name-' + elem.id + '">' + elem.name + '</h1>' +
                '<video id="vid-' + elem.id + '" class="main-video" preload="none" playsinline loop muted>\n' +
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
        $("#content").html('<h1>!!! Workout over !!!!</h1>')
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

    if (element['sound'] == "audiofinish") {
        audiofinish.play();
    }

    $('#heading').text(element.heading);
    var elemId = uniqId()
    var timer_gui = $("#timer-" + element.id).text("00:00").addClass('display-4'); //
    if (element.gifpath != "" && element.id !== 0) { // todo: improve checking for overview
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
        audio_mute = false
        // Change text of tooltip -> This is shown if you hover over the button
        button.attr('title', 'Sound is on')
    } else {
        // Set all sounds to mute
        audiowork.muted = true
        audiorest.muted = true
        audiofinish.muted = true
        audio_mute = true
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
            startSiteBuilding();
        });

}

function getServerTime() {
    var date = new Date();
    date.setTime(date.getTime() - offset);
    console.log("Offset local -> server " + offset)
    return date;
}

