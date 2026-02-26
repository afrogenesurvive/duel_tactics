export function getCustomAiStartPosList(app, args) {
  // console.log('getCustomAiStartPosList',args);

  let avoidCells = [];

  if (args.length === 0) {
    app.settingsFormAiStartPosList = [];

    app.setState({
      stateUpdater: "..",
    });
  } else {
    avoidCells = [];
    app.settingsFormAiStartPosList = [];
    for (const plyr of args) {
      // switch(plyr.mission) {
      //   case 'pursue':
      //
      //   break;
      //   case 'patrol':
      //   break;
      //   case 'defend':
      //   break;
      // }

      let array1 = [];
      if (plyr.selected.length > 0) {
        for (const selected of plyr.selected) {
          avoidCells.push(selected.cell);
        }
      }

      if (app.settingsFormPlyrStartPosList[0]) {
        for (const plyr2 of app.settingsFormPlyrStartPosList) {
          avoidCells.push(plyr2.selected);
        }
      }

      for (const elem of app.settingsFormAiGridInfo) {
        if (
          app.checkCell({ x: elem.number.x, y: elem.number.y }, ["all"]) === true &&
          !avoidCells.find(
            (elem2) => elem2.x === elem.number.x && elem2.y === elem.number.y,
          )
        ) {
          array1.push({ x: elem.number.x, y: elem.number.y });
        }
      }
      // console.log('app.settingsFormAiGridInfo',app.settingsFormAiGridInfo);
      // console.log('array1',array1);

      if (plyr.selected.length === 0) {
        let doubleCheckArray = array1;

        if (plyr.mission === "patrol") {
          avoidCells.push({ x: array1[0].x, y: array1[0].y });
          avoidCells.push({ x: array1[1].x, y: array1[1].y });
          avoidCells.push({ x: array1[2].x, y: array1[2].y });

          plyr.selected.push({
            type: "start",
            cell: { x: array1[0].x, y: array1[0].y },
          });
          plyr.selected.push({
            type: "patrol1",
            cell: { x: array1[1].x, y: array1[1].y },
          });
          plyr.selected.push({
            type: "patrol2",
            cell: { x: array1[2].x, y: array1[2].y },
          });

          doubleCheckArray = array1.filter((i) => i !== array1[0]);
          doubleCheckArray = doubleCheckArray.filter((i) => i !== array1[1]);
          doubleCheckArray = doubleCheckArray.filter((i) => i !== array1[2]);
        }
        if (plyr.mission === "defend") {
          avoidCells.push({ x: array1[0].x, y: array1[0].y });
          avoidCells.push({ x: array1[1].x, y: array1[1].y });

          plyr.selected.push({
            type: "start",
            cell: { x: array1[0].x, y: array1[0].y },
          });
          plyr.selected.push({
            type: "defend",
            cell: { x: array1[1].x, y: array1[1].y },
          });

          doubleCheckArray = array1.filter((i) => i !== array1[0]);
          doubleCheckArray = doubleCheckArray.filter((i) => i !== array1[1]);
        }
        if (plyr.mission === "pursue") {
          avoidCells.push({ x: array1[0].x, y: array1[0].y });

          plyr.selected.push({
            type: "start",
            cell: { x: array1[0].x, y: array1[0].y },
          });

          doubleCheckArray = array1.filter((i) => i !== array1[0]);
        }

        array1 = doubleCheckArray;
      }

      app.settingsFormAiStartPosList.push({
        plyrNo: plyr.plyrNo,
        mission: plyr.mission,
        posArray: array1,
        selected: plyr.selected,
      });

      app.setState({
        stateUpdater: "..",
      });
    }

    let lastAvailiblePosArray =
      app.settingsFormAiStartPosList[app.settingsFormAiStartPosList.length - 1].posArray;
    let hasRandomCell = lastAvailiblePosArray.find((x) => x === "random");
    if (!hasRandomCell) {
      lastAvailiblePosArray.push("random");
    }

    for (const elem of app.settingsFormAiStartPosList) {
      // console.log('elem',elem);
      elem.posArray = lastAvailiblePosArray;
    }

    app.setState({
      stateUpdater: "..",
    });
  }
  // console.log('updateSettingsFormAiData',app.updateSettingsFormAiDataData);
  app.settingsFormGridWidthUpdate(app.settingsGridWidth);
}
