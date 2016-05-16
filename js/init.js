$(function(){
 var mult = 2; // Ratio of page size to window size
 var range_of_tilt = 90; // Angle through which the board can rotate
 var $filler = $('#filler');
 $filler.width(mult*100+'%');
 $filler.height(mult*100+'%');

 var $doc = $(document);
 var $window = $(window);
 $doc.scrollTop($window.height() * (mult-1) / 2);
 $doc.scrollLeft($window.width() * (mult-1) / 2);

 $(window).scroll(function(){
   // x and y range from -0.5 to 0.5
   var x = $window.scrollLeft() / ($window.width() * (mult-1)) - 0.5;
   var y = $window.scrollTop() / ($window.height() * (mult-1)) - 0.5;
   $('#board').css({
     transform: 'translateZ(-200px) rotateX('+y*range_of_tilt+'deg) rotateY('+x*range_of_tilt+'deg)',
     background: 'hsl(' +(100*(x+0.5)+250)+ ', 33%, ' +(50*(y+0.5)+35)+ '%)'
   });
   $('.ball').css({
     transform: 'translateZ(50px) rotateX('+(360-y*range_of_tilt)+'deg) rotateY('+(360-x*range_of_tilt)+'deg)'
     // z: ball radius; x and y reverse rotation so flat to viewer.
   });
 });
});