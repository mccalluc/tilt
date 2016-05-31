(function () {
    // Configuration:
    var mult = 2; // Ratio of page size to window size
    var range_of_tilt = 90; // Angle through which the board can rotate

    // Convenience:
    var Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite;

    var $window = $(window);

    function init() {
        var $filler = $('#filler');
        $filler.width(mult * 100 + '%')
                .height(mult * 100 + '%');

        var $doc = $(document);
        var $window = $(window);
        $doc.scrollTop($window.height() * (mult - 1) / 2)
                .scrollLeft($window.width() * (mult - 1) / 2);

        $('<p id="intro">Scroll to tilt. Click to add and remove.<br>Best on modern browsers. Sorry.<br><a href="https://github.com/mccalluc/tilt">Fork on Github.</a></p>')
                .appendTo('#board').fadeOut(20000);
    }

    function add_ball(x, y, r) {
        var body = Bodies.circle(x, y, r); // TODO: set friction to 0? Not working for me.
        World.add(engine.world, body);
        var $ball = $('<div class="ball">')
                .css({
                    top: y,
                    left: x,
                    width: r * 2,
                    height: r * 2,
                    'margin-left': -r,
                    'margin-top': -r
                })
                .appendTo('#board');
        $ball.click(function () {
            remove_ball($ball, body);
        });
    }

    function remove_ball($ball, body) {
        $ball.animate({
            opacity: 0,
            width: 1000,
            height: 1000,
            'margin-left': -500,
            'margin-top': -500},
                500,
                function () {
                    Composite.remove(engine.world, body);
                    $ball.remove();
                });
    }

    function start_engine() {
        var engine = Engine.create();
        engine.world.gravity.y = 0;
        Render.create({
            element: document.body,
            engine: engine
        });
        Engine.run(engine);
        return engine;
    }

    function render() {
        window.requestAnimationFrame(render);
        var bodies = Composite.allBodies(engine.world);
        $('.ball').each(function (i, ball) {
            var $ball = $(ball);
            $ball.css('left', bodies[i].position.x)
                    .css('top', bodies[i].position.y);
        });
    }

    function color(x, y, s, l) {
        return 'hsl(' + (100 * (x + 0.5) + 250) + ', ' + s + '%, ' + (50 * (y + 0.5) + l) + '%)';
    }

    function on_scroll() {
        // x and y range from -0.5 to 0.5
        var x = $window.scrollLeft() / ($window.width() * (mult - 1)) - 0.5;
        var y = $window.scrollTop() / ($window.height() * (mult - 1)) - 0.5;
        engine.world.gravity.x = x;
        engine.world.gravity.y = -y;
        $('#board').css({
            transform: 'translateZ(-200px) rotateX(' + y * range_of_tilt + 'deg) rotateY(' + x * range_of_tilt + 'deg)',
            background: color(x, y, 33, 35)
        });
        $('.ball').css({
            transform: 'translateZ(50px) rotateX(' + (360 - y * range_of_tilt) + 'deg) rotateY(' + (360 - x * range_of_tilt) + 'deg)',
            // z: ball radius; x and y reverse rotation so flat to viewer.
            background: 'radial-gradient(at 20% top,' + color(x, y, 10, 50) + ',' + color(x, y, 10, 20) + ')',
            'box-shadow': '' + (-x * 30) + 'px ' + (y * 30) + 'px 20px -5px rgba(0, 0, 0, 0.3)'
        });
    }

    init();
    var engine = start_engine();
    add_ball(100, 100, 50);
    render();
    $window.scroll(on_scroll);
    $('#board').click(function(event) {
        if (event.target === this) { // board itself is the target, and not one of the balls 
            add_ball(event.offsetX * 1.2, event.offsetY * 1.2, 50); // TODO: Hack. Offsets not 3D?
            on_scroll(); // to set styles that depend on orientation
        }
    });

})();
