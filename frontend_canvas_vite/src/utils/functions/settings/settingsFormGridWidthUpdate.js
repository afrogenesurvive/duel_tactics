export function settingsFormGridWidthUpdate(app, args) {
  // console.log('settingsFormGridWidthUpdate args',args);

  // app.showSettingsCanvasData = {
  //   state: true,
  //   field: 'human_start',
  //   plyrNo: 1,
  //   type: 'start',
  // }

  if (app.gridWidth <= 9) {
    app.camera.zoom.x = 1;
    app.camera.zoom.y = 1;
  }

  let prevGridWidth = app.gridWidth;
  let canvas = app.state.canvas;

  app.gridWidth = args;

  let gridInfo;

  // ----------------
  app.startProcessLevelData(app.state.canvas);
  gridInfo = app.gridInfo;
  app.processLevelData(gridInfo);
  // ----------------

  // app.settingsFormAiGridInfo = app.gridInfo;
  app.settingsFormAiGridInfo = app.settingsGridInfo;

  // console.log('post process barrier check settings',app.settingsGridInfo.filter(x => x.barrier.state === true).map(y => y = y.barrier.position));

  app.settingsGridWidth = args;

  if (app.settingsGridWidth === 12) {
    app.settingsCanvasWidth = 700;
    app.settingsCanvasHeight = 400;
    app.settingsSceneX = 350;
    app.settingsSceneY = 50;
  }
  if (app.settingsGridWidth === 9) {
    app.settingsCanvasWidth = 500;
    app.settingsCanvasHeight = 300;
    app.settingsSceneX = 250;
    app.settingsSceneY = 40;
  }
  if (app.settingsGridWidth === 6) {
    app.settingsCanvasWidth = 400;
    app.settingsCanvasHeight = 250;
    app.settingsSceneX = 200;
    app.settingsSceneY = 50;
  }
  if (app.settingsGridWidth === 3) {
    app.settingsCanvasWidth = 300;
    app.settingsCanvasHeight = 150;
    app.settingsSceneX = 150;
    app.settingsSceneY = 40;
  }

  if (app.state.showSettings === true && app.showSettingsCanvasData.state === true) {
    let canvas3 = app.canvasRef3.current;
    let context3 = canvas3.getContext("2d");

    canvas3.addEventListener("click", (e) => {
      app.getSettingsCanvasClick(canvas3, e);
    });

    let canvas4;
    let context4;

    if (app.showSettingsCanvasData.field.split("_")[0] === "ai") {
      canvas4 = app.canvasRef4.current;
      context4 = canvas4.getContext("2d");
      canvas4.addEventListener("click", (e) => {
        app.getSettingsCanvasClick(canvas4, e);
      });
    }

    setTimeout(() => {
      app.redrawSettingsGrid(canvas3, context3, canvas4, context4);
    }, 30);
  }

  // app.redrawSettingsGrid(app.state.canvas3,app.state.context3);

  // app.gridWidth = prevGridWidth;

  // ----------------
  // app.startProcessLevelData(app.state.canvas);
  // gridInfo = app.gridInfo;
  // app.processLevelData(gridInfo);
  // ----------------

  // app.setState({
  //   stateUpdater: '..'
  // })
}
