
    $(function(){
  var hash = window.location.hash;
  hash && $('a[href="'+hash+'"]').tab('show');

  $('.nav-tabs a').click(function (e) {
    $(this).tab('show');
    var scrollmem = $('body').scrollTop() || $('html').scrollTop();
    window.location.hash = this.hash;
    $('html,body').scrollTop(scrollmem);
  });
});

    $(document).ready(function(){
        // Get current active workout from workout_active.json
        renderWebsite()
    });

    function getNextWeekday(day){
        var today = new Date()
        return dayjs.utc(today.setUTCDate(today.getUTCDate() + (day + 7 - today.getUTCDay()) % 7))
    }

    function createWorkoutTimeList() {
        var time_list = []
        var time_1 = getNextWeekday(1).set('h',15).set('m',32).set('s',0).set('ms',0);
        time_list.push(time_1);
        var time_2 = getNextWeekday(2).set('h',1).set('m',2).set('s',0).set('ms',0);
        time_list.push(time_2);
        var time_3 = getNextWeekday(3).set('h',15).set('m',32).set('s',0).set('ms',0);
        time_list.push(time_3);
        var time_4 = getNextWeekday(4).set('h',1).set('m',2).set('s',0).set('ms',0);
        time_list.push(time_4);
        var time_5 = getNextWeekday(5).set('h',15).set('m',32).set('s',0).set('ms',0);
        time_list.push(time_5);
        var time_6 = getNextWeekday(5).set('h',18).set('m',32).set('s',0).set('ms',0);
        time_list.push(time_6);

        time_list.sort((a, b) => (a.isAfter(b) ? 1 : -1))

        // Get rid of times that are over. 1 hour after the workout, delete it from list and show next
        var filtered_time_list =   time_list.filter(function (date, iindex) {
            return dayjs.utc().isBefore(date.add(1,'hour'))
        });
        return filtered_time_list
    }


       function createYogaTimeList() {
        var time_list = []
        var time_1 = getNextWeekday(1).set('h',15).set('m',32).set('s',0).set('ms',0);
        time_list.push(time_1);
        var time_2 = getNextWeekday(2).set('h',1).set('m',2).set('s',0).set('ms',0);
        time_list.push(time_2);


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
            $("#next-"+idx).text(new Date(time.local()).toLocaleTimeString(undefined,options));
            var share_link = window.location.hostname+'/workout.html?workout=workout1.json'+'&timestamp='+time.toISOString();
            $("#next-"+idx).attr('href','workout.html?timestamp='+time.toISOString()+"&workout=workout1.json");
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
            var share_link = window.location.hostname+'/yoga.html?workout=yoga1.json'+'&timestamp='+time.toISOString();
            $("#yoga-next-"+idx).attr('href','yoga.html?timestamp='+time.toISOString()+"&workout=yoga1.json");
            $('#yoga-next-'+idx+'-link').attr('value',share_link);
        });


        var btn = document.getElementById('yoga-next-0-link');
        var clipboard = new ClipboardJS('.clipboard-button');
        $('.clipboard-button').tooltip()

    };

         var nr_workout = get_workoutNo()

         $("#workoutanytime").attr('href','workout.html?&workout=workout'+nr_workout+".json");
         $("#yogaanytime").attr('href','yoga.html?&workout=yoga1.json');


    function get_workoutNo() {
        var today = dayjs().day()
//console.log("workout No", Math.floor((Math.random() * 18) + 2))
 if (today == 1 ||  today == 3 ||  today == 5) {return 1;}
 else {return Math.floor((Math.random() * 29) + 2);}
    }
