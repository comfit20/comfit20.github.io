import markovify
import requests
import json
from buildworkout import generateWorkout
import shutil

with open('../static/data/ExerciseList.json') as f:
    exerlist = json.load(f)

exerlist = exerlist['exercises']

LOAD_TEXT_FILE = False

if not LOAD_TEXT_FILE:
    text = ''
    wo = ''
    for i in range(1,58):
        path = 'https://raw.githubusercontent.com/comfit20/comfit20.github.io/master/static/data/workout'+str(i)+'.json'
        r = requests.get(path)
        y = json.loads(r.text)
        if 'workout style: regular' in y['elements'][1]['name']:
          print('Found regular workout')
          wo = ''
          for elem in y['elements']:
              if elem['heading'] == 'Work':
                  elem_name = elem['name'].replace(" ", " ")
                  result = list(filter(lambda x: x["name"] == elem_name, exerlist))
                  if len(result):
                     id = result[0]['id']

                  wo = wo +' '+str(id)
          print('Len wo', len(wo.split()))
          text = text + wo + '.\n'
else:
    f = open("demofile2.txt", "r")
    text = f.read()
    f.close()
print(text)
text_model = markovify.Text(text,well_formed =False)
print(markovify.utils.get_model_dict(text_model))
# Print five randomly-generated sentences
for i in range(60):
    output = text_model.make_short_sentence(50)
    if output:
        wo_list = []
        print('Text: ',output,len(output.split(' ')),'\n\n\n')
        output = output.replace('.','')
        id_list = output.split()
        print(id_list)
        for elem in id_list:
            workout_res = list(filter(lambda x: x["id"] == int(elem), exerlist))
            if len(workout_res):
                wo_list.append(workout_res[0]['name'])
        print(wo_list)
        generateWorkout(wo_list)
        shutil.move('workout_new.json','../static/data/workout_new.json')
        break
    else:
        print('None')

