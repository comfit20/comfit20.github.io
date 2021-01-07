var sequence = []
var counter = 0;

var audiowork = new Audio('./static/sounds/AirHorn-SoundBible.com-964603082.wav');
audiowork.muted = true
var audiorest = new Audio('./static/sounds/BikeHorn-SoundBible.com-602544869.wav');
audiorest.muted = true
var audiofinish = new Audio('./static/sounds/finish.wav');
audiofinish.muted = true
var audioyoga = new Audio('./static/sounds/Zymbel_18sec-1113884951.wav');
audioyoga.muted = true

// Variable to store current state of audio: mute or unmute? By default everything muted = true
var audio_mute = true;


$(document).ready(function () {

// Try to start jitsi if embedded, if not embedded (e.g. in workout.html and not workout_group.html catch exception
//  to go on with execution of script.)
try {
    const domain = 'comfit.fun';
    const options = {
        roomName: 'Comfit_Group_Yoga_Room',
        parentNode: document.querySelector('#jitsi')
    };
    const api = new JitsiMeetExternalAPI(domain, options);
      // Make tileview default: From https://github.com/jitsi/jitsi-meet/issues/5764
      api.addEventListener(`videoConferenceJoined`, () => {
    const listener = ({ enabled }) => {
      api.removeEventListener(`tileViewChanged`, listener);

      if (!enabled) {
        api.executeCommand(`toggleTileView`);
      }
    };

    api.addEventListener(`tileViewChanged`, listener);
    api.executeCommand(`toggleTileView`);
    api.executeCommand('setVideoQuality', 360);
          api.on('readyToClose', () => { //Hack: Hide jitsi frame after exit meeting to get rid of regular jitsi page
    // see https://community.jitsi.org/t/redirect-url-on-hangup/29948/23
    $('#jitsi').hide();
});
  });
}
catch (e) {
   // Exception caught. Happens in workout.html since script is not embedded.
   // console.log(e); // Fehler-Objekt an die Error-Funktion geben
}

});
