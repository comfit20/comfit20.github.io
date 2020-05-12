import json
import random

with open('ExerciseList.json') as f:
  exerlist = json.load(f)

exerlist = exerlist['exercises']


exercises = ['Backward Lunge & 3 Pulses', 'Push Up & Side Turn', '2 Squats, 2 Squat Jumps', 'Ice Skater', 'Leg Lift & Hold', 'Static Spiderman',
 '10 Fast Feet & Jump', 'Calf Rises', 'Swimmer',  'Side Plank Crunches', '3 Frog Squats & 6 Plank Jumps', 'Diamond Push Up']


 #'3 Fast Knee Rise', 'Bicycle Crunches','3 Fast Knee Rise', 'Bicycle Crunches','3 Fast Knee Rise', 'Bicycle Crunches','3 Fast Knee Rise', 'Bicycle Crunches','3 Fast Knee Rise', 'Bicycle Crunches','3 Fast Knee Rise', 'Bicycle Crunches']



#exercises = ['Inner Sole Tap', 'Squat and Knee Tap']

#todo: write the same code for warm up list

warmups = ['Jumping Jacks', 'Single Leg Hip Circles',  'Squat Pulses','Glute Bridge','5 Shoulder Circles & Windmill','Burpees']#'Glute bridge','Single Leg Hip Circles', '5 shoulder circles + 2 wind mills',



#different workouts:
  #regular 12 exercises, 40 s *3 = 120 s; * 1440 s = 24 minutes work, + 6 min rest 
  #increase 20, 40, 60 = 120 sec,  12 exercises only one water break? water breaks
  #decrease 60, 40, 20 = 120 sec,  12 exercises water breaks
  #repeat 10 exercise 45 + 20 + 45 + 20; no water break

workoutstyle = 'regular' # change workout styles here

duration_warmup = 25

if workoutstyle == 'regular':

  duration_work = 40
  duration_rest = 10  
  duration_waterbreak =35
  rounds = 3

  applaus = random.randint(1,3)
  print(applaus)


  arrayelements = [{
        "id": 0,
        "heading": "Wait for Group Session",
        "name": "Session will start soon",
        "duration": 0,
        "gifpath": "static/movie/waitnextworkout.mp4",
        "sound": None,
        "indicator": "hidden"
      },
      {
        "id": 1,
        "heading": "Workout Timimg:",
        "name": ["workout style: "+workoutstyle,str(len(exercises))+" exercises", str(duration_work)+ " sec work", str(duration_rest)+ " sec rest", str(rounds)+" rounds", "click anywhere on screen to start sound"],
        # "heading": "Introduction to workouts: 40 work, 10 rest, 3 rounds",
        # "name": exercises,
        "duration": 10,
        "gifpath": "",
        "sound": None,
        "indicator": "hidden"
      }]

  ##### introduction to workout
  n = 2

  for i in range(len(exercises)):

      exer_index = next((index for (index, d) in enumerate(exerlist) if d["name"] == exercises[i]), None)
      exer_elem = exerlist[exer_index]
      print(exer_elem)

      wo1 =     {
          "id": n,
          "heading": "Introduction to workouts",
          "name": exer_elem['name'],
          "duration": 10,
          "gifpath": exer_elem['gifpath'],
          "sound": None,
          "indicator": "hidden"
        }
      

      arrayelements.append(dict(wo1))
      
      n = n+1
      #print(n)

  getreadywu = {
        "id": n,
        "heading": "Get Ready to Warm Up",
        "name": " Let's go !!!!! ",
        "duration": 10,
        "gifpath": "static/movie/getready.mp4",
        "sound": None,
        "indicator": "hidden"
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
          "sound": 'audiowork',
          "indicator": "hidden"
        }
      
      arrayelements.append(dict(wu))
      
      n = n+1
      #print(n)




  getreadywork = {
        "id": n,
        "heading": "Get Ready to Work Out",
        "name": " Let's go !!!!! ",
        "duration": 5,
        "gifpath": "static/movie/getready.mp4",
        "sound": None,
        "indicator": "hidden"  
      }

  arrayelements.append(dict(getreadywork))
   
  n = n +1 
  #print(n)

  ################# TIMING 3 repeats ##### todo: add script for different timing

 

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
          "sound": 'audiowork',
          "indicator": "exer_visible"
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
          "sound": 'audiorest',
          "indicator": "hidden"
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
  		      "duration": duration_waterbreak,
  		      "gifpath": "static/movie/WaterRefill.mp4",
            "sound": 'audiorest',
            "indicator": "water_break"
  		    }

  		n = n+1 
      
      
  		arrayelements.append(dict(water))

     

  	rounds = rounds-1

  n = n-1
  #print(n)

  finished = {
        "id": n,
        "heading": "Congrats You Finished",
        "name": " Well Done !!!!! ",
        "duration": 20,
        "gifpath": "static/movie/Applause"+str(applaus)+".mp4",
        "sound": 'audiofinish',
        "indicator": "hidden"  
      }

  arrayelements.append(dict(finished))

##################################################################### HERE TO BUILD WORKOUTSTYLE INCREASE ############################


if workoutstyle == 'increase':

  duration_work = 20
  duration_rest = 5
  duration_waterbreak = 15
  rounds = 3

  applaus = random.randint(1,3)
  print(applaus)


  arrayelements = [{
        "id": 0,
        "heading": "Wait for Group Session",
        "name": "Session will start soon",
        "duration": 0,
        "gifpath": "static/movie/waitnextworkout.mp4",
        "sound": None,
        "indicator": "hidden"
      },
      {
        "id": 1,
        "heading": "Workout Timimg:",
        "name": ["workout style: "+workoutstyle, str(len(exercises))+" exercises", str(duration_work)+ " sec work + 2*20 sec increase", str(duration_rest)+ " sec rest", str(rounds)+" rounds","click anywhere on screen to start sound"],
        # "heading": "Introduction to workouts: 40 work, 10 rest, 3 rounds",
        # "name": exercises,
        "duration": 10,
        "gifpath": "",
        "sound": None,
        "indicator": "hidden"
      }]

  ##### introduction to workout
  n = 2

  for i in range(len(exercises)):

      exer_index = next((index for (index, d) in enumerate(exerlist) if d["name"] == exercises[i]), None)
      exer_elem = exerlist[exer_index]
      #print(exer_elem)

      wo1 =     {
          "id": n,
          "heading": "Introduction to workouts",
          "name": exer_elem['name'],
          "duration": 10,
          "gifpath": exer_elem['gifpath'],
          "sound": None,
          "indicator": "hidden"
        }
      

      arrayelements.append(dict(wo1))
      
      n = n+1
      #print(n)

  getreadywu = {
        "id": n,
        "heading": "Get Ready to Warm Up",
        "name": " Let's go !!!!! ",
        "duration": 10,
        "gifpath": "static/movie/getready.mp4",
        "sound": None,
        "indicator": "hidden"
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
          "sound": 'audiowork',
          "indicator": "hidden"
        }
      
      arrayelements.append(dict(wu))
      
      n = n+1
      #print(n)




  getreadywork = {
        "id": n,
        "heading": "Get Ready to Work Out",
        "name": " Let's go !!!!! ",
        "duration": 5,
        "gifpath": "static/movie/getready.mp4",
        "sound": None,
        "indicator": "hidden"  
      }

  arrayelements.append(dict(getreadywork))
   
  n = n +1 
  #print(n)

  ################# TIMING 3 repeats #####

  cal_work =  []

  

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
          "sound": 'audiowork',
          "indicator": "exer_visible"
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
          "sound": 'audiorest',
          "indicator": "hidden"
          }

        arrayelements.append(dict(rest))

        cal_work.append(duration_work) #ti calculate amount of time for checking

      n = n+2

    if rounds == 1:
      break 
    else:
      n = n-1
      water =     {
            "id": n,
            "heading": "Water Break",
            "name": "Up Next: "+ exercises[0],
            "duration": duration_waterbreak,
            "gifpath": "static/movie/WaterRefill.mp4",
            "sound": 'audiorest',
            "indicator": "water_break"
          }

      n = n+1 
      
      
      arrayelements.append(dict(water))
      print(duration_waterbreak)

    rounds = rounds-1
    duration_work = duration_work + 20
    duration_waterbreak =  duration_waterbreak + 25
    duration_rest = duration_rest + 5
    

  n = n-1
  #print(n)

  finished = {
        "id": n,
        "heading": "Congrats You Finished",
        "name": " Well Done !!!!! ",
        "duration": 20,
        "gifpath": "static/movie/Applause"+str(applaus)+".mp4",
        "sound": 'audiofinish',
        "indicator": "hidden"  
      }

  arrayelements.append(dict(finished))


##############################################################  WORKOUTSTYLE DECREASE ##################


if workoutstyle == 'decrease':

  duration_work = 60
  duration_rest = 15
  duration_waterbreak =45
  rounds = 3

  applaus = random.randint(1,3)
  print(applaus)


  arrayelements = [{
        "id": 0,
        "heading": "Wait for Group Session",
        "name": "Session will start soon",
        "duration": 0,
        "gifpath": "static/movie/waitnextworkout.mp4",
        "sound": None,
        "indicator": "hidden"
      },
      {
        "id": 1,
        "heading": "Workout Timimg:",
        "name": ["workout style: "+workoutstyle, str(len(exercises))+" exercises", str(duration_work)+ " sec work - 2*20 sec decrease", str(duration_rest)+ " sec rest", str(rounds)+" rounds", "click anywhere on screen to start sound"],
        # "heading": "Introduction to workouts: 40 work, 10 rest, 3 rounds",
        # "name": exercises,
        "duration": 10,
        "gifpath": "",
        "sound": None,
        "indicator": "hidden"
      }]

  ##### introduction to workout
  n = 2

  for i in range(len(exercises)):

      exer_index = next((index for (index, d) in enumerate(exerlist) if d["name"] == exercises[i]), None)
      exer_elem = exerlist[exer_index]
      #print(exer_elem)

      wo1 =     {
          "id": n,
          "heading": "Introduction to workouts",
          "name": exer_elem['name'],
          "duration": 10,
          "gifpath": exer_elem['gifpath'],
          "sound": None,
          "indicator": "hidden"
        }
      

      arrayelements.append(dict(wo1))
      
      n = n+1
      #print(n)

  getreadywu = {
        "id": n,
        "heading": "Get Ready to Warm Up",
        "name": " Let's go !!!!! ",
        "duration": 10,
        "gifpath": "static/movie/getready.mp4",
        "sound": None,
        "indicator": "hidden"
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
          "sound": 'audiowork',
          "indicator": "hidden"
        }
      
      arrayelements.append(dict(wu))
      
      n = n+1
      #print(n)




  getreadywork = {
        "id": n,
        "heading": "Get Ready to Work Out",
        "name": " Let's go !!!!! ",
        "duration": 5,
        "gifpath": "static/movie/getready.mp4",
        "sound": None,
        "indicator": "hidden"  
      }

  arrayelements.append(dict(getreadywork))
   
  n = n +1 
  #print(n)

  ################# TIMING 3 repeats ##### workoutstyle decrease 

  cal_work =  []

  

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
          "sound": 'audiowork',
          "indicator": "exer_visible"
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
          "sound": 'audiorest',
          "indicator": "hidden"
          }

        arrayelements.append(dict(rest))

        cal_work.append(duration_work) #ti calculate amount of time for checking

      n = n+2

    if rounds == 1:
      break 
    else:
      n = n-1
      water =     {
            "id": n,
            "heading": "Water Break",
            "name": "Up Next: "+ exercises[0],
            "duration": duration_waterbreak,
            "gifpath": "static/movie/WaterRefill.mp4",
            "sound": 'audiorest',
            "indicator": "water_break"
          }

      n = n+1 
      
      
      arrayelements.append(dict(water))
      print(duration_rest)

    rounds = rounds-1
    duration_work = duration_work - 20
    duration_waterbreak =  duration_waterbreak - 20
    duration_rest = duration_rest - 5
    

  n = n-1
  #print(n)

  finished = {
        "id": n,
        "heading": "Congrats You Finished",
        "name": " Well Done !!!!! ",
        "duration": 20,
        "gifpath": "static/movie/Applause"+str(applaus)+".mp4",
        "sound": 'audiofinish',
        "indicator": "hidden"  
      }

  arrayelements.append(dict(finished))

##############################################################  WOKROUTSTYLE REPEAT 


if workoutstyle == 'repeat':

  duration_work = 45
  duration_rest = 10
  duration_waterbreak = 35

  rounds = 4

  applaus = random.randint(1,3)
  print(applaus)


  arrayelements = [{
        "id": 0,
        "heading": "Wait for Group Session",
        "name": "Session will start soon",
        "duration": 0,
        "gifpath": "static/movie/waitnextworkout.mp4",
        "sound": None,
        "indicator": "hidden"
      },
      {
        "id": 1,
        "heading": "Workout Timimg:",
        "name": ["workout style: "+workoutstyle, str(len(exercises))+" exercises", str(duration_work)+ " sec work CHANGE ", str(duration_rest)+ " sec rest", str(rounds)+" rounds", "No water break"],
        # "heading": "Introduction to workouts: 40 work, 10 rest, 3 rounds",
        # "name": exercises,
        "duration": 10,
        "gifpath": "",
        "sound": None,
        "indicator": "hidden"
      }]

  ##### introduction to workout
  n = 2

  for i in range(len(exercises)):

      exer_index = next((index for (index, d) in enumerate(exerlist) if d["name"] == exercises[i]), None)
      exer_elem = exerlist[exer_index]
      #print(exer_elem)

      wo1 =     {
          "id": n,
          "heading": "Introduction to workouts",
          "name": exer_elem['name'],
          "duration": 10,
          "gifpath": exer_elem['gifpath'],
          "sound": None,
          "indicator": "hidden"
        }
      

      arrayelements.append(dict(wo1))
      
      n = n+1
      #print(n)

  getreadywu = {
        "id": n,
        "heading": "Get Ready to Warm Up",
        "name": " Let's go !!!!! ",
        "duration": 10,
        "gifpath": "static/movie/getready.mp4",
        "sound": None,
        "indicator": "hidden"
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
          "sound": 'audiowork',
          "indicator": "hidden"
        }
      
      arrayelements.append(dict(wu))
      
      n = n+1
      #print(n)




  getreadywork = {
        "id": n,
        "heading": "Get Ready to Work Out",
        "name": " Let's go !!!!! ",
        "duration": 5,
        "gifpath": "static/movie/getready.mp4",
        "sound": None,
        "indicator": "hidden"  
      }

  arrayelements.append(dict(getreadywork))
   
  n = n +1 
  #print(n)

  ################# TIMING 4 repeats ##### workoutstyle repeat

  cal_work =  []

  repeat_exer = rounds


  

  for i in range(len(exercises)):

    while (repeat_exer > 0):

      exer_index = next((index for (index, d) in enumerate(exerlist) if d["name"] == exercises[i]), None)
      exer_elem = exerlist[exer_index]

      wo1 =     {
          "id": n,
          "heading": "Workout Time",
          "name": exer_elem['name'],
          "duration": duration_work,
          "gifpath": exer_elem['gifpath'],
          "sound": 'audiowork',
          "indicator": "exer_visible"
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
          "sound": 'audiorest',
          "indicator": "hidden"
          }

        arrayelements.append(dict(rest))

        repeat_exer = repeat_exer - 1

        n= n+2


      n = n+2

    

  # duration_work = duration_work - 20
  # duration_rest = duration_rest - 5


  n = n-1
  #print(n)

  finished = {
      "id": n,
      "heading": "Congrats You Finished",
      "name": " Well Done !!!!! ",
      "duration": 20,
      "gifpath": "static/movie/Applause"+str(applaus)+".mp4",
      "sound": 'audiofinish',
      "indicator": "hidden"  
    }

  arrayelements.append(dict(finished))

########################################################
########################################################   CREATING JSON FILE  


workout = {'startTime': 'now', 'elements': arrayelements}

#print(workout)

with open('workout1.json', 'w') as fp:
    json.dump(workout, fp)



