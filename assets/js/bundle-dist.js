"use strict";function step(){console.log("step here");var e=Date.now()-expected;curTime-=interval,interval=1e3,0<=curTime?(console.log(" cur time: ",curTime,"dt: ",e),updateTimer(curTime),expected+=interval,stepTimeout=setTimeout(step,Math.max(0,interval-e))):(clearTimeout(stepTimeout),ourTimeout.stop(),createjs.Sound.stop(),console.warn("Stopping timeout"),0==$(".smiley.active:not(.correct)").length&&$(".smiley.correct").length==$(".smiley.correct.active").length?$("section.gratulation.correct").addClass("active"):$("section.gratulation.mistake").addClass("active"))}function updateTimer(){var e=curTime/total*100;$(".timer .inner").css({"max-height":e+"%",transition:"max-height 1s linear"}),curTime<-500&&(console.warn("I am here"),ourTimeout.stop(),createjs.Sound.stop(),console.warn("Stopping timeout"),0==$(".smiley.active:not(.correct)").length&&$(".smiley.correct").length==$(".smiley.correct.active").length?$("section.gratulation.correct").addClass("active"):$("section.gratulation.mistake").addClass("active")),curTime-=1e3}!function(){function t(e){++o===n&&(console.log("%csounds ready","background: green; color:  white"),$(playButton).removeClass("hidden"))}function a(e){for(var t=e.length-1;0<t;t--){var o=Math.floor(Math.random()*(t+1)),i=[e[o],e[t]];e[t]=i[0],e[o]=i[1]}return e}var o=0,i=["aha","game_music","hehe"];window.currentSmileyPack=0,window.gameMusicEnable=!1,window.correct_audio=!1,window.musicInstance=null,window.arrOfImages=[{src:"assets/images/image-pack-01.png",correctRoundedPositions:[[0,0],[-290,-190],[-190,-290],[-100,-290]]},{src:"assets/images/image-pack-02.png",correctRoundedPositions:[[0,0],[-290,-190],[-190,-290],[-100,-290]]},{src:"assets/images/image-pack-03.png",correctRoundedPositions:[[0,0],[-290,-190],[-190,-290],[-100,-290]]}],$("#playButton").one("click",function(e){$("#playButton").addClass("hidden"),createjs.WebAudioPlugin.isSupported()&&createjs.WebAudioPlugin.context.resume(),loadIntro()}),window.numOfSmileys=0,window.env=0,window.loadGrid=function(e){for(var t=[],o=0;o<6;o++)for(var i=0;i<6;i++)t.push({x:96*-i,y:96*-o});a(t),$(".smileysGrid .outer").append("<div class='envelope' id='envelope_"+env+"'></div>"),0==env?$("#envelope_"+env).css({top:"0px"}):$("#envelope_"+env).css({top:"-576px"});for(var n=0;n<36;n++){$(".smileysGrid .envelope#envelope_"+env).append("<div class='smiley' id='sm_"+(numOfSmileys+n)+"'></div>"),$(".smiley#sm_"+(numOfSmileys+n)).css({"background-image":"url("+arrOfImages[e].src+")","background-position":t[n].x+"px "+t[n].y+"px"});for(var r=0;r<arrOfImages[e].correctRoundedPositions.length;r++)10*Math.round(t[n].x/10)==arrOfImages[e].correctRoundedPositions[r][0]&&10*Math.round(t[n].y/10)==arrOfImages[e].correctRoundedPositions[r][1]&&$(".smiley#sm_"+(numOfSmileys+n)).css({}).addClass("correct")}numOfSmileys+=36,env++,2<env&&($("#envelope_0").remove(),$("#envelope_"+(env-3)).remove())},window.handleAudioByName=function(e){console.error("received id: ",e),createjs.Sound.play(e).on("complete",onAudioComplete)},$("#muteButton").on("click",function(){createjs.Sound.stop()}),$("#unmuteButton").on("click",function(){createjs.Sound.play("game_music")});var e,n=0;a(arrOfImages),e=function(){console.log("%cLabels ready.","background: green; color: white")},$("section.intro p").html("Select all but wheelbarrows"),$("section.gratulation.correct p").html("temporary section.gratulation.correct label"),$("section.gratulation.mistake p").html("temporary section.gratulation.mistake label"),$("#gameStart p").html("START"),$(".playAgain p").html("PLAY AGAIN"),e(),function(){createjs.Sound.on("fileload",t);for(var e=0;e<i.length;e++)null!=i[e]&&(n++,createjs.Sound.registerSound("assets/audio/"+i[e]+".mp3",i[e]))}(),loadGrid(currentSmileyPack)}();var stepTimeout,ourTimeout,interval,expected,total=3e4,curTime=total;$("#gameStart").on("click",function(){$("main").addClass("active"),$("section.intro").removeClass("active"),interval=1e3,expected=Date.now()+interval,curTime-=1e3,updateTimer(),ourTimeout=new Timer("1000 milliseconds").every("1 seconds",function(){updateTimer()}).start(),setTimeout(function(){gameMusicEnable&&(console.warn(" Here"),handleAudioByName("game_music"))},500)}),$(document).on("click",$(".smileysGrid .smiley"),function(e){0!=e.target.id.length&&($("#"+e.target.id).toggleClass("active"),0==$(".smiley.active:not(.correct)").length&&$(".smiley.correct").length==$(".smiley.correct.active").length&&(loadGrid(currentSmileyPack++%arrOfImages.length),TweenMax.to(".smileysGrid .outer .envelope",.6,{top:"+=576",delay:.2}),console.log("correct audio: ",correct_audio),correct_audio&&handleAudioByName("correct_audio")))}),$(".playAgain").on("click",function(){$("section.gratulation").removeClass("active"),$("section.intro").removeClass("active"),curTime=total,ourTimeout.stop(),$(".timer .inner").css({"max-height":"100%",transition:"none"}),$(".smileysGrid .outer .envelope").remove(),numOfSmileys=0,env=0,currentSmileyPack=0,loadGrid(0),setTimeout(function(){gameMusicEnable&&handleAudioByName("game_music")},1500),setTimeout(function(){updateTimer()},500),ourTimeout.drift(500).start()});