var number_of_workouts = 0;
$(document).ready(function () {
    //Create time for the datetimepicker to set -> now plus 2 minutes
    var now = new Date();
    var now_in_2 = new Date().setMinutes(now.getMinutes()+2);


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
        },defaultDate: now_in_2
    });



    fetch('./static/data/ExerciseList.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            number_of_workouts = data['exercises'].length
            parseExercisesToForm(data);
        });
});

function generateRandomWorkout(number) {
    // Uncheck all in case some where selected already
    for (i = 0; i < number_of_workouts; i++) {
        $("#exercise-" + i).attr("checked", false);
        // console.log("uncheck all", i)
    }



    //
    var number_of_random_workouts = number;
    var total_exercises = number_of_workouts;
    var chosenRandomExer = [];


    while(chosenRandomExer.length < number_of_random_workouts){
        var r = Math.floor(Math.random() * total_exercises)+1;
        if(chosenRandomExer.indexOf(r) === -1) chosenRandomExer.push(r);
    }

    for (i = 0; i < number_of_random_workouts; i++) {

        $("#exercise-" + chosenRandomExer[i]).attr("checked", true);

    }

}

function parseExercisesToForm(data) {
    // Filter for categories
    const belly_list = data['exercises'].filter(excercise => excercise.category.includes("belly"));
    const legs_list = data['exercises'].filter(excercise => excercise.category.includes("legs"));
    const core_list = data['exercises'].filter(excercise => excercise.category.includes("core"));
    const arms_list = data['exercises'].filter(excercise => excercise.category.includes("arms"));

    categorys = [core_list,legs_list,belly_list,arms_list]
    $.each(categorys,function (index, category) {
        var wrapper = $("<div class='form-row'></div>")
        $('<h2 class="col-sm-12">'+category[0].category[0]+'</h2>').appendTo(wrapper);
        $.each(category, function (index, elem) {
            $('<div class="col-md-4 mb-3 input-check-exercise"' +
                '>' +
                '<div class="form-check">' +
                ' <input type="checkbox" class="form-check-input" name="' + elem.name + '" id="exercise-' + elem.id + '">' +
                '   <label class="form-check-label" for=excercise-' + elem.id + '>' + elem.name + '</br></label>' +
                '</div></div>').appendTo(wrapper);
        });
        wrapper.appendTo("#excercises-boxes")
    });
}

function submitcheck(element) {
    var selected_rounds = element[0].options[element[0].selectedIndex].value;
    console.log(selected_rounds)
    var selected_duration = element[1].value;
    console.log(selected_duration)
    var selected_date = element[2].value;
    console.log(selected_date)
    var selected_elements = $(element).serializeArray();
    console.log(selected_elements)
    exercise_list = [];
    $.each(selected_elements, function (index, element) {
        exercise_list.push(element.name)
    });

    // Generate HTML List from exercise list for summary
    ul = document.createElement('ul')
    ul.classList.add("list-group");
    console.log("excercise",exercise_list)
    exercise_list.forEach(function (item) {
        let li = document.createElement('li');
        li.classList.add('list-group-item')
        li.style.backgroundColor = "#555"
        ul.appendChild(li);
        li.innerHTML += item;
    });
    $('.modal-body').empty();
    $('.modal-body').append("<h5>Summary</h5>");
    $('.modal-body').append(ul);
    createModal(exercise_list,selected_date,selected_duration,selected_rounds);
    return false;
}

function createModal(exercises, timestamp, duration,rounds) {
    //Here workout.json should be created and saved in jsonbin.io
    $('.modal').modal();
    if(timestamp=="now"){
        timestamp= dayjs().add(20,'seconds').toLocaleString();
    }
    $('#btn-go-to-workout').attr("href", "workout.html?excercises=" + encodeURIComponent(JSON.stringify(exercises)) + "&timestamp=" + timestamp +"&wo_duration=" + duration + "&wo_rounds="+rounds);
    var clipboard = new ClipboardJS('.clipboard-button');
    document.getElementById('next-0-link').value = window.location.hostname+"/workout.html?excercises=" + encodeURIComponent(JSON.stringify(exercises)) + "&timestamp=" + timestamp +"&wo_duration=" + duration + "&rounds="+rounds;

}

function uncheckForCancel(){
    // console.log("cancel",number_of_workouts)
    for (i = 1; i <= number_of_workouts; i++) {
        // console.log($("#exercise-" + i))
        $("#exercise-" + i).attr("checked", false);
    }
}

