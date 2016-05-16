function color(x, y, s, l) {
  return 'hsl(' +(100*(x+0.5)+250)+ ', ' +s+ '%, ' +(50*(y+0.5)+l)+ '%)';
}

$(function(){
 var mult = 2; // Ratio of page size to window size
 var range_of_tilt = 90; // Angle through which the board can rotate
 var $filler = $('#filler');
 $filler.width(mult*100+'%')
        .height(mult*100+'%');

 var $doc = $(document);
 var $window = $(window);
 $doc.scrollTop($window.height() * (mult-1) / 2)
     .scrollLeft($window.width() * (mult-1) / 2);

 $(window).scroll(function(){
   // x and y range from -0.5 to 0.5
   var x = $window.scrollLeft() / ($window.width() * (mult-1)) - 0.5;
   var y = $window.scrollTop() / ($window.height() * (mult-1)) - 0.5;
   $('#board').css({
     transform: 'translateZ(-200px) rotateX('+y*range_of_tilt+'deg) rotateY('+x*range_of_tilt+'deg)',
     background: color(x, y, 33, 35)
   });
   $('.ball').css({
     transform: 'translateZ(50px) rotateX('+(360-y*range_of_tilt)+'deg) rotateY('+(360-x*range_of_tilt)+'deg)',
     // z: ball radius; x and y reverse rotation so flat to viewer.
     background: 'radial-gradient(at 20% top,'+color(x,y,10,50)+','+color(x,y,10,20)+')'
   });
 });
});