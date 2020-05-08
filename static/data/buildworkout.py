import json

with open('ExerciseList.json') as f:
  exerlist = json.load(f)

exerlist = exerlist['exercises']



exercises = ['Squat Walk', 'Jumping Lunges', 'Burpees',
'Plank','Sit Up','Inner Sole Tap', 
'Squat and Knee Tap','Rope Jump','Frog Squats',
'10 High Knee & 3 Tuck Jumps','Crunches', 'Mountain Climber']
#exercises = ['Inner Sole Tap', 'Squat and Knee Tap']

#todo: write the same code for warm up list

warmups = ['Jumping Jacks', 'Butt Kicker', 'Squat Pulses','5 Shoulder Circles & Windmill','Burpees']#'Glute bridge','Single Leg Hip Circles', '5 shoulder circles + 2 wind mills',

duration_work = 40
duration_rest = 10
duration_warmup = 25


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
      "heading": "Introduction to workouts: 40 work, 10 rest, 3 rounds",
      "name": exercises,
      "duration": 5,
      "gifpath": "",
      "sound": None
    }]

##### introduction to workout
n = 2

for i in range(len(exercises)):

    exer_index = next((index for (index, d) in enumerate(exerlist) if d["name"] == exercises[i]), None)
    exer_elem = exerlist[exer_index]

    wo1 =     {
        "id": n,
        "heading": "Introduction to workouts",
        "name": exer_elem['name'],
        "duration": 10,
        "gifpath": exer_elem['gifpath'],
        "sound": None
      }
    

    arrayelements.append(dict(wo1))
    
    n = n+1
    print(n)

getreadywu = {
      "id": n,
      "heading": "Get Ready to Warm Up",
      "name": " Let's go !!!!! ",
      "duration": 10,
      "gifpath": "static/movie/getready.mp4",
      "sound": None
    }

arrayelements.append(dict(getreadywu))
 
n = n +1 


#write part for warm up
for i in range(len(warmups)):
    #print(len(warmups))
    exer_index = next((index for (index, d) in enumerate(exerlist) if d["name"] == warmups[i]), None)
    exer_elem = exerlist[exer_index]
    #print(exer_index)
    #print(exer_elem)
    wu =     {
        "id": n,
        "heading": "Warm Up",
        "name": exer_elem['name'],
        "duration": duration_warmup,
        "gifpath": exer_elem['gifpath'],
        "sound": 'audiowork'
      }
    
    arrayelements.append(dict(wu))
    
    n = n+1
    print(n)




getreadywork = {
      "id": n,
      "heading": "Get Ready to Work Out",
      "name": " Let's go !!!!! ",
      "duration": 5,
      "gifpath": "static/movie/getready.mp4",
      "sound": None
    }

arrayelements.append(dict(getreadywork))
 
n = n +1 
print(n)

################# TIMING 3 repeats ##### todo: add script for different timing

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
		      "name": "Up Next: "+ exercises[0],
		      "duration": 35,
		      "gifpath": "static/movie/WaterRefill.mp4",
          "sound": 'audiorest'
		    }

		n = n+1 

		arrayelements.append(dict(water))

	rounds = rounds-1


workout = {'startTime': 'now', 'elements': arrayelements}

#print(workout)

with open('workout1.json', 'w') as fp:
    json.dump(workout, fp)



