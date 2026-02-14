export function findFocusCell(
  app,
  inputType,
  inputSubType,
  focus,
  canvas,
  context,
  speed,
) {
  let cell = {
    x: undefined,
    y: undefined,
  };
  let direction = "";
  let cellOffsetX = 0;
  let cellOffsetY = 0;
  let centerCellRef = {
    x: 4,
    y: 4,
  };
  let newCell = {
    x: undefined,
    y: undefined,
  };

  if (inputType === "cellToPan") {
    let destCell = focus;
    let originCell = {
      x: app.camera.focusCell.x,
      y: app.camera.focusCell.y,
    };
    // let originCell = app.camera.cellToPanOrigin;
    let x1 = originCell.x;
    let y1 = originCell.y;
    let x2 = destCell.x;
    let y2 = destCell.y;
    let xSteps = 0;
    let ySteps = 0;
    let xDirection = "";
    let yDirection = "";
    let preInstructions = [];

    if (x1 > x2) {
      xDirection = "west";
      xSteps = x1 - x2;
    }
    if (x2 > x1) {
      xDirection = "east";
      xSteps = x2 - x1;
    }
    if (y1 > y2) {
      yDirection = "north";
      ySteps = y1 - y2;
    }
    if (y2 > y1) {
      yDirection = "south";
      ySteps = y2 - y1;
    }

    let sameCell = originCell.x === destCell.x && originCell.y === destCell.y;
    let cancelPath = false;
    let pathSet = [];
    app.updatePathArray();
    app.easyStar = new Easystar.js();
    app.easyStar.setGrid(app.pathArray);
    app.easyStar.setAcceptableTiles([0]);
    app.easyStar.enableDiagonals();

    let test2 = app.easyStar.findPath(
      originCell.x,
      originCell.y,
      destCell.x,
      destCell.y,
      function (path) {
        if (path === null) {
          cancelPath = true;
          console.log("Path was not found");
        } else {
          pathSet = path;
        }
      },
    );
    app.easyStar.setIterationsPerCalculation(1000);
    app.easyStar.calculate();
    setTimeout(() => {
      if (cancelPath === true) {
        console.log("cancel path");
        app.easyStar = new Easystar.js();
      } else {
        // console.log("path setA", pathSet);
        finish();
      }
    }, 30);

    const finish = () => {
      let indx = 0;

      for (const cell of pathSet) {
        if (indx < pathSet.length - 1) {
          let pointA = cell;
          let pointB = pathSet[indx + 1];
          let direction;

          if (pointA.x - pointB.x === 1 && pointA.y - pointB.y === 1) {
            direction = "north";
          }
          if (pointA.x - pointB.x === 0 && pointA.y - pointB.y === 1) {
            direction = "northEast";
          }
          if (pointA.x - pointB.x === -1 && pointA.y - pointB.y === 1) {
            direction = "east";
          }
          if (pointA.x - pointB.x === -1 && pointA.y - pointB.y === 0) {
            direction = "southEast";
          }
          if (pointA.x - pointB.x === -1 && pointA.y - pointB.y === -1) {
            direction = "south";
          }
          if (pointA.x - pointB.x === 0 && pointA.y - pointB.y === -1) {
            direction = "southWest";
          }
          if (pointA.x - pointB.x === 1 && pointA.y - pointB.y === -1) {
            direction = "west";
          }
          if (pointA.x - pointB.x === 1 && pointA.y - pointB.y === 0) {
            direction = "northWest";
          }

          preInstructions.push(direction);
          indx++;
        }
      }

      let a = 50;
      let b = 100;

      const setMoveAndZoom = () => {
        let zoomCount = parseInt(inputSubType.split("_")[2]);
        let zoomDirection = inputSubType.split("_")[1];
        let panCount = preInstructions.length;
        let incr = 0;
        let remainder = 0;
        let greater = "";

        let finalArray = [];
        let indx2 = 0;
        // zoomCount = 10;
        // panCount = 3;

        if (zoomCount > panCount) {
          greater = "zoom";
          incr = Math.floor(zoomCount / panCount);
          remainder = zoomCount % panCount;

          for (let index = 0; index < panCount; index++) {
            finalArray.push("pan");
            for (let index2 = 0; index2 < incr; index2++) {
              finalArray.push("zoom");
            }
          }
          if (remainder > 0) {
            for (let index = 0; index < remainder; index++) {
              finalArray.push("zoom");
            }
          }
        }

        if (panCount > zoomCount) {
          greater = "pan";
          incr = Math.floor(panCount / zoomCount);
          remainder = panCount % zoomCount;
          for (let index = 0; index < zoomCount; index++) {
            finalArray.push("zoom");
            for (let index2 = 0; index2 < incr; index2++) {
              finalArray.push("pan");
            }
          }
          if (remainder > 0) {
            for (let index = 0; index < remainder; index++) {
              finalArray.push("pan");
            }
          }
        }

        // for (const elem of finalArray) {
        //   if (elem === "zoom") {
        //     app.camera.instructions.push({
        //       action: "zoom_in",
        //       action2: "",
        //       count: 0,
        //       count2: 0,
        //       limit: 1,
        //       limit2: 0,
        //       speed: "",
        //     });
        //   }
        //   if (elem === "pan") {
        //     switch (preInstructions[indx2]) {
        //       case "north":
        //         app.camera.instructions.push({
        //           action: "pan_north",
        //           action2: "",
        //           count: 0,
        //           count2: 0,
        //           limit: a,
        //           limit2: 0,
        //           speed: speed,
        //         });
        //         break;
        //       case "northEast":
        //         app.camera.instructions.push({
        //           action: "pan_north",
        //           action2: "pan_east",
        //           count: 0,
        //           count2: 0,
        //           limit: a / 2,
        //           limit2: b / 2,
        //           speed: speed,
        //         });
        //         break;
        //       case "east":
        //         app.camera.instructions.push({
        //           action: "pan_east",
        //           action2: "",
        //           count: 0,
        //           count2: 0,
        //           limit: b,
        //           limit2: 0,
        //           speed: speed,
        //         });
        //         break;
        //       case "southEast":
        //         app.camera.instructions.push({
        //           action: "pan_south",
        //           action2: "pan_east",
        //           count: 0,
        //           count2: 0,
        //           limit: a / 2,
        //           limit2: b / 2,
        //           speed: speed,
        //         });
        //         break;
        //       case "south":
        //         app.camera.instructions.push({
        //           action: "pan_south",
        //           action2: "",
        //           count: 0,
        //           count2: 0,
        //           limit: a,
        //           limit2: 0,
        //           speed: speed,
        //         });
        //         break;
        //       case "southWest":
        //         app.camera.instructions.push({
        //           action: "pan_south",
        //           action2: "pan_west",
        //           count: 0,
        //           count2: 0,
        //           limit: a / 2,
        //           limit2: b / 2,
        //           speed: speed,
        //         });
        //         break;
        //       case "west":
        //         app.camera.instructions.push({
        //           action: "pan_west",
        //           action2: "",
        //           count: 0,
        //           count2: 0,
        //           limit: b,
        //           limit2: 0,
        //           speed: speed,
        //         });
        //         break;
        //       case "northWest":
        //         app.camera.instructions.push({
        //           action: "pan_north",
        //           action2: "pan_west",
        //           count: 0,
        //           count2: 0,
        //           limit: a / 2,
        //           limit2: b / 2,
        //           speed: speed,
        //         });
        //         break;
        //       default:
        //         break;
        //     }
        //     indx2++;
        //   }
        // }

        // console.log("finalArray", finalArray);

        let indx3 = 0;
        let limit = 0;
        let setCombinedInstruction = (args) => {
          let result = args;

          if (zoomCount > 0) {
            if (greater === "pan") {
              limit = zoomCount;
              if (indx3 < limit) {
                if (result.action2 === "") {
                  result.action2 = "zoom_" + zoomDirection + "";
                  result.limit2 = 1;
                } else {
                  result.action3 = "zoom_" + zoomDirection + "";
                  result.count3 = 0;
                  result.limit3 = 1;
                }
                indx3++;
              }
              if (indx3 >= limit) {
                indx3 = 0;
              }
            }
            if (greater === "zoom") {
              limit = panCount;
              if (indx3 < limit) {
                if (result.action2 === "") {
                  result.action2 = "zoom_" + zoomDirection + "";
                  result.limit2 = incr;
                } else {
                  result.action3 = "zoom_" + zoomDirection + "";
                  result.count3 = 0;
                  result.limit3 = incr;
                }
                indx3++;
              }
              if (indx3 >= limit) {
                indx3 = 0;
              }
            }
          }
          return result;
        };

        for (const preInstruction of preInstructions) {
          let completeInstruction = {};
          switch (preInstruction) {
            case "north":
              completeInstruction = setCombinedInstruction({
                action: "pan_north",
                action2: "",
                count: 0,
                count2: 0,
                limit: a,
                limit2: 0,
                speed: speed,
              });
              break;
            case "northEast":
              completeInstruction = setCombinedInstruction({
                action: "pan_north",
                action2: "pan_east",
                count: 0,
                count2: 0,
                limit: a / 2,
                limit2: b / 2,
                speed: speed,
              });
              break;
            case "east":
              completeInstruction = setCombinedInstruction({
                action: "pan_east",
                action2: "",
                count: 0,
                count2: 0,
                limit: b,
                limit2: 0,
                speed: speed,
              });
              break;
            case "southEast":
              completeInstruction = setCombinedInstruction({
                action: "pan_south",
                action2: "pan_east",
                count: 0,
                count2: 0,
                limit: a / 2,
                limit2: b / 2,
                speed: speed,
              });
              break;
            case "south":
              app.camera.instructions.push({
                action: "pan_south",
                action2: "",
                count: 0,
                count2: 0,
                limit: a,
                limit2: 0,
                speed: speed,
              });
              break;
            case "southWest":
              completeInstruction = setCombinedInstruction({
                action: "pan_south",
                action2: "pan_west",
                count: 0,
                count2: 0,
                limit: a / 2,
                limit2: b / 2,
                speed: speed,
              });
              break;
            case "west":
              completeInstruction = setCombinedInstruction({
                action: "pan_west",
                action2: "",
                count: 0,
                count2: 0,
                limit: b,
                limit2: 0,
                speed: speed,
              });
              break;
            case "northWest":
              completeInstruction = setCombinedInstruction({
                action: "pan_north",
                action2: "pan_west",
                count: 0,
                count2: 0,
                limit: a / 2,
                limit2: b / 2,
                speed: speed,
              });
              break;
            default:
              break;
          }
          app.camera.instructions.push(completeInstruction);
        }

        if (greater === "zoom" && remainder > 0) {
          if (
            app.camera.instructions[app.camera.instructions.length - 1].action2.split(
              "_",
            )[0] === "zoom"
          ) {
            app.camera.instructions[app.camera.instructions.length - 1].limit2 +=
              remainder;
          } else if (
            app.camera.instructions[app.camera.instructions.length - 1].action3.split(
              "_",
            )[0] === "zoom"
          ) {
            app.camera.instructions[app.camera.instructions.length - 1].limit3 +=
              remainder;
          }
        }
      };

      if (inputSubType.split("_")[0] === "move&&zoom") {
        setMoveAndZoom();
      } else {
        for (const instruction of preInstructions) {
          switch (instruction) {
            case "north":
              app.camera.instructions.push({
                action: "pan_north",
                action2: "",
                count: 0,
                count2: 0,
                limit: a,
                limit2: 0,
                speed: speed,
              });
              break;
            case "northEast":
              app.camera.instructions.push({
                action: "pan_north",
                action2: "pan_east",
                count: 0,
                count2: 0,
                limit: a / 2,
                limit2: b / 2,
                speed: speed,
              });
              break;
            case "east":
              app.camera.instructions.push({
                action: "pan_east",
                action2: "",
                count: 0,
                count2: 0,
                limit: b,
                limit2: 0,
                speed: speed,
              });
              break;
            case "southEast":
              app.camera.instructions.push({
                action: "pan_south",
                action2: "pan_east",
                count: 0,
                count2: 0,
                limit: a / 2,
                limit2: b / 2,
                speed: speed,
              });
              break;
            case "south":
              app.camera.instructions.push({
                action: "pan_south",
                action2: "",
                count: 0,
                count2: 0,
                limit: a,
                limit2: 0,
                speed: speed,
              });
              break;
            case "southWest":
              app.camera.instructions.push({
                action: "pan_south",
                action2: "pan_west",
                count: 0,
                count2: 0,
                limit: a / 2,
                limit2: b / 2,
                speed: speed,
              });
              break;
            case "west":
              app.camera.instructions.push({
                action: "pan_west",
                action2: "",
                count: 0,
                count2: 0,
                limit: b,
                limit2: 0,
                speed: speed,
              });
              break;
            case "northWest":
              app.camera.instructions.push({
                action: "pan_north",
                action2: "pan_west",
                count: 0,
                count2: 0,
                limit: a / 2,
                limit2: b / 2,
                speed: speed,
              });
              break;
            default:
              break;
          }
        }
      }

      // console.log("instructionsA", app.camera.instructions);
      if (app.camera.instructions.length > 0 || sameCell === true) {
        app.autoCamPanWaitingForPath = false;
      }
    };

    // console.log('auto camera instructions',app.camera.instructions);
  }

  if (inputType === "panToCell") {
    let focusCell;
    const rect = canvas.getBoundingClientRect();
    const scale = rect.width / canvas.offsetWidth;
    // console.log('rect.width',rect.width);

    const x = app.canvasWidth / 2;
    const y = app.canvasHeight / 2;

    // ADJUSTED FOR CANVAS SCALE & TRANSFORM
    let newX = (x - app.camera.zoomFocusPan.x) / app.camera.zoom.x;
    let newY = (y - app.camera.zoomFocusPan.y) / app.camera.zoom.y;
    // app.camera.focus.x = newX
    // app.camera.focus.y = newY

    let insideGrid = false;

    for (const cell of app.gridInfo) {
      let point = [newX, newY];
      // let point = [newX,newY];
      let polygon = [];
      for (const vertex of cell.vertices) {
        let vertexPoint = [vertex.x + 10, vertex.y + 5];
        polygon.push(vertexPoint);
      }
      let pip = pointInPolygon(point, polygon);
      if (pip === true) {
        insideGrid = true;
        // console.log("camera focus cell",cell.number,"x: " + x + " y: " + y);
        focusCell = cell;
      }
    }
    if (insideGrid === false) {
      // console.log("clicked the canvas", 'x: ',x,'y: ',y);
      // console.log('clicked outside the grid');
      // app.showCellInfoBox = false;
      focusCell = {
        number: {
          x: 0,
          y: 0,
        },
        center: {
          x: 0,
          y: 0,
        },
        drawCenter: {
          x: 0,
          y: 0,
        },
        vertices: [
          {
            x: 0,
            y: 0,
          },
          {
            x: 0,
            y: 0,
          },
          {
            x: 0,
            y: 0,
          },
          {
            x: 0,
            y: 0,
          },
        ],
        side: 0,
        levelData: "",
        edge: {
          state: false,
          side: "",
        },
        terrain: {
          name: "",
          type: "",
          effect: "",
        },
        item: {
          name: "",
          type: "",
          subType: "",
          effect: "",
          initDrawn: false,
        },
        void: {
          state: false,
        },
        obstacle: {
          id: 0,
          trap: {},
          state: false,
          name: "",
          type: "",
          hp: 2,
          destructible: {
            state: false,
            weapons: [],
            leaveRubble: false,
          },
          locked: {
            state: false,
            key: "",
          },
          weight: 1,
          height: 0.5,
          items: [],
          effects: [],
          moving: {
            state: false,
            step: 0,
            origin: {
              number: {
                x: undefined,
                y: undefined,
              },
              center: {
                x: undefined,
                y: undefined,
              },
            },
            destination: {
              number: {
                x: undefined,
                y: undefined,
              },
              center: {
                x: undefined,
                y: undefined,
              },
            },
            currentPosition: {
              x: undefined,
              y: undefined,
            },
            nextPosition: {
              x: undefined,
              y: undefined,
            },
            moveSpeed: 0,
            pushable: true,
            pushed: false,
            pusher: undefined,
            falling: {
              state: false,
              count: 0,
              limit: 10,
            },
          },
        },
        barrier: {
          id: 0,
          trap: {},
          state: false,
          name: "",
          type: "",
          hp: 2,
          destructible: {
            state: false,
            weapons: [],
            leaveRubble: false,
          },
          locked: {
            state: false,
            key: "",
          },
          position: "",
          height: 1,
        },
        elevation: {
          number: 0,
          type: "",
          position: "",
        },
        rubble: false,
      };
      app.cellsToHighlight2 = [];
    }

    // SEND FOCUS CELL TO cellsToHighlight

    if (insideGrid === true) {
      // console.log('panToCell using pointInPolygon',focusCell.number);
      app.camera.focusCell.x = focusCell.number.x;
      app.camera.focusCell.y = focusCell.number.y;
      // console.log('panToCell camera.focusCell',app.camera.focusCell);
      if (app.highlightZoomPanFocusCell === true) {
        for (const cell2 of app.cellsToHighlight2) {
          if (
            cell2.number.x !== focusCell.number.x ||
            cell2.number.y !== focusCell.number.y
          ) {
            let indx = app.cellsToHighlight2.indexOf(cell2);
            app.cellsToHighlight2.splice(indx, 1);
          }
        }
        if (
          !app.cellsToHighlight2.find(
            (x) => x.number.x === focusCell.number.x && x.number.y === focusCell.number.y,
          )
        ) {
          app.cellsToHighlight2.push({
            number: {
              x: focusCell.number.x,
              y: focusCell.number.y,
            },
            count: 0,
            limit: 0,
          });
        }
        // console.log('app.cellsToHighlight2',app.cellsToHighlight2);
      }
    }

    if (app.camera.pan.x < 0) {
      direction = "east";
      cellOffsetX = parseInt((app.camera.pan.x / 50).toFixed(0));
    }
    if (app.camera.pan.x > 0) {
      direction = "west";
      cellOffsetX = parseInt((app.camera.pan.x / 50).toFixed(0));
    }
    if (app.camera.pan.y > 0) {
      direction = "north";
      cellOffsetY = parseInt((app.camera.pan.y / 25).toFixed(0));
    }
    if (app.camera.pan.y < 0) {
      direction = "south";
      cellOffsetY = parseInt((app.camera.pan.y / 25).toFixed(0));
    }

    if (app.camera.pan.x === -1) {
      cellOffsetX = 0;
    }
    if (app.camera.pan.y === -1) {
      cellOffsetY = 0;
    }

    // console.log('cellOffsetX',cellOffsetX,'cellOffsetY',cellOffsetY);
  }
}
