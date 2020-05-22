function myFunction() {

//arrayelements[1]["duration"]



 fetch('./static/data/ExerciseList.json').then(function(response) {
  response.json().then(function(exerjson) 
{

exerlist = exerjson['exercises'] // get array exercises from json file


var exercises = ['Superman (alt: Pull Ups)', 'Inch Worm', 'Frog Squats', 'Bird Dog', 'Butt Kicker']

var warmups = ['Jumping Jacks', 'Single Leg Hip Circles',  'Squat Pulses','Glute Bridge','5 Shoulder Circles & Windmill','Burpees']


var  duration_warmup = 25
var  duration_work = 40
var  duration_rest = 10  
var  duration_waterbreak =35
var  rounds = 3


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
        "name": ["workout style: add stuff back in "],
        "duration": 10,
        "gifpath": "",
        "sound": null,
        "indicator": "hidden"
      }]



var index = exerlist.map(function(e) { return e.name; }).indexOf('Inch Worm');
console.log(index)


n = 2
var i;
for (i = 0; i <  exercises.length; i++)
	{

      exer_index = exerlist.map(function(e) { return e.name; }).indexOf(exercises[i]);
      exer_elem = exerlist[exer_index]


 wo1 =     {
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
   
  n = n +1 



 //write part for warm up
  var i;
for (i = 0; i <  warmups.length; i++)
	{
	console.log(warmups[i])	
      exer_index = exerlist.map(function(e) { return e.name; }).indexOf(warmups[i]);
      exer_elem = exerlist[exer_index]

      wu =     {
          "id": n,
          "heading": "Warm Up",
          "name": exer_elem['name'],
          "duration": duration_warmup,
          "gifpath": exer_elem['gifpath'],
          "sound": 'audiowork',
          "indicator": "hidden"
        }
      
      arrayelements.push(wu)
      
      n = n+1
}


 getreadywork = {
        "id": n,
        "heading": "Get Ready to Work Out",
        "name": " Let's go !!!!! ",
        "duration": 5,
        "gifpath": "static/movie/GetReadyToWorkout.mp4",
        "sound": 'audiorest',
        "indicator": "hidden"  
      }

  arrayelements.push(getreadywork)
   
  n = n +1 


/////////////////////  TIMING REGULAR 3 REPEATS       ///////////////////// 



console.log(n)

document.getElementById("demo").innerHTML = JSON.stringify(arrayelements)

   })
 })

}


