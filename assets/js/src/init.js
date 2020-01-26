(function() {
    'use strict';

    /* ***************************** LOADER handle begin ***********************************************/
  var now = new Date().getTime();
  var page_load_time = now - performance.timing.navigationStart;
  console.warn("User-perceived page loading time: " + page_load_time);
  var width = 100,
    perfData = window.performance.timing,
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((EstimatedTime/1000)%60)*100;
    console.log("estimated time: ", time)
  $('.loadbar').animate({
    'width': width+'%'
  }, time)
  /******************************** loader handle end *************************************************/
  function preloaderTimeout() {
    let dfd = $.Deferred();
    console.warn("temporary")
    setTimeout(()=>{
      dfd.resolve('preloader timeout passed')
    }, time)
    return dfd.promise();
  }

    let audioLoadedNum = 0;
    let audioPlayer;
    let audioFiles = [
      "aha", "game_music", "hehe"
    ];
    let audioCounter = 0;
    window.currentSmileyPack = 0
    window.gameMusicEnable = false
    window.correct_audio = false
    window.musicInstance = null
    window.arrOfImages = [{
        src: 'assets/images/image-pack-01.png',
        correctRoundedPositions: [
          [0, 0],
          [-290, -190],
          [-190, -290],
          [-100, -290]
        ]
      },
      {
        src: 'assets/images/image-pack-02.png',
        correctRoundedPositions: [
          [0, 0],
          [-290, -190],
          [-190, -290],
          [-100, -290]
        ]
      },
      {
        src: 'assets/images/image-pack-03.png',
        correctRoundedPositions: [
          [0, 0],
          [-290, -190],
          [-190, -290],
          [-100, -290]
        ]
      }
    ]

  $('#playButton').one('click', function(e) {
    $('#playButton').addClass('hidden');
    if (createjs.WebAudioPlugin.isSupported()) {
      createjs.WebAudioPlugin.context.resume();
    }
    loadIntro();
  });

  window.numOfSmileys = 0
  window.env = 0

  window.loadGrid = function(currentSmileyPack) {
    var arrayOfPositions = []

    for (let f = 0; f < 6; f++) {
      for (let g = 0; g < 6; g++) {
        arrayOfPositions.push({
          x: (-g * 96),
          y: -f * 96
        })
      }
    }
    shuffle(arrayOfPositions)

    $('.smileysGrid .outer').append("<div class='envelope' id='envelope_" + env + "'></div>")

    if (env == 0) {
      $("#envelope_" + env).css({
        'top': '0px'
      })
    } else {
      $("#envelope_" + env).css({
        'top': '-576px'
      })
    }

    for (let f = 0; f < 36; f++) {
      $('.smileysGrid .envelope#envelope_' + env).append("<div class='smiley' id='sm_" + (numOfSmileys + f) + "'></div>")
      $('.smiley#sm_' + (numOfSmileys + f)).css({
        'background-image': 'url(' + arrOfImages[currentSmileyPack].src + ')',
        'background-position': arrayOfPositions[f].x + 'px ' + arrayOfPositions[f].y + 'px'
      })

      for (let s = 0; s < arrOfImages[currentSmileyPack].correctRoundedPositions.length; s++) {
        if (Math.round(arrayOfPositions[f].x / 10) * 10 == arrOfImages[currentSmileyPack].correctRoundedPositions[s][0]) {
          if (Math.round(arrayOfPositions[f].y / 10) * 10 == arrOfImages[currentSmileyPack].correctRoundedPositions[s][1]) {
            $('.smiley#sm_' + (numOfSmileys + f)).css({}).addClass('correct')
          }
        }
      }
    }
    numOfSmileys += 36
    env++

    if (env > 2) {
      $('#envelope_0').remove()
      $('#envelope_' + (env - 3)).remove()
    }
  }

  function loadLabels(onfnvar) {
    $('section.intro p').html("Select everything else but wheelbarrows")
    $('section.gratulation.correct p').html("temporary section.gratulation.correct label")
    $('section.gratulation.mistake p').html("temporary section.gratulation.mistake label")
    $('#gameStart p').html("START")
    $('.playAgain p').html("PLAY AGAIN")
    onfnvar();
  }

  function myfnvar() {
    console.log("%cLabels ready.", "background: green; color: white")
  }

  window.handleAudioByName = function(n) {
    console.error("received id: ", n)
    audioPlayer = createjs.Sound.play(n);
    audioPlayer.on("complete", onAudioComplete);
  };

  function loadAudio() {
    createjs.Sound.on("fileload", onFileLoad);

    for (let i = 0; i < audioFiles.length; i++) {
      if (audioFiles[i] != undefined) {
        numOfAudioFiles++
        createjs.Sound.registerSound("assets/audio/" + audioFiles[i] + ".mp3", audioFiles[i]);
      }
    }
  };

  $('#muteButton').on('click', function() {
    createjs.Sound.stop()
  })
  $('#unmuteButton').on('click', function() {
    createjs.Sound.play("game_music")
  })

  var numOfAudioFiles = 0

  function onFileLoad(e) {
    audioLoadedNum++;

    if (audioLoadedNum === numOfAudioFiles) {
      console.log('%csounds ready', 'background: green; color:  white');
      $(playButton).removeClass('hidden');
      $('.preloader-wrapper').removeClass('active')
    }
  };

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

    shuffle(arrOfImages)
    loadLabels(myfnvar);
    loadAudio();
    loadGrid(currentSmileyPack)
})();