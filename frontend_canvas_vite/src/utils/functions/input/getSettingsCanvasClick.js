export function getSettingsCanvasClick(app, canvas, event) {
  // console.log('getSettingsCanvasClick');

  const rect = canvas.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  let insideGrid = false;

  for (const cell of app.settingsGridInfo) {
    let point = [x, y];
    let polygon = [];
    for (const vertex of cell.vertices) {
      let vertexPoint = [vertex.x + 10 / 2, vertex.y + 5 / 2];

      polygon.push(vertexPoint);
    }
    let pip = pointInPolygon(point, polygon);
    if (pip === true) {
      insideGrid = true;
      // console.log("clicked a cell",cell.number,"x: " + x + " y: " + y);
      app.settingsClicked = cell;
    }
  }
  if (insideGrid === false) {
    // console.log("clicked the settings canvas", 'x: ',x,'y: ',y);

    app.settingsClicked = {
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
  }

  if (app.showSettingsCanvasData.state === true) {
    let availibleCells =
      app.settingsFormPlyrStartPosList[app.settingsFormPlyrStartPosList.length - 1]
        .posArray;
    if (app.settingsFormPlyrStartPosList.length < 0) {
      availibleCells =
        app.settingsFormPlyrStartPosList[app.settingsFormPlyrStartPosList.length - 1]
          .posArray;
    }
    let validCell = false;
    for (const cell of availibleCells) {
      if (
        cell.x === app.settingsClicked.number.x &&
        cell.y === app.settingsClicked.number.y
      ) {
        validCell = true;
      }
    }

    if (validCell === true) {
      if (app.showSettingsCanvasData.field.split("_")[0] === "human") {
        let plyrNo = app.showSettingsCanvasData.plyrNo;

        let newArray = app.settingsFormPlyrStartPosList.map(
          (y) =>
            (y = {
              plyrNo: y.plyrNo,
              selected: y.selected,
            }),
        );

        let plyrChange = newArray.find((x) => x.plyrNo === plyrNo);
        plyrChange.selected = {
          x: app.settingsClicked.number.x,
          y: app.settingsClicked.number.y,
        };

        app.getCustomPlyrStartPosList(newArray);

        let newArray2 = app.settingsFormAiStartPosList.map(
          (y) =>
            (y = {
              plyrNo: y.plyrNo,
              mission: y.mission,
              selected: y.selected,
            }),
        );

        app.getCustomAiStartPosList(newArray2);
      }

      if (app.showSettingsCanvasData.field.split("_")[0] === "ai") {
        let plyrNo =
          app.showSettingsCanvasData.plyrNo - app.settingsFormPlyrStartPosList.length;
        let type = app.showSettingsCanvasData.type;
        let value = app.settingsClicked.number;

        let newArray3 = app.settingsFormAiStartPosList.map(
          (y) =>
            (y = {
              plyrNo: y.plyrNo,
              mission: y.mission,
              selected: y.selected,
            }),
        );

        let plyrChange = newArray3.find((x) => x.plyrNo === plyrNo);

        if (plyrChange.selected.length === 0) {
          plyrChange.selected.push({
            type: type,
            cell: { x: value.x, y: value.y },
          });
        } else {
          // console.log('plyrChange',plyrChange);
          let selectedElem = plyrChange.selected.find((j) => j.type === type);
          let indx = newArray3.findIndex((j) => j.plyrNo === plyrChange.plyrNo);
          if (selectedElem) {
            selectedElem.cell = { x: value.x, y: value.y };
          } else {
            plyrChange.selected.push({
              type: type,
              cell: { x: value.x, y: value.y },
            });
          }
        }

        app.getCustomAiStartPosList(newArray3);
      }
    } else {
      // console.log('cant choose that cell',app.settingsClicked.number);
    }
  }

  app.setState({
    stateUpdater: "..",
  });
}
