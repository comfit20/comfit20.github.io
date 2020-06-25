function generateWorkoutOverview(data2,selected_ids) {
    var data = window.data
    // Generate HTML List from exercise list for summary
    // Generate HTML List from exercise list for summary
    var overview_container = document.createElement('div')
    var cards = document.createElement('div')
    cards.classList = "row m-3";
    var category_list = []
    var exercise_name_list = []
    selected_ids.forEach(function (item) {
        var excercise_obj = data.exercises.filter(obj => {
            return obj.id === parseInt(item)
        })[0]
        category_list.push(excercise_obj.category)
        exercise_name_list.push(excercise_obj.name)
        let card = document.createElement('div');

        //li.classList.add('list-group-item')
        card.classList = "col-md-4 border d-flex p-3 justify-content-center"
        card.style.backgroundColor = "#555"
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
    progress_bar.classList = "progress m3"
    progress_bar.style.height = "30px"

    var color_arr = ["#55ACEE","#292F33","#66757F","#CCD6DD","#E1E8ED","#FFFFFF"];
    var count = 0;
    for (const [key, value] of Object.entries(counts)) {
        let div = document.createElement('div');
        div.classList.add("progress-bar")
        div.innerHTML = key
        var procent_value = (value/total)*100;
        var styleText = "width: "+procent_value.toString()+"%";
        div.style.cssText =styleText;
        div.style.backgroundColor = color_arr[count];
        div.style.height = "30px"
        div.style.fontSize = "large"
        count = count +1
        progress_bar.append(div)
    }

    overview_container.append(progress_bar)
    return overview_container;
};
