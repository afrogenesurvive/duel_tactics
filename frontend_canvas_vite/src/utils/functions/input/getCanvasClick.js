import pointInPolygon from "point-in-polygon";

export function getCanvasClick(app, canvas, event, type) {
  const rect = canvas.getBoundingClientRect();
  const scale = rect.width / canvas.offsetWidth;
  // const scale = (rect.width / canvas.offsetWidth)*app.camera.zoom.x;
  // const scale = (rect.width / canvas.offsetWidth)*(app.camera.zoom.x-1);
  const x = (event.clientX - rect.left) * scale;
  const y = (event.clientY - rect.top) * scale;

  // ADJUSTED FOR CANVAS SCALE & TRANSFORM
  let newX = (x - app.camera.zoomFocusPan.x) / app.camera.zoom.x;
  let newY = (y - app.camera.zoomFocusPan.y) / app.camera.zoom.y;

  // console.log("clicked the canvas", 'x: ',x,'y: ',y,'newX',newX,'newY',newY,'zoom',app.camera.zoom.x.toFixed(2),'pan',app.camera.pan.x,app.camera.pan.y);

  let insideGrid = false;

  for (const cell of app.gridInfo) {
    let point = [newX, newY];
    let polygon = [];
    for (const vertex of cell.vertices) {
      let vertexPoint = [vertex.x + 10, vertex.y + 5];
      polygon.push(vertexPoint);
    }
    let pip = pointInPolygon(point, polygon);
    if (pip === true) {
      insideGrid = true;
      // console.log("clicked or moused over a cell", cell.center, "x: " + x + " y: " + y);
      app.cursorCoords = {
        x: x,
        y: y,
      };
      let player = undefined;
      for (const plyr of app.players) {
        if (
          plyr.currentPosition.cell.number.x === cell.number.x &&
          plyr.currentPosition.cell.number.y === cell.number.y
        ) {
          player = plyr;
        }
      }
      if (type === "click" && app.cellInfoMouseOver !== true) {
        // console.log("clicked on a cell", cell.center, "x: " + x + " y: " + y);
        app.clicked.cell = cell;
        if (player) {
          app.clicked.player = player;
        } else {
          app.clicked.player = undefined;
        }
        app.showCellInfoBox = true;
        app.mouseOverCell = {
          state: true,
          cell: cell,
          count: 0,
          threshold: app.mouseOverCell.threshold,
        };
      }

      if (type === "mousemove") {
        // console.log("moused over a cell", cell.center, "x: " + x + " y: " + y);
        app.mouseMoving = true;

        if (app.mouseOverCellSwitchOff.state === true) {
          app.mouseOverCellSwitchOff.state = false;
        }

        if (app.cellInfoMouseOver !== true) {
          if (app.mouseOverCell.cell) {
            if (
              app.mouseOverCell.cell.number.x === cell.number.x &&
              app.mouseOverCell.cell.number.y === cell.number.y
            ) {
              if (app.mouseOverCell.state === true) {
                // console.log('do nothing');
              } else {
                if (app.mouseOverCell.count < app.mouseOverCell.threshold) {
                  app.mouseOverCell.count++;
                }
                if (app.mouseOverCell.count >= app.mouseOverCell.threshold) {
                  app.clicked.cell = cell;
                  if (player) {
                    app.clicked.player = player;
                  } else {
                    app.clicked.player = undefined;
                  }
                  app.showCellInfoBox = true;
                  app.mouseOverCell = {
                    state: true,
                    cell: cell,
                    count: 0,
                    threshold: app.mouseOverCell.threshold,
                  };
                }
              }
            } else {
              app.mouseOverCell = {
                state: false,
                cell: cell,
                count: 0,
                threshold: app.mouseOverCell.threshold,
              };
            }
          } else {
            app.mouseOverCell = {
              state: false,
              cell: cell,
              count: 0,
              threshold: app.mouseOverCell.threshold,
            };
          }
        } else {
          // console.log("mouse in cell info box. do nothing");
        }
      }
    }
  }
  if (insideGrid === false) {
    app.cursorCoords = {
      x: x,
      y: y,
    };
    // console.log("clicked or moused over the canvas out of bounds", 'x: ',x,'y: ',y);
    // console.log('clicked or mouse moved outside the grid',app.cellInfoMouseOver);
    if (type === "click") {
      // console.log("clicked on the canvas out of bounds", "x: ", x, "y: ", y);
      if (app.mouseOverCellSwitchOff.state === true) {
        app.mouseOverCellSwitchOff.state = false;
      }
      if (app.cellInfoMouseOver !== true) {
        app.showCellInfoBox = false;
        app.mouseOverCell = {
          state: false,
          cell: undefined,
          count: 0,
          threshold: app.mouseOverCell.threshold,
        };
      } else {
        app.showCellInfoBox = true;
      }
    } else if (type === "mousemove") {
      // console.log("moused over the canvas out of bounds", "x: ", x, "y: ", y);
      if (app.cellInfoMouseOver !== true) {
        if (app.mouseOverCellSwitchOff.state !== true) {
          app.mouseOverCellSwitchOff.state = true;
        }

        if (
          app.mouseOverCell.cell &&
          app.mouseOverCell.state !== true &&
          app.mouseOverCell.count > 1
        ) {
          app.mouseOverCell = {
            state: false,
            cell: undefined,
            count: 0,
            threshold: app.mouseOverCell.threshold,
          };
        }
      } else {
        // console.log("heeere!", app.cellInfoMouseOver);
        app.cellInfoMouseOver = false;

        app.showCellInfoBox = true;
        app.mouseOverCell.state = false;
        if (app.mouseOverCellSwitchOff.state === true) {
          app.mouseOverCellSwitchOff.state = false;
          app.mouseOverCellSwitchOff.count = 0;
        }
      }
    }
  }

  if (type === "mousemove") {
    app.mouseMoving = true;
  }
}
