export const playerDataArray = [
  {
    number: 1,
    startPosition: {
      cell: {
        number: {
          x: 5,
          y: 1,
        },
        center: {
          x: 0,
          y: 0,
        },
      },
    },
    currentPosition: {
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
    nextPosition: {
      x: 0,
      y: 0,
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
    direction: "south",
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
    },
    newMoveDelay: {
      state: false,
      count: 0,
      limit: 15,
    },
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
    drowning: false,
    attacking: {
      state: false,
      count: 0,
      limit: 20,
      strength: 0,
      direction: "",
      directionType: "", //thrust or slash
      animRef: {},
      peak: false,
      charge: 0,
      chargePeak: false,
      maxCharge: 15,
      peakCount: 0,
      chargeCount: 0,
      blunt: false,
      clashing: {
        state: false,
        count: 0,
        limit: 10,
      },
      execute: false,
      effectivenessAllowance: 3, // max = 10 || limit - peak / 2 (??) - allows for some leniency in timing for parrying projectiles and attacks. only applies when player is armed and attacking.
    },
    defending: {
      state: false,
      count: 0,
      limit: 4,
      animRef: {},
      peak: false,
      peakCount: 0,
      decay: {
        state: false,
        count: 0,
        limit: 25,
      },
      direction: "",
      directionType: "", //thrust or slash
    },
    dodging: {
      countState: false,
      state: false,
      count: 0,
      limit: 20,
      peak: {
        start: 8,
        end: 12,
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
    speed: {
      move: 0.1,
      range: [0.05, 0.1, 0.125, 0.2],
    },
    terrainMoveSpeed: {
      state: false,
      speed: 0,
    },
    hp: 2,
    currentWeapon: {
      name: "sword1",
      type: "sword",
      effect: "",
    },
    currentArmor: {
      name: "",
      type: "",
      effect: "",
    },
    items: {
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
      ammo: 20,
    },
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
      limit: 6,
    },
    actionDirectionAnimationArray: [],
    ai: {
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
    team: "Red",
    input: "Keyboard",
  },
  {
    number: 2,
    startPosition: {
      cell: {
        number: {
          x: 2,
          y: 6,
        },
        center: {
          x: 0,
          y: 0,
        },
      },
    },
    currentPosition: {
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
    nextPosition: {
      x: 0,
      y: 0,
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
    direction: "west",
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
    },
    newMoveDelay: {
      state: false,
      count: 0,
      limit: 15,
    },
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
      limit: 20,
      strength: 0,
      direction: "",
      directionType: "", //thrust or slash
      animRef: {},
      peak: false,
      peakCount: 0,
      chargeCount: 0,
      charge: 0,
      chargePeak: false,
      maxCharge: 15,
      blunt: false,
      clashing: {
        state: false,
        count: 0,
        limit: 10,
      },
      execute: false,
      effectivenessAllowance: 3, // max = 10 || limit - peak / 2 (??) - allows for some leniency in timing for parrying projectiles and attacks. only applies when player is armed and attacking.
    },
    defending: {
      state: false,
      count: 0,
      limit: 4,
      animRef: {},
      peak: false,
      peakCount: 0,
      decay: {
        state: false,
        count: 0,
        limit: 25,
      },
      direction: "",
      directionType: "", //thrust or slash
    },
    drowning: false,
    dodging: {
      countState: false,
      state: false,
      count: 0,
      limit: 20,
      peak: {
        start: 8,
        end: 12,
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
    speed: {
      move: 0.1,
      range: [0.05, 0.1, 0.125, 0.2],
    },
    terrainMoveSpeed: {
      state: false,
      speed: 0,
    },
    hp: 2,
    currentWeapon: {
      name: "sword1",
      type: "sword",
      effect: "",
    },
    currentArmor: {
      name: "",
      type: "",
      effect: "",
    },
    items: {
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
    },
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
      limit: 6,
    },
    actionDirectionAnimationArray: [],
    ai: {
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
    team: "Blue",
    input: "Keyboard",
  },
];
