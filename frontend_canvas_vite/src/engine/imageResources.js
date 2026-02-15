import React from "react";

import logo from "../assets/logo.svg";
import bgCompass from "../assets/bgCompass.png";

import backgroundField1 from "../assets/backgrounds/bg_field_1.png";
import backgroundField2 from "../assets/backgrounds/bg_field_2.png";
import backgroundField3 from "../assets/backgrounds/bg_field_3.png";
import backgroundNorthernLights1 from "../assets/backgrounds/bg_northernLights_1.png";
import backgroundSeaClouds1 from "../assets/backgrounds/bg_seaClouds_1.png";
import backgroundSeaClouds2 from "../assets/backgrounds/bg_seaClouds_2.png";
import backgroundSeaClouds3 from "../assets/backgrounds/bg_seaClouds_3.png";
import backgroundSeaClouds4 from "../assets/backgrounds/bg_seaClouds_4.png";
import backgroundSeaCloudsNight1 from "../assets/backgrounds/bg_seaCloudsNight_1.png";
import backgroundSeaCoast1 from "../assets/backgrounds/bg_seaCoast_1.png";
import bg_1 from "../assets/backgrounds/bg_field_1.png";

import floorDirt from "../assets/terrain/floorDirt.png";
import floorGrass from "../assets/terrain/floorGrass.png";
import floorIce from "../assets/terrain/floorIce.png";
import floorMud from "../assets/terrain/floorMud.png";
import floorPond from "../assets/terrain/floorPond.png";
import floorRiver from "../assets/terrain/floorRiver.png";
import floorSand from "../assets/terrain/floorSand.png";
import floorStone from "../assets/terrain/floorStone.png";
import floorBramble from "../assets/terrain/floorBramble.png";
import floorLava from "../assets/terrain/floorLava.png";
import floorAttack from "../assets/terrain/floorAttacked.png";
import floorAttack2 from "../assets/terrain/floorAttacked2.png";
import floorVoid from "../assets/terrain/floorVoid.png";
import floorVoid2 from "../assets/terrain/floorVoid2.png";
import floorVoid3 from "../assets/terrain/floorVoid3.png";
import floorHighlight from "../assets/terrain/floorHighlight.png";

import floorRubble from "../assets/obstacles/floorRubble.png";

import wall from "../assets/obstacles/wall.png";
import wall2 from "../assets/obstacles/wall2.png";
import wall3 from "../assets/obstacles/wall3.png";
import obstacleAHalf from "../assets/obstacles/obstacleA_half.png";
import obstacleAFull from "../assets/obstacles/obstacleA_full.png";
import obstacleBHalf from "../assets/obstacles/obstacleB_half.png";
import obstacleBFull from "../assets/obstacles/obstacleB_full.png";
import obstacleCHalf from "../assets/obstacles/obstacleC_half.png";
import obstacleCFull from "../assets/obstacles/obstacleC_full.png";
import obstacleDHalf from "../assets/obstacles/obstacleD_half.png";
import obstacleDFull from "../assets/obstacles/obstacleD_full.png";
import obstacleEHalf from "../assets/obstacles/obstacleE_half.png";
import obstacleEFull from "../assets/obstacles/obstacleE_full.png";
import obstacleCrate from "../assets/obstacles/obstacle_crate.png";
import obstacleBarrel from "../assets/obstacles/obstacle_barrel.png";
import barrierANorth from "../assets/obstacles/barrierA_north.png";
import barrierASouth from "../assets/obstacles/barrierA_south.png";
import barrierAEast from "../assets/obstacles/barrierA_east.png";
import barrierAWest from "../assets/obstacles/barrierA_west.png";

import attack1Indicate from "../assets/indicators/attack1.png";
import attack2Indicate from "../assets/indicators/attack2.png";
import attack3Indicate from "../assets/indicators/attacky.png";
import attackUnarmedIndicate from "../assets/items/unarmed.png";
import attackBluntIndicate from "../assets/indicators/blunt.png";
import attackSuccessIndicate from "../assets/indicators/attackSuccess.png";
import missedIndicate from "../assets/indicators/miss.png";
import missedIndicate2 from "../assets/indicators/miss2.png";
import defendIndicate from "../assets/indicators/defend.png";
import defendIndicate1 from "../assets/indicators/defend3.png";
import defendIndicate2 from "../assets/indicators/defend4.png";
import defendIndicate3 from "../assets/indicators/defend5.png";
import defendIndicate4 from "../assets/indicators/defend6.png";
import deflectIndicate from "../assets/indicators/deflect.png";
import deflectIndicate2 from "../assets/indicators/deflect2.png";
import deflectInjuredIndicate from "../assets/indicators/deflectInjured2.png";
import deflectInjuredIndicate2 from "../assets/indicators/deflectInjured.png";
import deflectBluntIndicate from "../assets/indicators/death2.png";
import pushbackIndicate from "../assets/indicators/pushback.png";
import ghostIndicate from "../assets/indicators/ghost.png";
import deathIndicate from "../assets/indicators/death.png";
import preAttackIndicate from "../assets/indicators/preAttack.png";
import healIndicate from "../assets/indicators/healIndicate.png";

import prePushIndicate from "../assets/indicators/prePush.png";
import canPushIndicate from "../assets/indicators/canPush.png";
import noPushingIndicate from "../assets/indicators/noPushing.png";
import pushingIndicate from "../assets/indicators/pushing.png";
import prePullIndicate from "../assets/indicators/prePull.png";
import canPullIndicate from "../assets/indicators/canPull.png";
import noPullingIndicate from "../assets/indicators/noPulling.png";
import pullingIndicate from "../assets/indicators/pulling.png";
import pushedPulledIndicate from "../assets/indicators/pushedPulled.png";
import unbreakableIndicate from "../assets/indicators/unbreakable.png";
import attackFeintIndicate from "../assets/indicators/attackFeint.png";
import attackFeintIndicate2 from "../assets/indicators/attackFeint2.png";
import defendFeintIndicate from "../assets/indicators/defendFeint.png";
import defendFeintIndicate2 from "../assets/indicators/defendFeint2.png";

import defendFeintIndicate3 from "../assets/indicators/defendFeint3.png";
import attackFeintIndicate3 from "../assets/indicators/attackFeint3.png";
import dodgeFeintIndicate from "../assets/indicators/dodgeFeint.png";
import dodgeFeintIndicate2 from "../assets/indicators/dodgeFeint2.png";

import cellVoidingIndicate from "../assets/indicators/cellVoiding.png";
import cellVoidingIndicate2 from "../assets/indicators/cellVoiding2.png";
import boltDefendIndicate2 from "../assets/indicators/boltDefend2.png";
import flankIndicate2 from "../assets/indicators/flanking2.png";
import noFlankIndicate from "../assets/indicators/noFlanking.png";

import preAttack2Indicate from "../assets/indicators/preAttack2.png";
import preAction1Indicate from "../assets/indicators/preAction1.png";
import preAction2Indicate from "../assets/indicators/preAction2.png";
import attackBreakIndicate from "../assets/indicators/attackBreak.png";
import defendBreakIndicate from "../assets/indicators/defendBreak.png";
import boltDefendIndicate from "../assets/indicators/boltDefend.png";
import dodgeIndicate from "../assets/indicators/dodge.png";
import dodgeIndicate2 from "../assets/indicators/dodge2.png";
import fallingIndicate from "../assets/indicators/falling.png";
import completeMissionIndicate from "../assets/indicators/complete.png";
import flankIndicate from "../assets/indicators/flank.png";
import attackBluntIndicate2 from "../assets/indicators/blunt2.png";
import enrouteIndicate from "../assets/indicators/enroute.png";
import targetSwitchIndicate from "../assets/indicators/targetSwitch.png";
import pathSwitchIndicate from "../assets/indicators/pathSwitch.svg";
import retreatIndicate from "../assets/indicators/retreat.png";
import defendSuccessIndicate from "../assets/indicators/defendSuccess.png";
import aggressiveModeIndicate from "../assets/indicators/angry.png";
import passiveModeIndicate from "../assets/indicators/meditation.png";
import thinkingIndicate from "../assets/indicators/mind.png";
import defendMissionIndicate from "../assets/indicators/police.png";
import patrolMissionIndicate from "../assets/indicators/location.png";
import pursueMissionIndicate from "../assets/indicators/treasure-map.png";
import pursueMissionIndicate2 from "../assets/indicators/missionPursue.png";
import retrieveMissionIndicate from "../assets/indicators/treasure.png";
import drowningIndicate from "../assets/indicators/drown.png";
import destroyedItemIndicate from "../assets/indicators/destroyedItem.png";
import pickupBuffIndicate from "../assets/indicators/pickupBuff.png";
import pickupDebuffIndicate from "../assets/indicators/pickupDebuff.png";
import pickupWeaponIndicate from "../assets/indicators/pickupWeapon.png";
import dropWeaponIndicate from "../assets/indicators/dropWeapon.png";
import dropArmorIndicate from "../assets/indicators/dropArmor.png";
import pickupArmorIndicate from "../assets/indicators/pickupArmor.png";
import pickupAmmoIndicate from "../assets/indicators/pickupAmmo.png";
import terrainSpeedupIndicate from "../assets/indicators/terrainSpeedup.png";
import terrainSlowdownIndicate from "../assets/indicators/terrainSlowdown.png";
import terrainInjuredIndicate from "../assets/indicators/terrainInjured.png";
import outOfStaminaIndicate from "../assets/indicators/outOfStamina.png";
import boltKilledIndicate from "../assets/indicators/boltKilled.png";
import attackParriedIndicate from "../assets/indicators/attackParried.png";
import inventoryFullIndicate from "../assets/indicators/inventoryFull.png";
import outOfAmmoIndicate from "../assets/indicators/outOfAmmo.png";
import timerIndicate from "../assets/indicators/timer.png";

import chargeIndicate from "../assets/indicators/charge.png";
import noDirectionIndicate from "../assets/indicators/noDirection1.png";
import noDirectionIndicate2 from "../assets/indicators/noDirection2.png";
import noDirectionIndicate3 from "../assets/indicators/noDirection3.png";
import northDirectionIndicate from "../assets/indicators/northDirection.png";
import southDirectionIndicate from "../assets/indicators/southDirection.png";
import eastDirectionIndicate from "../assets/indicators/eastDirection.png";
import westDirectionIndicate from "../assets/indicators/westDirection.png";

import mail1 from "../assets/items/mail1.png";
import mail2 from "../assets/items/mail2.png";
import mail3 from "../assets/items/mail3.png";
import greaves1 from "../assets/items/greaves1.png";
import greaves2 from "../assets/items/greaves2.png";
import greaves3 from "../assets/items/greaves3.png";
import helmet1 from "../assets/items/helmet1.png";
import hpUp from "../assets/items/hpUp.png";
import hpDown from "../assets/items/hpDown.png";
import spdUp from "../assets/items/spdUp.png";
import spdDown from "../assets/items/spdDown.png";
import strUp from "../assets/items/strUp.png";
import strDown from "../assets/items/strDown.png";
import focusUp from "../assets/items/focusUp.png";
import focusDown from "../assets/items/focusDown.png";
import ammo from "../assets/items/ammo.png";
import bow from "../assets/items/bow.png";
import boltNorth from "../assets/items/boltNorth.png";
import boltSouth from "../assets/items/boltSouth.png";
import boltEast from "../assets/items/boltEast.png";
import boltWest from "../assets/items/boltWest.png";
import spear from "../assets/items/spear.png";
import spear1 from "../assets/items/spear.png";
import spear2 from "../assets/items/spear.png";
import sword from "../assets/items/sword.png";
import sword1 from "../assets/items/sword.png";
import sword2 from "../assets/items/sword.png";
import crossbow from "../assets/items/crossbow.png";
import crossbow1 from "../assets/items/crossbow.png";
import crossbow2 from "../assets/items/crossbow.png";

import playerImgIdleSheet from "../assets/player/sheet1.png";
import player2ImgIdleSheet from "../assets/player/sheet2.png";
import playerComAImgIdleSheet from "../assets/player/sheetComA.png";
import playerComBImgIdleSheet from "../assets/player/sheetComB.png";
import playerImgMoveSheet from "../assets/player/sheetMoving1.png";
import player2ImgMoveSheet from "../assets/player/sheetMoving2.png";
import comAImgMoveSheet from "../assets/player/sheetMovingComA.png";
import comBImgMoveSheet from "../assets/player/sheetMovingComB.png";
import player1DefendSheet from "../assets/player/sheetDefend1.png";
import player2DefendSheet from "../assets/player/sheetDefend2.png";
import comADefendSheet from "../assets/player/sheetDefendComA.png";
import comBDefendSheet from "../assets/player/sheetDefendComB.png";
import player1AttackSheet from "../assets/player/sheetAttack1.png";
import player2AttackSheet from "../assets/player/sheetAttack2.png";
import comAAttackSheet from "../assets/player/sheetAttackComA.png";
import comBAttackSheet from "../assets/player/sheetAttackComB.png";

import testSpriteNorth from "../assets/player/testSpriteNorth.png";
import testSpriteSouth from "../assets/player/testSpriteSouth.png";
import testSpriteEast from "../assets/player/testSpriteEast.png";
import testSpriteWest from "../assets/player/testSpriteWest.png";

import moveSheetNew from "../assets/player/movingSheetNew.png";
import idleSheetNew from "../assets/player/idleSheetNew.png";
import idleSheetNew2 from "../assets/player/idleSheetNew2.png";
import attackSheetNew from "../assets/player/attackSheetNew.png";
import defendSheetNew from "../assets/player/defendSheetNew.png";
import dodgeSheetNew from "../assets/player/dodgingSheetNew.png";
import deflectedFallingSheetNew from "../assets/player/deflectedFallingSheetNew.png";

const refKeys = [
  "logo",
  "bgCompass",
  "backgroundField1",
  "backgroundField2",
  "backgroundField3",
  "backgroundNorthernLights1",
  "backgroundSeaClouds1",
  "backgroundSeaClouds2",
  "backgroundSeaClouds3",
  "backgroundSeaClouds4",
  "backgroundSeaCloudsNight1",
  "backgroundSeaCoast1",
  "bg_1",
  "floorDirt",
  "floorGrass",
  "floorIce",
  "floorMud",
  "floorPond",
  "floorRiver",
  "floorSand",
  "floorStone",
  "floorBramble",
  "floorLava",
  "floorAttack",
  "floorAttack2",
  "floorVoid",
  "floorVoid2",
  "floorVoid3",
  "floorHighlight",
  "floorRubble",
  "wall",
  "wall2",
  "wall3",
  "obstacleAHalf",
  "obstacleAFull",
  "obstacleBHalf",
  "obstacleBFull",
  "obstacleCHalf",
  "obstacleCFull",
  "obstacleDHalf",
  "obstacleDFull",
  "obstacleEHalf",
  "obstacleEFull",
  "obstacleCrate",
  "obstacleBarrel",
  "barrierANorth",
  "barrierASouth",
  "barrierAEast",
  "barrierAWest",

  "attack1Indicate",
  "attack2Indicate",
  "attack3Indicate",
  "attackUnarmedIndicate",
  "attackBluntIndicate",
  "attackSuccessIndicate",
  "missedIndicate",
  "missedIndicate2",
  "defendIndicate",
  "defendIndicate1",
  "defendIndicate2",
  "defendIndicate3",
  "defendIndicate4",
  "deflectIndicate",
  "deflectIndicate2",
  "deflectInjuredIndicate",
  "deflectInjuredIndicate2",
  "deflectBluntIndicate",
  "pushbackIndicate",
  "ghostIndicate",
  "deathIndicate",
  "preAttackIndicate",
  "healIndicate",
  "prePushIndicate",
  "canPushIndicate",
  "noPushingIndicate",
  "pushingIndicate",
  "prePullIndicate",
  "canPullIndicate",
  "noPullingIndicate",
  "pullingIndicate",
  "pushedPulledIndicate",
  "unbreakableIndicate",
  "attackFeintIndicate",
  "attackFeintIndicate2",
  "defendFeintIndicate",
  "defendFeintIndicate2",
  "defendFeintIndicate3",
  "attackFeintIndicate3",
  "dodgeFeintIndicate",
  "dodgeFeintIndicate2",
  "cellVoidingIndicate",
  "cellVoidingIndicate2",
  "boltDefendIndicate2",
  "flankIndicate2",
  "noFlankIndicate",
  "preAttack2Indicate",
  "preAction1Indicate",
  "preAction2Indicate",
  "attackBreakIndicate",
  "defendBreakIndicate",
  "boltDefendIndicate",
  "dodgeIndicate",
  "dodgeIndicate2",
  "fallingIndicate",
  "completeMissionIndicate",
  "flankIndicate",
  "attackBluntIndicate2",
  "enrouteIndicate",
  "targetSwitchIndicate",
  "pathSwitchIndicate",
  "retreatIndicate",
  "defendSuccessIndicate",
  "aggressiveModeIndicate",
  "passiveModeIndicate",
  "thinkingIndicate",
  "defendMissionIndicate",
  "patrolMissionIndicate",
  "pursueMissionIndicate",
  "pursueMissionIndicate2",
  "retrieveMissionIndicate",
  "drowningIndicate",
  "destroyedItemIndicate",
  "pickupBuffIndicate",
  "pickupDebuffIndicate",
  "pickupWeaponIndicate",
  "dropWeaponIndicate",
  "dropArmorIndicate",
  "pickupArmorIndicate",
  "pickupAmmoIndicate",
  "terrainSpeedupIndicate",
  "terrainSlowdownIndicate",
  "terrainInjuredIndicate",
  "outOfStaminaIndicate",
  "boltKilledIndicate",
  "attackParriedIndicate",
  "inventoryFullIndicate",
  "outOfAmmoIndicate",
  "timerIndicate",
  "chargeIndicate",
  "noDirectionIndicate",
  "noDirectionIndicate2",
  "noDirectionIndicate3",
  "northDirectionIndicate",
  "southDirectionIndicate",
  "eastDirectionIndicate",
  "westDirectionIndicate",

  "mail1",
  "mail2",
  "mail3",
  "greaves1",
  "greaves2",
  "greaves3",
  "helmet1",
  "hpUp",
  "hpDown",
  "spdUp",
  "spdDown",
  "strUp",
  "strDown",
  "focusUp",
  "focusDown",
  "ammo",
  "bow",
  "boltNorth",
  "boltSouth",
  "boltEast",
  "boltWest",
  "spear",
  "spear1",
  "spear2",
  "sword",
  "sword1",
  "sword2",
  "crossbow",
  "crossbow1",
  "crossbow2",

  "playerImgIdleSheet",
  "player2ImgIdleSheet",
  "playerComAImgIdleSheet",
  "playerComBImgIdleSheet",
  "playerImgMoveSheet",
  "player2ImgMoveSheet",
  "comAImgMoveSheet",
  "comBImgMoveSheet",
  "player1DefendSheet",
  "player2DefendSheet",
  "comADefendSheet",
  "comBDefendSheet",
  "player1AttackSheet",
  "player2AttackSheet",
  "comAAttackSheet",
  "comBAttackSheet",
  "testSpriteNorth",
  "testSpriteSouth",
  "testSpriteEast",
  "testSpriteWest",
  "moveSheetNew",
  "idleSheetNew",
  "idleSheetNew2",
  "attackSheetNew",
  "defendSheetNew",
  "dodgeSheetNew",
  "deflectedFallingSheetNew",
];

export const ImageRefs = refKeys.reduce((acc, key) => {
  acc[key] = React.createRef();
  return acc;
}, {});

export const images = {
  logoRef: logo,
  bgCompassRef: bgCompass,
  backgroundField1Ref: backgroundField1,
  backgroundField2Ref: backgroundField2,
  backgroundField3Ref: backgroundField3,
  backgroundNorthernLights1Ref: backgroundNorthernLights1,
  backgroundSeaClouds1Ref: backgroundSeaClouds1,
  backgroundSeaClouds2Ref: backgroundSeaClouds2,
  backgroundSeaClouds3Ref: backgroundSeaClouds3,
  backgroundSeaClouds4Ref: backgroundSeaClouds4,
  backgroundSeaCloudsNight1Ref: backgroundSeaCloudsNight1,
  backgroundSeaCoast1Ref: backgroundSeaCoast1,
  bg_1Ref: bg_1,
  floorDirtRef: floorDirt,
  floorGrassRef: floorGrass,
  floorIceRef: floorIce,
  floorMudRef: floorMud,
  floorPondRef: floorPond,
  floorRiverRef: floorRiver,
  floorSandRef: floorSand,
  floorStoneRef: floorStone,
  floorBrambleRef: floorBramble,
  floorLavaRef: floorLava,
  floorAttackRef: floorAttack,
  floorAttack2Ref: floorAttack2,
  floorVoidRef: floorVoid,
  floorVoid2Ref: floorVoid2,
  floorVoid3Ref: floorVoid3,
  floorHighlightRef: floorHighlight,
  floorRubbleRef: floorRubble,
  wallRef: wall,
  wall2Ref: wall2,
  wall3Ref: wall3,
  obstacleAHalfRef: obstacleAHalf,
  obstacleAFullRef: obstacleAFull,
  obstacleBHalfRef: obstacleBHalf,
  obstacleBFullRef: obstacleBFull,
  obstacleCHalfRef: obstacleCHalf,
  obstacleCFullRef: obstacleCFull,
  obstacleDHalfRef: obstacleDHalf,
  obstacleDFullRef: obstacleDFull,
  obstacleEHalfRef: obstacleEHalf,
  obstacleEFullRef: obstacleEFull,
  obstacleCrateRef: obstacleCrate,
  obstacleBarrelRef: obstacleBarrel,
  barrierANorthRef: barrierANorth,
  barrierASouthRef: barrierASouth,
  barrierAEastRef: barrierAEast,
  barrierAWestRef: barrierAWest,

  attack1IndicateRef: attack1Indicate,
  attack2IndicateRef: attack2Indicate,
  attack3IndicateRef: attack3Indicate,
  attackUnarmedIndicateRef: attackUnarmedIndicate,
  attackBluntIndicateRef: attackBluntIndicate,
  attackSuccessIndicateRef: attackSuccessIndicate,
  missedIndicateRef: missedIndicate,
  missedIndicate2Ref: missedIndicate2,
  defendIndicateRef: defendIndicate,
  defendIndicate1Ref: defendIndicate1,
  defendIndicate2Ref: defendIndicate2,
  defendIndicate3Ref: defendIndicate3,
  defendIndicate4Ref: defendIndicate4,
  deflectIndicateRef: deflectIndicate,
  deflectIndicate2Ref: deflectIndicate2,
  deflectInjuredIndicateRef: deflectInjuredIndicate,
  deflectInjuredIndicate2Ref: deflectInjuredIndicate2,
  deflectBluntIndicateRef: deflectBluntIndicate,
  pushbackIndicateRef: pushbackIndicate,
  ghostIndicateRef: ghostIndicate,
  deathIndicateRef: deathIndicate,
  preAttackIndicateRef: preAttackIndicate,
  healIndicateRef: healIndicate,
  prePushIndicateRef: prePushIndicate,
  canPushIndicateRef: canPushIndicate,
  noPushingIndicateRef: noPushingIndicate,
  pushingIndicateRef: pushingIndicate,
  prePullIndicateRef: prePullIndicate,
  canPullIndicateRef: canPullIndicate,
  noPullingIndicateRef: noPullingIndicate,
  pullingIndicateRef: pullingIndicate,
  pushedPulledIndicateRef: pushedPulledIndicate,
  unbreakableIndicateRef: unbreakableIndicate,
  attackFeintIndicateRef: attackFeintIndicate,
  attackFeintIndicate2Ref: attackFeintIndicate2,
  defendFeintIndicateRef: defendFeintIndicate,
  defendFeintIndicate2Ref: defendFeintIndicate2,
  defendFeintIndicate3Ref: defendFeintIndicate3,
  attackFeintIndicate3Ref: attackFeintIndicate3,
  dodgeFeintIndicateRef: dodgeFeintIndicate,
  dodgeFeintIndicate2Ref: dodgeFeintIndicate2,
  cellVoidingIndicateRef: cellVoidingIndicate,
  cellVoidingIndicate2Ref: cellVoidingIndicate2,
  boltDefendIndicate2Ref: boltDefendIndicate2,
  flankIndicate2Ref: flankIndicate2,
  noFlankIndicateRef: noFlankIndicate,
  preAttack2IndicateRef: preAttack2Indicate,
  preAction1IndicateRef: preAction1Indicate,
  preAction2IndicateRef: preAction2Indicate,
  attackBreakIndicateRef: attackBreakIndicate,
  defendBreakIndicateRef: defendBreakIndicate,
  boltDefendIndicateRef: boltDefendIndicate,
  dodgeIndicateRef: dodgeIndicate,
  dodgeIndicate2Ref: dodgeIndicate2,
  fallingIndicateRef: fallingIndicate,
  completeMissionIndicateRef: completeMissionIndicate,
  flankIndicateRef: flankIndicate,
  attackBluntIndicate2Ref: attackBluntIndicate2,
  enrouteIndicateRef: enrouteIndicate,
  targetSwitchIndicateRef: targetSwitchIndicate,
  pathSwitchIndicateRef: pathSwitchIndicate,
  retreatIndicateRef: retreatIndicate,
  defendSuccessIndicateRef: defendSuccessIndicate,
  aggressiveModeIndicateRef: aggressiveModeIndicate,
  passiveModeIndicateRef: passiveModeIndicate,
  thinkingIndicateRef: thinkingIndicate,
  defendMissionIndicateRef: defendMissionIndicate,
  patrolMissionIndicateRef: patrolMissionIndicate,
  pursueMissionIndicateRef: pursueMissionIndicate,
  pursueMissionIndicate2Ref: pursueMissionIndicate2,
  retrieveMissionIndicateRef: retrieveMissionIndicate,
  drowningIndicateRef: drowningIndicate,
  destroyedItemIndicateRef: destroyedItemIndicate,
  pickupBuffIndicateRef: pickupBuffIndicate,
  pickupDebuffIndicateRef: pickupDebuffIndicate,
  pickupWeaponIndicateRef: pickupWeaponIndicate,
  dropWeaponIndicateRef: dropWeaponIndicate,
  dropArmorIndicateRef: dropArmorIndicate,
  pickupArmorIndicateRef: pickupArmorIndicate,
  pickupAmmoIndicateRef: pickupAmmoIndicate,
  terrainSpeedupIndicateRef: terrainSpeedupIndicate,
  terrainSlowdownIndicateRef: terrainSlowdownIndicate,
  terrainInjuredIndicateRef: terrainInjuredIndicate,
  outOfStaminaIndicateRef: outOfStaminaIndicate,
  boltKilledIndicateRef: boltKilledIndicate,
  attackParriedIndicateRef: attackParriedIndicate,
  inventoryFullIndicateRef: inventoryFullIndicate,
  outOfAmmoIndicateRef: outOfAmmoIndicate,
  timerIndicateRef: timerIndicate,
  chargeIndicateRef: chargeIndicate,
  noDirectionIndicateRef: noDirectionIndicate,
  noDirectionIndicate2Ref: noDirectionIndicate2,
  noDirectionIndicate3Ref: noDirectionIndicate3,
  northDirectionIndicateRef: northDirectionIndicate,
  southDirectionIndicateRef: southDirectionIndicate,
  eastDirectionIndicateRef: eastDirectionIndicate,
  westDirectionIndicateRef: westDirectionIndicate,

  itemMail1Ref: mail1,
  itemMail2Ref: mail2,
  itemMail3Ref: mail3,
  itemGreaves1Ref: greaves1,
  itemGreaves2Ref: greaves2,
  itemGreaves3Ref: greaves3,
  itemHelmet1Ref: helmet1,
  itemHpUpRef: hpUp,
  itemHpDownRef: hpDown,
  itemSpdUpRef: spdUp,
  itemSpdDownRef: spdDown,
  itemStrUpRef: strUp,
  itemStrDownRef: strDown,
  itemFocusUpRef: focusUp,
  itemFocusDownRef: focusDown,
  itemAmmoRef: ammo,
  itemBowRef: bow,
  itemBoltNorthRef: boltNorth,
  itemBoltSouthRef: boltSouth,
  itemBoltEastRef: boltEast,
  itemBoltWestRef: boltWest,
  itemSpearRef: spear,
  itemSpear1Ref: spear1,
  itemSpear2Ref: spear2,
  itemSwordRef: sword,
  itemSword1Ref: sword1,
  itemSword2Ref: sword2,
  itemCrossbowRef: crossbow,
  itemCrossbow1Ref: crossbow1,
  itemCrossbow2Ref: crossbow2,

  playerImgIdleSheetRef: playerImgIdleSheet,
  player2ImgIdleSheetRef: player2ImgIdleSheet,
  playerComAImgIdleSheetRef: playerComAImgIdleSheet,
  playerComBImgIdleSheetRef: playerComBImgIdleSheet,
  playerImgMoveSheetRef: playerImgMoveSheet,
  player2ImgMoveSheetRef: player2ImgMoveSheet,
  comAImgMoveSheetRef: comAImgMoveSheet,
  comBImgMoveSheetRef: comBImgMoveSheet,
  player1DefendSheetRef: player1DefendSheet,
  player2DefendSheetRef: player2DefendSheet,
  comADefendSheetRef: comADefendSheet,
  comBDefendSheetRef: comBDefendSheet,
  player1AttackSheetRef: player1AttackSheet,
  player2AttackSheetRef: player2AttackSheet,
  comAAttackSheetRef: comAAttackSheet,
  comBAttackSheetRef: comBAttackSheet,
  testSpriteNorthRef: testSpriteNorth,
  testSpriteSouthRef: testSpriteSouth,
  testSpriteEastRef: testSpriteEast,
  testSpriteWestRef: testSpriteWest,
  moveSheetNewRef: moveSheetNew,
  idleSheetNewRef: idleSheetNew,
  idleSheetNew2Ref: idleSheetNew2,
  attackSheetNewRef: attackSheetNew,
  defendSheetNewRef: defendSheetNew,
  dodgeSheetNewRef: dodgeSheetNew,
  deflectedFallingSheetNewRef: deflectedFallingSheetNew,
};
