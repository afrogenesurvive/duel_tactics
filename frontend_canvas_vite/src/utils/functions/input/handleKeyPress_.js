export function handleKeyPress(app, event, state) {
  // console.log('handling key press', event.key, state, event);

  let direction;
  let keyInput = event.key;

  switch (keyInput) {
    case "w":
      app.keyPressed[0].north = state;
      // direction = 'north';
      app.players[0].turnCheckerDirection = "north";
      app.currentPlayer = 1;
      break;
    case "a":
      app.keyPressed[0].west = state;
      // direction = 'west';
      app.players[0].turnCheckerDirection = "west";
      app.currentPlayer = 1;
      break;
    case "d":
      app.keyPressed[0].east = state;
      // direction = 'east';
      app.players[0].turnCheckerDirection = "east";
      app.currentPlayer = 1;
      break;
    case "s":
      app.keyPressed[0].south = state;
      // direction = 'south';
      app.players[0].turnCheckerDirection = "south";
      app.currentPlayer = 1;
      break;
    case "f":
      app.keyPressed[0].attack = state;
      app.currentPlayer = 1;
      break;
    case "v":
      app.keyPressed[0].defend = state;
      app.currentPlayer = 1;
      break;
    case "c":
      app.keyPressed[0].dodge = state;
      app.currentPlayer = 1;
      break;
    case "r":
      app.keyPressed[0].pull = state;
      app.currentPlayer = 1;
      break;
    case "Shift":
      if (event.code === "ShiftLeft") {
        app.keyPressed[0].kick = state;
        app.currentPlayer = 1;
      }

      if (event.code === "ShiftRight") {
        app.keyPressed[1].playerMenu = state;
        app.currentPlayer = 2;
      }

      break;
    case " ":
      if (
        state === false &&
        app.players[0].moving.state === true &&
        app.players[0].strafing.state === true
      ) {
        app.players[0].strafeReleaseHook = true;
      }
      if (
        state === false &&
        app.players[0].moving.state !== true &&
        app.keyPressed[0].strafe === true
      ) {
        app.players[0].strafeReleaseHook = true;
      } else {
        app.keyPressed[0].strafe = state;
        app.players[0].strafing.state = state;
        app.currentPlayer = 1;
      }
      break;
    case "q":
      app.keyPressed[0].cycleWeapon = state;
      app.currentPlayer = 1;
      break;
    case "e":
      app.keyPressed[0].cycleArmor = state;
      app.currentPlayer = 1;
      break;
    case "2":
      app.keyPressed[0].discardWeapon = state;
      app.currentPlayer = 1;
      break;
    case "3":
      app.keyPressed[0].discardArmor = state;
      app.currentPlayer = 1;
      break;
    case "Control":
      app.keyPressed[0].playerMenu = state;
      app.currentPlayer = 1;
      break;
    case "5":
      app.keyPressed[0].uiMenu = state;
      app.currentPlayer = 1;
      break;
    case "4":
      app.showSettingsKeyPress.state = state;
      app.currentPlayer = 1;
      break;
    case "1":
      if (app.players[0].dead.state === true) {
        app.respawn(app.players[0]);
      }
      break;
    case "z":
      app.keyPressed[0].rotateLeft = state;
      app.currentPlayer = 1;
      break;
    case "x":
      app.keyPressed[0].rotateRight = state;
      app.currentPlayer = 1;
      break;

    case "6":
      app.toggleCameraMode = state;
      break;
    case "7":
      app.addAiPlayerKeyPress = state;
      break;
    case "`":
      app.gameReset("soft");
      break;

    case "i":
      app.keyPressed[1].north = state;
      // direction = 'north';
      app.players[1].turnCheckerDirection = "north";
      app.currentPlayer = 2;
      break;

    case "j":
      app.keyPressed[1].west = state;
      // direction = 'west';
      app.players[1].turnCheckerDirection = "west";
      app.currentPlayer = 2;
      break;
    case "k":
      app.keyPressed[1].south = state;
      // direction = 'south';
      app.players[1].turnCheckerDirection = "south";
      app.currentPlayer = 2;
      break;
    case "l":
      app.keyPressed[1].east = state;
      // direction = 'east';
      app.players[1].turnCheckerDirection = "east";
      app.currentPlayer = 2;
      break;
    case ";":
      app.keyPressed[1].attack = state;
      app.currentPlayer = 2;
      break;
    case ".":
      app.keyPressed[1].defend = state;
      app.currentPlayer = 2;
      break;
    case "'":
      app.keyPressed[1].dodge = state;
      app.currentPlayer = 2;
      break;
    case "p":
      app.keyPressed[1].pull = state;
      app.currentPlayer = 2;
      break;
    case "Enter":
      app.keyPressed[1].kick = state;
      app.currentPlayer = 2;
      break;
    case "/":
      if (
        state === false &&
        app.players[1].moving.state === true &&
        app.players[1].strafing.state === true
      ) {
        app.players[1].strafeReleaseHook = true;
      }
      if (
        state === false &&
        app.players[1].moving.state !== true &&
        app.keyPressed[1].strafe === true
      ) {
        app.players[1].strafeReleaseHook = true;
      } else {
        app.keyPressed[1].strafe = state;
        app.players[1].strafing.state = state;
        app.currentPlayer = 2;
      }
      break;

    case "u":
      app.keyPressed[1].cycleWeapon = state;
      app.currentPlayer = 2;
      break;
    case "o":
      app.keyPressed[1].cycleArmor = state;
      app.currentPlayer = 2;
      break;
    case "8":
      app.keyPressed[1].discardWeapon = state;
      app.currentPlayer = 2;
      break;
    case "9":
      app.keyPressed[1].discardArmor = state;
      app.currentPlayer = 2;
      break;
    case "0":
      app.keyPressed[1].uiMenu = state;
      app.currentPlayer = 2;
      break;

    case "=":
      if (app.players[1].dead.state === true) {
        app.respawn(app.players[1]);
      }
      break;
    case "-":
      app.showSettingsKeyPress.state = state;
      app.currentPlayer = 2;
      break;
    case "[":
      app.keyPressed[1].rotateLeft = state;
      app.currentPlayer = 2;
      break;
    case "]":
      app.keyPressed[1].rotateRight = state;
      app.currentPlayer = 2;
      break;
    default:
      break;
  }

  let player = app.players[app.currentPlayer - 1];

  // STEP GAME ON KEYPRESS FOR DEBUGGING
  // for (const player of app.players) {
  //   app.playerUpdate(player, app.state.canvas, app.state.context, app.state.canvas2, app.state.context2);
  // }
  // app.time++
  // app.setState({
  //   stateUpdater: '..'
  // })
}
