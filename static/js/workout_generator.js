function generateWorkoutJson(duration_work,rounds,exerjson,exercises,duration_rest, style_variant) {
    var workout = {};

    var exerlist  = exerjson['exercises'] // get array exercises from json file
    var applaus = 1 //random.randint(1,2)

    var warmups = ['Jumping Jacks', 'Single Leg Hip Circles', 'Squat Pulses', 'Glute Bridge', '5 Shoulder Circles & Windmill', 'Burpees']


    console.log('this is input style'+typeof(style_variant))


    duration_work = parseInt(duration_work)
    rounds = parseInt(rounds)
    duration_rest = parseInt(duration_rest)

    workoutstyle = parseInt(style_variant)

    // console.log('thats the style'+ workoutstyle )

    var duration_warmup = 25

    if (workoutstyle == 1 ) {
        console.log('this is regular')


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
            var n = 2
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

    } // bracket for workoutstyle


////////// combine everything for all styles the same 
workout = {"startTime": "now", "elements": arrayelements}

//document.getElementById("demo").innerHTML = JSON.stringify(workout)
return workout;

} // bracket for whole function
;



// /////////////////////////////////////////////////////////////////WRKOUT STYLE DEDCREASE //////////////////

// if (workoutstyle == 2 ) {

//   var duration_work = 60
//   var duration_time2 = 60-20
//   var duration_time3 = 60-40
//   var duration_rest = 15
//   var duration_waterbreak =45
//   var rounds = 3 


//   arrayelements = []
//   arrayelements = [{
//     "id": 0,
//     "heading": "Wait for Group Session",
//     "name": "Session will start soon",
//     "duration": 12,
//     "gifpath": "static/movie/waitnextworkout.mp4",
//     "sound": null,
//     "indicator": "hidden"
// },
// {
//     "id": 1,
//     "heading": "Workout Timing:",
//     "name": ["workout style: decrease", exercises.length+" exercises", duration_work+', '+duration_time2+', '+duration_time3+" sec work", duration_rest+ " sec rest", rounds+" rounds"],
//     "duration": 10,
//     "gifpath": "",
//     "sound": null,
//     "indicator": "hidden"
// }]


//   //// introduction to workout
//   var n = 2
//   var i;
//   for (i = 0; i < exercises.length; i++) {

//     exer_index = exerlist.map(function (e) {
//         return e.name;
//     }).indexOf(exercises[i]);
//     exer_elem = exerlist[exer_index]


//     wo1 =     {
//       "id": n,
//       "heading": "Introduction to exercises",
//       "name": exer_elem['name'],
//       "duration": 10,
//       "gifpath": exer_elem['gifpath'],
//       "sound": null,
//       "indicator": "hidden"
//   }


//   arrayelements.push(wo1)
//   n = n+1
// }

// getreadywu = {
//     "id": n,
//     "heading": "Get Ready to Warm Up",
//     "name": " Let's go !!!!! ",
//     "duration": 10,
//     "gifpath": "static/movie/getready.mp4",
//     "sound": null,
//     "indicator": "hidden"
// }

// arrayelements.push(getreadywu)


// n = n +1 

// //// WARM UP
// var i;
// for (i = 0; i < warmups.length; i++) {
//     var exer_index = exerlist.map(function (e) {
//         return e.name;
//     }).indexOf(warmups[i]);
//     var exer_elem = exerlist[exer_index]

//     wu = {
//         "id": n,
//         "heading": "Warm Up",
//         "name": exer_elem['name'],
//         "duration": duration_warmup,
//         "gifpath": exer_elem['gifpath'],
//         "sound": 'audiowork',
//         "indicator": "hidden"
//     }

//     arrayelements.push(wu)

//     n = n + 1
// }  

// getreadywork = {
//     "id": n,
//     "heading": "Get Ready to Work Out",
//     "name": " Let's go: "+exercises[0],
//     "duration": 5,
//     "gifpath": "static/movie/GetReadyToWorkout.mp4",
//     "sound": 'audiorest',
//     "indicator": "hidden"  
// }

// arrayelements.push(getreadywork)

// n = n +1 


//   // ################# TIMING 3 repeats ##### workoutstyle decrease 


//   var gifpath_next = []

//   for (i = 0; i <  exercises.length; i++) {
//     var exer_index_next = exerlist.map(function (e) {
//         return e.name;
//     }).indexOf(exercises[i]); 
//     var exer_elem_next = exerlist[exer_index_next]
//     gifpath_next.push(exer_elem_next['gifpath'])
// }

// }
// while (rounds > 0) {

//     var i;
//     for (i = 0; i < exercises.length; i++) {
//                 // console.log(exercises.length)
//                 var exer_index = exerlist.map(function (e) {
//                     return e.name;
//                 }).indexOf(exercises[i]);
//                 var exer_elem = exerlist[exer_index]

//                 wo1 = {
//                     "id": n,
//                     "heading": "Work",
//                     "name": exer_elem['name'],
//                     "duration": duration_work,
//                     "gifpath": exer_elem['gifpath'],
//                     "sound": 'audiowork',
//                     "indicator": "exer_visible"
//                 }


//                 arrayelements.push(wo1)


//                 if (i < exercises.length - 1) {
//                     rest = {
//                       "id": n+1,
//                       "heading": "Rest",
//                       "name": "Up Next", 
//                       "duration": duration_rest,
//                       "gifpath": gifpath_next[i + 1],
//                       "sound": 'audiorest',
//                       "indicator": "hidden"
//                   }

//                   arrayelements.push(rest)
//               }

//               n = n+2

//           }

//           if (rounds == 1){
//               break 
//           } else {
//               n = n-1
//               water =     {
//                 "id": n,
//                 "heading": "Water Break",
//                 "name": "Up Next: "+ exercises[0],
//                 "duration": duration_waterbreak,
//                 "gifpath": "static/movie/WaterRefill.mp4",
//                 "sound": 'audiorest',
//                 "indicator": "water_break"
//             }

//             n = n+1 


//             arrayelements.push(water)
//         }

//         rounds = rounds-1
//         duration_work = duration_work - 20
//         duration_waterbreak =  duration_waterbreak - 20
//         duration_rest = duration_rest - 5
//     }


//     n = n-1

//     finished = {
//         "id": n,
//         "heading": "Congrats You Finished",
//         "name": " Well Done !!!!! ",
//         "duration": 20,
//         "gifpath": "static/movie/Applause1.mp4",//+str(applaus)+".mp4",
//         "sound": 'audiofinish',
//         "indicator": "hidden"
//     }

//     arrayelements.push(finished)

//end of workoutstyle decrease



// //////////////////////////////////////// workoutstyle increase //////////

// if (workoutstyle == 3){

//   var duration_work = 20
//   var duration_time2 = 40
//   var duration_time3 = 60
//   var duration_rest = 5
//   var duration_waterbreak = 15
//   var rounds = 3

//   arrayelements = [{
//         "id": 0,
//         "heading": "Wait for Group Session",
//         "name": "Session will start soon",
//         "duration": 12,
//         "gifpath": "static/movie/waitnextworkout.mp4",
//         "sound": null,
//         "indicator": "hidden"
//       },
//       {
//         "id": 1,
//         "heading": "Workout Timing:",
//         "name": ["workout style: increase", exercises.length+" exercises", duration_work+ ", " +duration_time2 +", " +duration_time2 + " sec", duration_rest+ " sec rest", rounds+" rounds"],
//         "duration": 10,
//         "gifpath": "",
//         "sound": null,
//         "indicator": "hidden"
//       }]

//   // ##### introduction to workout
//   var n = 2

//     var i;
//     for (i = 0; i < exercises.length; i++) {

//         exer_index = exerlist.map(function (e) {
//             return e.name;
//         }).indexOf(exercises[i]);
//         exer_elem = exerlist[exer_index]

//       wo1 =     {
//           "id": n,
//           "heading": "Introduction to exercises",
//           "name": exer_elem['name'],
//           "duration": 10,
//           "gifpath": exer_elem['gifpath'],
//           "sound": null,
//           "indicator": "hidden"
//         }


//       arrayelements.push(wo1)

//       n = n+1
//    }

//   // getreadywu = {
//   //       "id": n,
//   //       "heading": "Get Ready to Warm Up",
//   //       "name": " Let's go !!!!! ",
//   //       "duration": 10,
//   //       "gifpath": "static/movie/getready.mp4",
//   //       "sound": null,
//   //       "indicator": "hidden"
//   //     }

//   // arrayelements.append(dict(getreadywu))

//   // n = n +1 


//   // #write part for warm up
//   // for i in range(len(warmups)):
//   //     #print(len(warmups))
//   //     exer_index = next((index for (index, d) in enumerate(exerlist) if d["name"] == warmups[i]), null)
//   //     exer_elem = exerlist[exer_index]
//   //     #print(exer_index)
//   //     #print(exer_elem)
//   //     wu =     {
//   //         "id": n,
//   //         "heading": "Warm Up",
//   //         "name": exer_elem['name'],
//   //         "duration": duration_warmup,
//   //         "gifpath": exer_elem['gifpath'],
//   //         "sound": 'audiowork',
//   //         "indicator": "hidden"
//   //       }

//   //     arrayelements.append(dict(wu))

//   //     n = n+1
//   //     #print(n)




//   // getreadywork = {
//   //       "id": n,
//   //       "heading": "Get Ready to Work Out",
//   //       "name": " Let's go: "+exercises[0],
//   //       "duration": 5,
//   //       "gifpath": "static/movie/GetReadyToWorkout.mp4",
//   //       "sound": 'audiowork',
//   //       "indicator": "hidden"  
//   //     }

//   // arrayelements.append(dict(getreadywork))

//   // n = n +1 
//   // #print(n)

//   // ################# TIMING 3 repeats #####

//   // cal_work =  []
//   // gifpath_next = []
//   // for i in range(len(exercises)-1):

//   //   exer_index_next = next((index for (index, d) in enumerate(exerlist) if d["name"] == exercises[i+1]), null)
//   //   exer_elem_next = exerlist[exer_index_next]
//   //   gifpath_next.append(exer_elem_next['gifpath']) 




//   // while (rounds > 0):

//   //   for i in range(len(exercises)):

//   //     exer_index = next((index for (index, d) in enumerate(exerlist) if d["name"] == exercises[i]), null)
//   //     exer_elem = exerlist[exer_index]

//   //     wo1 =     {
//   //         "id": n,
//   //         "heading": "Work",
//   //         "name": exer_elem['name'],
//   //         "duration": duration_work,
//   //         "gifpath": exer_elem['gifpath'],
//   //         "sound": 'audiowork',
//   //         "indicator": "exer_visible"
//   //       }


//   //     arrayelements.append(dict(wo1))

//   //     if i < len(exercises)-1:
//   //       #print('hello worlds')
//   //       rest = {
//   //         "id": n+1,
//   //         "heading": "Rest",
//   //         "name": "Up Next", #+exercises[i+1],
//   //         "duration": duration_rest,
//   //         "gifpath": gifpath_next[i],
//   //         "sound": 'audiorest',
//   //         "indicator": "hidden"
//   //         }

//   //       arrayelements.append(dict(rest))

//   //       cal_work.append(duration_work) #ti calculate amount of time for checking

//   //     n = n+2

//   //   if rounds == 1:
//   //     break 
//   //   else:
//   //     n = n-1
//   //     water =     {
//   //           "id": n,
//   //           "heading": "Water Break",
//   //           "name": "Up Next: "+ exercises[0],
//   //           "duration": duration_waterbreak,
//   //           "gifpath": "static/movie/WaterRefill.mp4",
//   //           "sound": 'audiorest',
//   //           "indicator": "water_break"
//   //         }

//   //     n = n+1 


//   //     arrayelements.append(dict(water))
//   //     print(duration_waterbreak)

//   //   rounds = rounds-1
//   //   duration_work = duration_work + 20
//   //   duration_waterbreak =  duration_waterbreak + 25
//   //   duration_rest = duration_rest + 5


//   // n = n-1
//   // #print(n)

//   // finished = {
//   //       "id": n,
//   //       "heading": "Congrats You Finished",
//   //       "name": " Well Done !!!!! ",
//   //       "duration": 20,
//   //       "gifpath": "static/movie/Applause"+str(applaus)+".mp4",
//   //       "sound": 'audiofinish',
//   //       "indicator": "hidden"  
//   //     }

//   // arrayelements.append(dict(finished))



// }



//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////





