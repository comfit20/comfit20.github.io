function generateWorkoutOverview(excercise_json,selected_ids) {

    // Colors to use for each category
    var colors = {"core":"#55ACEEC0","belly":"#292F33C0","arms":"#66757FC0","legs":"#CCD6DDC0","reserve1":"#E1E8EDC0","reserve2":"#FFFFFFC0"};

    var data = excercise_json // todo: better name than data again

    // Generate HTML List from exercise list for summary
    var overview_container = document.createElement('div')
    var cards = document.createElement('div')
    cards.classList = "row m-3 p-3";
    cards.style.backgroundColor = "#555";
    var category_list = []
    var exercise_name_list = []
    selected_ids.forEach(function (item) {
        var excercise_obj = data.exercises.filter(obj => {
            return obj.id === parseInt(item)
        })[0]
        category_list.push(excercise_obj.category)
        exercise_name_list.push(excercise_obj.name)
        let card = document.createElement('div');

        card.classList = "col-md-4 border d-flex p-3 justify-content-center";
        card.style.backgroundColor = colors[excercise_obj.category];
        card.innerHTML += excercise_obj.name;
        cards.appendChild(card);

    });
    overview_container.append(cards)

    var counts = {}
    category_list.forEach((el) => {
        counts[el] = counts[el] ? (counts[el] += 1) : 1;
    });
    var total = selected_ids.length;
    let progress_bar = document.createElement('div');
    progress_bar.classList = "m-3"
    progress_bar.style.backgroundColor = "#555"

    var count = 0;
    for (const [key, value] of Object.entries(counts)) {
        let outer_span = document.createElement('button')
        outer_span.classList = "btn btn-primary m-2"
        outer_span.style.backgroundColor = colors[key];
        outer_span.style.borderColor = colors[key];
        outer_span.style.pointerEvents = 'none';
        let badge = document.createElement('span');
        badge.classList = 'badge badge-light ml-3'
        badge.innerHTML = value
        outer_span.innerHTML = key
        outer_span.append(badge)
        progress_bar.append(outer_span)
    }

    overview_container.append(progress_bar)
    return overview_container;
};
