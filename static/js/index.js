
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
        var time_1 = getNextWeekday(1).set('h',16).set('m',32).set('s',0).set('ms',0);
        time_list.push(time_1); //this is Monday 8:30 am 
        var time_2 = getNextWeekday(2).set('h',2).set('m',2).set('s',0).set('ms',0);
        time_list.push(time_2); // this is Monday 6:00 pm
        var time_3 = getNextWeekday(3).set('h',16).set('m',32).set('s',0).set('ms',0);
        time_list.push(time_3); //this is Wednedsay 8:30 am
        // var time_4 = getNextWeekday(4).set('h',1).set('m',2).set('s',0).set('ms',0);
        // time_list.push(time_4);
        var time_5 = getNextWeekday(5).set('h',16).set('m',32).set('s',0).set('ms',0);
        time_list.push(time_5);



        console.log(time_list)

        time_list.sort((a, b) => (a.isAfter(b) ? 1 : -1))

        // Get rid of times that are over. 1 hour after the workout, delete it from list and show next
        var filtered_time_list =   time_list.filter(function (date, iindex) {
            return dayjs.utc().isBefore(date.add(1,'hour'))
        });
        return filtered_time_list
    }

    var day_workout = get_workoutday()
    console.log(day_workout)

       function createYogaTimeList() {
        var time_list = []
        var time_1 = getNextWeekday(5).set('h',02).set('m',32).set('s',0).set('ms',0);
        time_list.push(time_1);
        var time_2 = getNextWeekday(1).set('h',05).set('m',11).set('s',0).set('ms',0);
        time_list.push(time_1);
        // var time_2 = getNextWeekday(5).set('h',18).set('m',35).set('s',0).set('ms',0);
        // time_list.push(time_2); // this time is Friday 11:35 PST
        // Add your yoga times here (the time is in UTC
        // --> e.g. california wednesday 06:00pm is thursday 01:00 in utc)

        time_list.sort((a, b) => (a.isAfter(b) ? 1 : -1))

        // Get rid of times that are over. 1 hour after the workout, delete it from list and show next
        var filtered_time_list =   time_list.filter(function (date, iindex) {
            return dayjs.utc().isBefore(date.add(1,'hour'))
        });
        return filtered_time_list
    }


    function renderWebsite() {


        // Render workout part
        var time_list = createWorkoutTimeList();

        $.each(time_list, function (idx,time) {
            const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit',minute: '2-digit' };
            console.log(time.local().format())
            $("#next-"+idx).text(new Date(time.local()).toLocaleTimeString(undefined,options));
            //var share_link = window.location.hostname+'/workout.html?workout=workout'+day_workout+'.json'+'&timestamp='+time.toISOString();
            var share_link = window.location.hostname+'/workout_group.html?workout=workout'+day_workout+'.json'+'&timestamp='+time.toISOString();
            //$("#next-"+idx).attr('href','workout.html?timestamp='+time.toISOString()+"&workout=workout"+day_workout+".json");
            $("#next-"+idx).attr('href','workout_group.html?timestamp='+time.toISOString()+"&workout=workout"+day_workout+".json");
            $('#next-'+idx+'-link').attr('value',share_link);
        });
        var btn = document.getElementById('next-0-link');
        var clipboard = new ClipboardJS('.clipboard-button');
        $('.clipboard-button').tooltip()

        // Render yoga stuff todo: extract method
         var yoga_time_list = createYogaTimeList();

        $.each(yoga_time_list, function (idx,time) {
            const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit',minute: '2-digit' };
            $("#yoga-next-"+idx).text(new Date(time.local()).toLocaleTimeString(undefined,options));
            var share_link = window.location.hostname+'/yoga_group.html?workout=yoga1.json'+'&timestamp='+time.toISOString();
            $("#yoga-next-"+idx).attr('href','yoga_group.html?timestamp='+time.toISOString()+"&workout=yoga1.json");
            $('#yoga-next-'+idx+'-link').attr('value',share_link);
        });


        var btn = document.getElementById('yoga-next-0-link');
        var clipboard = new ClipboardJS('.clipboard-button');
        $('.clipboard-button').tooltip()

    };

         var nr_workout = get_workoutNo()
         var nr_yoga = get_yogaNo()

         $("#workoutanytime").attr('href','workout.html?&workout=workout'+nr_workout+".json");

         $("#yogaanytime").attr('href','yoga.html?&workout=yoga'+nr_yoga+'.json');



     //pick random number of workout for workout anytime    
    function get_workoutNo() {
        var today = dayjs().day()
        //console.log("workout No", Math.floor((Math.random() * 18) + 2))
 return Math.floor((Math.random() * 78) + 1);
    }

    //pick random number of yoga for yoga anytime   
    function get_yogaNo() {
        var today = dayjs().day()
        //console.log("workout No", Math.floor((Math.random() * 18) + 2))
 return Math.floor((Math.random() * 11) + 1);
    }


    function get_workoutday() {
        var today = dayjs().day()

//console.log("workout No", Math.floor((Math.random() * 18) + 2))
 if (today == 1 ||  today == 0 ||  today == 6) {return "_mon";}
else if (today == 3 ||  today == 2) {return "_wed";}
else if (today == 5 ||  today == 4) {return "_fri";}
 // else {return Math.floor((Math.random() * 40) + 2);}
    }
