// To do:
// Add first half of yoga1.json as warmup (through sphinx pose) 
// - Other warmup exercises need to be added to ExerciseList
// Then selected poses - Check!
// The from figure four left at end
// - Same as for warmup
// Try to save json file from share workout. - Done!

// allow multiple selections?
// Have preferences in custom pane, create random yoga class
// Remove rounds of exercises - Done
// Change duration in share your workout
// Make links to older classes available (preset) -Done!

// Name workouts
// Rebase with main branch -Done!

// Merge in 2 weeks

function generateWorkoutJson(duration_work, exerjson, exercises) {
    var workout = {};

    var exerlist  = exerjson['exercises'] // get array exercises from json file

    // var applaus = 1 //random.randint(1,2)

    var warmups = ['Find a comfortable seated position',
    'Take five deep breaths. Then begin constricting your breath on the exhale (as though you are fogging a mirror) for ujjayi breathing.',
    'Shoulder warm up',
    'Come to all fours with shoulders over wrists and hips over knees. Inhale cow, exhale cat',
    'Thread the needle',
    'childs pose']
    var cooldown = ['Figure four',
    'Gentle twist',
    'corpse pose']


    duration_work = parseInt(duration_work)

    var duration_warmup = 25
    var duration_cooldown = 25

    var arrayelements = [{
        "id": 0,
        "heading": "Wait for Group Session",
        "name": "Session will start soon",
        "duration": 0,
        "gifpath": "static/movie/waitnextworkout.mp4",
        "sound": null,
        "indicator": "hidden"
    }]

    n = 1

    // Introduction to exercises: 
    // var i;
    // for (i = 0; i < exercises.length; i++) {

    //     exer_index = exerlist.map(function (e) {
    //         return e.name;
    //     }).indexOf(exercises[i]);
    //     exer_elem = exerlist[exer_index]


    //     wo1 = {
    //         "id": n,
    //         "heading": "Introduction to exercises",
    //         "name": exer_elem['name'],
    //         // exer_elem['name'],
    //         "duration": 10,
    //         "gifpath": exer_elem['gifpath'],
    //         "sound": null,
    //         "indicator": "hidden"
    //     }

    //     arrayelements.push(wo1)

    //     n = n + 1
    // }


    // Warmups:
    var i;
    for (i = 0; i < warmups.length; i++) {
        var exer_index = exerlist.map(function (e) {
            return e.name;
        }).indexOf(warmups[i]);
        var exer_elem = exerlist[exer_index]

        wu = {
            "id": n,
            "heading": "Warm Up",
            "name": exer_elem['name'],
            "duration": duration_warmup,
            "gifpath": exer_elem['gifpath'],
            "sound": 'audioyoga',
            "indicator": "hidden"
        }

        arrayelements.push(wu)

        n = n + 1
    }


    var gifpath_next = []

    // Selected exercises: 

    for (i = 0; i <  exercises.length; i++) {
        var exer_index_next = exerlist.map(function (e) {
            return e.name;
        }).indexOf(exercises[i]); 
        var exer_elem_next = exerlist[exer_index_next]
        gifpath_next.push(exer_elem_next['gifpath'])
    }

    for (i = 0; i < exercises.length; i++) {
        var exer_index = exerlist.map(function (e) {
            return e.name;
        }).indexOf(exercises[i]);
        var exer_elem = exerlist[exer_index]

        wo1 = {
            "id": n,
            "heading": "Yoga",
            "name": exer_elem['name'],
            "duration": duration_work,
            "gifpath": exer_elem['gifpath'],
            "sound": 'audioyoga',
            "indicator": "exer_visible"
        }

        arrayelements.push(wo1)

        n = n + 1

    }

    // Cooldown: 

    for (i = 0; i < cooldown.length; i++) {
        var exer_index = exerlist.map(function (e) {
            return e.name;
        }).indexOf(cooldown[i]);
        var exer_elem = exerlist[exer_index]

        cd = {
            "id": n,
            "heading": "Cool Down",
            "name": exer_elem['name'],
            "duration": duration_cooldown,
            "gifpath": exer_elem['gifpath'],
            "sound": 'audioyoga',
            "indicator": "hidden"
        }

        arrayelements.push(cd)

        n = n + 1
    }

    workout = {"startTime": "now", "elements": arrayelements}

    return workout;
};


