// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'C444gS8IcIk',
        playerVars: { 'autoplay': 0, 'controls': 1 },
        events: {
            'onReady': onPlayerReady
        }
    });
}

var timer
var state = 1
// 1 = waiting for video to start  (100 ms)
// 2 = waiting for video to get to 37 secs (1000 ms)
var currentRate = 1
var sections = [ { time: 0, rate: 1 },
                 { time: 40.4, rate: 2 },
                 { time: 3*60+53, rate: 1 },
                 { time: 100000, rate: 1 } ]

// for (var i = 0; i < sections.length; ++i) {
//  console.log("time: " + sections[i].time + " rate: " + sections[i].rate)
// }

function timerCallback() {
    if (!player) {
      console.log("player not defined")
      return
    }
    if (state == 1) {
      let t = player.getCurrentTime()
      if (t > 0) {
        state = 2
        nextTime = 40.4
      }
      setTimeout(timerCallback, 100)
    } else if (state == 2) {
      let t = player.getCurrentTime()
      let j = -1
      for (let i = 0; i < sections.length-1; ++i) {
        if ((sections[i].time <= t) && (t < sections[i+1].time)) {
          j = i
          break
        }
      }
      if (j < 0) {
        console.log("j is -1, t: "+t)
        setTimeout(timerCallback, 5000)
        return
      }
      if (currentRate !== sections[j].rate) {
        currentRate = sections[j].rate
        player.setPlaybackRate(currentRate)
        let x = document.getElementById("playrate-span")
        if (x) {
          x.innerHTML = "" + currentRate + "x"
        } else {
          console.log("playrate-span not found")
        }
        console.log("" + t + " setting playrate to " + currentRate)
      }
      let nextTime = sections[j+1].time
      let dt = Math.min(1000, (nextTime - t)*1000)
      if (currentRate == 2) {
        dt = dt / 2
      }
      setTimeout(timerCallback, dt)
    } else {
      console.log("bad state: " + state)
      return
    }
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    player.setPlaybackRate(1);
    timer = window.setTimeout(timerCallback, 100)
    event.target.playVideo();
}

