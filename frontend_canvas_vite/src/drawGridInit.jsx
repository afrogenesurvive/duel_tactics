import React, { useContext, useRef, useEffect } from "react";
import { GameContext } from "./gameContext";



const DrawGridInit = React.forwardRef((props, ref) => {
  const { context, setState } = useContext(GameContext);

  const testFunction = () => {
    console.log("Test function called");
  }
  context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    context2.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    let gridInfo = [];
    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    }

    setState(prev => ({
        ...prev,
        popupImageRef: {
            ...prev.popupImageRef,
            attackStart: someValue,
            // ...other keys
        }
    }));

    this.popupImageRef = {
      attackStart: this.preAttackIndicateRef.current,
      preAction1: this.preAction1IndicateRef.current,
      preAction2: this.preAction2IndicateRef.current,
      attacking: this.attack3IndicateRef.current,
      attacking1: this.attack1IndicateRef.current,
      attacking2: this.attack2IndicateRef.current,
      missedAttack: this.missedIndicateRef.current,
      attackingBlunt: this.attackBluntIndicate2Ref.current,
      attackingUnarmed: this.attackUnarmedIndicateRef.current,
      attacked1: this.attack1IndicateRef.current,
      attacked2: this.attack2IndicateRef.current,
      attackDefended: this.attackBreakIndicateRef.current,
      attackParried: this.attackParriedIndicateRef.current,
      boltKilled: this.boltKilledIndicateRef.current,
      attackCancelled: this.attackBreakIndicateRef.current,
      injured: this.deflectInjuredIndicateRef.current,
      hpDown: this.deflectInjuredIndicate2Ref.current,
      hpUp: this.healIndicateRef.current,
      defending: this.defendIndicateRef.current,
      defending_1: this.defendIndicate1Ref.current,
      defending_2: this.defendIndicate2Ref.current,
      defending_3: this.defendIndicate3Ref.current,
      defending_4: this.defendIndicate4Ref.current,
      defendSuccess: this.defendSuccessIndicateRef.current,
      guardBroken: this.defendBreakIndicateRef.current,
      deflected: this.deflectBluntIndicateRef.current,
      dodgeStart: this.preAction2IndicateRef.current,
      dodgeSuccess: this.dodgeIndicateRef.current,
      dodging: this.dodgeIndicateRef.current,
      flanking: this.flankIndicateRef.current,
      pushedBack: this.pushbackIndicateRef.current,
      falling: this.fallingIndicateRef.current,
      outOfStamina: this.outOfStaminaIndicateRef.current,
      outOfAmmo: this.outOfAmmoIndicateRef.current,
      missionEngage: this.deflectIndicate2Ref.current,
      missionPursue: this.pursueMissionIndicate2Ref.current,
      missionRetrieve: this.retrieveMissionIndicateRef.current,
      missionDefend: this.defendMissionIndicateRef.current,
      missionPatrol: this.patrolMissionIndicateRef.current,
      missionRetreat: this.retreatIndicateRef.current,
      missionEnroute: this.enrouteIndicateRef.current,
      missionComplete: this.completeMissionIndicateRef.current,
      thinking: this.thinkingIndicateRef.current,
      alarmed: this.preAttack2IndicateRef.current,
      pathSwitch: this.pathSwitchIndicateRef.current,
      targetSwitch: this.targetSwitchIndicateRef.current,
      aggressiveMode: this.aggressiveModeIndicateRef.current,
      passiveMode: this.passiveModeIndicateRef.current,
      pickupWeapon: this.pickupWeaponIndicateRef.current,
      pickupArmor: this.pickupArmorIndicateRef.current,
      dropWeapon: this.dropWeaponIndicateRef.current,
      dropArmor: this.dropArmorIndicateRef.current,
      pickupBuff: this.pickupBuffIndicateRef.current,
      pickupDebuff: this.pickupDebuffIndicateRef.current,
      pickupAmmo: this.pickupAmmoIndicateRef.current,
      inventoryFull: this.inventoryFullIndicateRef.current,
      stop: this.boltDefendIndicateRef.current,
      drowning: this.drowningIndicateRef.current,
      terrainSlowdown: this.terrainSlowdownIndicateRef.current,
      terrainSpeedup: this.terrainSpeedupIndicateRef.current,
      terrainInjured: this.terrainInjuredIndicateRef.current,
      destroyedItem: this.destroyedItemIndicateRef.current,
      sword: this.itemSwordRef.current,
      spear: this.itemSpearRef.current,
      crossbow: this.itemCrossbowRef.current,
      longbow: this.itemBowRef.current,
      helmet: this.itemHelmet1Ref.current,
      mail: this.itemMail1Ref.current,
      greaves: this.itemGreaves1Ref.current,

      missedAttack2: this.missedIndicate2Ref.current,
      prePush: this.prePushIndicateRef.current,
      canPush: this.canPushIndicateRef.current,
      noPush: this.noPushingIndicateRef.current,
      pushing: this.pushingIndicateRef.current,
      prePull: this.prePullIndicateRef.current,
      canPull: this.canPullIndicateRef.current,
      noPull: this.noPullingIndicateRef.current,
      pulling: this.pullingIndicateRef.current,
      pushedPulled: this.pushedPulledIndicateRef.current,
      unbreakable: this.unbreakableIndicateRef.current,
      dodging2: this.dodgeIndicate2Ref.current,
      attackFeint: this.attackFeintIndicateRef.current,
      attackFeint2: this.attackFeintIndicate2Ref.current,
      attackFeint3: this.attackFeintIndicate3Ref.current,
      defendFeint: this.defendFeintIndicateRef.current,
      defendFeint2: this.defendFeintIndicate2Ref.current,
      defendFeint3: this.defendFeintIndicate3Ref.current,
      dodgeFeint: this.dodgeFeintIndicateRef.current,
      dodgeFeint2: this.dodgeFeintIndicate2Ref.current,
      boltDefend2: this.boltDefendIndicate2Ref.current,
      flanking2: this.flankIndicate2Ref.current,
      noFlanking: this.noFlankIndicateRef.current,
      cellVoiding: this.cellVoidingIndicateRef.current,
      cellVoiding2: this.cellVoidingIndicate2Ref.current,
      clashing: this.deflectIndicate2Ref.current,
      timer: this.timerIndicateRef.current,
      charging: this.chargeIndicateRef.current,

      noDirection: this.noDirectionIndicateRef.current,
      noDirection2: this.noDirectionIndicate2Ref.current,
      noDirection3: this.noDirectionIndicate3Ref.current,
      northDirection: this.northDirectionIndicateRef.current,
      southDirection: this.southDirectionIndicateRef.current,
      eastDirection: this.eastDirectionIndicateRef.current,
      westDirection: this.westDirectionIndicateRef.current,
    };
    this.indicatorImgs = {
      preAttack: this.preAttackIndicateRef.current,
      preAttack2: this.preAttack2IndicateRef.current,
      attack1: this.attack1IndicateRef.current,
      attack2: this.attack2IndicateRef.current,
      attack3: this.attack3IndicateRef.current,
      attackUnarmed: this.attackUnarmedIndicateRef.current,
      attackBlunt: this.attackBluntIndicateRef.current,
      attackSuccess: this.attackSuccessIndicateRef.current,
      defend: this.defendIndicateRef.current,
      deflect: this.deflectIndicateRef.current,
      deflectInjured: this.deflectInjuredIndicateRef.current,
      deflectBlunt: this.deflectBluntIndicateRef.current,
      pushback: this.pushbackIndicateRef.current,
      ghost: this.ghostIndicateRef.current,
      death: this.deathIndicateRef.current,
      attackBreak: this.attackBreakIndicateRef.current,
      defendBreak: this.defendBreakIndicateRef.current,
      dodge: this.dodgeIndicateRef.current,
      noDirection: this.noDirectionIndicateRef.current,
      noDirection2: this.noDirectionIndicate2Ref.current,
      noDirection3: this.noDirectionIndicate3Ref.current,
      northDirection: this.northDirectionIndicateRef.current,
      southDirection: this.southDirectionIndicateRef.current,
      eastDirection: this.eastDirectionIndicateRef.current,
      westDirection: this.westDirectionIndicateRef.current,
    };
    this.playerImgs = [
      {
        idle: {
          unarmed: this.idleSheetNew2Ref.current,
          sword: this.idleSheetNew2Ref.current,
          spear: this.idleSheetNew2Ref.current,
          crossbow: this.idleSheetNew2Ref.current,
        },
        walking: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        jumping: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        dodging: {
          unarmed: this.dodgeSheetNewRef.current,
          sword: this.dodgeSheetNewRef.current,
          spear: this.dodgeSheetNewRef.current,
          crossbow: this.dodgeSheetNewRef.current,
        },
        flanking: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        strafing: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        attacking: {
          unarmed: this.attackSheetNewRef.current,
          sword: this.attackSheetNewRef.current,
          spear: this.attackSheetNewRef.current,
          crossbow: this.attackSheetNewRef.current,
        },
        defending: {
          unarmed: this.defendSheetNewRef.current,
          sword: this.defendSheetNewRef.current,
          spear: this.defendSheetNewRef.current,
          crossbow: this.defendSheetNewRef.current,
        },
        deflected: {
          unarmed: this.deflectedFallingSheetNewRef.current,
          sword: this.deflectedFallingSheetNewRef.current,
          spear: this.deflectedFallingSheetNewRef.current,
          crossbow: this.deflectedFallingSheetNewRef.current,
        },
        pushBack: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        falling: {
          unarmed: this.deflectedFallingSheetNewRef.current,
          sword: this.deflectedFallingSheetNewRef.current,
          spear: this.deflectedFallingSheetNewRef.current,
          crossbow: this.deflectedFallingSheetNewRef.current,
        },
        pushing: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        pulling: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        pushed: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        pulled: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
      },
      {
        idle: {
          unarmed: this.idleSheetNew2Ref.current,
          sword: this.idleSheetNew2Ref.current,
          spear: this.idleSheetNew2Ref.current,
          crossbow: this.idleSheetNew2Ref.current,
        },
        walking: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        jumping: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        dodging: {
          unarmed: this.dodgeSheetNewRef.current,
          sword: this.dodgeSheetNewRef.current,
          spear: this.dodgeSheetNewRef.current,
          crossbow: this.dodgeSheetNewRef.current,
        },
        flanking: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        strafing: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        attacking: {
          unarmed: this.attackSheetNewRef.current,
          sword: this.attackSheetNewRef.current,
          spear: this.attackSheetNewRef.current,
          crossbow: this.attackSheetNewRef.current,
        },
        defending: {
          unarmed: this.defendSheetNewRef.current,
          sword: this.defendSheetNewRef.current,
          spear: this.defendSheetNewRef.current,
          crossbow: this.defendSheetNewRef.current,
        },
        deflected: {
          unarmed: this.deflectedFallingSheetNewRef.current,
          sword: this.deflectedFallingSheetNewRef.current,
          spear: this.deflectedFallingSheetNewRef.current,
          crossbow: this.deflectedFallingSheetNewRef.current,
        },
        pushBack: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        falling: {
          unarmed: this.deflectedFallingSheetNewRef.current,
          sword: this.deflectedFallingSheetNewRef.current,
          spear: this.deflectedFallingSheetNewRef.current,
          crossbow: this.deflectedFallingSheetNewRef.current,
        },
        pushing: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        pulling: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        pushed: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        pulled: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
      },
      {
        idle: {
          unarmed: this.idleSheetNew2Ref.current,
          sword: this.idleSheetNew2Ref.current,
          spear: this.idleSheetNew2Ref.current,
          crossbow: this.idleSheetNew2Ref.current,
        },
        walking: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        jumping: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        dodging: {
          unarmed: this.dodgeSheetNewRef.current,
          sword: this.dodgeSheetNewRef.current,
          spear: this.dodgeSheetNewRef.current,
          crossbow: this.dodgeSheetNewRef.current,
        },
        flanking: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        strafing: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        attacking: {
          unarmed: this.attackSheetNewRef.current,
          sword: this.attackSheetNewRef.current,
          spear: this.attackSheetNewRef.current,
          crossbow: this.attackSheetNewRef.current,
        },
        defending: {
          unarmed: this.defendSheetNewRef.current,
          sword: this.defendSheetNewRef.current,
          spear: this.defendSheetNewRef.current,
          crossbow: this.defendSheetNewRef.current,
        },
        deflected: {
          unarmed: this.deflectedFallingSheetNewRef.current,
          sword: this.deflectedFallingSheetNewRef.current,
          spear: this.deflectedFallingSheetNewRef.current,
          crossbow: this.deflectedFallingSheetNewRef.current,
        },
        pushBack: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        falling: {
          unarmed: this.deflectedFallingSheetNewRef.current,
          sword: this.deflectedFallingSheetNewRef.current,
          spear: this.deflectedFallingSheetNewRef.current,
          crossbow: this.deflectedFallingSheetNewRef.current,
        },
        pushing: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        pulling: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        pushed: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        pulled: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
      },
      {
        idle: {
          unarmed: this.idleSheetNew2Ref.current,
          sword: this.idleSheetNew2Ref.current,
          spear: this.idleSheetNew2Ref.current,
          crossbow: this.idleSheetNew2Ref.current,
        },
        walking: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        jumping: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        dodging: {
          unarmed: this.dodgeSheetNewRef.current,
          sword: this.dodgeSheetNewRef.current,
          spear: this.dodgeSheetNewRef.current,
          crossbow: this.dodgeSheetNewRef.current,
        },
        flanking: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        strafing: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        attacking: {
          unarmed: this.attackSheetNewRef.current,
          sword: this.attackSheetNewRef.current,
          spear: this.attackSheetNewRef.current,
          crossbow: this.attackSheetNewRef.current,
        },
        defending: {
          unarmed: this.defendSheetNewRef.current,
          sword: this.defendSheetNewRef.current,
          spear: this.defendSheetNewRef.current,
          crossbow: this.defendSheetNewRef.current,
        },
        deflected: {
          unarmed: this.deflectedFallingSheetNewRef.current,
          sword: this.deflectedFallingSheetNewRef.current,
          spear: this.deflectedFallingSheetNewRef.current,
          crossbow: this.deflectedFallingSheetNewRef.current,
        },
        pushBack: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        falling: {
          unarmed: this.deflectedFallingSheetNewRef.current,
          sword: this.deflectedFallingSheetNewRef.current,
          spear: this.deflectedFallingSheetNewRef.current,
          crossbow: this.deflectedFallingSheetNewRef.current,
        },
        pushing: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        pulling: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        pushed: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
        pulled: {
          unarmed: this.moveSheetNewRef.current,
          sword: this.moveSheetNewRef.current,
          spear: this.moveSheetNewRef.current,
          crossbow: this.moveSheetNewRef.current,
        },
      },
    ];
    this.itemImgs = {
      moveSpeedUp: this.itemSpdUpRef.current,
      moveSpeedDown: this.itemSpdDownRef.current,
      hpUp: this.itemHpUpRef.current,
      hpDown: this.itemHpDownRef.current,
      focusUp: this.itemFocusUpRef.current,
      focusDown: this.itemFocusDownRef.current,
      strengthUp: this.itemStrUpRef.current,
      strengthDown: this.itemStrDownRef.current,
      sword: this.itemSwordRef.current,
      spear: this.itemSpearRef.current,
      crossbow: this.itemBowRef.current,
      helmet: this.itemHelmet1Ref.current,
      ammo5: this.itemAmmoRef.current,
      ammo10: this.itemAmmoRef.current,
      mail: this.itemMail1Ref.current,
      greaves: this.itemGreaves1Ref.current,
    };
    this.boltImgs = {
      north: this.itemBoltNorthRef.current,
      south: this.itemBoltSouthRef.current,
      east: this.itemBoltEastRef.current,
      west: this.itemBoltWestRef.current,
    };
    this.floorImgs = {
      grass: this.floorGrassRef.current,
      stone: this.floorStoneRef.current,
      dirt: this.floorDirtRef.current,
      pond: this.floorPondRef.current,
      mud: this.floorMudRef.current,
      sand: this.floorSandRef.current,
      ice: this.floorIceRef.current,
      lava: this.floorLavaRef.current,
      bramble: this.floorBrambleRef.current,
      river: this.floorRiverRef.current,
      void: this.floorVoidRef.current,
      void2: this.floorVoid2Ref.current,
      void3: this.floorVoid3Ref.current,
      rubble: this.floorRubbleRef.current,
    };
    this.obstacleImgs = {
      // table: this.obstacleAHalfRef.current,
      closet: this.obstacleAFullRef.current,
      // chair: this.obstacleBHalfRef.current,
      // shelf: this.obstacleBFullRef.current,
      // smallBox: this.obstacleCHalfRef.current, //and me
      // largeBox: this.obstacleCFullRef.current, //revive me
      // counter: this.obstacleDHalfRef.current,
      // chest: this.obstacleEHalfRef.current,
      crate: this.obstacleCrateRef.current,
      barrel: this.obstacleBarrelRef.current,
      chest: this.obstacleCrateRef.current,
      table: this.obstacleCrateRef.current,
      chair: this.obstacleCrateRef.current,
      shelf: this.obstacleCrateRef.current,
      counter: this.obstacleCrateRef.current,
      smallBox: this.obstacleCrateRef.current,
      largeBox: this.obstacleBarrelRef.current, //remove me when obs imgs added
    };
    this.barrierImgs = {
      wall: {
        north: this.barrierANorthRef.current,
        south: this.barrierASouthRef.current,
        east: this.barrierAEastRef.current,
        west: this.barrierAWestRef.current,
      },
      door: {
        north: this.barrierANorthRef.current,
        south: this.barrierASouthRef.current,
        east: this.barrierAEastRef.current,
        west: this.barrierAWestRef.current,
      },
      balcony: {
        north: this.barrierANorthRef.current,
        south: this.barrierASouthRef.current,
        east: this.barrierAEastRef.current,
        west: this.barrierAWestRef.current,
      },
    };
    this.backgroundImageRef = {
      sea_clouds_1: this.backgroundSeaClouds1Ref.current,
      sea_clouds_2: this.backgroundSeaClouds2Ref.current,
      sea_clouds_3: this.backgroundSeaClouds3Ref.current,
      sea_clouds_4: this.backgroundSeaClouds4Ref.current,
      sea_clouds_night_1: this.backgroundSeaCloudsNight1Ref.current,
      sea_coast_1: this.backgroundSeaCoast1Ref.current,
      nothern_lights_1: this.backgroundNorthernLights1Ref.current,
      field_1: this.backgroundField1Ref.current,
      field_2: this.backgroundField2Ref.current,
      field_3: this.backgroundField3Ref.current,
    };

    // LOAD CROSSBOW AMMO
    for (const plyr of this.players) {
      if (plyr.currentWeapon.type === "crossbow") {
        let ammo = parseInt(plyr.currentWeapon.effect.split("+")[1]);
        plyr.items.ammo = plyr.items.ammo + ammo;
      }
    }

    let floor;
    let wall = this.wallRef.current;
    let wall2 = this.wall2Ref.current;
    let wall3 = this.wall3Ref.current;

    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    let floorImageWidth = this.floorImageWidth;
    let floorImageHeight = this.floorImageHeight;
    let wallImageWidth = this.wallImageWidth;
    let wallImageHeight = this.wallImageHeight;
    let sceneX = this.canvasWidth / 2;
    let sceneY = this.sceneY;
    let tileWidth = this.tileWidth;

    this.setBackgroundImage("sea_clouds_night_1");

    this.startProcessLevelData(canvas);
    // gridInfo = this.gridInfo;

    this.processLevelData(this.gridInfo);

    props.processLevelData(gridInfo);

    // RESET START POSITION IF DOESN'T EXIST IN CURRENT GRID OR CONFLICTING W/ THIS MAP
    for (const plyr of this.players) {
      // if (!this.gridInfo.find(x => x.number.x === plyr.startPosition.cell.number.x && x.number.y === plyr.startPosition.cell.number.y)) {
      if (
        !this.gridInfo.find(
          (x) =>
            x.number.x === plyr.startPosition.cell.number.x &&
            x.number.y === plyr.startPosition.cell.number.y
        )
      ) {
        let cll = { x: undefined, y: undefined };
        let randomFreeCellChosen = false;

        while (randomFreeCellChosen !== true) {
          cll.x = this.rnJesus(0, this.gridWidth);
          cll.y = this.rnJesus(0, this.gridWidth);
          randomFreeCellChosen = this.checkCell(cll, ["all"]);
        }

        if (randomFreeCellChosen === true) {
          plyr.startPosition.cell.number = cll;
        }
      }

      // RECONSIDER/RANDOM CHOOSE START POSTION IF CONFLICTING W/ THIS MAP
      if (
        this.gridInfo.find(
          (x) =>
            x.number.x === plyr.startPosition.cell.number.x &&
            x.number.y === plyr.startPosition.cell.number.y
        ).terrain.type === "deep" ||
        this.gridInfo.find(
          (x) =>
            x.number.x === plyr.startPosition.cell.number.x &&
            x.number.y === plyr.startPosition.cell.number.y
        ).terrain.type === "void" ||
        this.gridInfo.find(
          (x) =>
            x.number.x === plyr.startPosition.cell.number.x &&
            x.number.y === plyr.startPosition.cell.number.y
        ).void.state === true ||
        this.gridInfo.find(
          (x) =>
            x.number.x === plyr.startPosition.cell.number.x &&
            x.number.y === plyr.startPosition.cell.number.y
        ).obstacle.state === true
      ) {
        let cll = { x: undefined, y: undefined };
        let randomFreeCellChosen = false;

        while (randomFreeCellChosen !== true) {
          cll.x = this.rnJesus(0, this.gridWidth);
          cll.y = this.rnJesus(0, this.gridWidth);
          randomFreeCellChosen = this.checkCell(cll, ["all"]);
        }

        if (randomFreeCellChosen === true) {
          plyr.startPosition.cell.number = cll;
        }
      }
    }
    // console.log('post process barrier check init',this.gridInfo.filter(x => x.barrier.state === true).map(y => y = y.barrier.position));

    if (this.camera.fixed !== true) {
      // this.setCameraFocus('init', canvas, context, canvas2, context2);
    }
    // this.findFocusCell('panToCell',{},canvas,context)

    // CENTER LARGER GRIDS
    if (window.innerWidth < 1100 && this.gridWidth >= 12) {
      // this.camera.zoom.x = 0.7;
      // this.camera.zoom.y = 0.7;

      this.setInitZoom = {
        state: true,
        windowWidth: window.innerWidth,
        gridWidth: this.gridWidth,
      };
    }
    if (window.innerWidth > 1100 && this.gridWidth >= 12) {
      // this.camera.zoom.x = 1;
      // this.camera.zoom.y = 1;

      this.setInitZoom = {
        state: true,
        windowWidth: window.innerWidth,
        gridWidth: this.gridWidth,
      };
    }
    if (window.innerWidth < 1100 && this.gridWidth < 12) {
      // this.camera.zoom.x = 1;
      // this.camera.zoom.y = 1;
      // this.setInitZoom = {
      //   state: true,
      //   windowWidth: window.innerWidth,
      //   gridWidth: this.gridWidth,
      // };
    }

    let diff = 1 - this.camera.zoom.x;

    // FOCUSED ZOOMING INIT SET
    this.camera.pan.x = (diff * this.canvasWidth) / 2;
    this.camera.pan.y = (diff * this.canvasWidth) / 2 - diff * 350;
    if (this.camera.pan.x === 0) {
      this.camera.pan.x = -1;
      this.camera.pan.y = -1;
    }

    this.setZoomPan(canvas);
    this.findFocusCell("panToCell", "", {}, canvas, context);

    if (this.showSettingsCanvasData.state === true) {
      this.settingsFormGridWidthUpdate(this.settingsGridWidth);
    }

    this.placeItems({ init: true, items: "" });

    // CELL COLOR REF
    let preCellColorRef = this.gridInfo.map(
      (x) => (x = { x: x.number.x, y: x.number.y, color: "" })
    );
    for (const cell of preCellColorRef) {
      let colorCheckPass = false;
      while (colorCheckPass === false) {
        let randomColor = `rgb(${this.rnJesus(0, 255)},${this.rnJesus(
          0,
          255
        )},${this.rnJesus(0, 255)})`;
        let colorsInUse = preCellColorRef
          .filter((x) => x.color !== "")
          .map((y) => y === y.color);
        if (colorsInUse.find((x) => x === randomColor)) {
          colorCheckPass = false;
        } else {
          cell.color = randomColor;
          colorCheckPass = true;
        }
      }
    }
    this.cellColorRef = preCellColorRef;

    for (var x = 0; x < this.gridWidth + 1; x++) {
      for (var y = 0; y < this.gridWidth + 1; y++) {
        let p = new Point();
        p.x = x * tileWidth;
        p.y = y * tileWidth;

        let iso = this.cartesianToIsometric(p);
        let offset = { x: floorImageWidth / 2, y: floorImageHeight };

        // apply offset to center scene for a better view
        iso.x += sceneX;
        iso.y += sceneY;

        let center = {
          x: iso.x - offset.x / 2 + this.cellCenterOffsetX,
          y: iso.y - offset.y / 2 - this.cellCenterOffsetY,
        };

        let cell = this.gridInfo.find(
          (elem) => elem.number.x === x && elem.number.y === y
        );
        let cellLevelData = this.gridInfo.find(
          (elem) => elem.number.x === x && elem.number.y === y
        ).levelData;

        floor = this.floorImgs[cell.terrain.name];

        if (cell.void.state === true) {
          // drawFloor = false;
          floor = this.floorImgs.void3;
        }

        // context.drawImage(floor, iso.x - offset.x, iso.y - offset.y, 100, 100);
        context.drawImage(floor, iso.x - offset.x, iso.y - offset.y);

        context.fillStyle = "black";
        context.fillText(
          "" + x + "," + y + "",
          iso.x - offset.x / 2 + 18,
          iso.y - offset.y / 2 + 12
        );

        context.fillStyle = "black";
        context.fillRect(center.x, center.y, 5, 5);

        // INITIAL ITEM DISTRIBUTION!!
        let cell2 = this.gridInfo.find(
          (elem) => elem.number.x === x && elem.number.y === y
        );
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
                  itemImg = this.itemImgs[cell2.item.name];
                  break;
                case "moveSpeedDown":
                  fillClr = "blue";
                  itemImg = this.itemImgs[cell2.item.name];
                  break;
                case "hpUp":
                  fillClr = "yellow";
                  itemImg = this.itemImgs[cell2.item.name];
                  break;
                case "hpDown":
                  fillClr = "brown";
                  itemImg = this.itemImgs[cell2.item.name];
                  break;
                case "focusUp":
                  fillClr = "white";
                  itemImg = this.itemImgs[cell2.item.name];
                  break;
                case "focusDown":
                  fillClr = "black";
                  itemImg = this.itemImgs[cell2.item.name];
                  break;
                case "strengthUp":
                  fillClr = "green";
                  itemImg = this.itemImgs[cell2.item.name];
                  break;
                case "strengthDown":
                  fillClr = "red";
                  itemImg = this.itemImgs[cell2.item.name];
                  break;
                case "ammo5":
                  fillClr = "#283618";
                  itemImg = this.itemImgs[cell2.item.name];
                  break;
                case "ammo10":
                  fillClr = "#283618";
                  itemImg = this.itemImgs[cell2.item.name];
                  break;
              }
            } else if (cell2.item.type === "weapon") {
              switch (cell2.item.subType) {
                case "sword":
                  fillClr = "orange";
                  itemImg = this.itemImgs[cell2.item.subType];
                  break;
                case "spear":
                  fillClr = "maroon";
                  itemImg = this.itemImgs[cell2.item.subType];
                  break;
                case "crossbow":
                  fillClr = "navy";
                  itemImg = this.itemImgs[cell2.item.subType];
                  break;
              }
            } else if (cell2.item.type === "armor") {
              switch (cell2.item.subType) {
                case "helmet":
                  fillClr = "grey";
                  itemImg = this.itemImgs[cell2.item.subType];
                  break;
                case "mail":
                  fillClr = "olive";
                  itemImg = this.itemImgs[cell2.item.subType];
                  break;
                case "greaves":
                  fillClr = "#b5179e";
                  itemImg = this.itemImgs[cell2.item.subType];
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

        for (const player of this.players) {
          if (
            x === player.startPosition.cell.number.x &&
            y === player.startPosition.cell.number.y
          ) {
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

              playerImg = this.playerImgs[playerImgIndex].idle[atkType];
            } else {
              playerImg = this.playerImgs[player.number - 1].idle[atkType];
            }

            let dirs = ["north", "south", "east", "west"];
            let dirIndex = dirs.indexOf(player.direction);
            let sHeight = this.charSpriteHeight;
            let sWidth = this.charSpriteWidth;
            let sy = dirIndex * sHeight;
            let sx = 0 * sWidth;

            // player.speed.move = .1;
            player.dead.state = false;
            player.dead.count = 0;

            let point = {
              x: 0,
              y: 0,
            };

            let cell = this.gridInfo.find(
              (elem) =>
                elem.number.x === player.startPosition.cell.number.x &&
                elem.number.y === player.startPosition.cell.number.y
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

            this.players[player.number - 1] = player;

            this.getTarget(player);

            let newCharDrawPoint = {
              x: player.nextPosition.x - this.floorImageHeight / 2,
              y: player.nextPosition.y - this.floorImageHeight,
            };

            context2.drawImage(
              playerImg,
              sx,
              sy,
              sWidth,
              sHeight,
              newCharDrawPoint.x,
              newCharDrawPoint.y,
              this.playerDrawWidth2,
              this.playerDrawHeight2
            );
          }
        }

        // OBSTACLES & BARRIERS
        if (cell.barrier.state === true && cell.void.state !== true) {
          let barrierImg = this.barrierImgs[cell.barrier.type][cell.barrier.position];
          context2.drawImage(
            barrierImg,
            iso.x - offset.x,
            iso.y - barrierImg.height,
            barrierImg.width,
            barrierImg.height
          );
        }

        if (cell.obstacle.state === true && cell.void.state !== true) {
          let obstacleImg = this.obstacleImgs[cell.obstacle.type];
          context2.drawImage(obstacleImg, iso.x - offset.x, iso.y - obstacleImg.height);
        }

        this.init = false;
        this.setState({
          loading: false,
        });
      }
    }

  const drawGrid = () => {
    // Use context values instead of this.*
    const canvasWidth = context.canvasWidth;
    const canvasHeight = context.canvasHeight;
    const gridWidth = context.gridWidth;
    const tileWidth = context.tileWidth;
    // ...etc

    // Use context.state for nested values
    // Example: context.state.canvas, context.state.context, etc.

    // ...rest of drawGridInit logic, replacing this.* with context.*
  };

  // Optionally, run drawGrid on mount or when dependencies change
  useEffect(() => {
    drawGrid();
    // Add dependencies as needed
  }, [context.gridWidth, context.canvasWidth, context.canvasHeight, /* ... */]);

  // This component does not render anything itself
  return null;
});

export default DrawGridInit;