export function loadSettings(app, event) {
  event.preventDefault();

  let gridSize = event.target.gridSize.value;

  let playerNumber = event.target.humanPlayers.value;
  let aiPlayerNumber = event.target.aiCount.value;

  switch (gridSize) {
    case "3":
      app.gridWidth = 3;
      app.sceneY = app.state.sceneY.three;
      break;
    case "6":
      app.gridWidth = 6;
      app.sceneY = app.state.sceneY.six;
      break;
    case "9":
      app.gridWidth = 9;
      app.sceneY = app.state.sceneY.nine;
      break;
    case "12":
      app.gridWidth = 12;
      app.sceneY = app.state.sceneY.twelve;
      break;
  }

  if (app.gridWidth >= 12) {
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
