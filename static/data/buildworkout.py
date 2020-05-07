import json

with open('ExerciseList.json') as f:
  exerlist = json.load(f)

exerlist = exerlist['exercises']


exercises = ['Inner Sole Tap', 'Squat and Knee Tap','Frog Squats','10 High Knee & 3 Tuck Jumps','Crunches', 'Mountain Climber']
#exercises = ['Inner Sole Tap', 'Squat and Knee Tap']

#todo: write the same code for warm up list

warmups = ['Jumping Jacks', 'Single Leg Hip Circles', 'Squat Pulses', 'Glute bridge', '5 shoulder circles + 2 wind mills', 'Burpees']

duration_work = 5
duration_rest = 3
duration_warmup = 2


arrayelements = [{
      "id": 0,
      "heading": "Wait for Group Session",
      "name": "Session will start soon",
      "duration": 0,
      "gifpath": "static/movie/waitnextworkout.mp4",
      "sound": None
    },
    {
      "id": 1,
      "heading": "Introduction to workouts",
      "name": exercises,
      "duration": 10,
      "gifpath": "",
      "sound": None
    },
    {
      "id": 2,
      "heading": "Get Ready to Warm Up",
      "name": " Let's go !!!!! ",
      "duration": 10,
      "gifpath": "static/movie/getready.mp4",
      "sound": None
    },
    {
      "id": 3,
      "heading": "Warm Up",
      "name": "Jumping Jacks",
      "duration": duration_warmup,
      "gifpath": "static/movie/JumpingJack.mp4",
      "sound": 'audiowork'
    },

    {
      "id": 4,
      "heading": "Warm Up",
      "name": "Squat Pulses",
      "duration": duration_warmup,
      "gifpath": "static/movie/SquatPulses.mp4",
      "sound": 'audiowork'
    },

    {
      "id": 5,
      "heading": "Warm Up",
      "name": "5 Shoulder Circles & Windmill",
      "duration": duration_warmup,
      "gifpath": "static/movie/ShouldrCircles.mp4",
      "sound": 'audiowork'
    }]



################# TIMING 3 repeats ##### todo: add script for different timing
n = 6

rounds = 3

while (rounds > 0):

	for i in range(len(exercises)):

		exer_index = next((index for (index, d) in enumerate(exerlist) if d["name"] == exercises[i]), None)
		exer_elem = exerlist[exer_index]

		wo1 =     {
	      "id": n,
	      "heading": "Workout Time",
	      "name": exer_elem['name'],
	      "duration": duration_work,
	      "gifpath": exer_elem['gifpath'],
        "sound": 'audiowork'
	    }
		

		arrayelements.append(dict(wo1))

		if i < len(exercises)-1:
	 		#print('hello worlds')
			rest = {
		    "id": n+1,
		    "heading": "Rest",
		    "name": "Up Next: "+exercises[i+1],
		    "duration": duration_rest,
		    "gifpath": "static/movie/Rest1.mp4",
        "sound": 'audiorest'
		    }

			arrayelements.append(dict(rest))

		n = n+2

	if rounds == 1:
		break 
	else:
		n = n-1
		water =     {
		      "id": n,
		      "heading": "Water Break",
		      "name": "Up Next"+ exercises[0],
		      "duration": 4,
		      "gifpath": "static/movie/WaterRefill.mp4",
          "sound": 'audiorest'
		    }

		n = n+1 

		arrayelements.append(dict(water))

	rounds = rounds-1


workout = {'startTime': 'now', 'elements': arrayelements}

print(workout)

with open('workout1.json', 'w') as fp:
    json.dump(workout, fp)



