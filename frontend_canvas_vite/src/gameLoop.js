import { playerUpdate } from "./playerUpdate";

export function gameLoop(app) {
  console.log(`gameLoop started!`);

  // IF PRESSED SETTINGS KEY, COUNT
  // PAUSE GAME IF SETTINGS OPENED
  if (app.showSettingsKeyPress.state === true) {
    if (app.showSettingsKeyPress.count < app.showSettingsKeyPress.limit) {
      app.showSettingsKeyPress.count++;
    }
    if (app.showSettingsKeyPress.count >= app.showSettingsKeyPress.limit) {
      if (app.state.showSettings !== true) {
        app.setState({
          showSettings: true,
        });
        if (app.showSettingsCanvasData.state === true) {
          app.settingsFormGridWidthUpdate(app.settingsGridWidth);
        }

        // app.redrawSettingsGrid();
      } else {
        // app.updateSettingsFormAiDataData = {};
        app.settingsFormAiStartPosList = [];
        app.setState({
          showSettings: false,
        });
      }
      app.showSettingsKeyPress = {
        state: false,
        count: 0,
        limit: app.showSettingsKeyPress.limit,
      };
    }
  }

  if (app.state.showSettings !== true) {
    // let ts = window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    app.stepper.currentTime = new Date().getTime();
    app.stepper.deltaTime = app.stepper.currentTime - app.stepper.lastTime;

    if (app.stepper.deltaTime > app.stepper.interval) {
      app.time++;

      if (app.time === 300) {
        //   app.openVoid = true;
        // OR
        //   app.customCellToVoid({x:2,y:2})
        // app.players[1].ai.retreating.state = false;
        // app.players[1].ai.retreating.checkin = undefined;
        // app.players[1].ai.mission = 'retreat';
        // app.players[1].ai.retreating.safe = false;
      }

      app.setState({
        stateUpdater: "..",
      });

      if (app.gamepad === true) {
        app.pollGamepads();
      }

      // REMOVE AI PLAYER!
      if (app.removeAi && app.addAiCount.state !== true) {
        let aiPlayer = app.players[app.removeAi - 1];
        let newArray = app.players.filter((x) => x !== aiPlayer);
        app.players = [];
        app.players = newArray;
        app.removeAi = undefined;
      }

      for (const player of app.players) {
        // app.playerUpdate( ??
        playerUpdate(
          app,
          player,
          app.state.canvas,
          app.state.context,
          app.state.canvas2,
          app.state.context2,
          app.state.canvas3,
          app.state.context3,
        );
      }

      app.stepper.lastTime =
        app.stepper.currentTime - (app.stepper.deltaTime % app.stepper.interval);
    }
  }

  requestAnimationFrame(app.gameLoop);
}
