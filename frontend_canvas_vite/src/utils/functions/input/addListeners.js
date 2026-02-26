export function addListeners(app, canvas, canvas2) {
  // console.log('adding listeners');

  canvas2.addEventListener("click", (e) => {
    app.getCanvasClick(canvas2, e, "click");
  });

  window.addEventListener("gamepadconnected", (e) => {
    // console.log('new gamepad?',e);
    app.handleGamepadEvent(e, "connected");
  });

  window.addEventListener("gamepaddisconnected", (e) => {
    // console.log('Lost connection with the gamepad.');
    app.handleGamepadEvent(e, "disconnected");
  });

  // canvas3.addEventListener("click", e => {
  //   app.getSettingsCanvasClick(canvas3, e)
  // });

  // if (app.showSettingsCanvasData.state === true) {
  //   canvas3.addEventListener("click", (e) => {
  //     app.getSettingsCanvasClick(canvas3, e);
  //   });
  // }

  document.addEventListener("keydown", (e) => {
    app.handleKeyPress(e, true);
  });
  document.addEventListener("keyup", (e) => {
    app.handleKeyPress(e, false);
  });

  canvas2.addEventListener("mousemove", (e) => {
    app.getCanvasClick(canvas2, e, "mousemove");
  });
}
