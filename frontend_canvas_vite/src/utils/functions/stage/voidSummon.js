export function voidSummon(app, cell) {
  // console.log('opening void');

  let foundPlayer;
  let player;
  let cl = app.gridInfo.find((elem) => elem.number.x === cell.x && elem.number.y === cell.y);

  if (cl.number.x === app.gridWidth && cl.number.y === 0) {
    // console.log('dont void app');
  }
  if (cl.number.x === app.gridWidth && cl.number.y === app.gridWidth) {
    // console.log('dont void app');
  } else {
    cl.item = {
      name: "",
      type: "",
      subType: "",
      effect: "",
      initDrawn: false,
    };
    cl.void.state = true;

    if (app.bloodSacrificeEvent.state === true) {
      // console.log('bloodSacrificeVoidedCells',cl);
      app.bloodSacrificeVoidedCells.push(cl);
    }
    // console.log('voiding',cl.number.x,cl.number.y);

    // if (
    //   cl.levelData.charAt(0) === 'y'
    // ) {
    //   let x = cl.levelData.slice(1,3)
    //   cl.levelData = "x"+x+"";
    // }
    // if (
    //   cl.levelData.charAt(0) === 'z'
    // ) {
    //   let x = cl.levelData.slice(1,3)
    //   cl.levelData = "x"+x+"";
    // }
  }

  for (const plyr of app.players) {
    if (plyr.currentPosition.cell.number.x === cell.x && plyr.currentPosition.cell.number.y === cell.y) {
      foundPlayer = true;
      app.players[plyr.number - 1].falling.state = true;
      app.players[plyr.number - 1].action = "falling";

      app.players[plyr.number - 1].popups.push({
        state: false,
        count: 0,
        limit: 25,
        type: "",
        position: "",
        msg: "falling",
        img: "",
      });

      app.players[plyr.number - 1].target = app.resetTarget();

      app.players[plyr.number - 1].moving = {
        state: true,
        step: 0,
        course: "",
        origin: {
          number: plyr.currentPosition.cell.number,
          center: plyr.currentPosition.cell.center,
        },
        destination: {
          x: plyr.currentPosition.cell.center.x,
          y: plyr.currentPosition.cell.center.y,
        },
      };

      let nextPosition = app.lineCrementer(plyr);
      app.players[plyr.number - 1].nextPosition = nextPosition;
    }
  }

  app.updatePathArray();

  app.easyStar.avoidAdditionalPoint(cell.x, cell.y);

  for (const plyr2 of app.players) {
    if (plyr2.ai.state === true) {
      plyr2.ai.targetAcquired = false;
    }
  }
}
