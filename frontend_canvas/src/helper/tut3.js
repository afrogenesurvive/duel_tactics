





// Game loop

function init(){
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');

        // Start the first frame request
        window.requestAnimationFrame(gameLoop);
    }

    function gameLoop(timeStamp){
        draw();

        // Keep requesting new frames
        window.requestAnimationFrame(gameLoop);
    }

    function draw(){
        let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
        context.fillStyle = randomColor;
        context.fillRect(100, 50, 200, 175);
    }



// Game loop with time based animation control & ime limiting
let rectX = 0;
let rectY = 0;

let secondsPassed = 0;
let oldTimeStamp = 0;
let movingSpeed = 50;

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function gameLoop(timeStamp) {
    // Calculate how much time has passed
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    secondsPassed = Math.min(secondsPassed, 0.1);

    // Pass the time to the update
    update(secondsPassed);
    draw();

    window.requestAnimationFrame(gameLoop);
}

function update(secondsPassed) {
    // Use time to calculate new position
    rectX += (movingSpeed * secondsPassed);
    rectY += (movingSpeed * secondsPassed);
}

function draw() {
    // Clear the entire canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#ff8080';
    context.fillRect(rectX, rectY, 150, 100);
}


// 1. Draw initial assets (stage), add listeners
// 2. Request anim frames
//   3. Game loop
//     4. Update
//       5. Check all states, props, positions, collisions etc
//       6. Check inputs
//         7. Modify states, props etc based on inputs
//       8. Update/set new states, props, positions etc
//       ** Do for all game objects
//     9. Draw/redraw
//   10. Request anim frame



// another time keeping game loop

var now,
		dt,
    last,
    step;

    init (){


      //set the default values of the time vars
     now = 0;
     dt = 0;
     last = timestamp();
     step = 1 / 60;
     fps = 0;


     // other initial drawing and setup

     //request an animation frame pass it the update method
     requestAnimationFrame(frame);


    }


    function frame() {
    	now = timestamp();
    	dt = dt + Math.min(1, (now - last) / 1000);
    	while(dt > step) {
    		dt = dt - step;
    		update(step);
    	}
    	render(dt);
    	last = now;
    	requestAnimationFrame(frame);

    }

    function update(step) {


    }

    function render(step) {

    	ctx.save();

      draw(ctx)

      ctx.restore();
    }
