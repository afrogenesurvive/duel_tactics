export function checkVoid(app, player) {
  // OPEN VOID!!???
  if (app.openVoid === true) {
    if (app.cellToVoid.state !== true) {
      // console.log('set a new cell to void');

      let cell = {
        x: 0,
        y: 0,
      };

      let voidChance = Math.round(1000 / app.gridWidth);
      let openVoid = app.rnJesus(1, voidChance);

      if (openVoid === 1) {
        // console.log('boom');
        cell.x = app.rnJesus(0, app.gridWidth);
        cell.y = app.rnJesus(0, app.gridWidth);

        app.cellToVoid.state = true;
        app.cellToVoid.x = cell.x;
        app.cellToVoid.y = cell.y;
        app.cellToVoid.count = 1;
      }
    } else if (app.cellToVoid.state === true) {
      // console.log('already voiding a cell');
      if (app.cellToVoid.count < app.cellToVoid.limit) {
        app.cellToVoid.count++;
        // console.log('cv',app.cellToVoid.count);
      } else if (app.cellToVoid.count >= app.cellToVoid.limit) {
        // console.log('summon void now',app.cellToVoid.x,app.cellToVoid.y);

        let cell = {
          x: app.cellToVoid.x,
          y: app.cellToVoid.y,
        };

        app.voidSummon(cell);

        app.cellToVoid = {
          state: false,
          x: 0,
          y: 0,
          count: 0,
          limit: app.cellToVoid.limit,
        };

        if (app.voidCustomCell === true) {
          // console.log('void custom cell switch off');
          app.openVoid = false;
          app.voidCustomCell = false;
        }
      }
    }
  }
  // LIMIT CELL VOID EVENT!!
  if (app.voidTimer.count < app.voidTimer.limit) {
    app.voidTimer.count++;
    // console.log('void count',app.voidTimer.count);
  }
  if (app.voidTimer.count >= app.voidTimer.limit) {
    app.openVoid = false;
    // console.log('void off');
  }

  // BLOOD SACRIFICE!!
  if (app.bloodSacrificeEvent.state === true) {
    if (app.bloodSacrificeEvent.count < app.bloodSacrificeEvent.limit) {
      app.bloodSacrificeEvent.count++;
    } else if (app.bloodSacrificeEvent.count >= app.bloodSacrificeEvent.limit) {
      if (app.cellToVoid.state !== true) {
        app.bloodSacrificeEvent.state = false;
        app.openVoid = false;
        console.log("Blood Sacrifice event is now over.");
        if (app.bloodSacrificeEvent.restore === true) {
          for (const cell of app.bloodSacrificeVoidedCells) {
            // console.log('restoring cells after blood Sacrifice',cell);
            if (cell.terrain.name !== "void") {
              cell.void.state = false;
            }
          }

          app.bloodSacrificeVoidedCells = [];
          app.bloodSacrificeEvent.restore = false;
        }
      }
    }
  }
}
