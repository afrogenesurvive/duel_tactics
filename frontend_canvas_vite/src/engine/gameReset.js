export function gameReset(app, type) {
  console.log("resetting");

  app.setState({
    loading: true,
  });

  app.time = 0;
  app.projectiles = [];
  app.mouseOverCell = {
    state: false,
    cell: undefined,
    count: 0,
    threshold: 40,
  };
  app.mouseOverCellSwitchOff = {
    state: false,
    count: 0,
    limit: 100,
  };
  app.cellInfoMouseOver = false;
  app.cellsUnderAttack = [];
  app.cellsUnderPreAttack = [];
  app.cellsToHighlight = [];
  app.cellsToHighlight2 = [];
  app.gamepadPollCounter = {
    count1: 0,
    count2: 0,
    store1: [],
    store2: [],
  };
  app.movingObstacles = [];
  app.halfPushBackObstacles = [];
  app.obstacleBarrierToDestroy = [];
  app.obstacleItemsToDrop = [];
  app.obstaclesOutOfBoundsFall = [];
  app.cellPopups = [];
  app.aiDeflectedCheck = [];
  app.bloodSacrificeEvent = {
    state: false,
    count: 0,
    limit: 100,
    restore: false,
  };
  app.openVoid = false;
  app.cellToVoid = {
    state: false,
    x: 0,
    y: 0,
    count: 0,
    limit: 35,
  };

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
        min: 0.5,
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
  app.camera.preInstructions = [];
  app.camera.instructions = [];
  app.camera.currentInstruction = 0;
  app.settingAutoCamera = false;
  app.camera.state = false;

  for (const player of app.players) {
    if (player.ai.state !== true) {
      app.resetTarget(player);

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

      for (const weapon of app.settingsFormPlayerData.weapon) {
        if (weapon.plyrNo === player.number) {
          for (const weapon2 of weapon.weapons) {
            let indx = weapon.weapons.indexOf(weapon2);
            let itemRef = app.itemList.find((x) => x.subType === weapon2);
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
              let weapon3 = {
                name: itemRef.name,
                type: itemRef.subType,
                effect: itemRef.effect,
              };
              items.weapons.push(weapon3);
              if (itemRef.effect.split("+")[0] === "ammo") {
                items.ammo = parseInt(itemRef.effect.split("+")[1]);
              }
            }
          }
        }
      }

      for (const armor of app.settingsFormPlayerData.armor) {
        if (armor.plyrNo === player.number) {
          for (const armor2 of armor.armor) {
            let indx = armor.armor.indexOf(armor2);
            let itemRef = app.itemList.find((x) => x.subType === armor2);
            if (indx === 0) {
              currentArmor = {
                name: itemRef.name,
                type: itemRef.subType,
                effect: itemRef.effect,
              };
              items.armor.push(currentArmor);
            } else {
              let armor3 = {
                name: itemRef.name,
                type: itemRef.subType,
                effect: itemRef.effect,
              };
              items.armor.push(armor3);
            }
          }
        }
      }

      for (const team of app.settingsFormPlayerData.team) {
        if (team.plyrNo === player.number) {
          player.team = team.team;
        }
      }

      player.currentWeapon = currentWeapon;
      player.currentArmor = currentArmor;
      player.items = items;

      player.currentPosition.cell = player.startPosition.cell;

      player.turning = {
        state: false,
        toDirection: "",
        delayCount: 0,
        limit: 5.1,
      };
      player.turnCheckerDirection = "";
      player.action = "idle";
      player.moving = {
        state: false,
        step: 0,
        course: "",
        origin: {
          number: {
            x: 0,
            y: 0,
          },
          center: {
            x: 0,
            y: 0,
          },
        },
        destination: {
          x: 0,
          y: 0,
        },
      };
      player.newMoveDelay = {
        state: false,
        count: 0,
        limit: 15,
      };
      player.strafing = {
        state: false,
        direction: "",
      };
      player.strafeReleaseHook = false;
      player.moveCancel = {
        state: false,
        oldDirection: "",
        newDirection: "",
        returningTo: {},
        returningFrom: {},
      };
      player.flanking = {
        checking: false,
        preFlankDirection: "",
        direction: "",
        state: false,
        step: 0,
        target1: { x: 0, y: 0 },
        target2: { x: 0, y: 0 },
      };
      player.attacking = {
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
          limit: 10,
        },
        maxCharge: 15,
        chargeCount: 0,
        execute: false,
        effectivenessAllowance: 10,
      };
      player.defending = {
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
      };
      player.drowning = false;
      player.dodging = {
        countState: false,
        state: false,
        count: 0,
        limit: app.baseDodgeCountRef.limit,
        peak: {
          start: app.baseDodgeCountRef.peak.start,
          end: app.baseDodgeCountRef.peak.end,
        },
        direction: "",
      };
      player.jumping = {
        checking: false,
        state: false,
      };
      player.success = {
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
      };
      player.pushBack = {
        state: false,
        prePushBackMoveSpeed: 0,
      };
      player.halfPushBack = {
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
      };
      player.falling = {
        state: false,
        count: 0,
        limit: 10,
      };
      player.dead = {
        state: false,
        count: 0,
        limit: 10,
      };
      player.ghost = {
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
      };
      player.respawn = false;
      player.points = 0;
      player.speed = {
        move: 0.1,
        range: [0.05, 0.1, 0.125, 0.2],
      };
      player.terrainMoveSpeed = {
        state: false,
        speed: 0,
      };
      player.hp = 2;
      player.inventorySize = 4;
      player.cycleWeapon = {
        state: false,
        count: 0,
        limit: 3,
      };
      player.cycleArmor = {
        state: false,
        count: 0,
        limit: 3,
      };
      player.crits = {
        singleHit: 1,
        doubleHit: 6,
        pushBack: 4,
        guardBreak: 3,
        dodge: 0,
      };
      player.statusDisplay = {
        state: false,
        status: "",
        count: 0,
        limit: 15,
      };
      player.popups = [
        {
          state: true,
          count: 0,
          limit: 0,
          type: "",
          position: "northWest",
          msg: "",
          img: "",
        },
      ];
      player.itemDrop = {
        state: false,
        count: 0,
        limit: 10,
        item: {
          name: "",
        },
        gear: {
          type: "",
        },
      };
      player.itemPickup = {
        state: false,
        count: 0,
        limit: 10,
        item: {
          name: "",
        },
        gear: {
          type: "",
        },
      };
      player.discardGear = {
        state: false,
        count: 0,
        limit: 8,
      };
      player.actionDirectionAnimationArray = [];
      player.ai = {
        state: false,
        imgType: "",
        primaryMission: "",
        mission: "",
        prevMission: "",
        currentObjective: "",
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
        currentInstruction: 0,
        resetInstructions: false,
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
        engaging: {
          state: true,
          targetAction: "",
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
          safe: true,
        },
        retreating: {
          checkin: undefined,
          state: false,
          point: { x: undefined, y: undefined },
          level: 0,
          safe: true,
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
        mode: "",
        upgradeWeapon: false,
        upgradeArmor: false,
        pathfindingRanges: {
          spear: 3,
          crossbow: 5,
        },
      };
      player.stamina = {
        current: 20,
        max: 20,
      };
      player.newPushPullDelay = {
        state: false,
        count: 0,
        limit: 10,
      };
      player.prePush = {
        state: false,
        count: 0,
        limit: 15,
        targetCell: undefined,
        direction: "",
        pusher: undefined,
      };
      player.pushing = {
        state: false,
        targetCell: undefined,
        moveSpeed: 0,
      };
      player.prePull = {
        state: false,
        count: 0,
        limit: 15,
        targetCell: undefined,
        direction: "",
        puller: undefined,
      };
      player.pulling = {
        state: false,
        targetCell: undefined,
        moveSpeed: 0,
      };
      player.postPull = {
        state: false,
        count: 0,
        limit: 10,
      };
      player.pushed = {
        state: false,
        pusher: 0,
        moveSpeed: 0,
      };
      player.pulled = {
        state: false,
        puller: 0,
        moveSpeed: 0,
      };
      player.elasticCounter = {
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
      };

      app.applyRemoveEffect(player, "apply", "pickup", "weapon", player.currentWeapon);
      app.applyRemoveEffect(player, "apply", "pickup", "armor", player.currentArmor);
    }
  }
  app.aiTarget = 1;

  // app.resetCameraSwitch = true;

  let plyrz = app.players;
  for (const plyr of plyrz) {
    if (plyr.ai.state === true) {
      let indx = plyrz.indexOf(plyr);
      let toRemove1 = app.players[indx];
      app.players = app.players.filter((x) => x !== toRemove1);
    }
  }

  app.drawGridInit(app.state.canvas, app.state.context, app.state.canvas2, app.state.context2, app.state.canvas3, app.state.context3);

  if (type === "soft") {
    if (Object.keys(app.updateSettingsFormAiDataData).length !== 0) {
      if (app.addAiCount.state !== true) {
        app.loadAiSettings();
      }
    }
  }
}
