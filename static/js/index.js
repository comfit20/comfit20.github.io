type="text/javascript">
    $(document).ready(function(){
            var next_monday = new Date();
            next_monday.setDate(next_monday.getDate() + (1 + 7 - next_monday.getDay()) % 7);
            console.log(next_monday);
            var next_wednesday = new Date()
            next_wednesday.setDate(next_wednesday.getDate() + (3 + 7 - next_wednesday.getDay()) % 7);
            console.log(next_wednesday);
            var next_friday = new Date();
            next_friday.setDate(next_friday.getDate() + (5 + 7 - next_friday.getDay()) % 7);
            console.log(next_friday);


            var time_list = [next_monday,next_wednesday,next_friday]
            var time_complete = setTimeTo8and11(time_list)
            time_complete.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1))
            console.log(time_complete)


            $.each(time_complete, function (idx,time) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hours: 'numeric' };

            $("#next-"+idx).text(time.toLocaleTimeString(undefined,options));
            var share_link = window.location.hostname+'/workout.html?timestamp='+time.toISOString();
            $("#next-"+idx).attr('href','workout.html?timestamp='+time.toISOString()+"&workout=workout1.json");
            // $("#next-"+idx+"-share-fb").attr('href','https://www.facebook.com/sharer.php?u='+share_link);
            // $('#next-'+idx+'-share-twitter').attr('href','https://twitter.com/intent/tweet?url='+share_link);
            // $('#next-'+idx+'-share-ig').attr('href','https://instagram.com/');
            $('#next-'+idx+'-link').attr('value',share_link);
        });

        var btn = document.getElementById('next-0-link');
        var clipboard = new ClipboardJS('.clipboard-button');
        $('.clipboard-button').tooltip()

    });

    function setTimeTo8and11(time_list) {
        var return_list = []
        $.each(time_list, function (idx,time) {
            var time_830 = new Date(time);
            var time_1130 = new Date(time);

            time_830.setHours(8)
            time_830.setMinutes(32)
            time_830.setSeconds(0)
            return_list.push(time_830)
            time_1130.setHours(11)
            time_1130.setMinutes(32)
            time_1130.setSeconds(0)
            return_list.push(time_1130)
        });
        return return_list;
    }

    function GFG_Fun2() {
        var date = new Date();
        // ms in 5 minutes.
        var coff = 1000 * 60 * 5;
        return new Date(
            Math.floor(date / coff) * coff);
    }