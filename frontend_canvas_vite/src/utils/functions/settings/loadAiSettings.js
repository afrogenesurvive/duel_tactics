export function loadAiSettings(app) {
  // console.log('app.settingsFormAiStartPosList.length',app.settingsFormAiStartPosList.length);

  // if (app.settingsFormAiStartPosList.length > 0) {

  let initArray = app.updateSettingsFormAiDataData.random.map(
    (x) =>
      (x = {
        plyrNo: x.plyrNo,
        random: x.random,
        mode: null,
        weapon: null,
        armor: null,
        team: null,
        mission: null,
        startPos: null,
        otherPositions: [],
      }),
  );

  for (const plyr of initArray) {
    for (const elem of app.updateSettingsFormAiDataData.mode) {
      if (elem.plyrNo === plyr.plyrNo) {
        if (elem.mode === "random") {
          let whatMode = app.rnJesus(1, 2);

          switch (whatMode) {
            case 1:
              elem.mode = "aggressive";
              break;
            case 2:
              elem.mode = "careful";
              break;
          }
        }

        plyr.mode = elem.mode;
      }
    }

    for (const elem2 of app.updateSettingsFormAiDataData.weapon) {
      if (elem2.plyrNo === plyr.plyrNo) {
        plyr.weapon = elem2.weapons;
      }
    }

    for (const elem5 of app.updateSettingsFormAiDataData.armor) {
      if (elem5.plyrNo === plyr.plyrNo) {
        plyr.armor = elem5.armor;
      }
    }

    for (const elem3 of app.updateSettingsFormAiDataData.mission) {
      if (elem3.plyrNo === plyr.plyrNo) {
        plyr.mission = elem3.mission;
      }
    }

    for (const elem6 of app.updateSettingsFormAiDataData.team) {
      if (elem6.plyrNo === plyr.plyrNo) {
        plyr.team = elem6.team;
      }
    }

    for (const elem4 of app.settingsFormAiStartPosList) {
      if (elem4.plyrNo === plyr.plyrNo) {
        for (const cell of elem4.selected) {
          if (cell.type === "start") {
            plyr.startPos = cell.cell;
          } else {
            plyr.otherPositions.push(cell.cell);
          }
        }
      }
    }
  }

  if (app.updateSettingsFormAiDataData.startItems === true) {
    app.disableInitItems = false;
  } else {
    app.disableInitItems = true;
  }

  // console.log('initArray',initArray);

  for (let i = 1; i < initArray.length + 1; i++) {
    setTimeout(() => {
      // setTimeout(function timer() {

      let elem5 = initArray[i - 1];

      // console.log('plyr',elem5.plyrNo,'app.addAiCount.state',app.addAiCount.state);

      if (elem5.random === "random") {
        app.addAiRandomPlayer(elem5.random);
      } else {
        app.aiInitSettings = {
          randomStart: false,
          startPosition: {
            number: {
              x: elem5.startPos.x,
              y: elem5.startPos.y,
            },
          },
          primaryMission: elem5.mission,
          mission: undefined,
          mode: elem5.mode,
          partolArea: elem5.otherPositions,
          weapons: elem5.weapon,
          armor: elem5.armor,
          team: elem5.team,
        };

        app.addAiPlayer();
      }
    }, i * 1000);
  }

  // app.updateSettingsFormAiDataData = {};
  // app.settingsFormAiStartPosList = [];
  app.setState({
    showSettings: false,
  });

  // }
}
