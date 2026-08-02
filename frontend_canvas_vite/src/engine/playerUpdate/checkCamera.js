export function checkCamera(app, player, canvas, context) {
  if (app.setInitZoom.state === true) {
    if (app.setInitZoom.gridWidth >= 12) {
      // if (app.setInitZoom.windowWidth < 1100) {

      if (app.camera.zoom.x - 1 >= app.zoomThresh) {
        app.camera.zoom.x -= 0.02;
        app.camera.zoom.y -= 0.02;
        app.camera.zoomDirection = "out";

        let zoom = app.camera.zoom.x;
        let diff = 1 - zoom;

        // app.camera.zoomFocusPan.x = (diff*(canvas.width/2));
        // app.camera.zoomFocusPan.y = (diff*(canvas.width/2))-(diff*(canvas.width/6));

        // TRY THESE FOR CAM SMOOTHNESS
        app.camera.zoomFocusPan.x = (canvas.width / 2) * (1 - zoom) + 1 + app.camera.pan.x * zoom;
        app.camera.zoomFocusPan.y = (canvas.height / 2) * (1 - zoom) + 1 + app.camera.pan.y * zoom;

        app.camera.mode = "zoom";
        app.setZoomPan(canvas);
        app.findFocusCell("panToCell", "", {}, canvas, context);
      }

      if (app.camera.zoom.x - 1 < app.zoomThresh) {
        app.setInitZoom.state = false;
      }

      // }
      if (app.setInitZoom.windowWidth > 1100) {
      }
    }

    if (app.setInitZoom.gridWidth < 12) {
      // if (app.setInitZoom.windowWidth < 1100) {

      if (app.camera.zoom.x - 1 >= app.zoomThresh) {
        app.camera.zoom.x -= 0.02;
        app.camera.zoom.y -= 0.02;
        // app.camera.zoomDirection = 'in';
        app.camera.zoomDirection = "out";

        let zoom = app.camera.zoom.x;
        let diff = 1 - zoom;

        // app.camera.zoomFocusPan.x = (diff*(canvas.width/2));
        // app.camera.zoomFocusPan.y = (diff*(canvas.width/2))-(diff*(canvas.width/6));

        // TRY THESE FOR CAM SMOOTHNESS
        app.camera.zoomFocusPan.x = (canvas.width / 2) * (1 - zoom) + 1 + app.camera.pan.x * zoom;
        app.camera.zoomFocusPan.y = (canvas.height / 2) * (1 - zoom) + 1 + app.camera.pan.y * zoom;

        app.camera.mode = "zoom";

        // console.log('zooming out to init',app.camera.zoom.x-1);
        // app.setCameraFocus('input',canvas, context, canvas2, context2);
        app.setZoomPan(canvas);
        app.findFocusCell("panToCell", "", {}, canvas, context);
      }

      if (app.camera.zoom.x - 1 < app.zoomThresh) {
        app.setInitZoom.state = false;
      }

      // }
    }
    // console.log('zooming out to init',app.camera.zoom.x-1);
  }
  //INPUT MODE SWITCH
  if (app.toggleCameraMode === false && app.camera.state === true) {
    app.camera.startCount = 0;
  }
  if (
    app.camera.state === false &&
    app.toggleCameraMode === false &&
    app.camera.startCount >= app.camera.startLimit &&
    app.camera.instructionType === "default"
  ) {
    // console.log('welcome to input camera mode');

    let canStart = true;
    if (
      app.camera.instructions.length > 0 ||
      app.camera.preInstructions.length > 0 ||
      app.settingAutoCamera === true ||
      app.autoCamPanWaitingForPath === true
      // app.toggleCameraMode === false
    ) {
      canStart = false;
    }
    if (app.camera.customView.state === false) {
      if (app.camera.zoom.x - 1 > app.zoomThresh || app.camera.zoom.x - 1 < app.zoomThresh) {
        canStart = false;
      }
      // if ((app.camera.zoom.x-1) > (app.zoomThresh+.01) || (app.camera.zoom.x-1) < (app.zoomThresh-.01)) {
      //   canStart = false;
      // }
      if (app.camera.pan.x < -1 || app.camera.pan.x > -1) {
        canStart = false;
      }
      if (app.camera.pan.y < -1 || app.camera.pan.y > -1) {
        canStart = false;
      }
    }

    if (canStart === true) {
      app.camera.startCount = 0;
      app.camera.state = true;
      app.camera.fixed = true;
      app.camInputNotifyShown = false;
    }
    if (canStart === false) {
      app.camera.startCount = 0;
      console.log("auto cam is probably engaged. Can't start input cam");
      if (app.camInputNotifyShown !== true) {
        app.camInputNotifyShown = true;
        if (app?.addNotification) {
          app.addNotification("Can't start input camera — auto camera is engaged", "warn");
        }
        if (app?.addEventLog) {
          app.addEventLog("Can't start input camera (auto camera engaged)", "system");
        }
      }
    }
  }
  if (app.toggleCameraMode === true) {
    let state = app.toggleCameraMode;

    if (app.camera.state === false && state === true && app.camera.startCount < app.camera.startLimit) {
      // console.log('starting camera mode ...');
      app.camera.startCount++;
    }
    if (app.camera.state === true && state === true && app.camera.startCount < app.camera.startLimit) {
      // console.log('leaving camera mode ...');
      app.camera.startCount++;
    }
    if (app.camera.state === true && state === true && app.camera.startCount >= app.camera.startLimit) {
      // console.log('thank you for using the camera');
      app.camera.startCount = 0;
      app.camera.state = false;
      app.camera.fixed = false;

      if (
        app.camera.customView.state !== true &&
        app.settingAutoCamera === false &&
        app.camera.preInstructions.length === 0 &&
        app.camera.instructions.length === 0
        // (app.camera.zoom.x-1) > app.zoomThresh
      ) {
        app.setAutoCamera("zoomReset", player);
      }
    }
  }
  //INDICATOR COUNTER
  if (app.camera.limits.state.zoom === true || app.camera.limits.state.pan === true) {
    if (app.camera.limits.state.count < app.camera.limits.state.limit) {
      app.camera.limits.state.count++;
    }
  }
  if (app.camera.limits.state.zoom === true || app.camera.limits.state.pan === true) {
    if (app.camera.limits.state.count >= app.camera.limits.state.limit) {
      app.camera.limits.state.count = 0;
      app.camera.limits.state.zoom = false;
      app.camera.limits.state.pan = false;
    }
  }
  //INPUT MODE CONTROLS
  if (app.camera.state === true && app.camera.instructionType === "default") {
    let setFocus = false;
    let setZoomPan = false;
    let findFocusCell = false;

    // IDLE ANIM STEPPER!
    if (player.action === "idle") {
      // player.idleAnim.state = true
      if (player.idleAnim.count < player.idleAnim.limit) {
        // console.log('player.idleAnim.count',player.idleAnim.count);
        player.idleAnim.count++;
      }
      if (player.idleAnim.count >= player.idleAnim.limit) {
        player.idleAnim.count = 0;
        player.idleAnim.state = false;
      }
    } else if (player.action !== "idle") {
      // player.idleAnim.state = false;
      player.idleAnim.count = 0;
    }

    if (app.keyPressed[player.number - 1].attack === true) {
      // if mode is pan and x or y are outside threshold +/- 2, log pan value, special value = true
      app.camera.mode = "zoom";
    }
    if (app.keyPressed[player.number - 1].defend === true) {
      app.camera.mode = "pan";
    }
    if (app.keyPressed[player.number - 1].dodge === true) {
      if (app.camera.customView.keyPressCount.start < app.camera.customView.keyPressCount.limit) {
        app.camera.customView.keyPressCount.start++;
      }
      if (app.camera.customView.keyPressCount.start >= app.camera.customView.keyPressCount.limit) {
        app.camera.customView.keyPressCount.start = 0;
        app.toggleCameraCustomView();
      }
    }

    if (app.camera.mode === "zoom") {
      if (
        app.keyPressed[player.number - 1].north === true &&
        app.keyPressed[player.number - 1].south !== true &&
        app.camera.zoom.x < app.camera.limits.zoom.max
      ) {
        app.camera.zoom.x += 0.02;
        app.camera.zoom.y += 0.02;
        app.camera.zoomDirection = "in";
        setFocus = true;
        setZoomPan = true;

        // console.log('zooming in',app.camera.zoom.x);
      }
      if (app.keyPressed[player.number - 1].north === true && app.camera.zoom.x >= app.camera.limits.zoom.max) {
        app.camera.limits.state.zoom = true;
        // console.log('zoom in limit',app.camera.limits.state.zoom);
      }
      if (
        app.keyPressed[player.number - 1].south === true &&
        app.keyPressed[player.number - 1].north !== true &&
        app.camera.zoom.x > app.camera.limits.zoom.min
      ) {
        app.camera.zoom.x -= 0.02;
        app.camera.zoom.y -= 0.02;
        app.camera.zoomDirection = "out";
        setFocus = true;
        setZoomPan = true;

        // console.log('zooming out',app.camera.zoom.x);
      }
      if (app.keyPressed[player.number - 1].south === true && app.camera.zoom.x <= app.camera.limits.zoom.min) {
        // console.log('zoom out limit');
        app.camera.limits.state.zoom = true;
      }
    }

    if (app.camera.mode === "pan") {
      // ONLY PAN IF CANT SEE WHOLE MAP
      let canPan = false;

      if (app.gridWidth >= 12) {
        // if (app.camera.zoom.x > .8) {
        if (app.camera.zoom.x - 1 > app.zoomThresh) {
          canPan = true;
        }
      } else {
        if (app.camera.zoom.x - 1 > app.zoomThresh) {
          canPan = true;
        }
      }

      if (canPan === true) {
        // console.log('canPan',canPan);

        if (
          app.keyPressed[player.number - 1].north === true &&
          app.keyPressed[player.number - 1].south !== true &&
          app.keyPressed[player.number - 1].east !== true &&
          app.keyPressed[player.number - 1].west !== true &&
          app.camera.pan.y < app.camera.limits.pan.y.max
        ) {
          app.camera.pan.y += 10;
          app.camera.adjustedPan.y += 10 * app.camera.zoom.x;
          app.camera.panDirection = "north";
          setFocus = true;
          setZoomPan = true;
          findFocusCell = true;

          // console.log('input panning north',app.camera.pan.y);
        }
        if (app.keyPressed[player.number - 1].north === true && app.camera.pan.y >= app.camera.limits.pan.y.max) {
          // console.log('pan limit north',app.camera.pan.y,'/',app.camera.limits.pan.y.max);
          app.camera.limits.state.pan = true;
        }
        if (
          app.keyPressed[player.number - 1].south === true &&
          app.keyPressed[player.number - 1].north !== true &&
          app.keyPressed[player.number - 1].west !== true &&
          app.keyPressed[player.number - 1].east !== true &&
          app.camera.pan.y > app.camera.limits.pan.y.min
        ) {
          app.camera.pan.y -= 10;
          app.camera.adjustedPan.y -= 10 * app.camera.zoom.x;
          app.camera.panDirection = "south";
          setFocus = true;
          setZoomPan = true;
          findFocusCell = true;

          // console.log('input panning south',app.camera.pan.y);
        }
        if (app.keyPressed[player.number - 1].south === true && app.camera.pan.y <= app.camera.limits.pan.y.min) {
          // console.log('pan limit south',app.camera.pan.y,'/',app.camera.limits.pan.y.min);
          app.camera.limits.state.pan = true;
        }
        if (
          app.keyPressed[player.number - 1].east === true &&
          app.keyPressed[player.number - 1].west !== true &&
          app.keyPressed[player.number - 1].north !== true &&
          app.keyPressed[player.number - 1].south !== true &&
          app.camera.pan.x > app.camera.limits.pan.x.min
        ) {
          app.camera.pan.x -= 10;
          app.camera.adjustedPan.x -= 10 * app.camera.zoom.x;
          app.camera.panDirection = "east";
          setFocus = true;
          setZoomPan = true;
          findFocusCell = true;

          // console.log('input panning east',app.camera.pan.x);
        }
        if (app.keyPressed[player.number - 1].east === true && app.camera.pan.x <= app.camera.limits.pan.x.min) {
          // console.log('pan limit east',app.camera.pan.x,'/',app.camera.limits.pan.x.min);
          app.camera.limits.state.pan = true;
        }
        if (
          app.keyPressed[player.number - 1].west === true &&
          app.keyPressed[player.number - 1].east !== true &&
          app.keyPressed[player.number - 1].north !== true &&
          app.keyPressed[player.number - 1].south !== true &&
          app.camera.pan.x < app.camera.limits.pan.x.max
        ) {
          app.camera.pan.x += 10;
          app.camera.adjustedPan.x += 10 * app.camera.zoom.x;
          app.camera.panDirection = "west";
          setFocus = true;
          setZoomPan = true;
          findFocusCell = true;

          // console.log('input panning west',app.camera.pan.x);
        }
        if (app.keyPressed[player.number - 1].west === true && app.camera.pan.x >= app.camera.limits.pan.x.max) {
          // console.log('pan limit west',app.camera.pan.x,'/',app.camera.limits.pan.x.max);
          app.camera.limits.state.pan = true;
        }
      } else {
        // console.log('cant pan at this zoom');
        // app.camera.limits.state.pan = true;

        if (
          app.keyPressed[player.number - 1].north === true ||
          app.keyPressed[player.number - 1].south === true ||
          app.keyPressed[player.number - 1].east === true ||
          app.keyPressed[player.number - 1].west === true
        ) {
          app.camera.limits.state.pan = true;
        }
      }
    }

    // ADJUST PAN WHEN ZOOMING TO KEEP CENTERED
    if (setZoomPan === true) {
      app.setZoomPan(canvas);
      findFocusCell = true;
    }

    //SET CAMERA FOCUS
    if (setFocus === true) {
      // app.setCameraFocus('input',canvas, context, canvas2, context2);
    }

    if (findFocusCell) {
      app.findFocusCell("panToCell", "", {}, canvas, context);
    }
  }
  // RESET
  if (app.resetCameraSwitch === true) {
    // console.log('resetting camera');

    app.resetCameraSwitch = false;
    app.camera = {
      state: true,
      startCount: 0,
      startLimit: 4,
      mode: "pan",
      fixed: false,
      target: {
        type: "player",
        plyrNo: 1,
        cell: {
          x: undefined,
          y: undefined,
        },
      },
      focus: {
        x: undefined,
        y: undefined,
      },
      focusCell: {
        x: app.camera.focusCell.x,
        y: app.camera.focusCell.y,
      },
      cellToPanOrigin: {
        x: undefined,
        y: undefined,
      },
      zoom: {
        x: 1,
        y: 1,
      },
      zoomDirection: "in",
      pan: {
        x: 1,
        y: 1,
      },
      panDirection: "east",
      zoomFocusPan: {
        x: -1,
        y: -1,
      },
      adjustedPan: {
        x: 1,
        y: 1,
      },
      limits: {
        zoom: {
          min: 0.3,
          max: 2.5,
        },
        pan: {
          x: {
            min: -400,
            max: 400,
          },
          y: {
            min: -200,
            max: 200,
          },
        },
        state: {
          count: 0,
          limit: 10,
          zoom: false,
          pan: false,
        },
      },
      instructionType: "default",
      currentPreInstruction: 0,
      preInstructions: [],
      currentInstruction: 0,
      instructions: [],
      customView: {
        state: false,
        zoom: 0,
        pan: {
          x: 0,
          y: 0,
        },
        keyPressCount: {
          start: 0,
          limit: 4,
        },
      },
    };

    app.setZoomPan(canvas);

    // app.setCameraFocus('reset', canvas, context, canvas2, context2);

    // RE-ZOOM OUT TO FIT LARGER GRIDS
    if (app.gridWidth >= 12) {
      app.setInitZoom = {
        state: true,
        windowWidth: window.innerWidth,
        gridWidth: app.gridWidth,
      };
    }
  }
  // AUTO CAMERA
  if (app.camera.state !== true && app.camera.fixed !== true) {
    if (app.camera.instructionType === "default") {
      // PRE/RAW INSTRUCTIONS!!
      if (app.camera.preInstructions.length > 0 && app.camera.instructions.length === 0 && app.autoCamPanWaitingForPath !== true) {
        // console.log('step through auto camera pre instructions',app.camera.preInstructions);

        let preInstruction = app.camera.preInstructions[app.camera.currentPreInstruction];
        // let indx = app.camera.preInstructions.indexOf(preInstruction)
        let focusCell = {
          x: undefined,
          y: undefined,
        };
        // console.log('Step through pre instructions...','preInstructions',preInstruction);

        let speed = null;
        switch (preInstruction.split("_")[0]) {
          case "moveTo":
            speed = preInstruction.split("_")[3];
            if (preInstruction.split("_")[0] === "moveTo" && app.autoCamPanWaitingForPath !== true) {
              app.autoCamPanWaitingForPath = true;
              focusCell.x = parseInt(preInstruction.split("_")[1]);
              focusCell.y = parseInt(preInstruction.split("_")[2]);

              app.findFocusCell("cellToPan", "moveTo", focusCell, canvas, context, speed);
            }
            break;
          case "zoom":
            if (preInstruction.split("_")[1] === "outToInit") {
              let zoomSteps = ((app.camera.zoom.x - 1 - app.zoomThresh) / 0.02).toFixed(0);
              zoomSteps = parseInt(zoomSteps);
              if (zoomSteps === 0) {
                zoomSteps = 1;
              }
              if (zoomSteps < 0) {
                zoomSteps = zoomSteps * -1;
              }

              app.camera.instructions.push({
                action: "zoom_out_" + zoomSteps,
                // action:'zoom_outToInit',
                action2: "",
                count: 0,
                count2: 0,
                limit: zoomSteps,
                // limit: 1,
                limit2: 0,
                speed: "",
              });
            }
            if (preInstruction.split("_")[1] === "inToInit") {
              let zoomSteps = ((app.zoomThresh - (app.camera.zoom.x - 1)) / 0.02).toFixed(0);
              zoomSteps = parseInt(zoomSteps);
              if (zoomSteps === 0) {
                zoomSteps = 1;
              }
              if (zoomSteps < 0) {
                zoomSteps = zoomSteps * -1;
              }

              app.camera.instructions.push({
                action: "zoom_in_" + zoomSteps,
                // action:'zoom_outToInit',
                action2: "",
                count: 0,
                count2: 0,
                limit: zoomSteps,
                // limit: 1,
                limit2: 0,
                speed: "",
              });
            } else if (preInstruction.split("_")[1] !== "inToInit" && preInstruction.split("_")[1] !== "outToInit") {
              app.camera.instructions.push({
                action: "zoom_" + preInstruction.split("_")[1],
                action2: "",
                count: 0,
                count2: 0,
                limit: parseInt(preInstruction.split("_")[2]),
                limit2: 0,
                speed: "",
              });
            }

            break;
          case "waitFor":
            app.camera.instructions.push({
              action: "wait",
              action2: "",
              count: 0,
              count2: 0,
              limit: parseInt(preInstruction.split("_")[1]),
              limit2: 0,
              speed: "",
            });

            break;
          case "move&&zoom":
            speed = preInstruction.split("_")[4];
            if (app.autoCamPanWaitingForPath !== true) {
              app.autoCamPanWaitingForPath = true;
              focusCell.x = parseInt(preInstruction.split("_")[2]);
              focusCell.y = parseInt(preInstruction.split("_")[3]);

              app.findFocusCell(
                "cellToPan",
                "move&&zoom_" + preInstruction.split("_")[1] + "_" + preInstruction.split("_")[5],
                focusCell,
                canvas,
                context,
                speed,
              );
            }

            break;
        }

        if (app.camera.currentPreInstruction === app.camera.preInstructions.length - 1) {
          // console.log("this is the last preInstruction. Empty array");
          app.camera.preInstructions = [];
          app.camera.currentPreInstruction = 0;
          // console.log('camera instructions',app.camera.instructions);
        } else {
          app.camera.currentPreInstruction++;
        }

        // console.log("auto camera: pre instruction parsed: ", app.camera.instructions);
      }

      const increment = (mode, direction) => {
        if (mode === "zoom") {
          app.camera.mode = "zoom";

          switch (direction) {
            case "in":
              if (app.camera.zoom.x >= app.camera.limits.zoom.max) {
                app.camera.limits.state.zoom = true;
                // console.log('auto cam zoom in limit fast',app.camera.zoom.x,'/',app.camera.limits.zoom.max,app.camera.instructions[app.camera.currentInstruction].count);
              } else {
                app.camera.zoom.x += 0.02;
                app.camera.zoom.y += 0.02;
                app.camera.zoomDirection = "in";
                // console.log('auto cam zooming in fast ',app.camera.instructions[app.camera.currentInstruction].count);
              }
              break;
            case "out":
              if (app.camera.zoom.x <= app.camera.limits.zoom.min) {
                app.camera.limits.state.zoom = true;
                // console.log('auto cam zoom in limit fast ',app.camera.zoom.x,'/',app.camera.limits.zoom.min,app.camera.instructions[app.camera.currentInstruction].count);
              } else {
                app.camera.zoom.x -= 0.02;
                app.camera.zoom.y -= 0.02;
                app.camera.zoomDirection = "out";
                // console.log('auto cam zooming out fast ',app.camera.instructions[app.camera.currentInstruction].count);
              }
              break;
            case "outToInit":
              // app.setInitZoom.state = true;
              if (app.setInitZoom.state !== true) {
                app.setInitZoom = {
                  state: true,
                  windowWidth: window.innerWidth,
                  gridWidth: app.gridWidth,
                };
              }

              break;
          }

          app.setZoomPan(canvas);
          app.findFocusCell("panToCell", "", {}, canvas, context);
        }
        if (mode === "pan") {
          app.camera.mode = "pan";

          switch (direction) {
            case "north":
              if (app.camera.pan.y >= app.camera.limits.pan.y.max) {
                // console.log('auto cam pan limit north fast ',app.camera.pan.y,'/',app.camera.limits.pan.y.max,app.camera.instructions[app.camera.currentInstruction].count);
                app.camera.limits.state.pan = true;
              } else {
                app.camera.pan.y += 1;
                app.camera.adjustedPan.y += 1 * app.camera.zoom.x;
                app.camera.panDirection = "north";
                // console.log('auto cam panning north fast ',app.camera.instructions[app.camera.currentInstruction].count)
              }
              break;
            case "south":
              if (app.camera.pan.y <= app.camera.limits.pan.y.min) {
                // console.log('auto cam pan limit south fast ',app.camera.pan.y,'/',app.camera.limits.pan.y.min,app.camera.instructions[app.camera.currentInstruction].count);
                app.camera.limits.state.pan = true;
              } else {
                app.camera.pan.y -= 1;
                app.camera.adjustedPan.y -= 1 * app.camera.zoom.x;
                app.camera.panDirection = "south";
                // console.log('auto cam panning south fast ',app.camera.instructions[app.camera.currentInstruction].count)
              }
              break;
            case "east":
              if (app.camera.pan.x <= app.camera.limits.pan.x.min) {
                // console.log('auto cam pan limit east fast ',app.camera.pan.x,'/',app.camera.limits.pan.x.min,app.camera.instructions[app.camera.currentInstruction].count);
                app.camera.limits.state.pan = true;
              } else {
                app.camera.pan.x -= 1;
                app.camera.adjustedPan.x -= 1 * app.camera.zoom.x;
                app.camera.panDirection = "east";
                // console.log('auto cam panning east fast ',app.camera.instructions[app.camera.currentInstruction].count)
              }
              break;
            case "west":
              if (app.keyPressed[player.number - 1].west === true && app.camera.pan.x >= app.camera.limits.pan.x.max) {
                // console.log('auto cam pan limit west fast ',app.camera.pan.x,'/',app.camera.limits.pan.x.max,app.camera.instructions[app.camera.currentInstruction].count);
                app.camera.limits.state.pan = true;
              } else {
                app.camera.pan.x += 1;
                app.camera.adjustedPan.x += 1 * app.camera.zoom.x;
                app.camera.panDirection = "west";
                // console.log('auto cam panning west fast ',app.camera.instructions[app.camera.currentInstruction].count)
              }
              break;
          }

          app.setZoomPan(canvas);
          app.findFocusCell("panToCell", "", {}, canvas, context);
        }
      };

      // PARSED INSTRUCTIONS!
      let secondaryAction = false;
      let tertiaryAction = false;
      let currentInstruction = app.camera.instructions[app.camera.currentInstruction];
      if (app.camera.instructions.length > 0 && app.camera.currentInstruction < app.camera.instructions.length) {
        // console.log(app.camera.zoom.x-1,'auto camera: stepping through all instructions... current',app.camera.currentInstruction,app.camera.instructions[app.camera.currentInstruction]);

        if (app.camera.instructions[app.camera.currentInstruction]) {
          if (app.camera.instructions[app.camera.currentInstruction].action !== "") {
            if (app.camera.instructions[app.camera.currentInstruction].count < app.camera.instructions[app.camera.currentInstruction].limit) {
              if (app.camera.instructions[app.camera.currentInstruction].action === "wait") {
                // waiting/ do nothing
                // console.log('waiting',app.camera.instructions[app.camera.currentInstruction].count);
                app.camera.instructions[app.camera.currentInstruction].count++;
              } else {
                if (app.camera.instructions[app.camera.currentInstruction].speed === "fast") {
                  for (var i = 0; i < app.camera.instructions[app.camera.currentInstruction].limit; i++) {
                    if (app.camera.instructions[app.camera.currentInstruction].action.split("_")[0] === "zoom") {
                      // console.log('fast zooming ',app.camera.instructions[app.camera.currentInstruction].action.split("_")[1],' primary. coount:  ',app.camera.instructions[app.camera.currentInstruction].count);

                      increment("zoom", app.camera.instructions[app.camera.currentInstruction].action.split("_")[1]);

                      if (
                        app.camera.instructions[app.camera.currentInstruction].action2 !== "" &&
                        app.camera.instructions[app.camera.currentInstruction].count2 < app.camera.instructions[app.camera.currentInstruction].limit2
                      ) {
                        secondaryAction = true;
                        if (app.camera.instructions[app.camera.currentInstruction].action2.split("_")[0] === "zoom") {
                          increment("zoom", app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1]);
                        }
                        if (app.camera.instructions[app.camera.currentInstruction].action2.split("_")[0] === "pan") {
                          if (app.camera.instructions[app.camera.currentInstruction].action.split("_")[0] === "pan") {
                            for (let index = 0; index < 2; index++) {
                              // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                              increment("pan", app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1]);
                            }
                          } else {
                            increment("pan", app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1]);
                          }
                        }
                      }

                      if (app.camera.instructions[app.camera.currentInstruction].action3) {
                        if (
                          app.camera.instructions[app.camera.currentInstruction].action3 !== "" &&
                          app.camera.instructions[app.camera.currentInstruction].count3 <
                            app.camera.instructions[app.camera.currentInstruction].limit3
                        ) {
                          tertiaryAction = true;
                          if (app.camera.instructions[app.camera.currentInstruction].action3.split("_")[0] === "zoom") {
                            increment("zoom", app.camera.instructions[app.camera.currentInstruction].action3.split("_")[1]);
                          }
                          if (app.camera.instructions[app.camera.currentInstruction].action3.split("_")[0] === "pan") {
                            if (app.camera.instructions[app.camera.currentInstruction].action2.split("_")[0] === "pan") {
                              for (let index = 0; index < 2; index++) {
                                // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                                increment("pan", app.camera.instructions[app.camera.currentInstruction].action3.split("_")[1]);
                              }
                            } else {
                              increment("pan", app.camera.instructions[app.camera.currentInstruction].action3.split("_")[1]);
                            }
                          }
                        }
                      }
                    }

                    if (app.camera.instructions[app.camera.currentInstruction].action.split("_")[0] === "pan") {
                      // console.log('fast panning ',app.camera.instructions[app.camera.currentInstruction].action.split("_")[1],' primary. count: ',app.camera.instructions[app.camera.currentInstruction].count);

                      increment("pan", app.camera.instructions[app.camera.currentInstruction].action.split("_")[1]);

                      if (
                        app.camera.instructions[app.camera.currentInstruction].action2 !== "" &&
                        app.camera.instructions[app.camera.currentInstruction].count2 < app.camera.instructions[app.camera.currentInstruction].limit2
                      ) {
                        secondaryAction = true;
                        if (app.camera.instructions[app.camera.currentInstruction].action2.split("_")[0] === "zoom") {
                          increment("zoom", app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1]);
                        }
                        if (app.camera.instructions[app.camera.currentInstruction].action2.split("_")[0] === "pan") {
                          if (app.camera.instructions[app.camera.currentInstruction].action.split("_")[0] === "pan") {
                            for (let index = 0; index < 2; index++) {
                              // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                              increment("pan", app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1]);
                            }
                          } else {
                            increment("pan", app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1]);
                          }
                        }
                      }

                      if (app.camera.instructions[app.camera.currentInstruction].action3) {
                        if (
                          app.camera.instructions[app.camera.currentInstruction].action3 !== "" &&
                          app.camera.instructions[app.camera.currentInstruction].count3 <
                            app.camera.instructions[app.camera.currentInstruction].limit3
                        ) {
                          tertiaryAction = true;
                          if (app.camera.instructions[app.camera.currentInstruction].action3.split("_")[0] === "zoom") {
                            increment("zoom", app.camera.instructions[app.camera.currentInstruction].action3.split("_")[1]);
                          }
                          if (app.camera.instructions[app.camera.currentInstruction].action3.split("_")[0] === "pan") {
                            if (app.camera.instructions[app.camera.currentInstruction].action2.split("_")[0] === "pan") {
                              for (let index = 0; index < 2; index++) {
                                // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                                increment("pan", app.camera.instructions[app.camera.currentInstruction].action3.split("_")[1]);
                              }
                            } else {
                              increment("pan", app.camera.instructions[app.camera.currentInstruction].action3.split("_")[1]);
                            }
                          }
                        }
                      }
                    }

                    app.camera.instructions[app.camera.currentInstruction].count++;
                    // console.log('1a');
                    if (secondaryAction === true) {
                      app.camera.instructions[app.camera.currentInstruction].count2++;
                    }
                    if (tertiaryAction === true) {
                      app.camera.instructions[app.camera.currentInstruction].count3++;
                    }
                  }
                } else {
                  if (app.camera.instructions[app.camera.currentInstruction].action.split("_")[0] === "zoom") {
                    // console.log('slow zooming ',app.camera.instructions[app.camera.currentInstruction].action.split("_")[1],' primary. count: ',app.camera.instructions[app.camera.currentInstruction].count);

                    increment("zoom", app.camera.instructions[app.camera.currentInstruction].action.split("_")[1]);

                    if (
                      app.camera.instructions[app.camera.currentInstruction].action2 !== "" &&
                      app.camera.instructions[app.camera.currentInstruction].count2 < app.camera.instructions[app.camera.currentInstruction].limit2
                    ) {
                      secondaryAction = true;
                      if (app.camera.instructions[app.camera.currentInstruction].action2.split("_")[0] === "zoom") {
                        increment("zoom", app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1]);
                      }
                      if (app.camera.instructions[app.camera.currentInstruction].action2.split("_")[0] === "pan") {
                        if (app.camera.instructions[app.camera.currentInstruction].action.split("_")[0] === "pan") {
                          for (let index = 0; index < 2; index++) {
                            // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                            increment("pan", app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1]);
                          }
                        } else {
                          increment("pan", app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1]);
                        }
                      }
                    }

                    if (app.camera.instructions[app.camera.currentInstruction].action3) {
                      if (
                        app.camera.instructions[app.camera.currentInstruction].action3 !== "" &&
                        app.camera.instructions[app.camera.currentInstruction].count3 < app.camera.instructions[app.camera.currentInstruction].limit3
                      ) {
                        tertiaryAction = true;
                        if (app.camera.instructions[app.camera.currentInstruction].action3.split("_")[0] === "zoom") {
                          increment("zoom", app.camera.instructions[app.camera.currentInstruction].action3.split("_")[1]);
                        }
                        if (app.camera.instructions[app.camera.currentInstruction].action3.split("_")[0] === "pan") {
                          if (app.camera.instructions[app.camera.currentInstruction].action2.split("_")[0] === "pan") {
                            for (let index = 0; index < 2; index++) {
                              // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                              increment("pan", app.camera.instructions[app.camera.currentInstruction].action3.split("_")[1]);
                            }
                          } else {
                            increment("pan", app.camera.instructions[app.camera.currentInstruction].action3.split("_")[1]);
                          }
                        }
                      }
                    }
                  }

                  if (app.camera.instructions[app.camera.currentInstruction].action.split("_")[0] === "pan") {
                    // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action.split("_")[1],' primary. count: ',app.camera.instructions[app.camera.currentInstruction].count);

                    increment("pan", app.camera.instructions[app.camera.currentInstruction].action.split("_")[1]);

                    if (
                      app.camera.instructions[app.camera.currentInstruction].action2 !== "" &&
                      app.camera.instructions[app.camera.currentInstruction].count2 < app.camera.instructions[app.camera.currentInstruction].limit2
                    ) {
                      secondaryAction = true;
                      if (app.camera.instructions[app.camera.currentInstruction].action2.split("_")[0] === "zoom") {
                        increment("zoom", app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1]);
                      }
                      if (app.camera.instructions[app.camera.currentInstruction].action2.split("_")[0] === "pan") {
                        if (app.camera.instructions[app.camera.currentInstruction].action.split("_")[0] === "pan") {
                          for (let index = 0; index < 2; index++) {
                            // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                            increment("pan", app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1]);
                          }
                        } else {
                          increment("pan", app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1]);
                        }
                      }
                    }

                    if (app.camera.instructions[app.camera.currentInstruction].action3) {
                      if (
                        app.camera.instructions[app.camera.currentInstruction].action3 !== "" &&
                        app.camera.instructions[app.camera.currentInstruction].count3 < app.camera.instructions[app.camera.currentInstruction].limit3
                      ) {
                        tertiaryAction = true;
                        if (app.camera.instructions[app.camera.currentInstruction].action3.split("_")[0] === "zoom") {
                          increment("zoom", app.camera.instructions[app.camera.currentInstruction].action3.split("_")[1]);
                        }
                        if (app.camera.instructions[app.camera.currentInstruction].action3.split("_")[0] === "pan") {
                          if (app.camera.instructions[app.camera.currentInstruction].action2.split("_")[0] === "pan") {
                            for (let index = 0; index < 2; index++) {
                              // console.log('slow panning ',app.camera.instructions[app.camera.currentInstruction].action2.split("_")[1],' secondary. count: ',app.camera.instructions[app.camera.currentInstruction].count2);

                              increment("pan", app.camera.instructions[app.camera.currentInstruction].action3.split("_")[1]);
                            }
                          } else {
                            increment("pan", app.camera.instructions[app.camera.currentInstruction].action3.split("_")[1]);
                          }
                        }
                      }
                    }
                  }

                  app.camera.instructions[app.camera.currentInstruction].count++;
                  // console.log('1b');
                  if (secondaryAction === true) {
                    app.camera.instructions[app.camera.currentInstruction].count2++;
                  }
                  if (tertiaryAction === true) {
                    app.camera.instructions[app.camera.currentInstruction].count3++;
                  }
                }
              }
            } else {
              if (secondaryAction === true) {
                // if (app.camera.instructions[app.camera.currentInstruction].count >= app.camera.instructions[app.camera.currentInstruction].limit) {
                //   // app.camera.currentInstruction++;
                //     console.log('finished primary instruction w/ secondary');
                // }
                // if (app.camera.instructions[app.camera.currentInstruction].count2 >= app.camera.instructions[app.camera.currentInstruction].limit2) {
                //     app.camera.currentInstruction++;
                //     console.log('finished secondary instruction');
                //     // secondaryAction = false;
                //     // continueSecondary = true;
                // }
              } else {
                if (app.camera.instructions[app.camera.currentInstruction].count >= app.camera.instructions[app.camera.currentInstruction].limit) {
                  app.camera.currentInstruction++;
                  // console.log("finished primary instruction only");
                }
              }
            }
          }
        }

        // FINISHED CAMERA INSTRUCTIONS
        if (app.camera.currentInstruction >= app.camera.instructions.length) {
          app.camera.instructions = [];
          app.camera.currentInstruction = 0;
          app.settingAutoCamera = false;
          // console.log("finished auto camera instructions");
        }
      }
    }

    if (app.camera.instructionType === "story") {
      // if there are nstructions, execute and step instructions.count, remove from array
      //
      // use a cameraInstructionRef to adjust the camera values accordingly, and push to app.camera.instructions
      //
      // if this is the last instruction, set the instructionType back to default
    }
  }
}
