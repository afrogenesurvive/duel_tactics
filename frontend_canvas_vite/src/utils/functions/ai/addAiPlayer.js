export function addAiPlayer(app) {
  let newPlayerNumber = app.players.length + 1;

  let imgTypeRoll = app.rnJesus(1, 2);
  let imgType;
  if (imgTypeRoll === 1) {
    imgType = "A";
  } else {
    imgType = "B";
  }

  if (app.addAiCount.state !== true) {
    if (app.aiInitSettings.randomStart === true) {
      // console.log('random ai mission is',app.aiInitSettings.primaryMission);
    }

    app.addAiCount.state = true;

    let cell = { x: 0, y: 0 };
    let cell1 = { x: 0, y: 0 };
    let cell3 = { x: 0, y: 0 };

    let checkCell = false;
    if (app.aiInitSettings.randomStart === true && app.aiInitSettings.primaryMission === "pursue") {
      while (checkCell === false) {
        cell.x = app.rnJesus(0, app.gridWidth);
        cell.y = app.rnJesus(0, app.gridWidth);
        checkCell = app.checkCell(cell, ["all"]);
      }
    }
    if (app.aiInitSettings.randomStart === true && app.aiInitSettings.primaryMission === "patrol") {
      let checkPatrolCell1 = false;
      let checkPatrolCell2 = false;
      let inBounds = false;

      while (checkPatrolCell1 === false) {
        cell1.x = app.rnJesus(0, app.gridWidth);
        cell1.y = app.rnJesus(0, app.gridWidth);
        checkPatrolCell1 = app.checkCell(cell1, ["all"]);
      }

      while (checkPatrolCell2 === false && checkPatrolCell1 === true) {
        // console.log('cell1 chosen',cell1);
        let range = 4;
        let directions = ["north", "east", "south", "west"];
        let whatDir1 = app.rnJesus(1, 4);
        let chooseDirection = directions[whatDir1 - 1];

        switch (chooseDirection) {
          case "north":
            cell3 = {
              x: cell1.x,
              y: cell1.y - range,
            };
            break;
          case "south":
            cell3 = cell1.y + range;
            cell3 = {
              x: cell1.x,
              y: cell1.y + range,
            };
            break;
          case "west":
            cell3 = {
              x: cell1.x - range,
              y: cell1.y,
            };
            break;
          case "east":
            cell3 = {
              x: cell1.x + range,
              y: cell1.y,
            };
            break;
        }
        // console.log('proposed cell 2',cell3);
        if (cell3.x < 0 || cell3.x > app.gridWidth || cell3.y < 0 || cell3.y > app.gridWidth) {
          // console.log('2nd cell is out of bounds');
        } else {
          cell3.x = app.rnJesus(0, app.gridWidth);
          cell3.y = app.rnJesus(0, app.gridWidth);
          checkPatrolCell2 = app.checkCell(cell3, ["all"]);
        }
      }

      if (checkPatrolCell1 === true && checkPatrolCell2 === true) {
        // console.log('patrol cells 1 & 2 chosen',cell1,cell3);
        app.aiInitSettings.partolArea[0] = cell1;
        app.aiInitSettings.partolArea[1] = cell3;
        inBounds = true;
      }
      if (inBounds === true) {
        while (checkCell === false) {
          cell.x = app.rnJesus(0, app.gridWidth);
          cell.y = app.rnJesus(0, app.gridWidth);
          checkCell = app.checkCell(cell, ["all"]);
          if (cell === cell1 || cell === cell3) {
            checkCell = false;
          }
        }
      }
      if (checkCell === true) {
        console.log("random patrol points chosen: start", cell, "patrol points", cell1, cell3);
      }
    }
    if (app.aiInitSettings.randomStart === true && app.aiInitSettings.primaryMission === "defend") {
      let checkCell2 = false;
      let cell4 = { x: 0, y: 0 };
      while (checkCell2 === false) {
        cell4.x = app.rnJesus(0, app.gridWidth);
        cell4.y = app.rnJesus(0, app.gridWidth);
        checkCell2 = app.checkCell(cell4, ["all"]);
      }
      if (checkCell2 === true) {
        app.aiInitSettings.partolArea[0] = cell4;
      }

      while (checkCell === false && checkCell2 === true) {
        cell.x = app.rnJesus(0, app.gridWidth);
        cell.y = app.rnJesus(0, app.gridWidth);
        checkCell = app.checkCell(cell, ["all"]);
      }
      if (checkCell === true) {
        console.log("random defend points chosen: start", cell, "defend point", cell4);
      }
    }

    if (app.aiInitSettings.randomStart !== true) {
      checkCell = true;
      cell.x = app.aiInitSettings.startPosition.number.x;
      cell.y = app.aiInitSettings.startPosition.number.y;
    }

    if (checkCell === true) {
      let currentWeapon = {
        name: "sword1",
        type: "sword",
        effect: "",
      };
      let currentArmor = {
        name: "",
        type: "",
        effect: "",
      };
      let items = {
        weaponIndex: 0,
        armorIndex: 0,
        weapons: [],
        armor: [],
        ammo: 0,
      };

      for (const weapon of app.aiInitSettings.weapons) {
        let indx = app.aiInitSettings.weapons.indexOf(weapon);
        let itemRef = app.itemList.find((x) => x.subType === weapon.type);
        if (indx === 0) {
          currentWeapon = {
            name: itemRef.name,
            type: itemRef.subType,
            effect: itemRef.effect,
          };
          items.weapons.push(currentWeapon);
          if (itemRef.effect.split("+")[0] === "ammo") {
            items.ammo = parseInt(itemRef.effect.split("+")[1]);
          }
        } else {
          let weapon = {
            name: itemRef.name,
            type: itemRef.subType,
            effect: itemRef.effect,
          };
          items.weapons.push(weapon);
          if (itemRef.effect.split("+")[0] === "ammo") {
            items.ammo = parseInt(itemRef.effect.split("+")[1]);
          }
        }
      }
      for (const armor of app.aiInitSettings.armor) {
        let indx = app.aiInitSettings.armor.indexOf(armor);
        let itemRef = app.itemList.find((x) => x.subType === armor);
        if (indx === 0) {
          currentArmor = {
            name: itemRef.name,
            type: itemRef.subType,
            effect: itemRef.effect,
          };
          items.armor.push(currentArmor);
        } else {
          let armor = {
            name: itemRef.name,
            type: itemRef.subType,
            effect: itemRef.effect,
          };
          items.armor.push(armor);
        }
      }

      let cell2 = app.gridInfo.find((elem) => elem.number.x === cell.x && elem.number.y === cell.y);
      let newPlayer = {
        number: newPlayerNumber,
        startPosition: {
          cell: {
            number: {
              x: cell.x,
              y: cell.y,
            },
            center: {
              x: cell2.center.x,
              y: cell2.center.y,
            },
          },
        },
        currentPosition: {
          cell: {
            number: {
              x: cell.x,
              y: cell.y,
            },
            center: {
              x: cell2.center.x,
              y: cell2.center.y,
            },
          },
        },
        nextPosition: {
          x: cell2.center.x,
          y: cell2.center.y,
        },
        target: {
          cell1: {
            number: {
              x: 0,
              y: 0,
            },
            center: {
              x: 0,
              y: 0,
            },
            free: true,
            occupant: {
              type: "",
              player: "",
            },
            void: false,
          },
          cell2: {
            number: {
              x: 0,
              y: 0,
            },
            center: {
              x: 0,
              y: 0,
            },
            free: true,
            occupant: {
              type: "",
              player: "",
            },
            void: false,
          },
          myCellBlock: false,
        },
        direction: "north",
        turning: {
          state: false,
          toDirection: "",
          delayCount: 0,
          limit: 5.1,
        },
        turnCheckerDirection: "",
        action: "idle",
        moving: {
          state: false,
          step: 0,
          course: "",
          origin: {
            number: {
              x: cell.x,
              y: cell.y,
            },
            center: {
              x: cell2.center.x,
              y: cell2.center.y,
            },
          },
          destination: {
            x: 0,
            y: 0,
          },
        },
        newMoveDelay: MoveConstants.base.newMoveDelay,
        strafing: {
          state: false,
          direction: "",
        },
        strafeReleaseHook: false,
        moveCancel: {
          state: false,
          oldDirection: "",
          newDirection: "",
          returningTo: {},
          returningFrom: {},
        },
        flanking: {
          checking: false,
          preFlankDirection: "",
          direction: "",
          state: false,
          step: 0,
          target1: { x: 0, y: 0 },
          target2: { x: 0, y: 0 },
        },
        attacking: {
          state: false,
          count: 0,
          limit: app.attackAnimRef.limit[currentWeapon.type].slash,
          strength: 0,
          direction: "",
          directionType: "", //thrust or slash
          animRef: app.attackAnimRef,
          peak: false,
          peakCount: 0,
          charge: 0,
          chargePeak: false,
          blunt: false,
          clashing: {
            state: false,
            count: 0,
            limit: app.attackAnimRef.baseClashingLimit,
          },
          maxCharge: app.attackAnimRef.baseMaxCharge,
          chargeCount: 0,
          execute: false,
          effectivenessAllowance: app.attackAnimRef.effectivenessAllowances.min,
        },
        defending: {
          state: false,
          count: 0,
          limit: app.defendAnimRef.limit[currentWeapon.type].slash,
          animRef: app.defendAnimRef,
          peak: false,
          peakCount: 0,
          decay: {
            state: false,
            count: 0,
            limit: app.defendAnimRef.limit[currentWeapon.type].slash - app.defendAnimRef.peak[currentWeapon.type].slash,
          },
          direction: "",
          directionType: "", //thrust or slash
        },
        drowning: false,
        dodging: {
          countState: false,
          state: false,
          count: 0,
          limit: app.baseDodgeCountRef.limit,
          peak: {
            start: app.baseDodgeCountRef.peak.start,
            end: app.baseDodgeCountRef.peak.end,
          },
          direction: "",
        },
        jumping: {
          checking: false,
          state: false,
        },
        success: {
          attackSuccess: {
            state: false,
            count: 0,
            limit: 10,
          },
          defendSuccess: {
            state: false,
            count: 0,
            limit: 10,
          },
          deflected: {
            state: false,
            count: 0,
            limit: 20,
            predeflect: false,
            type: "",
          },
        },
        pushBack: {
          state: false,
          prePushBackMoveSpeed: 0,
        },
        halfPushBack: {
          state: false,
          direction: "",
          type: "",
          countUp: {
            state: true,
            count: 0,
            limit: 0,
          },
          countDown: {
            state: false,
            count: 0,
            limit: 0,
          },
          coords: {
            x: undefined,
            y: undefined,
          },
        },
        falling: {
          state: false,
          count: 0,
          limit: 10,
        },
        dead: {
          state: false,
          count: 0,
          limit: 10,
        },
        ghost: {
          state: false,
          position: {
            cell: {
              number: {
                x: 0,
                y: 0,
              },
              center: {
                x: 0,
                y: 0,
              },
            },
          },
        },
        respawn: false,
        points: 0,
        speed: MoveConstants.base.speed,
        terrainMoveSpeed: {
          state: false,
          speed: 0,
        },
        hp: 2,
        currentWeapon: currentWeapon,
        currentArmor: currentArmor,
        items: items,
        inventorySize: 4,
        cycleWeapon: {
          state: false,
          count: 0,
          limit: 3,
        },
        cycleArmor: {
          state: false,
          count: 0,
          limit: 3,
        },
        crits: {
          singleHit: 1,
          doubleHit: 6,
          pushBack: 4,
          guardBreak: 3,
          dodge: 0,
        },
        statusDisplay: {
          state: false,
          status: "",
          count: 0,
          limit: 15,
        },
        popups: [
          {
            state: true,
            count: 0,
            limit: 0,
            type: "",
            position: "northWest",
            msg: "",
            img: "",
          },
        ],
        itemDrop: {
          state: false,
          count: 0,
          limit: 10,
          item: {
            name: "",
          },
          gear: {
            type: "",
          },
        },
        itemPickup: {
          state: false,
          count: 0,
          limit: 10,
          item: {
            name: "",
          },
          gear: {
            type: "",
          },
        },
        discardGear: {
          state: false,
          count: 0,
          limit: 8,
        },
        idleAnim: {
          state: false,
          count: 0,
          limit: 5,
        },
        actionDirectionAnimationArray: [],
        ai: {
          state: true,
          imgType: imgType,
          mission: "",
          primaryMission: "",
          prevMission: "",
          currentObjective: "",
          currentInstruction: 0,
          resetInstructions: false,
          targetSet: false,
          targetAcquired: false,
          safeRange: true,
          pathArray: [],
          targetPlayer: {
            number: 1,
            currentPosition: {
              x: undefined,
              y: undefined,
            },
            target: {
              number1: {
                x: undefined,
                y: undefined,
              },
              number2: {
                x: undefined,
                y: undefined,
              },
            },
            action: "",
          },
          instructions: [],
          engaging: {
            state: false,
            targetAction: "",
          },
          patrolling: {
            checkin: undefined,
            state: false,
            area: [],
            loopControl: false,
          },
          defending: {
            checkin: undefined,
            state: false,
            area: [],
          },
          persuing: {
            state: false,
          },
          retrieving: {
            checkin: undefined,
            state: false,
            point: { x: undefined, y: undefined },
            targetItem: {
              name: "",
              type: "",
              subType: "",
              effect: "",
            },
            safe: false,
          },
          retreating: {
            checkin: undefined,
            state: false,
            point: { x: undefined, y: undefined },
            level: 0,
            safe: false,
          },
          organizing: {
            weaponPriorityIndex: 0,
            armorPriorityIndex: 0,
            dropped: {
              state: false,
              gear: {
                name: "",
                type: "",
                subType: "",
                effect: "",
              },
            },
          },
          mode: app.aiInitSettings.mode,
          upgradeWeapon: false,
          upgradeArmor: false,
          pathfindingRanges: {
            spear: 3,
            crossbow: 5,
          },
        },
        stamina: {
          current: 20,
          max: 20,
        },
        newPushPullDelay: {
          state: false,
          count: 0,
          limit: 10,
        },
        prePush: {
          state: false,
          count: 0,
          limit: 15,
          targetCell: undefined,
          direction: "",
          pusher: undefined,
        },
        pushing: {
          state: false,
          targetCell: undefined,
          moveSpeed: 0,
        },
        prePull: {
          state: false,
          count: 0,
          limit: 15,
          targetCell: undefined,
          direction: "",
          puller: undefined,
        },
        pulling: {
          state: false,
          targetCell: undefined,
          moveSpeed: 0,
        },
        postPull: {
          state: false,
          count: 0,
          limit: 10,
        },
        pushed: {
          state: false,
          pusher: 0,
          moveSpeed: 0,
        },
        pulled: {
          state: false,
          puller: 0,
          moveSpeed: 0,
        },
        elasticCounter: {
          preState: false,
          state: false,
          direction: "",
          type: "",
          subType: "",
          countUp: {
            state: false,
            count: 0,
            limit: 6,
          },
          countDown: {
            state: false,
            count: 0,
            limit: 6,
          },
          coords: {
            x: undefined,
            y: undefined,
          },
          pause: {
            preState: false,
            state: false,
            type: "",
            count: 0,
            limit: 6,
          },
        },
        team: app.aiInitSettings.team,
        input: "Keyboard",
      };

      app.players.push(newPlayer);
      app.keyPressed.push({
        north: false,
        south: false,
        east: false,
        west: false,
        attack: false,
        defend: false,
        strafe: false,
        dodge: false,
        pull: false,
        kick: false,
        cycleArmor: false,
        discardWeapon: false,
        discardArmor: false,
        uiMenu: false,
        playerMenu: false,
        rotateRight: false,
        rotateLeft: false,
      });
      app.aiPlayers.push(newPlayerNumber);
      app.getTarget(app.players[newPlayerNumber - 1]);
      app.updatePathArray();
      app.players[newPlayerNumber - 1].ai.primaryMission = app.aiInitSettings.primaryMission;
      if (!app.aiInitSettings.mission) {
        app.players[newPlayerNumber - 1].ai.mission = app.aiInitSettings.primaryMission;
      } else if (app.aiInitSettings.mission) {
        app.players[newPlayerNumber - 1].ai.mission = app.aiInitSettings.mission;
      }

      if (app.aiInitSettings.primaryMission === "patrol") {
        app.players[newPlayerNumber - 1].ai.patrolling = {
          checkin: undefined,
          state: true,
          area: [
            {
              x: app.aiInitSettings.partolArea[0].x,
              y: app.aiInitSettings.partolArea[0].y,
            },
            {
              x: app.aiInitSettings.partolArea[1].x,
              y: app.aiInitSettings.partolArea[1].y,
            },
          ],
          loopControl: false,
        };
      }
      if (app.aiInitSettings.primaryMission === "defend") {
        app.players[newPlayerNumber - 1].ai.defending = {
          checkin: undefined,
          state: true,
          area: [
            {
              x: app.aiInitSettings.partolArea[0].x,
              y: app.aiInitSettings.partolArea[0].y,
            },
          ],
        };
      }

      if (
        app.camera.customView.state !== true &&
        app.settingAutoCamera === false &&
        app.camera.preInstructions.length === 0 &&
        app.camera.instructions.length === 0
      ) {
        // app.setAutoCamera('aiSpawnFocus',newPlayer)
      } else {
        // console.log("no setting auto cam: aiSpawnFocus");
      }
    }
  } else if (app.addAiCount.state === true) {
    // console.log('already adding an ai player');
  }
  // console.log('new ai player: settings',app.aiInitSettings);
}
