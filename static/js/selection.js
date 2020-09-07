var number_of_workouts = 0;

$(document).ready(function () {
    // Initialize tooltip that is shown when hovering over the copy button
    $('.clipboard-button').tooltip()

    // Initialize datepicker object
    $('#datetimepicker1').datetimepicker({
        // format: 'YYYY/MM/DD'
        debug: false,
        icons: {
            time: 'far fa-clock',
            date: 'far fa-calendar-alt',
            up: 'fas fa-arrow-up',
            down: 'fas fa-arrow-down',
            previous: 'fas fa-chevron-left',
            next: 'fas fa-chevron-right',
            today: 'far fa-calendar-check',
            clear: 'far fa-trash-alt',
            close: 'fas fa-times'
        },defaultDate: now_in_2,minDate: now_in_2
    });

    //Create default time for the datetimepicker to set -> now plus 2 minutes
    var now_in_2 = new Date(getDateIn2Minutes());


    // Load list with all possible Excercises. This is used to generate the checkboxes for
    // the Excercises
    fetch('./static/data/ExerciseList.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            number_of_workouts = data['exercises'].length
            //Make data global available so we can use it in the methods below
            window.data = data

            // Generate the selection
            parseExercisesToForm(data);

           // Once page is build, show it and hide spinner which is used as placeholder while loading
            $("#wait-spinner").css("visibility","hidden");
            $("#main-content").css("visibility","visible");
        });

});

// Method for generating a random workout. Checks randomly checkboxes, based
// on the number thats provided as argument -> Number = 5, 5 random workouts
function generateRandomWorkout(number) {
    // Uncheck all in case some where selected already
    for (i = 0; i < number_of_workouts; i++) {
        $("#exercise-" + i).attr("checked", false);
    }

    var number_of_random_workouts = number;
    var total_exercises = number_of_workouts;

    // Generate list with random numbers
    var chosenRandomExer = [];
    while(chosenRandomExer.length < number_of_random_workouts){
        var r = Math.floor(Math.random() * total_exercises)+1;
        if(chosenRandomExer.indexOf(r) === -1) chosenRandomExer.push(r);
    }

    // Check the boxes that correspond to these random numbers
    for (i = 0; i < number_of_random_workouts; i++) {
        $("#exercise-" + chosenRandomExer[i]).attr("checked", true);
    }

}

// Uses ExcerciseList to generate the checkbox overview with all the workouts
// For each category the view is generated and then appended to the html page
function parseExercisesToForm(data) {

    // Filter for categories
    const belly_list = data['exercises'].filter(excercise => excercise.category.includes("belly"));
    const legs_list = data['exercises'].filter(excercise => excercise.category.includes("legs"));
    const core_list = data['exercises'].filter(excercise => excercise.category.includes("core"));
    const arms_list = data['exercises'].filter(excercise => excercise.category.includes("arms"));
    const back_list = data['exercises'].filter(excercise => excercise.category.includes("back"));
    const glutes_list = data['exercises'].filter(excercise => excercise.category.includes("glutes"));

    categorys = [belly_list, back_list, arms_list,core_list,glutes_list,legs_list]
    $.each(categorys,function (index, category) {
        var wrapper = $("<div class='form-row'></div>")
        $('<h2 class="col-sm-12">'+category[0].category[0]+'</h2>').appendTo(wrapper);
        $.each(category, function (index, elem) {
            difficulty_icon= 'question'
            if (elem.level == 'hard') {
                difficulty_icon = 'square" data-fa-transform="rotate-45" style="color:black '
            } else if (elem.level == 'middle') {
                difficulty_icon = 'square" style="color:blue'
            }
            else if (elem.level == 'easy') {
                difficulty_icon = 'circle" style="color:green'
            }
            var webm_path = elem.gifpath.substr(0, elem.gifpath.lastIndexOf(".")) + ".webm";
            $('<div class="col-md-4 mb-3 input-check-exercise">' +
              '   <div class="d-flex rounded border justify-content-between align-items-center">' +
              '       <div class="form-check ml-1">' +
              '         <div class="hover-div">' +
              '           <label class="form-check-label">' +
              '              <input type="checkbox" class="form-check-input" name="' + elem.id +
                                                                  '" id="exercise-' + elem.id + '">'
                                                                   + elem.name +
                          '</label>' +
              '         </div>' +
              '         <div class="hide">' +
              '           <video id="vid-' + elem.id + '" playsinline autoplay loop muted>\n' +
              '             <source src="' + elem.gifpath + '" type="video/mp4" />\n' +
              '             <source src="' + webm_path + '" type="video/webm" />\n' +
              '         </div>' +
              '       </div>' +
              '     <div><i class="fa fa-fw fa-' + difficulty_icon + ';"></i></div>' +
              '  </div>' +
              '</div>').appendTo(wrapper);
        });
        wrapper.appendTo("#excercises-boxes");
    });
}
function getDateIn2Minutes() {
    var now = dayjs()
    var now_plus_2 = now.add(1,'minute'); //decreased it to 1 min
    return now_plus_2;
}

// This function is called when the user presses create workout. The form gets submitted
// And this function is called
function submitcheck(element) {
    var selected_rounds = element[0].options[element[0].selectedIndex].value;
    var duration_wo = element[1].value;
    var duration_rest = element[2].value;
    var selected_date = element[3].value;
    console.log(selected_date)
    var selected_elements = $(element).serializeArray();
    shuffle(selected_elements)
    // the name property of the selected elements includes the ids of the selected elements, not the acutal name
    exercise_id_list = [];
    $.each(selected_elements, function (index, element) {
        exercise_id_list.push(element.name)
    });

    // If no excercise was selected
    if(exercise_id_list.length==0){
        $("#error-message").text("Please select at least one workout.");
        $("#error-message").animate({ opacity: 1 })
        $('#error-message').delay(1000).animate({ opacity: 0 })
        return false;
    }

    // Transform id list to name list for url: TODO: switch url to only use ids (makes it shorter)
    var exercise_name_list = []
    exercise_id_list.forEach(function (item) {
        var excercise_obj = data.exercises.filter(obj => {
            return obj.id === parseInt(item)
        })[0]
        exercise_name_list.push(excercise_obj.name)});

    // Generate HTML List from exercise list for summary
    console.log(window.data.excercises,exercise_id_list);
    var overview = generateWorkoutOverview(window.data,exercise_id_list);

    $('.modal-body').empty();
    $('.modal-body').append("<h5>Summary</h5>");
    $('.modal-body').append(overview);


    //create object for the url
    var url_builder_obj = {}
    url_builder_obj["excercises"] = JSON.stringify(exercise_name_list)
    var selected = dayjs(selected_date.toString())
    // Check if selected date is over. If so, take now and add 2 minutes for starting time
    if(selected.isBefore(dayjs())){
        selected_date = getDateIn2Minutes().toLocaleString()
    }
    url_builder_obj["timestamp"] = selected_date
    url_builder_obj["wo_duration"] = duration_wo
    url_builder_obj["rest_duration"] = duration_rest
    url_builder_obj["wo_rounds"] = selected_rounds

    createModal(url_builder_obj);
    return false;
}


/** from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Bootstrap Modal is created here. this modal gets visible is the workout is
// Generated and a overview is shown.
function createModal
(url_object) {
    //Create url from object
    var url_parameters = $.param(url_object);

    //Show modal
    $('.modal').modal();

    //Add link to created workout to button and clipboard
    $('#btn-go-to-workout').attr("href", "workout.html?"+url_parameters);
    var clipboard = new ClipboardJS('.clipboard-button');
    document.getElementById('next-0-link').value = window.location.hostname+"/workout.html?"+url_parameters;

}

function uncheckForCancel(){
    for (i = 1; i <= number_of_workouts; i++) {
        $("#exercise-" + i).attr("checked", false);
    }
}
