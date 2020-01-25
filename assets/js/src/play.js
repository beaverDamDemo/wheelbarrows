'use strict'

const total = 30000
var curTime = total
var stepTimeout, ourTimeout
var interval, expected

$('#gameStart').on('click', function() {
	$('main').addClass('active');
	$('section.intro').removeClass('active')

	interval = 1000; // ms
	expected = Date.now() + interval;

	// $('.timer p').text( Math.round(curTime/1000) + ' s')
	// ourTimeout = setTimeout(step, interval);

	curTime-=1000
	updateTimer()

	ourTimeout = new Timer('1000 milliseconds').every('1 seconds', function() {
		updateTimer()
	}).start()

	setTimeout(()=>{
		if( gameMusicEnable )	{
			console.warn(" Here")
			handleAudioByName('game_music')
		}
	}, 500)
})

function step() {
	console.log("step here")
  var dt = Date.now() - expected; // the drift (positive for overshooting)
  // if (dt > interval) {
      // something really bad happened. Maybe the browser (tab) was inactive?
      // possibly special handling to avoid futile "catch up" run
  // }
  curTime-=interval
  interval = 1000

  if( curTime >= 0 ) {
  	console.log(" cur time: ", curTime, 'dt: ', dt)
  	updateTimer(curTime)
	  expected += interval;
	  stepTimeout = setTimeout(step, Math.max(0, interval - dt)); // take into account drift
  } else {
  	// $('.timer p').text('0 s')
  	clearTimeout(stepTimeout)
  	// clearTimeout(ourTimeout)
  	ourTimeout.stop()
		createjs.Sound.stop();
		console.warn("Stopping timeout")

		if( $('.smiley.active:not(.correct)').length == 0 && ( $('.smiley.correct').length == $('.smiley.correct.active').length ) ) {
			$('section.gratulation.correct').addClass('active')
		} else {
			$('section.gratulation.mistake').addClass('active')
		}
  }
}

$(document).on('click', $('.smileysGrid .smiley'), function(event) {
	if( event.target.id.length == 0 ) return

	$('#'+event.target.id).toggleClass('active')

	if( $('.smiley.active:not(.correct)').length == 0 ) {
		if( $('.smiley.correct').length == $('.smiley.correct.active').length ) {
			loadGrid( (currentSmileyPack++)%(arrOfImages.length))
			TweenMax.to('.smileysGrid .outer .envelope', 0.6, {
				top: "+=576",
				delay: 0.2
			})

			console.log('correct audio: ', correct_audio)
			if( correct_audio )	{
				handleAudioByName('correct_audio')
			}
		}
	}
})

$('.playAgain').on('click', function() {
	$('section.gratulation').removeClass('active')
	$('section.intro').removeClass('active')
	curTime = total
	// clearTimeout(stepTimeout)
	// clearTimeout(ourTimeout)
	ourTimeout.stop()
	$('.timer .inner').css({
		'max-height': '100%',
		'transition': 'none'
	})
	$('.smileysGrid .outer .envelope').remove()
  numOfSmileys = 0
  env = 0
  currentSmileyPack = 0
  loadGrid(0)

  setTimeout(()=>{
  	if( gameMusicEnable )	handleAudioByName('game_music')
  }, 1500)

	// ourTimeout = setTimeout(step, 4000);
		setTimeout( ()=>{
			updateTimer()
		}, 500)
		ourTimeout.drift(500).start()
})

function updateTimer() {
	let maxHeight = ( (curTime/total) ) * 100
	$('.timer .inner').css({
		'max-height': maxHeight+'%',
		'transition': 'max-height 1s linear'
	})
	if( curTime < -500 ) {
		console.warn("I am here")
	  	ourTimeout.stop()
			createjs.Sound.stop();
			console.warn("Stopping timeout")

			if( $('.smiley.active:not(.correct)').length == 0 && ( $('.smiley.correct').length == $('.smiley.correct.active').length ) ) {
				$('section.gratulation.correct').addClass('active')
			} else {
				$('section.gratulation.mistake').addClass('active')
			}
	}
	curTime-=1000
}