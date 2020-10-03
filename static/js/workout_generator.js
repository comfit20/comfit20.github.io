function generateWorkoutJson(duration_work,rounds,exerjson,exercises,duration_rest) {
    var workout = {};

        var exerlist  = exerjson['exercises'] // get array exercises from json file
        var applaus = 1 //random.randint(1,2)

        var warmups = ['Jumping Jacks', 'Single Leg Hip Circles', 'Squat Pulses', 'Glute Bridge', '5 Shoulder Circles & Windmill', 'Burpees']


// var duration_rest = 10

duration_work = parseInt(duration_work)
rounds = parseInt(rounds)
duration_rest = parseInt(duration_rest)
console.log('thats the rest time'+ duration_rest)

//rounds = 3

// here include different workout styles
// #different workouts:
//   regular 12 exercises, 40 s *3 = 120 s; * 1440 s = 24 minutes work, + 6 min rest
//   increase 20, 40, 60 = 120 sec,  12 exercises only one water break? water breaks
//   decrease 60, 40, 20 = 120 sec,  12 exercises water breaks
//   repeat_iso 10 exercise 3*45 no water break
//   repeat_diff erenttimes 10 exercise 45 + 25 + 45 + 25 (1400); no water break


        var duration_warmup = 25
        // var duration_rest = 10
        var duration_waterbreak = 35


        var arrayelements = [{
            "id": 0,
            "heading": "Wait for Group Session",
            "name": "Session will start soon",
            "duration": 0,
            "gifpath": "static/movie/waitnextworkout.mp4",
            "sound": null,
            "indicator": "hidden"
        },
            {
                "id": 1,
                "heading": "Workout Timing:",
                "name": ["workout style: regular",exercises.length+" exercises", duration_work+ " sec work", duration_rest+ " sec rest", rounds+" rounds" ],
                // str(duration_rest)+ " sec arms", str(rounds)+" rounds"]
                "duration": 10,
                "gifpath": "",
                "sound": null,
                "indicator": "hidden"
            }]


        // var index = exerlist.map(function (e) {
        //     return e.name;
        // }).indexOf('Inch Worm');
        // console.log(index)


        n = 2
        var i;
        for (i = 0; i < exercises.length; i++) {

            exer_index = exerlist.map(function (e) {
                return e.name;
            }).indexOf(exercises[i]);
            exer_elem = exerlist[exer_index]


            wo1 = {
                "id": n,
                "heading": "Introduction to exercises",
                "name": exer_elem['name'],
                // exer_elem['name'],
                "duration": 10,
                "gifpath": exer_elem['gifpath'],
                "sound": null,
                "indicator": "hidden"
            }

            arrayelements.push(wo1)

            n = n + 1
        }

        getreadywu = {
            "id": n,
            "heading": "Get Ready to Warm Up",
            "name": " Let's go !!!!! ",
            "duration": 10,
            "gifpath": "static/movie/getready.mp4",
            "sound": null,
            "indicator": "hidden"
        }

        arrayelements.push(getreadywu)

        n = n + 1


        //write part for warm up
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
                "sound": 'audiowork',
                "indicator": "hidden"
            }

            arrayelements.push(wu)

            n = n + 1
        }


        getreadywork = {
            "id": n,
            "heading": "Get Ready to Work Out",
            "name": " Let's go: "+exercises[0],
            "duration": 5,
            "gifpath": "static/movie/GetReadyToWorkout.mp4",
            "sound": 'audiorest',
            "indicator": "hidden"
        }

        arrayelements.push(getreadywork)

        n = n + 1

/////////////////////  TIMING REGULAR 3 REPEATS       /////////////////////

        var gifpath_next = []

        for (i = 0; i <  exercises.length; i++) {
            var exer_index_next = exerlist.map(function (e) {
                return e.name;
            }).indexOf(exercises[i]); 
            var exer_elem_next = exerlist[exer_index_next]
            gifpath_next.push(exer_elem_next['gifpath'])
        }
        
        while (rounds > 0) {

            var i;
            for (i = 0; i < exercises.length; i++) {
                // console.log(exercises.length)
                var exer_index = exerlist.map(function (e) {
                    return e.name;
                }).indexOf(exercises[i]);
                var exer_elem = exerlist[exer_index]

                wo1 = {
                    "id": n,
                    "heading": "Work",
                    "name": exer_elem['name'],
                    "duration": duration_work,
                    "gifpath": exer_elem['gifpath'],
                    "sound": 'audiowork',
                    "indicator": "exer_visible"
                }

                arrayelements.push(wo1)

                if (i < exercises.length - 1) {
                    rest = {
                        "id": n + 1,
                        "heading": "Rest",
                        "name": "Next: "+exercises[i + 1],
                        "duration": duration_rest,
                        "gifpath": gifpath_next[i + 1],
                        "sound": 'audiorest',
                        "indicator": "hidden"
                    }

                    arrayelements.push(rest)
                }

                n = n + 2

            }

            if (rounds == 1) {
                break
            } else {
                n = n - 1
                water = {
                    "id": n,
                    "heading": "Water Break",
                    "name": "Next: "+exercises[0],
                    "duration": duration_waterbreak,
                    "gifpath": "static/movie/WaterRefill.mp4",
                    "sound": 'audiorest',
                    "indicator": "water_break"
                }

                n = n + 1


                arrayelements.push(water)
            }

            rounds = rounds - 1
        }

        n = n - 1


        finished = {
            "id": n,
            "heading": "Congrats You Finished",
            "name": " Well Done !!!!! ",
            "duration": 20,
            "gifpath": "static/movie/Applause1.mp4",//+str(applaus)+".mp4",
            "sound": 'audiofinish',
            "indicator": "hidden"
        }

        arrayelements.push(finished)


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
        

        workout = {"startTime": "now", "elements": arrayelements}

//document.getElementById("demo").innerHTML = JSON.stringify(workout)
        return workout;

};


