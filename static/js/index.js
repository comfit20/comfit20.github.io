
    $(function(){
  var hash = window.location.hash;
  hash && $('a[href="'+hash+'"]').tab('show');
  if(hash==='#yoga'){
    $('html').addClass('bg-yoga')
    $('body').addClass('bg-yoga')
  }
  if(hash==='#workout'){
    $('html').addClass('bg-workout')
    $('body').addClass('bg-yoga')
  }
  $('.nav-tabs a').click(function (e) {
    $(this).tab('show');
    var scrollmem = $('body').scrollTop() || $('html').scrollTop();
    window.location.hash = this.hash;
    $('html,body').scrollTop(scrollmem);
  });
});

    $(document).ready(function(){
        // Get current active workout from workout_active.json
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr("href") // activated tab
   $('body').toggleClass('bg-yoga','bg-workout')
   $('html').toggleClass('bg-yoga','bg-workout')
});
        renderWebsite()
    });

    function getNextWeekday(day){
        var today = new Date()
        return dayjs.utc(today.setUTCDate(today.getUTCDate() + (day + 7 - today.getUTCDay()) % 7))
    }

    function createWorkoutTimeList() {
        var time_list = []

        var time_1 = getNextWeekday(1).set('h',15).set('m',2).set('s',0).set('ms',0);
        time_list.push(time_1); //this is Monday 8:30 am
        var time_2 = getNextWeekday(2).set('h',1).set('m',2).set('s',0).set('ms',0);
        time_list.push(time_2); // this is Monday 6:00 pm

        var time_4 = getNextWeekday(2).set('h',18).set('m',2).set('s',0).set('ms',0);
        time_list.push(time_4); // this is Tuesday 10:00 am  

        var time_3 = getNextWeekday(3).set('h',14).set('m',2).set('s',0).set('ms',0);
        time_list.push(time_3); //this is Wednedsay 8:30 am

        var time_6 = getNextWeekday(4).set('h',17).set('m',2).set('s',0).set('ms',0);
        time_list.push(time_6); // this is Thursday 10:00 am  

        var time_5 = getNextWeekday(5).set('h',14).set('m',2).set('s',0).set('ms',0);
        time_list.push(time_5); //this is Friday 8:30 am

        // var time_6 = getNextWeekday(0).set('h',16).set('m',34).set('s',0).set('ms',0);
        // time_list.push(time_6);
        
        console.log("workout times", time_list)

        time_list.sort((a, b) => (a.isAfter(b) ? 1 : -1))
        // var sorted_times = time_list.sort((a, b) => (a.isAfter(b) ? 1 : -1))
        // window.sorted_times
        


        // Get rid of times that are over. 1 hour after the workout, delete it from list and show next
        var filtered_time_list =   time_list.filter(function (date, iindex) {
            return dayjs.utc().isBefore(date.add(1,'hour'))
        });
        //console.log("filtered time ", filtered_time_list[1])
        return filtered_time_list

    }

     

    // var day_workout = get_workoutday()
    //console.log(day_workout)

        
function createYogaTimeList() {


        var time_list = []
        var time_1 = getNextWeekday(3).set('h',0).set('m',32).set('s',0).set('ms',0);
        time_list.push(time_1); //this is Tuesday 4:30 pm
        // var time_2 = getNextWeekday(5).set('h',0).set('m',32).set('s',0).set('ms',0);
        // time_list.push(time_2); //this is Thursday 4:30 pm
        var time_3 = getNextWeekday(5).set('h',01).set('m',32).set('s',0).set('ms',0);
        time_list.push(time_3); //this is Thursday 6:30pm

        
        // Add your yoga times here (the time is in UTC
        // --> e.g. california wednesday 06:00pm is thursday 01:00 in utc)
        //console.log(time_list)
        time_list.sort((a, b) => (a.isAfter(b) ? 1 : -1))

        //console.log("yoga times", time_list)

     // Get rid of times that are over. 1 hour after the workout, delete it from list and show next
        var filtered_time_list =   time_list.filter(function (date, iindex) {
            return dayjs.utc().isBefore(date.add(1,'hour'))
        });

        return filtered_time_list
    }


    function renderWebsite() {


        // Render workout part
        var time_list = createWorkoutTimeList();

                var time_test = Object();
          time_test = {
          time_Mon: getNextWeekday(1).set('h',15).set('m',2).set('s',0).set('ms',0),
          time_Mon2: getNextWeekday(2).set('h',1).set('m',2).set('s',0).set('ms',0),
          time_Tue: getNextWeekday(2).set('h',18).set('m',2).set('s',0).set('ms',0),
          time_Wed: getNextWeekday(3).set('h',14).set('m',2).set('s',0).set('ms',0),
          time_Thu: getNextWeekday(4).set('h',18).set('m',2).set('s',0).set('ms',0),
          time_Fri: getNextWeekday(5).set('h',14).set('m',2).set('s',0).set('ms',0)
      }


        $.each(time_list, function (idx,time) {
            const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit',minute: '2-digit' };
            //console.log("times",time.local().format())
            $("#next-"+idx).text(new Date(time.local()).toLocaleTimeString(undefined,options));

            console.log('test equal', _.isEqual(time_test["time_Fri"], time_list[0]));

            if (_.isEqual(time_test["time_Mon"], time_list[0]) == true || _.isEqual(time_test["time_Mon2"], time_list[0]) == true)  {
            //var share_link = window.location.hostname+'/workout.html?workout=workout'+day_workout+'.json'+'&timestamp='+time.toISOString();
            var share_link = window.location.hostname+'/workout_group.html?workout=workout'+'_mon'+'.json'+'&timestamp='+time.toISOString();
            //$("#next-"+idx).attr('href','workout.html?timestamp='+time.toISOString()+"&workout=workout"+day_workout+".json");
            $("#next-"+idx).attr('href','workout_group.html?timestamp='+time.toISOString()+"&workout=workout"+'_mon'+".json");
            $('#next-'+idx+'-link').attr('value',share_link);}

            else if (_.isEqual(time_test["time_Tue"], time_list[0]) == true)  {
            //var share_link = window.location.hostname+'/workout.html?workout=workout'+day_workout+'.json'+'&timestamp='+time.toISOString();
            var share_link = window.location.hostname+'/workout_group.html?workout=workout'+'_tue'+'.json'+'&timestamp='+time.toISOString();
            //$("#next-"+idx).attr('href','workout.html?timestamp='+time.toISOString()+"&workout=workout"+day_workout+".json");
            $("#next-"+idx).attr('href','workout_group.html?timestamp='+time.toISOString()+"&workout=workout"+'_tue'+".json");
            $('#next-'+idx+'-link').attr('value',share_link);}

            else if (_.isEqual(time_test["time_Wed"], time_list[0]) == true)  {
            //var share_link = window.location.hostname+'/workout.html?workout=workout'+day_workout+'.json'+'&timestamp='+time.toISOString();
            var share_link = window.location.hostname+'/workout_group.html?workout=workout'+'_wed'+'.json'+'&timestamp='+time.toISOString();
            //$("#next-"+idx).attr('href','workout.html?timestamp='+time.toISOString()+"&workout=workout"+day_workout+".json");
            $("#next-"+idx).attr('href','workout_group.html?timestamp='+time.toISOString()+"&workout=workout"+'_wed'+".json");
            $('#next-'+idx+'-link').attr('value',share_link);}

            else if (_.isEqual(time_test["time_Thu"], time_list[0]) == true)  {
            //var share_link = window.location.hostname+'/workout.html?workout=workout'+day_workout+'.json'+'&timestamp='+time.toISOString();
            var share_link = window.location.hostname+'/workout_group.html?workout=workout'+'_thu'+'.json'+'&timestamp='+time.toISOString();
            //$("#next-"+idx).attr('href','workout.html?timestamp='+time.toISOString()+"&workout=workout"+day_workout+".json");
            $("#next-"+idx).attr('href','workout_group.html?timestamp='+time.toISOString()+"&workout=workout"+'_thu'+".json");
            $('#next-'+idx+'-link').attr('value',share_link);}

            else if (_.isEqual(time_test["time_Fri"], time_list[0]) == true)  {
            //var share_link = window.location.hostname+'/workout.html?workout=workout'+day_workout+'.json'+'&timestamp='+time.toISOString();
            var share_link = window.location.hostname+'/workout_group.html?workout=workout'+'_fri'+'.json'+'&timestamp='+time.toISOString();
            //$("#next-"+idx).attr('href','workout.html?timestamp='+time.toISOString()+"&workout=workout"+day_workout+".json");
            $("#next-"+idx).attr('href','workout_group.html?timestamp='+time.toISOString()+"&workout=workout"+'_fri'+".json");
            $('#next-'+idx+'-link').attr('value',share_link);}




// var share_link = window.location.hostname+'/workout_group.html?workout=workout'+day_workout+'.json'+'&timestamp='+time.toISOString();
//             //$("#next-"+idx).attr('href','workout.html?timestamp='+time.toISOString()+"&workout=workout"+day_workout+".json");
//             $("#next-"+idx).attr('href','workout_group.html?timestamp='+time.toISOString()+"&workout=workout"+day_workout+".json");
//             $('#next-'+idx+'-link').attr('value',share_link);

        });
        var btn = document.getElementById('next-0-link');
        var clipboard = new ClipboardJS('.clipboard-button');
        $('.clipboard-button').tooltip()




        // Render yoga stuff todo: extract method



        var time_list = createYogaTimeList();

        var time_test = Object();
          time_test = {
          time_Tue: getNextWeekday(3).set('h',0).set('m',32).set('s',0).set('ms',0),
          // time_Thu: getNextWeekday(5).set('h',0).set('m',32).set('s',0).set('ms',0),
          time_Thu2: getNextWeekday(5).set('h',01).set('m',32).set('s',0).set('ms',0)
      }

        var today = dayjs().day();
        $.each(time_list, function (idx,time) {
            const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit',minute: '2-digit' };
            //console.log("yoga",time.local().format())
            //console.log(time_test)
            $("#yoga-next-"+idx).text(new Date(time.local()).toLocaleTimeString(undefined,options));


            // console.log('test equal', _.isEqual(time_test["time_Thu"], time_list[0]));



            if (_.isEqual(time_test["time_Tue"], time_list[0]) == true) {
            var share_link = window.location.hostname+'/yoga_group_vinyasa.html'+'&timestamp='+time.toISOString();
            $("#yoga-next-"+idx).attr('href','yoga_group_vinyasa.html?timestamp='+time.toISOString());
            $('#yoga-next-'+idx+'-link').attr('value',share_link);
            }

            else if (_.isEqual(time_test["time_Thu2"], time_list[0]) == true) {
            var share_link = window.location.hostname+'/yoga_group.html?workout=yoga1.json'+'&timestamp='+time.toISOString();
            $("#yoga-next-"+idx).attr('href','yoga_group.html?timestamp='+time.toISOString()+"&workout=yoga1.json");
            $('#yoga-next-'+idx+'-link').attr('value',share_link);
            }

        });
        //console.log(yoga_time_list)

        var btn = document.getElementById('yoga-next-0-link');
        var clipboard = new ClipboardJS('.clipboard-button');
        $('.clipboard-button').tooltip()

    };

         var nr_workout = get_workoutNo()
         var nr_yoga = get_yogaNo()

         console.log("nr workout", nr_workout)

         $("#workoutanytime").attr('href','workout.html?&workout=workout'+nr_workout+".json");

         $("#yogaanytime").attr('href','yoga.html?&workout=yoga'+nr_yoga+'.json');



     //pick random number of workout for workout anytime
    function get_workoutNo() {
         var today = dayjs().day() // I don't think this needs to be here
        // console.log("workout No", Math.floor((Math.random() * 18) + 2))
 return Math.floor((Math.random() * 112) + 1);
    }

    //pick random number of yoga for yoga anytime
    function get_yogaNo() {
        var today = dayjs().day()
        //console.log("workout No", Math.floor((Math.random() * 18) + 2))
 return Math.floor((Math.random() * 11) + 1);
    }



// I don't know where it's asking for getworkout day anymore???? but without it  I can't start workout anytime, clean mess up
// okey didn't work becuase it asked for var day_workout = get_workoutday() above, make nicer 
//     function get_workoutday() {
//        var today = dayjs().day()
// console.log("workout No", Math.floor((Math.random() * 18) + 2))
//  if (today == 1 ||  today == 0 ||  today == 6) {return "_mon";}
//  else if (today == 1) {return "_tue";}
// else if (today == 3 || today == 2 ) {return "_wed";}
// else if (today == 4) {return "_thu";}
// else if (today == 5) {return "_fri";}
//  else if (today == 0 ||  today == 6) {return "_family";}

//     }
