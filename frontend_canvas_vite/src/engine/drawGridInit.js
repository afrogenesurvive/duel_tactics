import { startProcessLevelData } from "./startProcessLevelData";
import { processLevelData } from "./processLevelData";

export function drawGridInit(app, canvas, context, canvas2, context2) {
  // console.log('drawing initial');

  context.clearRect(0, 0, app.canvasWidth, app.canvasHeight);
  context2.clearRect(0, 0, app.canvasWidth, app.canvasHeight);

  let gridInfo = [];
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  app.popupImageRef = {
    attackStart: app.preAttackIndicateRef.current,
    preAction1: app.preAction1IndicateRef.current,
    preAction2: app.preAction2IndicateRef.current,
    attacking: app.attack3IndicateRef.current,
    attacking1: app.attack1IndicateRef.current,
    attacking2: app.attack2IndicateRef.current,
    missedAttack: app.missedIndicateRef.current,
    attackingBlunt: app.attackBluntIndicate2Ref.current,
    attackingUnarmed: app.attackUnarmedIndicateRef.current,
    attacked1: app.attack1IndicateRef.current,
    attacked2: app.attack2IndicateRef.current,
    attackDefended: app.attackBreakIndicateRef.current,
    attackParried: app.attackParriedIndicateRef.current,
    boltKilled: app.boltKilledIndicateRef.current,
    attackCancelled: app.attackBreakIndicateRef.current,
    injured: app.deflectInjuredIndicateRef.current,
    hpDown: app.deflectInjuredIndicate2Ref.current,
    hpUp: app.healIndicateRef.current,
    defending: app.defendIndicateRef.current,
    defending_1: app.defendIndicate1Ref.current,
    defending_2: app.defendIndicate2Ref.current,
    defending_3: app.defendIndicate3Ref.current,
    defending_4: app.defendIndicate4Ref.current,
    defendSuccess: app.defendSuccessIndicateRef.current,
    guardBroken: app.defendBreakIndicateRef.current,
    deflected: app.deflectBluntIndicateRef.current,
    dodgeStart: app.preAction2IndicateRef.current,
    dodgeSuccess: app.dodgeIndicateRef.current,
    dodging: app.dodgeIndicateRef.current,
    flanking: app.flankIndicateRef.current,
    pushedBack: app.pushbackIndicateRef.current,
    falling: app.fallingIndicateRef.current,
    outOfStamina: app.outOfStaminaIndicateRef.current,
    outOfAmmo: app.outOfAmmoIndicateRef.current,
    missionEngage: app.deflectIndicate2Ref.current,
    missionPursue: app.pursueMissionIndicate2Ref.current,
    missionRetrieve: app.retrieveMissionIndicateRef.current,
    missionDefend: app.defendMissionIndicateRef.current,
    missionPatrol: app.patrolMissionIndicateRef.current,
    missionRetreat: app.retreatIndicateRef.current,
    missionEnroute: app.enrouteIndicateRef.current,
    missionComplete: app.completeMissionIndicateRef.current,
    thinking: app.thinkingIndicateRef.current,
    alarmed: app.preAttack2IndicateRef.current,
    pathSwitch: app.pathSwitchIndicateRef.current,
    targetSwitch: app.targetSwitchIndicateRef.current,
    aggressiveMode: app.aggressiveModeIndicateRef.current,
    passiveMode: app.passiveModeIndicateRef.current,
    pickupWeapon: app.pickupWeaponIndicateRef.current,
    pickupArmor: app.pickupArmorIndicateRef.current,
    dropWeapon: app.dropWeaponIndicateRef.current,
    dropArmor: app.dropArmorIndicateRef.current,
    pickupBuff: app.pickupBuffIndicateRef.current,
    pickupDebuff: app.pickupDebuffIndicateRef.current,
    pickupAmmo: app.pickupAmmoIndicateRef.current,
    inventoryFull: app.inventoryFullIndicateRef.current,
    stop: app.boltDefendIndicateRef.current,
    drowning: app.drowningIndicateRef.current,
    terrainSlowdown: app.terrainSlowdownIndicateRef.current,
    terrainSpeedup: app.terrainSpeedupIndicateRef.current,
    terrainInjured: app.terrainInjuredIndicateRef.current,
    destroyedItem: app.destroyedItemIndicateRef.current,
    sword: app.itemSwordRef.current,
    spear: app.itemSpearRef.current,
    crossbow: app.itemCrossbowRef.current,
    longbow: app.itemBowRef.current,
    helmet: app.itemHelmet1Ref.current,
    mail: app.itemMail1Ref.current,
    greaves: app.itemGreaves1Ref.current,

    missedAttack2: app.missedIndicate2Ref.current,
    prePush: app.prePushIndicateRef.current,
    canPush: app.canPushIndicateRef.current,
    noPush: app.noPushingIndicateRef.current,
    pushing: app.pushingIndicateRef.current,
    prePull: app.prePullIndicateRef.current,
    canPull: app.canPullIndicateRef.current,
    noPull: app.noPullingIndicateRef.current,
    pulling: app.pullingIndicateRef.current,
    pushedPulled: app.pushedPulledIndicateRef.current,
    unbreakable: app.unbreakableIndicateRef.current,
    dodging2: app.dodgeIndicate2Ref.current,
    attackFeint: app.attackFeintIndicateRef.current,
    attackFeint2: app.attackFeintIndicate2Ref.current,
    attackFeint3: app.attackFeintIndicate3Ref.current,
    defendFeint: app.defendFeintIndicateRef.current,
    defendFeint2: app.defendFeintIndicate2Ref.current,
    defendFeint3: app.defendFeintIndicate3Ref.current,
    dodgeFeint: app.dodgeFeintIndicateRef.current,
    dodgeFeint2: app.dodgeFeintIndicate2Ref.current,
    boltDefend2: app.boltDefendIndicate2Ref.current,
    flanking2: app.flankIndicate2Ref.current,
    noFlanking: app.noFlankIndicateRef.current,
    cellVoiding: app.cellVoidingIndicateRef.current,
    cellVoiding2: app.cellVoidingIndicate2Ref.current,
    clashing: app.deflectIndicate2Ref.current,
    timer: app.timerIndicateRef.current,
    charging: app.chargeIndicateRef.current,

    noDirection: app.noDirectionIndicateRef.current,
    noDirection2: app.noDirectionIndicate2Ref.current,
    noDirection3: app.noDirectionIndicate3Ref.current,
    northDirection: app.northDirectionIndicateRef.current,
    southDirection: app.southDirectionIndicateRef.current,
    eastDirection: app.eastDirectionIndicateRef.current,
    westDirection: app.westDirectionIndicateRef.current,
  };
  app.indicatorImgs = {
    preAttack: app.preAttackIndicateRef.current,
    preAttack2: app.preAttack2IndicateRef.current,
    attack1: app.attack1IndicateRef.current,
    attack2: app.attack2IndicateRef.current,
    attack3: app.attack3IndicateRef.current,
    attackUnarmed: app.attackUnarmedIndicateRef.current,
    attackBlunt: app.attackBluntIndicateRef.current,
    attackSuccess: app.attackSuccessIndicateRef.current,
    defend: app.defendIndicateRef.current,
    deflect: app.deflectIndicateRef.current,
    deflectInjured: app.deflectInjuredIndicateRef.current,
    deflectBlunt: app.deflectBluntIndicateRef.current,
    pushback: app.pushbackIndicateRef.current,
    ghost: app.ghostIndicateRef.current,
    death: app.deathIndicateRef.current,
    attackBreak: app.attackBreakIndicateRef.current,
    defendBreak: app.defendBreakIndicateRef.current,
    dodge: app.dodgeIndicateRef.current,
    noDirection: app.noDirectionIndicateRef.current,
    noDirection2: app.noDirectionIndicate2Ref.current,
    noDirection3: app.noDirectionIndicate3Ref.current,
    northDirection: app.northDirectionIndicateRef.current,
    southDirection: app.southDirectionIndicateRef.current,
    eastDirection: app.eastDirectionIndicateRef.current,
    westDirection: app.westDirectionIndicateRef.current,
  };
  app.playerImgs = [
    {
      idle: {
        unarmed: app.idleSheetNew2Ref.current,
        sword: app.idleSheetNew2Ref.current,
        spear: app.idleSheetNew2Ref.current,
        crossbow: app.idleSheetNew2Ref.current,
      },
      walking: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      jumping: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      dodging: {
        unarmed: app.dodgeSheetNewRef.current,
        sword: app.dodgeSheetNewRef.current,
        spear: app.dodgeSheetNewRef.current,
        crossbow: app.dodgeSheetNewRef.current,
      },
      flanking: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      strafing: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      attacking: {
        unarmed: app.attackSheetNewRef.current,
        sword: app.attackSheetNewRef.current,
        spear: app.attackSheetNewRef.current,
        crossbow: app.attackSheetNewRef.current,
      },
      defending: {
        unarmed: app.defendSheetNewRef.current,
        sword: app.defendSheetNewRef.current,
        spear: app.defendSheetNewRef.current,
        crossbow: app.defendSheetNewRef.current,
      },
      deflected: {
        unarmed: app.deflectedFallingSheetNewRef.current,
        sword: app.deflectedFallingSheetNewRef.current,
        spear: app.deflectedFallingSheetNewRef.current,
        crossbow: app.deflectedFallingSheetNewRef.current,
      },
      pushBack: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      falling: {
        unarmed: app.deflectedFallingSheetNewRef.current,
        sword: app.deflectedFallingSheetNewRef.current,
        spear: app.deflectedFallingSheetNewRef.current,
        crossbow: app.deflectedFallingSheetNewRef.current,
      },
      pushing: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      pulling: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      pushed: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      pulled: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
    },
    {
      idle: {
        unarmed: app.idleSheetNew2Ref.current,
        sword: app.idleSheetNew2Ref.current,
        spear: app.idleSheetNew2Ref.current,
        crossbow: app.idleSheetNew2Ref.current,
      },
      walking: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      jumping: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      dodging: {
        unarmed: app.dodgeSheetNewRef.current,
        sword: app.dodgeSheetNewRef.current,
        spear: app.dodgeSheetNewRef.current,
        crossbow: app.dodgeSheetNewRef.current,
      },
      flanking: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      strafing: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      attacking: {
        unarmed: app.attackSheetNewRef.current,
        sword: app.attackSheetNewRef.current,
        spear: app.attackSheetNewRef.current,
        crossbow: app.attackSheetNewRef.current,
      },
      defending: {
        unarmed: app.defendSheetNewRef.current,
        sword: app.defendSheetNewRef.current,
        spear: app.defendSheetNewRef.current,
        crossbow: app.defendSheetNewRef.current,
      },
      deflected: {
        unarmed: app.deflectedFallingSheetNewRef.current,
        sword: app.deflectedFallingSheetNewRef.current,
        spear: app.deflectedFallingSheetNewRef.current,
        crossbow: app.deflectedFallingSheetNewRef.current,
      },
      pushBack: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      falling: {
        unarmed: app.deflectedFallingSheetNewRef.current,
        sword: app.deflectedFallingSheetNewRef.current,
        spear: app.deflectedFallingSheetNewRef.current,
        crossbow: app.deflectedFallingSheetNewRef.current,
      },
      pushing: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      pulling: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      pushed: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      pulled: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
    },
    {
      idle: {
        unarmed: app.idleSheetNew2Ref.current,
        sword: app.idleSheetNew2Ref.current,
        spear: app.idleSheetNew2Ref.current,
        crossbow: app.idleSheetNew2Ref.current,
      },
      walking: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      jumping: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      dodging: {
        unarmed: app.dodgeSheetNewRef.current,
        sword: app.dodgeSheetNewRef.current,
        spear: app.dodgeSheetNewRef.current,
        crossbow: app.dodgeSheetNewRef.current,
      },
      flanking: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      strafing: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      attacking: {
        unarmed: app.attackSheetNewRef.current,
        sword: app.attackSheetNewRef.current,
        spear: app.attackSheetNewRef.current,
        crossbow: app.attackSheetNewRef.current,
      },
      defending: {
        unarmed: app.defendSheetNewRef.current,
        sword: app.defendSheetNewRef.current,
        spear: app.defendSheetNewRef.current,
        crossbow: app.defendSheetNewRef.current,
      },
      deflected: {
        unarmed: app.deflectedFallingSheetNewRef.current,
        sword: app.deflectedFallingSheetNewRef.current,
        spear: app.deflectedFallingSheetNewRef.current,
        crossbow: app.deflectedFallingSheetNewRef.current,
      },
      pushBack: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      falling: {
        unarmed: app.deflectedFallingSheetNewRef.current,
        sword: app.deflectedFallingSheetNewRef.current,
        spear: app.deflectedFallingSheetNewRef.current,
        crossbow: app.deflectedFallingSheetNewRef.current,
      },
      pushing: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      pulling: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      pushed: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      pulled: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
    },
    {
      idle: {
        unarmed: app.idleSheetNew2Ref.current,
        sword: app.idleSheetNew2Ref.current,
        spear: app.idleSheetNew2Ref.current,
        crossbow: app.idleSheetNew2Ref.current,
      },
      walking: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      jumping: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      dodging: {
        unarmed: app.dodgeSheetNewRef.current,
        sword: app.dodgeSheetNewRef.current,
        spear: app.dodgeSheetNewRef.current,
        crossbow: app.dodgeSheetNewRef.current,
      },
      flanking: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      strafing: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      attacking: {
        unarmed: app.attackSheetNewRef.current,
        sword: app.attackSheetNewRef.current,
        spear: app.attackSheetNewRef.current,
        crossbow: app.attackSheetNewRef.current,
      },
      defending: {
        unarmed: app.defendSheetNewRef.current,
        sword: app.defendSheetNewRef.current,
        spear: app.defendSheetNewRef.current,
        crossbow: app.defendSheetNewRef.current,
      },
      deflected: {
        unarmed: app.deflectedFallingSheetNewRef.current,
        sword: app.deflectedFallingSheetNewRef.current,
        spear: app.deflectedFallingSheetNewRef.current,
        crossbow: app.deflectedFallingSheetNewRef.current,
      },
      pushBack: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      falling: {
        unarmed: app.deflectedFallingSheetNewRef.current,
        sword: app.deflectedFallingSheetNewRef.current,
        spear: app.deflectedFallingSheetNewRef.current,
        crossbow: app.deflectedFallingSheetNewRef.current,
      },
      pushing: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      pulling: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      pushed: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
      pulled: {
        unarmed: app.moveSheetNewRef.current,
        sword: app.moveSheetNewRef.current,
        spear: app.moveSheetNewRef.current,
        crossbow: app.moveSheetNewRef.current,
      },
    },
  ];
  app.itemImgs = {
    moveSpeedUp: app.itemSpdUpRef.current,
    moveSpeedDown: app.itemSpdDownRef.current,
    hpUp: app.itemHpUpRef.current,
    hpDown: app.itemHpDownRef.current,
    focusUp: app.itemFocusUpRef.current,
    focusDown: app.itemFocusDownRef.current,
    strengthUp: app.itemStrUpRef.current,
    strengthDown: app.itemStrDownRef.current,
    sword: app.itemSwordRef.current,
    sword1: app.itemSword1Ref.current,
    sword2: app.itemSword2Ref.current,
    spear: app.itemSpearRef.current,
    spear1: app.itemSpear1Ref.current,
    spear2: app.itemSpear2Ref.current,
    crossbow: app.itemBowRef.current,
    crossbow1: app.itemBowRef.current,
    crossbow2: app.itemBowRef.current,
    helmet: app.itemHelmet1Ref.current,
    ammo5: app.itemAmmoRef.current,
    ammo10: app.itemAmmoRef.current,
    mail: app.itemMail1Ref.current,
    greaves: app.itemGreaves1Ref.current,
  };
  app.boltImgs = {
    north: app.itemBoltNorthRef.current,
    south: app.itemBoltSouthRef.current,
    east: app.itemBoltEastRef.current,
    west: app.itemBoltWestRef.current,
  };
  app.floorImgs = {
    grass: app.floorGrassRef.current,
    stone: app.floorStoneRef.current,
    dirt: app.floorDirtRef.current,
    pond: app.floorPondRef.current,
    mud: app.floorMudRef.current,
    sand: app.floorSandRef.current,
    ice: app.floorIceRef.current,
    lava: app.floorLavaRef.current,
    bramble: app.floorBrambleRef.current,
    river: app.floorRiverRef.current,
    void: app.floorVoidRef.current,
    void2: app.floorVoid2Ref.current,
    void3: app.floorVoid3Ref.current,
    rubble: app.floorRubbleRef.current,
  };
  app.obstacleImgs = {
    // table: app.obstacleAHalfRef.current,
    closet: app.obstacleAFullRef.current,
    // chair: app.obstacleBHalfRef.current,
    // shelf: app.obstacleBFullRef.current,
    // smallBox: app.obstacleCHalfRef.current, //and me
    // largeBox: app.obstacleCFullRef.current, //revive me
    // counter: app.obstacleDHalfRef.current,
    // chest: app.obstacleEHalfRef.current,
    crate: app.obstacleCrateRef.current,
    barrel: app.obstacleBarrelRef.current,
    chest: app.obstacleCrateRef.current,
    table: app.obstacleCrateRef.current,
    chair: app.obstacleCrateRef.current,
    shelf: app.obstacleCrateRef.current,
    counter: app.obstacleCrateRef.current,
    smallBox: app.obstacleCrateRef.current,
    largeBox: app.obstacleBarrelRef.current, //remove me when obs imgs added
  };
  app.barrierImgs = {
    wall: {
      north: app.barrierANorthRef.current,
      south: app.barrierASouthRef.current,
      east: app.barrierAEastRef.current,
      west: app.barrierAWestRef.current,
    },
    door: {
      north: app.barrierANorthRef.current,
      south: app.barrierASouthRef.current,
      east: app.barrierAEastRef.current,
      west: app.barrierAWestRef.current,
    },
    balcony: {
      north: app.barrierANorthRef.current,
      south: app.barrierASouthRef.current,
      east: app.barrierAEastRef.current,
      west: app.barrierAWestRef.current,
    },
  };
  app.backgroundImageRef = {
    sea_clouds_1: app.backgroundSeaClouds1Ref.current,
    sea_clouds_2: app.backgroundSeaClouds2Ref.current,
    sea_clouds_3: app.backgroundSeaClouds3Ref.current,
    sea_clouds_4: app.backgroundSeaClouds4Ref.current,
    sea_clouds_night_1: app.backgroundSeaCloudsNight1Ref.current,
    sea_coast_1: app.backgroundSeaCoast1Ref.current,
    nothern_lights_1: app.backgroundNorthernLights1Ref.current,
    field_1: app.backgroundField1Ref.current,
    field_2: app.backgroundField2Ref.current,
    field_3: app.backgroundField3Ref.current,
  };

  // LOAD CROSSBOW AMMO
  for (const plyr of app.players) {
    if (plyr.currentWeapon.type === "crossbow") {
      let ammo = parseInt(plyr.currentWeapon.effect.split("+")[1]);
      plyr.items.ammo = plyr.items.ammo + ammo;
    }
  }

  let floor;
  let wall = app.wallRef.current;
  let wall2 = app.wall2Ref.current;
  let wall3 = app.wall3Ref.current;

  canvas.width = app.canvasWidth;
  canvas.height = app.canvasHeight;

  let floorImageWidth = app.floorImageWidth;
  let floorImageHeight = app.floorImageHeight;
  let wallImageWidth = app.wallImageWidth;
  let wallImageHeight = app.wallImageHeight;
  let sceneX = app.canvasWidth / 2;
  let sceneY = app.sceneY;
  let tileWidth = app.tileWidth;

  app.setBackgroundImage("sea_clouds_night_1");

  //   app.startProcessLevelData(canvas);
  startProcessLevelData(app, canvas);
  // gridInfo = app.gridInfo;

  //   app.processLevelData(app.gridInfo);
  processLevelData(app, app.gridInfo);

  // RESET START POSITION IF DOESN'T EXIST IN CURRENT GRID OR CONFLICTING W/ THIS MAP
  for (const plyr of app.players) {
    // if (!app.gridInfo.find(x => x.number.x === plyr.startPosition.cell.number.x && x.number.y === plyr.startPosition.cell.number.y)) {
    if (!app.gridInfo.find((x) => x.number.x === plyr.startPosition.cell.number.x && x.number.y === plyr.startPosition.cell.number.y)) {
      let cll = { x: undefined, y: undefined };
      let randomFreeCellChosen = false;

      while (randomFreeCellChosen !== true) {
        cll.x = app.rnJesus(0, app.gridWidth);
        cll.y = app.rnJesus(0, app.gridWidth);
        randomFreeCellChosen = app.checkCell(cll, ["all"]);
      }

      if (randomFreeCellChosen === true) {
        plyr.startPosition.cell.number = cll;
      }
    }

    // RECONSIDER/RANDOM CHOOSE START POSTION IF CONFLICTING W/ THIS MAP
    if (
      app.gridInfo.find((x) => x.number.x === plyr.startPosition.cell.number.x && x.number.y === plyr.startPosition.cell.number.y).terrain.type ===
        "deep" ||
      app.gridInfo.find((x) => x.number.x === plyr.startPosition.cell.number.x && x.number.y === plyr.startPosition.cell.number.y).terrain.type ===
        "void" ||
      app.gridInfo.find((x) => x.number.x === plyr.startPosition.cell.number.x && x.number.y === plyr.startPosition.cell.number.y).void.state ===
        true ||
      app.gridInfo.find((x) => x.number.x === plyr.startPosition.cell.number.x && x.number.y === plyr.startPosition.cell.number.y).obstacle.state ===
        true
    ) {
      let cll = { x: undefined, y: undefined };
      let randomFreeCellChosen = false;

      while (randomFreeCellChosen !== true) {
        cll.x = app.rnJesus(0, app.gridWidth);
        cll.y = app.rnJesus(0, app.gridWidth);
        randomFreeCellChosen = app.checkCell(cll, ["all"]);
      }

      if (randomFreeCellChosen === true) {
        plyr.startPosition.cell.number = cll;
      }
    }
  }
  // console.log('post process barrier check init',app.gridInfo.filter(x => x.barrier.state === true).map(y => y = y.barrier.position));

  if (app.camera.fixed !== true) {
    // app.setCameraFocus('init', canvas, context, canvas2, context2);
  }
  // app.findFocusCell('panToCell',{},canvas,context)

  // CENTER LARGER GRIDS
  if (window.innerWidth < 1100 && app.gridWidth >= 12) {
    // app.camera.zoom.x = 0.7;
    // app.camera.zoom.y = 0.7;

    app.setInitZoom = {
      state: true,
      windowWidth: window.innerWidth,
      gridWidth: app.gridWidth,
    };
  }
  if (window.innerWidth > 1100 && app.gridWidth >= 12) {
    // app.camera.zoom.x = 1;
    // app.camera.zoom.y = 1;

    app.setInitZoom = {
      state: true,
      windowWidth: window.innerWidth,
      gridWidth: app.gridWidth,
    };
  }
  if (window.innerWidth < 1100 && app.gridWidth < 12) {
    // app.camera.zoom.x = 1;
    // app.camera.zoom.y = 1;
    // app.setInitZoom = {
    //   state: true,
    //   windowWidth: window.innerWidth,
    //   gridWidth: app.gridWidth,
    // };
  }

  let diff = 1 - app.camera.zoom.x;

  // FOCUSED ZOOMING INIT SET
  app.camera.pan.x = (diff * app.canvasWidth) / 2;
  app.camera.pan.y = (diff * app.canvasWidth) / 2 - diff * 350;
  if (app.camera.pan.x === 0) {
    app.camera.pan.x = -1;
    app.camera.pan.y = -1;
  }

  app.setZoomPan(canvas);
  app.findFocusCell("panToCell", "", {}, canvas, context);

  if (app.showSettingsCanvasData.state === true) {
    app.settingsFormGridWidthUpdate(app.settingsGridWidth);
  }

  app.placeItems({ init: true, items: "" });

  // CELL COLOR REF
  let preCellColorRef = app.gridInfo.map((x) => (x = { x: x.number.x, y: x.number.y, color: "" }));
  for (const cell of preCellColorRef) {
    let colorCheckPass = false;
    while (colorCheckPass === false) {
      let randomColor = `rgb(${app.rnJesus(0, 255)},${app.rnJesus(0, 255)},${app.rnJesus(0, 255)})`;
      let colorsInUse = preCellColorRef.filter((x) => x.color !== "").map((y) => y === y.color);
      if (colorsInUse.find((x) => x === randomColor)) {
        colorCheckPass = false;
      } else {
        cell.color = randomColor;
        colorCheckPass = true;
      }
    }
  }
  app.cellColorRef = preCellColorRef;

  for (var x = 0; x < app.gridWidth + 1; x++) {
    for (var y = 0; y < app.gridWidth + 1; y++) {
      let p = new Point();
      p.x = x * tileWidth;
      p.y = y * tileWidth;

      let iso = app.cartesianToIsometric(p);
      let offset = { x: floorImageWidth / 2, y: floorImageHeight };

      // apply offset to center scene for a better view
      iso.x += sceneX;
      iso.y += sceneY;

      let center = {
        x: iso.x - offset.x / 2 + app.cellCenterOffsetX,
        y: iso.y - offset.y / 2 - app.cellCenterOffsetY,
      };

      let cell = app.gridInfo.find((elem) => elem.number.x === x && elem.number.y === y);
      let cellLevelData = app.gridInfo.find((elem) => elem.number.x === x && elem.number.y === y).levelData;

      floor = app.floorImgs[cell.terrain.name];

      if (cell.void.state === true) {
        // drawFloor = false;
        floor = app.floorImgs.void3;
      }

      // context.drawImage(floor, iso.x - offset.x, iso.y - offset.y, 100, 100);
      context.drawImage(floor, iso.x - offset.x, iso.y - offset.y);

      context.fillStyle = "black";
      context.fillText("" + x + "," + y + "", iso.x - offset.x / 2 + 18, iso.y - offset.y / 2 + 12);

      context.fillStyle = "black";
      context.fillRect(center.x, center.y, 5, 5);

      // INITIAL ITEM DISTRIBUTION!!
      let cell2 = app.gridInfo.find((elem) => elem.number.x === x && elem.number.y === y);
      if (cell2.item.name !== "") {
        // console.log('found cell with item');
        if (cell2.item.initDrawn === false) {
          // console.log('found cell with item undrawn');
          let itemImg;
          let fillClr;
          if (cell2.item.type === "item") {
            switch (cell2.item.name) {
              case "moveSpeedUp":
                fillClr = "purple";
                itemImg = app.itemImgs[cell2.item.name];
                break;
              case "moveSpeedDown":
                fillClr = "blue";
                itemImg = app.itemImgs[cell2.item.name];
                break;
              case "hpUp":
                fillClr = "yellow";
                itemImg = app.itemImgs[cell2.item.name];
                break;
              case "hpDown":
                fillClr = "brown";
                itemImg = app.itemImgs[cell2.item.name];
                break;
              case "focusUp":
                fillClr = "white";
                itemImg = app.itemImgs[cell2.item.name];
                break;
              case "focusDown":
                fillClr = "black";
                itemImg = app.itemImgs[cell2.item.name];
                break;
              case "strengthUp":
                fillClr = "green";
                itemImg = app.itemImgs[cell2.item.name];
                break;
              case "strengthDown":
                fillClr = "red";
                itemImg = app.itemImgs[cell2.item.name];
                break;
              case "ammo5":
                fillClr = "#283618";
                itemImg = app.itemImgs[cell2.item.name];
                break;
              case "ammo10":
                fillClr = "#283618";
                itemImg = app.itemImgs[cell2.item.name];
                break;
            }
          } else if (cell2.item.type === "weapon") {
            switch (cell2.item.subType) {
              case "sword":
                fillClr = "orange";
                itemImg = app.itemImgs[cell2.item.subType];
                break;
              case "spear":
                fillClr = "maroon";
                itemImg = app.itemImgs[cell2.item.subType];
                break;
              case "crossbow":
                fillClr = "navy";
                itemImg = app.itemImgs[cell2.item.subType];
                break;
            }
          } else if (cell2.item.type === "armor") {
            switch (cell2.item.subType) {
              case "helmet":
                fillClr = "grey";
                itemImg = app.itemImgs[cell2.item.subType];
                break;
              case "mail":
                fillClr = "olive";
                itemImg = app.itemImgs[cell2.item.subType];
                break;
              case "greaves":
                fillClr = "#b5179e";
                itemImg = app.itemImgs[cell2.item.subType];
                break;
            }
          }

          // context.fillStyle = fillClr;
          // context.beginPath();
          // context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
          // context.fill();

          context.drawImage(itemImg, center.x - 15, center.y - 15, 30, 30);
        }
      }

      let vertices = [
        { x: center.x, y: center.y + tileWidth / 2 },
        { x: center.x + tileWidth, y: center.y },
        { x: center.x, y: center.y - tileWidth / 2 },
        { x: center.x - tileWidth, y: center.y },
      ];
      for (const vertex of vertices) {
        context.fillStyle = "yellow";
        context.fillRect(vertex.x - 2.5, vertex.y - 2.5, 5, 5);
      }

      for (const player of app.players) {
        if (x === player.startPosition.cell.number.x && y === player.startPosition.cell.number.y) {
          let playerImg;
          let playerImgIndex;
          let atkType = player.currentWeapon.type;
          if (player.currentWeapon.name === "") {
            atkType = "unarmed";
          }

          if (player.ai.state === true) {
            if (player.ai.imgType === "A") {
              playerImgIndex = 2;
            } else if (player.ai.imgType === "B") {
              playerImgIndex = 3;
            }

            playerImg = app.playerImgs[playerImgIndex].idle[atkType];
          } else {
            playerImg = app.playerImgs[player.number - 1].idle[atkType];
          }

          let dirs = ["north", "south", "east", "west"];
          let dirIndex = dirs.indexOf(player.direction);
          let sHeight = app.charSpriteHeight;
          let sWidth = app.charSpriteWidth;
          let sy = dirIndex * sHeight;
          let sx = 0 * sWidth;

          // player.speed.move = .1;
          player.dead.state = false;
          player.dead.count = 0;

          let point = {
            x: 0,
            y: 0,
          };

          let cell = app.gridInfo.find(
            (elem) => elem.number.x === player.startPosition.cell.number.x && elem.number.y === player.startPosition.cell.number.y,
          );
          point.x = cell.center.x;
          point.y = cell.center.y;

          player.currentPosition.cell = {
            number: {
              x: player.startPosition.cell.number.x,
              y: player.startPosition.cell.number.y,
            },
            center: {
              x: point.x,
              y: point.y,
            },
          };
          player.moving = {
            state: false,
            step: 0,
            course: "",
            origin: {
              number: {
                x: player.startPosition.cell.number.x,
                y: player.startPosition.cell.number.y,
              },
              center: {
                x: point.x,
                y: point.y,
              },
            },
            destination: {
              x: 0,
              y: 0,
            },
          };
          player.nextPosition = {
            x: point.x,
            y: point.y,
          };

          app.players[player.number - 1] = player;

          app.getTarget(player);

          let newCharDrawPoint = {
            x: player.nextPosition.x - app.floorImageHeight / 2,
            y: player.nextPosition.y - app.floorImageHeight,
          };

          context2.drawImage(playerImg, sx, sy, sWidth, sHeight, newCharDrawPoint.x, newCharDrawPoint.y, app.playerDrawWidth2, app.playerDrawHeight2);
        }
      }

      // OBSTACLES & BARRIERS
      if (cell.barrier.state === true && cell.void.state !== true) {
        let barrierImg = app.barrierImgs[cell.barrier.type][cell.barrier.position];
        context2.drawImage(barrierImg, iso.x - offset.x, iso.y - barrierImg.height, barrierImg.width, barrierImg.height);
      }

      if (cell.obstacle.state === true && cell.void.state !== true) {
        let obstacleImg = app.obstacleImgs[cell.obstacle.type];
        context2.drawImage(obstacleImg, iso.x - offset.x, iso.y - obstacleImg.height);
      }

      app.init = false;
      console.log(`drawGridInit!!!!!`);

      app.setState({
        loading: false,
      });
    }
  }
}
