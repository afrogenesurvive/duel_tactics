export function getCustomPlyrStartPosList(app, args) {
  // console.log('getCustomPlyrStartPosList',app.gridInfo.length,args);
  app.settingsFormPlyrGridInfo = app.gridInfo;

  app.playerNumber = args.length;

  let avoidCells = [];

  app.settingsFormPlyrStartPosList = [];

  // A chosen cell is only usable if it still exists on the current grid
  // and passes the standard "is this a valid start cell" check.
  const isCellValid = (cell) => {
    if (!cell || cell.x === undefined || cell.y === undefined) return false;
    if (cell.x < 0 || cell.y < 0 || cell.x > app.gridWidth || cell.y > app.gridWidth) return false;
    return app.plyrStartPosCheckCell({ x: cell.x, y: cell.y }) === true;
  };

  for (const plyr of args) {
    let array1 = [];

    // AVOID ALREADY SELECTED POSITIONS (only when they are still valid)
    let selectedValid = plyr.selected ? isCellValid(plyr.selected) : false;
    if (selectedValid) {
      avoidCells.push(plyr.selected);
    }

    // NO VALID POSITION SELECTED, GAME STARTING. USE DEFAULT START POSITIONS
    if (!selectedValid) {
      if (
        !app.gridInfo.find(
          (x) =>
            x.number.x === app.players[plyr.plyrNo - 1].startPosition.cell.number.x &&
            x.number.y === app.players[plyr.plyrNo - 1].startPosition.cell.number.y,
        )
      ) {
        let cll = { x: undefined, y: undefined };
        let randomFreeCellChosen = false;

        while (randomFreeCellChosen !== true) {
          cll.x = app.rnJesus(0, app.gridWidth);
          cll.y = app.rnJesus(0, app.gridWidth);
          randomFreeCellChosen = app.checkCell(cll, ["all"]);
        }

        if (randomFreeCellChosen === true) {
          app.players[plyr.plyrNo - 1].startPosition.cell.number = cll;
        }
      }

      let playerStartPos = app.players[plyr.plyrNo - 1].startPosition.cell.number;

      avoidCells.push({ x: playerStartPos.x, y: playerStartPos.y });
    }

    // CHECK FOR AI POSITIONS TO ADD TO CELLS TO AVOID
    if (app.updateSettingsFormAiDataData.count) {
      if (parseInt(app.updateSettingsFormAiDataData.count.count) > 0) {
        for (const plyr2 of app.settingsFormAiStartPosList) {
          for (const selected of plyr2.selected) {
            avoidCells.push(selected.cell);
          }
        }
      }
    }

    // BUILD AVALIBLE POSITION ARRAY EXCLUDING CELLS TO AVOID

    for (const elem of app.settingsFormPlyrGridInfo) {
      if (
        app.plyrStartPosCheckCell({ x: elem.number.x, y: elem.number.y }) === true &&
        !avoidCells.find(
          (elem2) => elem2.x === elem.number.x && elem2.y === elem.number.y,
        )
      ) {
        array1.push({ x: elem.number.x, y: elem.number.y });
      }
    }

    // NO VALID POSITION SELECTED, GAME STARTING. MARK PLAYER POSITION SELECTED
    if (!selectedValid) {
      let playerStartPos = app.players[plyr.plyrNo - 1].startPosition.cell.number;

      plyr.selected = { x: playerStartPos.x, y: playerStartPos.y };
    }

    // PUSH TO SETTINGS PLAYER POSITION DATA
    app.settingsFormPlyrStartPosList.push({
      plyrNo: plyr.plyrNo,
      posArray: array1,
      selected: plyr.selected,
    });

    // FORCE STATE UPDATE FOR SETTINGS COMPONENT
    app.setState({
      stateUpdater: "..",
    });
  }
  // console.log('app.settingsFormPlyrStartPosList',app.settingsFormPlyrStartPosList);

  // ADD 'RANDOM' CHOICE TO NEW POSITION AVAILIBLE ARRAY
  let lastAvailiblePosArray =
    app.settingsFormPlyrStartPosList[app.settingsFormPlyrStartPosList.length - 1]
      .posArray;
  let hasRandomCell = lastAvailiblePosArray.find((x) => x === "random");
  if (!hasRandomCell) {
    lastAvailiblePosArray.push("random");
  }
  // console.log('lastAvailiblePosArray',lastAvailiblePosArray);
  for (const elem of app.settingsFormPlyrStartPosList) {
    // console.log('elem',elem);
    elem.posArray = lastAvailiblePosArray;
  }

  app.setState({
    stateUpdater: "..",
  });

  app.settingsFormGridWidthUpdate(app.settingsGridWidth);

  // console.log('app.settingsFormPlyrStartPosList',app.settingsFormPlyrStartPosList);
}
