
.ToString("MM/dd/yyyy")

string path = Environment.CurrentDirectory;
path = path.Substring(0, Environment.CurrentDirectory.Length - 17);
var stream = File.OpenRead(Path.Combine(path, @"AppData/csv/Timesheet1.csv"));


var directory = $"{Path.GetDirectoryName(context.DeploymentDirectory)}\\net6.0\\AppData\\csv\\Timesheet1.csv";
var stream = File.OpenRead(directory);


// --------------------------------------------
// --------------------------------------------
// --------------------------------------------



consider an html canvas of fixed length and width of 500 px each with a red border of 5px. At the canvas' centred yellow square of side length 250 px. On top of the yellow square is a 25 square (blue outlines only) grid, also of side length 250px. I'd like to able to do several things with this canvas using context scale and translate: 1. store 'original position', 'original view' or 'default view' corresponding to zoom and pan values used with scale and translate; 2. be able to zoom in, focusing on the centre point of the current view; 3. be able to pan in 4 directions; 4. zoom out while adjusting the pan towards the original position.

I also want to: 5. not be able to zoom out past the original position;  6. use key presses not mouse input for the controls; 7. stop taking zoom out input and indicate this by increasing the decreasing the canvas border size for a moment; 8. not take panning input when at original position zoom level and 'flashing' the red border like point #7.


can you add code to update current position and zoom level when the view is updated


that code isn't zooming out or in properly. zooming out should adjust the pan and thereby the context translate params to move towards a centered view. zooming in should also adjust pan to keep the view centered


update the code to confine the blue grid to the dimensions of the yellow square, to write a coordinate for each e.g 0,0 , 0,1 and finally to use key strokes instead of mouse actions. Also prohibit panning if zoom is equal to or less than the original position and prohibit zooming in past roughly 2 times the original position and zooming out




----------------------------------------------------------------
----------------------------------------------------------------
----------------------------------------------------------------

<canvas id="myCanvas" width="500" height="500"></canvas>


canvas {
            border: 5px solid red;
        }

const canvas = document.getElementById("myCanvas");
        const context = canvas.getContext("2d");
        const defaultPosition = { x: canvas.width / 2, y: canvas.height / 2 };
        const defaultZoom = 1;
        const zoomInFactor = 1.1;
        const zoomOutFactor = 1 / zoomInFactor;
        const zoomOutLimit = 0.5;
        let currentPosition = { x: defaultPosition.x, y: defaultPosition.y };
        let currentZoom = defaultZoom;
        let isPanning = false;
        let panStart = { x: 0, y: 0 };

        // Draw the initial canvas with yellow square and blue grid
        context.fillStyle = "yellow";
        context.fillRect((canvas.width - 250) / 2, (canvas.height - 250) / 2, 250, 250);
        context.strokeStyle = "blue";
        for (let i = 0; i < 11; i++) {
            context.strokeRect((canvas.width - 250) / 2 + i * 25, (canvas.height - 250) / 2, 25, 250);
            context.strokeRect((canvas.width - 250) / 2, (canvas.height - 250) / 2 + i * 25, 250, 25);
        }

        function updateView(newPosition, newZoom) {
            // Store the current position and zoom level
            currentPosition = newPosition;
            currentZoom = newZoom;

            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Save the default context state
            context.save();

            // Scale and translate the context to implement zoom and pan
            context.scale(currentZoom, currentZoom);
            context.translate(-currentPosition.x + canvas.width / (2 * currentZoom), -currentPosition.y + canvas.height / (2 * currentZoom));

            // Redraw the yellow square and blue grid with the new context state
            context.fillStyle = "yellow";
            context.fillRect((canvas.width - 250) / 2, (canvas.height - 250) / 2, 250, 250);
            context.strokeStyle = "blue";
            for (let i = 0; i < 11; i++) {
                context.strokeRect((canvas.width - 250) / 2 + i * 25, (canvas.height - 250) / 2, 25, 250);
                context.strokeRect((canvas.width - 250) / 2, (canvas.height - 250) / 2 + i * 25, 250, 25);
            }

            // Restore the default context state
            context.restore();
        }

        function panStartHandler(event) {
            isPanning = true;
            panStart.x = event.clientX;
            panStart.y = event.clientY;
        }

        function panEndHandler() {
            isPanning = false;
        }

        function panHandler(event) {
            if (isPanning) {
                let deltaX = event.clientX - panStart.x;
                let deltaY = event.clientY - panStart.y;
                let newPosition = { x: currentPosition.x + deltaX, y: currentPosition.y + deltaY };
updateView(newPosition, currentZoom);
panStart.x = event.clientX;
panStart.y = event.clientY;
}
}


    function zoomHandler(event) {
        let delta = event.deltaY < 0 ? zoomInFactor : zoomOutFactor;
        let newZoom = currentZoom * delta;
        if (newZoom < zoomOutLimit) {
            newZoom = zoomOutLimit;
        }
        let newPosition = {
            x: (currentPosition.x - canvas.width / 2) * delta + canvas.width / 2,
            y: (currentPosition.y - canvas.height / 2) * delta + canvas.height / 2
        };
        updateView(newPosition, newZoom);
    }

    function onKeyDown(event) {
        if (event.code === "ArrowUp" || event.code === "ArrowDown" || event.code === "ArrowLeft" || event.code === "ArrowRight") {
            event.preventDefault();
            let deltaX = 0;
            let deltaY = 0;
            if (event.code === "ArrowUp") {
                deltaY = -10;
            } else if (event.code === "ArrowDown") {
                deltaY = 10;
            } else if (event.code === "ArrowLeft") {
                deltaX = -10;
            } else if (event.code === "ArrowRight") {
                deltaX = 10;
            }
            let newPosition = { x: currentPosition.x + deltaX, y: currentPosition.y + deltaY };
            updateView(newPosition, currentZoom);
        } else if (event.code === "KeyZ" && !event.shiftKey) {
            event.preventDefault();
            let delta = zoomOutFactor;
            let newZoom = currentZoom * delta;
            if (newZoom < zoomOutLimit) {
                newZoom = zoomOutLimit;
            }
            let newPosition = {
                x: (currentPosition.x - canvas.width / 2) * delta + canvas.width / 2,
                y: (currentPosition.y - canvas.height / 2) * delta + canvas.height / 2
            };
            updateView(newPosition, newZoom);
            canvas.style.border = "10px solid red";
            setTimeout(() => canvas.style.border = "5px solid red", 200);
        } else if (event.code === "Key" && event.shiftKey) {
            event.preventDefault();
            let delta = zoomInFactor;
            let newZoom = currentZoom * delta;
            let newPosition = {
                x: (currentPosition.x - canvas.width / 2) * delta + canvas.width / 2,
                y: (currentPosition.y - canvas.height / 2) * delta + canvas.height / 2
            };
            updateView(newPosition, newZoom);
        }
    }

    // Add event listeners
    canvas.addEventListener("mousedown", panStartHandler);
    canvas.addEventListener("mouseup", panEndHandler);
    canvas.addEventListener("mousemove", panHandler);
    canvas.addEventListener("wheel", zoomHandler);
    window.addEventListener("keydown", onKeyDown);

    // Initialize the canvas view
    updateView(defaultPosition, defaultZoom);





----------------------------------------------------------------
----------------------------------------------------------------
----------------------------------------------------------------


<!DOCTYPE html>
<html>
  <head>
    <title>Canvas Zoom and Pan</title>
  </head>
  <body>
    <canvas id="myCanvas" width="500" height="500" style="border: 5px solid red;"></canvas>
    <p id="currentPosition"></p>
    <p id="currentZoomLevel"></p>

    <script>
      // Get the canvas and context
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");

      // Set the dimensions and properties of the canvas and grid
      var squareSize = 250;
      var cellSize = squareSize / 25;
      var numRows = 25;
      var numCols = 25;

      // Set the initial position and zoom level
      var originalPanX = 0;
      var originalPanY = 0;
      var originalZoom = 1;
      var zoom = originalZoom;
      var maxZoomIn = 2 * originalZoom;
      var maxZoomOut = 0.5 * originalZoom;
      var panX = originalPanX;
      var panY = originalPanY;

      // Get the current position and zoom level elements
      var currentPosition = document.getElementById("currentPosition");
      var currentZoomLevel = document.getElementById("currentZoomLevel");

      // Function to zoom in
      function zoomIn() {
        if (zoom < maxZoomIn) {
          zoom *= 1.1;
          draw();
        } else {
          // Flash the border of the canvas to indicate that zooming in is not allowed
          canvas.style.borderColor = "red";
          setTimeout(function () {
            canvas.style.borderColor = "black";
          }, 100);
        }
      }

      // Function to zoom out
      function zoomOut() {
        if (zoom > maxZoomOut) {
          zoom /= 1.1;
          draw();
        } else {
          // Flash the border of the canvas to indicate that zooming out is not allowed
          canvas.style.borderColor = "red";
          setTimeout(function () {
            canvas.style.borderColor = "black";
          }, 100);
        }
      }

      // Function to pan up
      function panUp() {
        if (zoom > originalZoom) {
          panY += 10 / zoom;
          draw();
        } else {
          // Flash the border of the canvas to indicate that panning is not allowed
          canvas.style.borderColor = "red";
          setTimeout(function () {
            canvas.style.borderColor = "black";
          }, 100);
        }
      }

      // Function to pan down
      function panDown() {
        if (zoom > originalZoom) {
          panY -= 10 / zoom;
          draw();
        } else {
          // Flash the border of the canvas to indicate that panning is not allowed
          canvas.style.borderColor = "red";
          setTimeout(function () {
            canvas.style.borderColor = "black";
          }, 100);
        }
      }

      // Function to pan left
      function panLeft() {
        if (zoom > originalZoom) {
          panX += 10 / zoom;
          draw();
        } else {
          // Flash the border of the canvas to indicate that panning is not allowed
          canvas.style.borderColor = "red";
          setTimeout(function () {
            canvas.style.borderColor = "black";
          }, 100);
        }
      }

      // Function to pan right
      function panRight() {
        if (zoom > originalZoom) {
          panX -= 10 / zoom;
          draw();
        } else {
          // Flash the border of the canvas to indicate that panning is not allowed
          canvas.style.borderColor = "red";
          setTimeout(function () {
          canvas.style.borderColor = "black";
          }, 100);
        }
      }


      // Function to draw the canvas and grid
function draw() {
  // Save the current transformation matrix
  ctx.save();

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set the translation and scale values
  ctx.translate(panX + squareSize / 2, panY + squareSize / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-squareSize / 2, -squareSize / 2);

  // Draw the yellow square
  ctx.fillStyle = "yellow";
  ctx.fillRect(0, 0, squareSize, squareSize);

  // Draw the blue grid
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  for (var i = 0; i <= numCols; i++) {
    var x = i * cellSize;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, squareSize);
  }
  for (var j = 0; j <= numRows; j++) {
    var y = j * cellSize;
    ctx.moveTo(0, y);
    ctx.lineTo(squareSize, y);
  }
  ctx.stroke();

  // Restore the original transformation matrix
  ctx.restore();

  // Update the current position and zoom level elements
  currentPosition.innerHTML =
    "Current position: (" +
    panX.toFixed(2) +
    ", " +
    panY.toFixed(2) +
    ")";
  currentZoomLevel.innerHTML = "Current zoom level: " + zoom.toFixed(2);
}

// Draw the canvas and grid initially
draw();

// Handle key presses
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "+":
      zoomIn();
      break;
    case "-":
      zoomOut();
      break;
    case "ArrowUp":
      panUp();
      break;
    case "ArrowDown":
      panDown();
      break;
    case "ArrowLeft":
      panLeft();
      break;
    case "ArrowRight":
      panRight();
      break;
  }
});
