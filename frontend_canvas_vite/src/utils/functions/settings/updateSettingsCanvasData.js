export function updateSettingsCanvasData(app, args) {
  // console.log('updateSettingsCanvasData',args);

  let el = document.getElementsByClassName("settingsOverlay")[0];
  let el2 = document.getElementsByClassName("settingsContainer")[0];
  // console.log('xx',el.scrollLeft, el.scrollTop);
  // console.log('xx',el2.scrollLeft, el2.scrollTop);

  let humanPlyrCount = app.settingsFormPlyrStartPosList.length;
  let plyrNo = args.plyrNo;
  if (args.type.split("_")[0] === "ai") {
    plyrNo = humanPlyrCount + args.plyrNo;
  }

  app.showSettingsCanvasData = {
    state: true,
    field: args.type,
    plyrNo: plyrNo,
    type: args.type.split("_")[1],
  };

  app.setState({
    stateUpdater: "..",
  });

  setTimeout(() => {
    // app.redrawSettingsGrid(canvas3,context3,canvas4,context4);
    app.settingsFormGridWidthUpdate(app.settingsGridWidth);
  }, 30);
  // app.settingsFormGridWidthUpdate(app.settingsGridWidth)

  // app.setState({
  //   stateUpdater: '..'
  // })
}
