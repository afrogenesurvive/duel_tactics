import React, { 
  useContext, 
  useRef, 
  useEffect,
  useImperativeHandle,
  forwardRef
 } from "react";
import { GameContext } from "../gameContext";
import { imageRefs } from "../imageRefs";
import SetBackgroundImage from "./setBackgroundImage";



// const DrawGridInit = React.forwardRef((props, ref) => {
const DrawGridInit = () => {
  const { context, setState } = useContext(GameContext);

  console.log("DrawGridInit: game context", context.state);
  

    useEffect(() => {

      if (!context.state.canvas || !context.state.canvasContext) return;

      console.log("DrawGridInit: useEffect triggered");
      
      
      const canvas = imageRefs.canvasRef.current;
      const canvasContext = canvas.getContext("2d");
      const canvas2 = imageRefs.canvasRef2.current;
      const canvasContext2 = canvas2.getContext("2d");


      if (!canvas || !canvas2) return;

      // Update the DOM properties directly
      canvas.width = context.canvasWidth;
      canvas.height = context.canvasHeight;
      canvas2.width = context.canvasWidth;
      canvas2.height = context.canvasHeight;

      // Clear canvases
      canvasContext.clearRect(0, 0, context.canvasWidth, context.canvasHeight);
      canvasContext2.clearRect(0, 0, context.canvasWidth, context.canvasHeight);


      let gridInfo = [];
      class Point {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
      }

      const popupImageRef = {
        attackStart: imageRefs.preAttackIndicateRef.current,
        preAction1: imageRefs.preAction1IndicateRef.current,
        preAction2: imageRefs.preAction2IndicateRef.current,
        attacking: imageRefs.attack3IndicateRef.current,
        attacking1: imageRefs.attack1IndicateRef.current,
        attacking2: imageRefs.attack2IndicateRef.current,
        missedAttack: imageRefs.missedIndicateRef.current,
        attackingBlunt: imageRefs.attackBluntIndicate2Ref.current,
        attackingUnarmed: imageRefs.attackUnarmedIndicateRef.current,
        attacked1: imageRefs.attack1IndicateRef.current,
        attacked2: imageRefs.attack2IndicateRef.current,
        attackDefended: imageRefs.attackBreakIndicateRef.current,
        attackParried: imageRefs.attackParriedIndicateRef.current,
        boltKilled: imageRefs.boltKilledIndicateRef.current,
        attackCancelled: imageRefs.attackBreakIndicateRef.current,
        injured: imageRefs.deflectInjuredIndicateRef.current,
        hpDown: imageRefs.deflectInjuredIndicate2Ref.current,
        hpUp: imageRefs.healIndicateRef.current,
        defending: imageRefs.defendIndicateRef.current,
        defending_1: imageRefs.defendIndicate1Ref.current,
        defending_2: imageRefs.defendIndicate2Ref.current,
        defending_3: imageRefs.defendIndicate3Ref.current,
        defending_4: imageRefs.defendIndicate4Ref.current,
        defendSuccess: imageRefs.defendSuccessIndicateRef.current,
        guardBroken: imageRefs.defendBreakIndicateRef.current,
        deflected: imageRefs.deflectBluntIndicateRef.current,
        dodgeStart: imageRefs.preAction2IndicateRef.current,
        dodgeSuccess: imageRefs.dodgeIndicateRef.current,
        dodging: imageRefs.dodgeIndicateRef.current,
        flanking: imageRefs.flankIndicateRef.current,
        pushedBack: imageRefs.pushbackIndicateRef.current,
        falling: imageRefs.fallingIndicateRef.current,
        outOfStamina: imageRefs.outOfStaminaIndicateRef.current,
        outOfAmmo: imageRefs.outOfAmmoIndicateRef.current,
        missionEngage: imageRefs.deflectIndicate2Ref.current,
        missionPursue: imageRefs.pursueMissionIndicate2Ref.current,
        missionRetrieve: imageRefs.retrieveMissionIndicateRef.current,
        missionDefend: imageRefs.defendMissionIndicateRef.current,
        missionPatrol: imageRefs.patrolMissionIndicateRef.current,
        missionRetreat: imageRefs.retreatIndicateRef.current,
        missionEnroute: imageRefs.enrouteIndicateRef.current,
        missionComplete: imageRefs.completeMissionIndicateRef.current,
        thinking: imageRefs.thinkingIndicateRef.current,
        alarmed: imageRefs.preAttack2IndicateRef.current,
        pathSwitch: imageRefs.pathSwitchIndicateRef.current,
        targetSwitch: imageRefs.targetSwitchIndicateRef.current,
        aggressiveMode: imageRefs.aggressiveModeIndicateRef.current,
        passiveMode: imageRefs.passiveModeIndicateRef.current,
        pickupWeapon: imageRefs.pickupWeaponIndicateRef.current,
        pickupArmor: imageRefs.pickupArmorIndicateRef.current,
        dropWeapon: imageRefs.dropWeaponIndicateRef.current,
        dropArmor: imageRefs.dropArmorIndicateRef.current,
        pickupBuff: imageRefs.pickupBuffIndicateRef.current,
        pickupDebuff: imageRefs.pickupDebuffIndicateRef.current,
        pickupAmmo: imageRefs.pickupAmmoIndicateRef.current,
        inventoryFull: imageRefs.inventoryFullIndicateRef.current,
        stop: imageRefs.boltDefendIndicateRef.current,
        drowning: imageRefs.drowningIndicateRef.current,
        terrainSlowdown: imageRefs.terrainSlowdownIndicateRef.current,
        terrainSpeedup: imageRefs.terrainSpeedupIndicateRef.current,
        terrainInjured: imageRefs.terrainInjuredIndicateRef.current,
        destroyedItem: imageRefs.destroyedItemIndicateRef.current,
        sword: imageRefs.itemSwordRef.current,
        spear: imageRefs.itemSpearRef.current,
        crossbow: imageRefs.itemCrossbowRef.current,
        longbow: imageRefs.itemBowRef.current,
        helmet: imageRefs.itemHelmet1Ref.current,
        mail: imageRefs.itemMail1Ref.current,
        greaves: imageRefs.itemGreaves1Ref.current,

        missedAttack2: imageRefs.missedIndicate2Ref.current,
        prePush: imageRefs.prePushIndicateRef.current,
        canPush: imageRefs.canPushIndicateRef.current,
        noPush: imageRefs.noPushingIndicateRef.current,
        pushing: imageRefs.pushingIndicateRef.current,
        prePull: imageRefs.prePullIndicateRef.current,
        canPull: imageRefs.canPullIndicateRef.current,
        noPull: imageRefs.noPullingIndicateRef.current,
        pulling: imageRefs.pullingIndicateRef.current,
        pushedPulled: imageRefs.pushedPulledIndicateRef.current,
        unbreakable: imageRefs.unbreakableIndicateRef.current,
        dodging2: imageRefs.dodgeIndicate2Ref.current,
        attackFeint: imageRefs.attackFeintIndicateRef.current,
        attackFeint2: imageRefs.attackFeintIndicate2Ref.current,
        attackFeint3: imageRefs.attackFeintIndicate3Ref.current,
        defendFeint: imageRefs.defendFeintIndicateRef.current,
        defendFeint2: imageRefs.defendFeintIndicate2Ref.current,
        defendFeint3: imageRefs.defendFeintIndicate3Ref.current,
        dodgeFeint: imageRefs.dodgeFeintIndicateRef.current,
        dodgeFeint2: imageRefs.dodgeFeintIndicate2Ref.current,
        boltDefend2: imageRefs.boltDefendIndicate2Ref.current,
        flanking2: imageRefs.flankIndicate2Ref.current,
        noFlanking: imageRefs.noFlankIndicateRef.current,
        cellVoiding: imageRefs.cellVoidingIndicateRef.current,
        cellVoiding2: imageRefs.cellVoidingIndicate2Ref.current,
        clashing: imageRefs.deflectIndicate2Ref.current,
        timer: imageRefs.timerIndicateRef.current,
        charging: imageRefs.chargeIndicateRef.current,

        noDirection: imageRefs.noDirectionIndicateRef.current,
        noDirection2: imageRefs.noDirectionIndicate2Ref.current,
        noDirection3: imageRefs.noDirectionIndicate3Ref.current,
        northDirection: imageRefs.northDirectionIndicateRef.current,
        southDirection: imageRefs.southDirectionIndicateRef.current,
        eastDirection: imageRefs.eastDirectionIndicateRef.current,
        westDirection: imageRefs.westDirectionIndicateRef.current,
      };


      const indicatorImgs = {
        preAttack: imageRefs.preAttackIndicateRef.current,
        preAttack2: imageRefs.preAttack2IndicateRef.current,
        attack1: imageRefs.attack1IndicateRef.current,
        attack2: imageRefs.attack2IndicateRef.current,
        attack3: imageRefs.attack3IndicateRef.current,
        attackUnarmed: imageRefs.attackUnarmedIndicateRef.current,
        attackBlunt: imageRefs.attackBluntIndicateRef.current,
        attackSuccess: imageRefs.attackSuccessIndicateRef.current,
        defend: imageRefs.defendIndicateRef.current,
        deflect: imageRefs.deflectIndicateRef.current,
        deflectInjured: imageRefs.deflectInjuredIndicateRef.current,
        deflectBlunt: imageRefs.deflectBluntIndicateRef.current,
        pushback: imageRefs.pushbackIndicateRef.current,
        ghost: imageRefs.ghostIndicateRef.current,
        death: imageRefs.deathIndicateRef.current,
        attackBreak: imageRefs.attackBreakIndicateRef.current,
        defendBreak: imageRefs.defendBreakIndicateRef.current,
        dodge: imageRefs.dodgeIndicateRef.current,
        noDirection: imageRefs.noDirectionIndicateRef.current,
        noDirection2: imageRefs.noDirectionIndicate2Ref.current,
        noDirection3: imageRefs.noDirectionIndicate3Ref.current,
        northDirection: imageRefs.northDirectionIndicateRef.current,
        southDirection: imageRefs.southDirectionIndicateRef.current,
        eastDirection: imageRefs.eastDirectionIndicateRef.current,
        westDirection: imageRefs.westDirectionIndicateRef.current,
      };

      const playerImgs = [
        {
          idle: {
            unarmed: imageRefs.idleSheetNew2Ref.current,
            sword: imageRefs.idleSheetNew2Ref.current,
            spear: imageRefs.idleSheetNew2Ref.current,
            crossbow: imageRefs.idleSheetNew2Ref.current,
          },
          walking: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          jumping: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          dodging: {
            unarmed: imageRefs.dodgeSheetNewRef.current,
            sword: imageRefs.dodgeSheetNewRef.current,
            spear: imageRefs.dodgeSheetNewRef.current,
            crossbow: imageRefs.dodgeSheetNewRef.current,
          },
          flanking: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          strafing: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          attacking: {
            unarmed: imageRefs.attackSheetNewRef.current,
            sword: imageRefs.attackSheetNewRef.current,
            spear: imageRefs.attackSheetNewRef.current,
            crossbow: imageRefs.attackSheetNewRef.current,
          },
          defending: {
            unarmed: imageRefs.defendSheetNewRef.current,
            sword: imageRefs.defendSheetNewRef.current,
            spear: imageRefs.defendSheetNewRef.current,
            crossbow: imageRefs.defendSheetNewRef.current,
          },
          deflected: {
            unarmed: imageRefs.deflectedFallingSheetNewRef.current,
            sword: imageRefs.deflectedFallingSheetNewRef.current,
            spear: imageRefs.deflectedFallingSheetNewRef.current,
            crossbow: imageRefs.deflectedFallingSheetNewRef.current,
          },
          pushBack: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          falling: {
            unarmed: imageRefs.deflectedFallingSheetNewRef.current,
            sword: imageRefs.deflectedFallingSheetNewRef.current,
            spear: imageRefs.deflectedFallingSheetNewRef.current,
            crossbow: imageRefs.deflectedFallingSheetNewRef.current,
          },
          pushing: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          pulling: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          pushed: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          pulled: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
        },
        {
          idle: {
            unarmed: imageRefs.idleSheetNew2Ref.current,
            sword: imageRefs.idleSheetNew2Ref.current,
            spear: imageRefs.idleSheetNew2Ref.current,
            crossbow: imageRefs.idleSheetNew2Ref.current,
          },
          walking: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          jumping: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          dodging: {
            unarmed: imageRefs.dodgeSheetNewRef.current,
            sword: imageRefs.dodgeSheetNewRef.current,
            spear: imageRefs.dodgeSheetNewRef.current,
            crossbow: imageRefs.dodgeSheetNewRef.current,
          },
          flanking: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          strafing: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          attacking: {
            unarmed: imageRefs.attackSheetNewRef.current,
            sword: imageRefs.attackSheetNewRef.current,
            spear: imageRefs.attackSheetNewRef.current,
            crossbow: imageRefs.attackSheetNewRef.current,
          },
          defending: {
            unarmed: imageRefs.defendSheetNewRef.current,
            sword: imageRefs.defendSheetNewRef.current,
            spear: imageRefs.defendSheetNewRef.current,
            crossbow: imageRefs.defendSheetNewRef.current,
          },
          deflected: {
            unarmed: imageRefs.deflectedFallingSheetNewRef.current,
            sword: imageRefs.deflectedFallingSheetNewRef.current,
            spear: imageRefs.deflectedFallingSheetNewRef.current,
            crossbow: imageRefs.deflectedFallingSheetNewRef.current,
          },
          pushBack: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          falling: {
            unarmed: imageRefs.deflectedFallingSheetNewRef.current,
            sword: imageRefs.deflectedFallingSheetNewRef.current,
            spear: imageRefs.deflectedFallingSheetNewRef.current,
            crossbow: imageRefs.deflectedFallingSheetNewRef.current,
          },
          pushing: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          pulling: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          pushed: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          pulled: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
        },
        {
          idle: {
            unarmed: imageRefs.idleSheetNew2Ref.current,
            sword: imageRefs.idleSheetNew2Ref.current,
            spear: imageRefs.idleSheetNew2Ref.current,
            crossbow: imageRefs.idleSheetNew2Ref.current,
          },
          walking: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          jumping: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          dodging: {
            unarmed: imageRefs.dodgeSheetNewRef.current,
            sword: imageRefs.dodgeSheetNewRef.current,
            spear: imageRefs.dodgeSheetNewRef.current,
            crossbow: imageRefs.dodgeSheetNewRef.current,
          },
          flanking: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          strafing: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          attacking: {
            unarmed: imageRefs.attackSheetNewRef.current,
            sword: imageRefs.attackSheetNewRef.current,
            spear: imageRefs.attackSheetNewRef.current,
            crossbow: imageRefs.attackSheetNewRef.current,
          },
          defending: {
            unarmed: imageRefs.defendSheetNewRef.current,
            sword: imageRefs.defendSheetNewRef.current,
            spear: imageRefs.defendSheetNewRef.current,
            crossbow: imageRefs.defendSheetNewRef.current,
          },
          deflected: {
            unarmed: imageRefs.deflectedFallingSheetNewRef.current,
            sword: imageRefs.deflectedFallingSheetNewRef.current,
            spear: imageRefs.deflectedFallingSheetNewRef.current,
            crossbow: imageRefs.deflectedFallingSheetNewRef.current,
          },
          pushBack: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          falling: {
            unarmed: imageRefs.deflectedFallingSheetNewRef.current,
            sword: imageRefs.deflectedFallingSheetNewRef.current,
            spear: imageRefs.deflectedFallingSheetNewRef.current,
            crossbow: imageRefs.deflectedFallingSheetNewRef.current,
          },
          pushing: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          pulling: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          pushed: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          pulled: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
        },
        {
          idle: {
            unarmed: imageRefs.idleSheetNew2Ref.current,
            sword: imageRefs.idleSheetNew2Ref.current,
            spear: imageRefs.idleSheetNew2Ref.current,
            crossbow: imageRefs.idleSheetNew2Ref.current,
          },
          walking: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          jumping: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          dodging: {
            unarmed: imageRefs.dodgeSheetNewRef.current,
            sword: imageRefs.dodgeSheetNewRef.current,
            spear: imageRefs.dodgeSheetNewRef.current,
            crossbow: imageRefs.dodgeSheetNewRef.current,
          },
          flanking: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          strafing: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          attacking: {
            unarmed: imageRefs.attackSheetNewRef.current,
            sword: imageRefs.attackSheetNewRef.current,
            spear: imageRefs.attackSheetNewRef.current,
            crossbow: imageRefs.attackSheetNewRef.current,
          },
          defending: {
            unarmed: imageRefs.defendSheetNewRef.current,
            sword: imageRefs.defendSheetNewRef.current,
            spear: imageRefs.defendSheetNewRef.current,
            crossbow: imageRefs.defendSheetNewRef.current,
          },
          deflected: {
            unarmed: imageRefs.deflectedFallingSheetNewRef.current,
            sword: imageRefs.deflectedFallingSheetNewRef.current,
            spear: imageRefs.deflectedFallingSheetNewRef.current,
            crossbow: imageRefs.deflectedFallingSheetNewRef.current,
          },
          pushBack: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          falling: {
            unarmed: imageRefs.deflectedFallingSheetNewRef.current,
            sword: imageRefs.deflectedFallingSheetNewRef.current,
            spear: imageRefs.deflectedFallingSheetNewRef.current,
            crossbow: imageRefs.deflectedFallingSheetNewRef.current,
          },
          pushing: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          pulling: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          pushed: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
          pulled: {
            unarmed: imageRefs.moveSheetNewRef.current,
            sword: imageRefs.moveSheetNewRef.current,
            spear: imageRefs.moveSheetNewRef.current,
            crossbow: imageRefs.moveSheetNewRef.current,
          },
        },
      ];
      const itemImgs = {
        moveSpeedUp: imageRefs.itemSpdUpRef.current,
        moveSpeedDown: imageRefs.itemSpdDownRef.current,
        hpUp: imageRefs.itemHpUpRef.current,
        hpDown: imageRefs.itemHpDownRef.current,
        focusUp: imageRefs.itemFocusUpRef.current,
        focusDown: imageRefs.itemFocusDownRef.current,
        strengthUp: imageRefs.itemStrUpRef.current,
        strengthDown: imageRefs.itemStrDownRef.current,
        sword: imageRefs.itemSwordRef.current,
        spear: imageRefs.itemSpearRef.current,
        crossbow: imageRefs.itemBowRef.current,
        helmet: imageRefs.itemHelmet1Ref.current,
        ammo5: imageRefs.itemAmmoRef.current,
        ammo10: imageRefs.itemAmmoRef.current,
        mail: imageRefs.itemMail1Ref.current,
        greaves: imageRefs.itemGreaves1Ref.current,
      };
      const boltImgs = {
        north: imageRefs.itemBoltNorthRef.current,
        south: imageRefs.itemBoltSouthRef.current,
        east: imageRefs.itemBoltEastRef.current,
        west: imageRefs.itemBoltWestRef.current,
      };
      const floorImgs = {
        grass: imageRefs.floorGrassRef.current,
        stone: imageRefs.floorStoneRef.current,
        dirt: imageRefs.floorDirtRef.current,
        pond: imageRefs.floorPondRef.current,
        mud: imageRefs.floorMudRef.current,
        sand: imageRefs.floorSandRef.current,
        ice: imageRefs.floorIceRef.current,
        lava: imageRefs.floorLavaRef.current,
        bramble: imageRefs.floorBrambleRef.current,
        river: imageRefs.floorRiverRef.current,
        void: imageRefs.floorVoidRef.current,
        void2: imageRefs.floorVoid2Ref.current,
        void3: imageRefs.floorVoid3Ref.current,
        rubble: imageRefs.floorRubbleRef.current,
      };
      const obstacleImgs = {
        // table: imageRefs.obstacleAHalfRef.current,
        closet: imageRefs.obstacleAFullRef.current,
        // chair: imageRefs.obstacleBHalfRef.current,
        // shelf: imageRefs.obstacleBFullRef.current,
        // smallBox: imageRefs.obstacleCHalfRef.current, //and me
        // largeBox: imageRefs.obstacleCFullRef.current, //revive me
        // counter: imageRefs.obstacleDHalfRef.current,
        // chest: imageRefs.obstacleEHalfRef.current,
        crate: imageRefs.obstacleCrateRef.current,
        barrel: imageRefs.obstacleBarrelRef.current,
        chest: imageRefs.obstacleCrateRef.current,
        table: imageRefs.obstacleCrateRef.current,
        chair: imageRefs.obstacleCrateRef.current,
        shelf: imageRefs.obstacleCrateRef.current,
        counter: imageRefs.obstacleCrateRef.current,
        smallBox: imageRefs.obstacleCrateRef.current,
        largeBox: imageRefs.obstacleBarrelRef.current, //remove me when obs imgs added
      };
      const barrierImgs = {
        wall: {
          north: imageRefs.barrierANorthRef.current,
          south: imageRefs.barrierASouthRef.current,
          east: imageRefs.barrierAEastRef.current,
          west: imageRefs.barrierAWestRef.current,
        },
        door: {
          north: imageRefs.barrierANorthRef.current,
          south: imageRefs.barrierASouthRef.current,
          east: imageRefs.barrierAEastRef.current,
          west: imageRefs.barrierAWestRef.current,
        },
        balcony: {
          north: imageRefs.barrierANorthRef.current,
          south: imageRefs.barrierASouthRef.current,
          east: imageRefs.barrierAEastRef.current,
          west: imageRefs.barrierAWestRef.current,
        },
      };
      const backgroundImageRef = {
        sea_clouds_1: imageRefs.backgroundSeaClouds1Ref.current,
        sea_clouds_2: imageRefs.backgroundSeaClouds2Ref.current,
        sea_clouds_3: imageRefs.backgroundSeaClouds3Ref.current,
        sea_clouds_4: imageRefs.backgroundSeaClouds4Ref.current,
        sea_clouds_night_1: imageRefs.backgroundSeaCloudsNight1Ref.current,
        sea_coast_1: imageRefs.backgroundSeaCoast1Ref.current,
        nothern_lights_1: imageRefs.backgroundNorthernLights1Ref.current,
        field_1: imageRefs.backgroundField1Ref.current,
        field_2: imageRefs.backgroundField2Ref.current,
        field_3: imageRefs.backgroundField3Ref.current,
      };
      

      setState(prevState => {
        let newState = updateNestedState(prevState, ['popupImageRef'], popupImageRef);
        newState = updateNestedState(newState, ['indicatorImgs'], indicatorImgs);
        newState = updateNestedState(newState, ['playerImgs'], playerImgs);
        newState = updateNestedState(newState, ['itemImgs'], itemImgs);
        newState = updateNestedState(newState, ['boltImgs'], boltImgs);
        newState = updateNestedState(newState, ['floorImgs'], floorImgs);
        newState = updateNestedState(newState, ['obstacleImgs'], obstacleImgs);
        newState = updateNestedState(newState, ['barrierImgs'], barrierImgs);
        newState = updateNestedState(newState, ['backgroundImageRef'], backgroundImageRef);
        return newState;
      });


      let players = cpntext.players;
      for (const plyr of players) {
        if (plyr.currentWeapon.type === "crossbow") {
          let ammo = parseInt(plyr.currentWeapon.effect.split("+")[1]);
          plyr.items.ammo = plyr.items.ammo + ammo;
        }
      }

      setState(prevState =>
        updateNestedState(
          prevState,
          ['players'],
          players
        )
      );


      let floor;
      let wall = imageRefs.wallRef.current;
      let wall2 = imageRefs.wall2Ref.current;
      let wall3 = imageRefs.wall3Ref.current;

      canvas.width = context.canvasWidth;
      canvas.height = context.canvasHeight;

      let floorImageWidth = context.floorImageWidth;
      let floorImageHeight = context.floorImageHeight;
      let wallImageWidth = context.wallImageWidth;
      let wallImageHeight = context.wallImageHeight;
      let sceneX = context.canvasWidth / 2;
      let sceneY = context.sceneY;
      let tileWidth = context.tileWidth;

      setState((prevState) => ({
        ...prevState,
        global_function_component_triggers: {
          ...prevState.global_function_component_triggers,
          SetBackgroundImage:{
            ...prevState.global_function_component_triggers.SetBackgroundImage,
            main: context.global_function_component_triggers.SetBackgroundImage.main + 1,
            image: "sea_clouds_night_1"
          },
          startProcessLevelData: {
            ...prevState.global_function_component_triggers.startProcessLevelData,
            main: context.global_function_component_triggers.startProcessLevelData.main + 1,
          }
        },
      }));


      setState((prevState) => ({
        ...prevState,
        global_function_component_triggers: {
          ...prevState.global_function_component_triggers,
          processLevelData: {
            ...prevState.global_function_component_triggers.processLevelData,
            main: context.global_function_component_triggers.processLevelData.main + 1,
          }
        },
        init: false
      }));


    }, [context.global_function_component_triggers.drawGridInit.main]); // <--- dependency

    // useEffect(() => {
    //   // ...logic...
    // }, [context.global_function_component_triggers.drawGridInit.prop1]);

  return null;
};

export default DrawGridInit;