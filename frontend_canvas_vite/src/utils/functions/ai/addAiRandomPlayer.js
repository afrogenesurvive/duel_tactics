export function addAiRandomPlayer(app, mission) {
  let newMisson = mission;
  let weapon = {
    name: "sword1",
    type: "sword",
  };

  if (mission === "random") {
    let whatMission = app.rnJesus(1, 10);
    if (whatMission % 2 === 0 || whatMission % 7 === 0) {
      newMisson = "pursue";
    }
    if (whatMission % 3 === 0) {
      newMisson = "patrol";
    }
    if (whatMission % 5 === 0) {
      newMisson = "defend";
    }
  }

  let whatWeapon = app.rnJesus(1, 10);
  if (whatWeapon % 2 === 0 || whatWeapon % 3 === 0) {
    weapon = {
      name: "sword1",
      type: "sword",
    };
  }
  if (whatWeapon % 5 === 0) {
    weapon = {
      name: "spear1",
      type: "spear",
    };
  }
  if (whatWeapon % 7 === 0) {
    weapon = {
      name: "crossbow1",
      type: "crossbow",
    };
  }

  app.aiInitSettings = {
    randomStart: true,
    startPosition: {
      number: { x: undefined, y: undefined },
    },
    primaryMission: newMisson,
    mission: undefined,
    mode: "careful",
    partolArea: [
      { x: undefined, y: undefined },
      { x: undefined, y: undefined },
    ],
    weapons: [
      {
        name: weapon.name,
        type: weapon.type,
        effect: "",
      },
    ],
    armor: [],
  };
  app.addAiPlayer();
}
