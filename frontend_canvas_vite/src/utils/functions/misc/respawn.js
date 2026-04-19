import { moveConstants } from "./moveConsts";

export function respawn(app, player) {
  console.log("respawning", player.number, player);

  if (app.camera.state !== true) {
    app.resetTarget(player);
    app.unsetDeflection(player);
    player.respawn = true;
    player.action = "idle";
    player.hp = 2;
    player.speed.move = 0.1;
    // player.dead = {
    //   state: false,
    //   count: 0,
    //   limit: player.dead.limit
    // }
    player.ghost.state = false;
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
    player.crits = {
      singleHit: 1,
      doubleHit: 6,
      pushBack: 3,
      guardBreak: 3,
      dodge: 0,
    };
    player.items = {
      weaponIndex: 0,
      armorIndex: 0,
      weapons: [
        {
          name: "sword1",
          type: "sword",
          effect: "",
        },
      ],
      armor: [],
      ammo: 0,
    };
    player.currentWeapon = {
      name: "sword1",
      type: "sword",
      effect: "",
    };
    player.currentArmor = {};
    player.pushBack = {
      state: false,
      prePushBackMoveSpeed: 0,
    };
    player.flanking = {
      checking: false,
      direction: "",
      preFlankDirection: "",
      state: false,
      step: 0,
      target1: { x: 0, y: 0 },
      target2: { x: 0, y: 0 },
    };
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
    player.jumping = {
      checking: false,
      state: false,
    };
    player.stamina = {
      current: 20,
      max: 20,
    };
    player.popups = [];
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
      limit: player.postPull.limit,
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
    player.turning = {
      state: false,
      toDirection: "",
      delayCount: 0,
      limit: 5.1,
    };
    player.turnCheckerDirection = "";
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
    player.newMoveDelay = moveConstants.base.newMoveDelay;
    player.strafeReleaseHook = false;
    player.moveCancel = {
      state: false,
      oldDirection: "",
      newDirection: "",
      returningTo: {},
      returningFrom: {},
    };
    player.attacking = {
      state: false,
      count: 0,
      limit: app.attackAnimRef.limit.sword.slash,
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
    };
    player.defending = {
      state: false,
      count: 0,
      limit: app.defendAnimRef.limit.sword.slash,
      animRef: app.defendAnimRef,
      peak: false,
      peakCount: 0,
      decay: {
        state: false,
        count: 0,
        limit: app.defendAnimRef.limit.sword.slash - app.defendAnimRef.peak.sword.slash,
      },
      direction: "",
      directionType: "", //thrust or slash
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
    player.speed = moveConstants.base.speed;
    player.terrainMoveSpeed = {
      state: false,
      speed: 0,
    };
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
    player.statusDisplay = {
      state: false,
      status: "",
      count: 0,
      limit: 15,
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
    player.newPushPullDelay = {
      state: false,
      count: 0,
      limit: 10,
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

    app.players[player.number - 1] = player;
  } else {
    console.log("can't respawn in manual camera mode");
  }
}
