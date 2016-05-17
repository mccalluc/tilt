(function() {
  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite;

  var engine = Engine.create();
  engine.world.gravity.y = 0;

  var render = Render.create({
      element: document.body,
      engine: engine
  });

  var balls = $('.ball').map(function(i, ball) {
      var $ball = $(ball);
      var position = $ball.position();
      // TODO: ".css('border-radius')" should work?
      return Bodies.circle(position.top, position.left, 50);
    }).toArray();
  World.add(engine.world, balls);

  Engine.run(engine);

  (function render() {
      window.requestAnimationFrame(render);
      var bodies = Composite.allBodies(engine.world);
      $('.ball').each(function(i, ball){
        var $ball = $(ball);
        $ball.css('left', bodies[i].position.x)
             .css('top', bodies[i].position.y);
      });
  })();
  
  
  var range_of_tilt = 90; // Angle through which the board can rotate
  var mult = 2; // Ratio of page size to window size
  
   function color(x, y, s, l) {
     return 'hsl(' +(100*(x+0.5)+250)+ ', ' +s+ '%, ' +(50*(y+0.5)+l)+ '%)';
   }
  
   var $window = $(window);
   $window.scroll(function(){
     // x and y range from -0.5 to 0.5
     var x = $window.scrollLeft() / ($window.width() * (mult-1)) - 0.5;
     var y = $window.scrollTop() / ($window.height() * (mult-1)) - 0.5;
     engine.world.gravity.x = x;
     engine.world.gravity.y = -y;
     $('#board').css({
       transform: 'translateZ(-200px) rotateX('+y*range_of_tilt+'deg) rotateY('+x*range_of_tilt+'deg)',
       background: color(x, y, 33, 35)
     });
     $('.ball').css({
       transform: 'translateZ(50px) rotateX('+(360-y*range_of_tilt)+'deg) rotateY('+(360-x*range_of_tilt)+'deg)',
       // z: ball radius; x and y reverse rotation so flat to viewer.
       background: 'radial-gradient(at 20% top,'+color(x,y,10,50)+','+color(x,y,10,20)+')',
       'box-shadow': ''+(-x*30)+'px '+(y*30)+'px 20px -5px rgba(0, 0, 0, 0.3)'
     });
   });
})();
