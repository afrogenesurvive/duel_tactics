export function loadSettings(app, event) {
  console.log("loadSettings");

  event.preventDefault();

  // Read values from app state (set by React form controls before submit)
  // This avoids depending on DOM elements that may be conditionally rendered.
  let gridSize = app.gridWidth;
  let playerNumber = app.settingsFormPlyrStartPosList.length;
  let aiPlayerNumber = app.updateSettingsFormAiDataData.count?.count || 0;

  switch (gridSize) {
    case 3:
      app.gridWidth = 3;
      app.sceneY = app.state.sceneY.three;
      break;
    case 6:
      app.gridWidth = 6;
      app.sceneY = app.state.sceneY.six;
      break;
    case 9:
      app.gridWidth = 9;
      app.sceneY = app.state.sceneY.nine;
      break;
    case 12:
      app.gridWidth = 12;
      app.sceneY = app.state.sceneY.twelve;
      break;
    case 15:
      app.gridWidth = 15;
      app.sceneY = app.state.sceneY.fifteen;
      break;
    case 19:
      app.gridWidth = 19;
      app.sceneY = app.state.sceneY.nineteen;
      break;
  }

  if (app.gridWidth >= 19) {
    if (window.innerWidth < 1100) {
      app.zoomThresh = -0.55;
    } else {
      app.zoomThresh = -0.25;
    }
  } else if (app.gridWidth >= 15) {
    if (window.innerWidth < 1100) {
      app.zoomThresh = -0.4;
    } else {
      app.zoomThresh = -0.15;
    }
  } else if (app.gridWidth >= 12) {
    if (window.innerWidth < 1100) {
      app.zoomThresh = -0.25;
    } else {
      app.zoomThresh = -0.05;
    }
  } else {
    // app.zoomThresh = -0.15;
    app.zoomThresh = -0.05;
  }

  app.gamepadConfig = [];
  for (const plyr2 of app.settingsFormPlayerData.input) {
    app.gamepadConfig.push({
      plyrNo: plyr2.plyrNo,
      input: plyr2.input,
      type: "",
      id: "",
      mapping: "",
      gamepadIndex: undefined,
    });
    if (plyr2.input === "Gamepad") {
      app.gamepad = true;
    }
    app.players[plyr2.plyrNo - 1].input = plyr2.input;
  }
  if (!app.settingsFormPlayerData.input.find((x) => x.input === "Gamepad")) {
    app.gamepad = false;
  }
  app.connectedGamepadsInit = false;

  for (const plyr3 of app.settingsFormPlayerData.team) {
    app.players[plyr3.plyrNo - 1].team = plyr3.team;
  }

  // console.log('load settings app.gamepadConfig',app.gamepadConfig);

  if (playerNumber < 2) {
    app.players.splice(1, 1);
    app.playerNumber = 1;
  } else {
    app.playerNumber = 2;
  }

  for (const plyr of app.settingsFormPlyrStartPosList) {
    app.players[plyr.plyrNo - 1].startPosition.cell.number = plyr.selected;
  }

  if (app.updateSettingsFormAiDataData.startItems === true) {
    app.disableInitItems = false;
  } else {
    app.disableInitItems = true;
  }

  // ── Apply gameplay settings ──
  app.showDirectionalActionAnimation = app.settingsFormUiData?.showActionDirectionAnim !== false;
  app.showPlayerOutlines = app.settingsFormUiData?.showPlayerOutlines !== false;

  // ── Apply background theme ──
  if (app.settingsFormUiData?.backgroundTheme) {
    app.setBackgroundImage(app.settingsFormUiData.backgroundTheme);
  }

  app.gameReset("hard");

  // app.placeItems({init: true, items: ''});

  if (aiPlayerNumber > 0) {
    app.loadAiSettings();
  } else {
    app.updateSettingsFormAiDataData = {
      // count: {
      //   count: '0'
      // }
    };
    app.settingsFormAiStartPosList = [];
    app.setState({
      showSettings: false,
    });
    app.showSettingsCanvasData.state = false;
  }

  // console.log('app.settingsFormPlyrStartPosList',app.settingsFormPlyrStartPosList);
  // console.log('app.updateSettingsFormAiData',app.updateSettingsFormAiDataData);
  // console.log('app.settingsFormAiStartPosList',app.settingsFormAiStartPosList);
}
