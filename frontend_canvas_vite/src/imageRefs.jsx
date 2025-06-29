import React, { useContext } from "react";
import { GameContext } from "./gameContext";
import assets from "./assets";

const {
  backgrounds_assets,
  terrain_assets,
  walls_assets,
  obstacles_assets,
  indicators_assets,
  items_assets,
  playerSprites_assets
} = assets;

// Create refs for all images you need
export const imageRefs = {

    canvasRef: React.createRef(),
    canvasRef2: React.createRef(),

    // SETTINGS CANVASES
    canvasRef3: React.createRef(),
    canvasRef4: React.createRef(),

    cellInfoBoxRef: React.createRef(),

    testRefNorth: React.createRef(),
    testRefSouth: React.createRef(),
    testRefEast: React.createRef(),
    testRefWest: React.createRef(),

    bgCompassRef: React.createRef(),

    backgroundField1Ref: React.createRef(),
    backgroundField2Ref: React.createRef(),
    backgroundField3Ref: React.createRef(),
    backgroundNorthernLights1Ref: React.createRef(),
    backgroundSeaClouds1Ref: React.createRef(),
    backgroundSeaClouds2Ref: React.createRef(),
    backgroundSeaClouds3Ref: React.createRef(),
    backgroundSeaClouds4Ref: React.createRef(),
    backgroundSeaCloudsNight1Ref: React.createRef(),
    backgroundSeaCoast1Ref: React.createRef(),

    popupProgressImgRef: React.createRef(),
    popupProgressSvgRef: React.createRef(),
    floorGrassRef: React.createRef(),
    floorDirtRef: React.createRef(),
    floorIceRef: React.createRef(),
    floorStoneRef: React.createRef(),
    floorSandRef: React.createRef(),
    floorMudRef: React.createRef(),
    floorPondRef: React.createRef(),
    floorRiverRef: React.createRef(),
    floorBrambleRef: React.createRef(),
    floorLavaRef: React.createRef(),
    floorAttackRef: React.createRef(),
    floorAttack2Ref: React.createRef(),
    floorVoidRef: React.createRef(),
    floorVoid2Ref: React.createRef(),
    floorVoid3Ref: React.createRef(),
    floorHighlightRef: React.createRef(),
    floorRubbleRef: React.createRef(),

    cellVoidingIndicateRef: React.createRef(),
    cellVoidingIndicate2Ref: React.createRef(),

    wallRef: React.createRef(),
    wall2Ref: React.createRef(),
    wall3Ref: React.createRef(),

    obstacleAHalfRef: React.createRef(),
    obstacleAFullRef: React.createRef(),
    obstacleBHalfRef: React.createRef(),
    obstacleBFullRef: React.createRef(),
    obstacleCHalfRef: React.createRef(),
    obstacleCFullRef: React.createRef(),
    obstacleDHalfRef: React.createRef(),
    obstacleDFullRef: React.createRef(),
    obstacleEHalfRef: React.createRef(),
    obstacleEFullRef: React.createRef(),
    obstacleCrateRef: React.createRef(),
    obstacleBarrelRef: React.createRef(),
    barrierANorthRef: React.createRef(),
    barrierASouthRef: React.createRef(),
    barrierAEastRef: React.createRef(),
    barrierAWestRef: React.createRef(),

    unbreakableIndicateRef: React.createRef(),

    timerIndicateRef: React.createRef(),

    preAction1IndicateRef: React.createRef(),
    preAction2IndicateRef: React.createRef(),

    preAttackIndicateRef: React.createRef(),
    preAttack2IndicateRef: React.createRef(),

    attack1IndicateRef: React.createRef(),
    attack2IndicateRef: React.createRef(),
    attack3IndicateRef: React.createRef(),

    attackUnarmedIndicateRef: React.createRef(),
    attackBluntIndicateRef: React.createRef(),
    attackBluntIndicate2Ref: React.createRef(),

    attackSuccessIndicateRef: React.createRef(),

    attackBreakIndicateRef: React.createRef(),

    attackFeintIndicateRef: React.createRef(),
    attackFeintIndicate2Ref: React.createRef(),
    attackFeintIndicate3Ref: React.createRef(),

    attackParriedIndicateRef: React.createRef(),
    chargeIndicateRef: React.createRef(),

    missedIndicateRef: React.createRef(),
    missedIndicate2Ref: React.createRef(),

    defendIndicateRef: React.createRef(),
    defendIndicate1Ref: React.createRef(),
    defendIndicate2Ref: React.createRef(),
    defendIndicate3Ref: React.createRef(),
    defendIndicate4Ref: React.createRef(),

    defendBreakIndicateRef: React.createRef(),
    defendSuccessIndicateRef: React.createRef(),

    defendFeintIndicateRef: React.createRef(),
    defendFeintIndicate2Ref: React.createRef(),
    defendFeintIndicate3Ref: React.createRef(),

    boltDefendIndicateRef: React.createRef(),
    boltDefendIndicate2Ref: React.createRef(),
    boltKilledIndicateRef: React.createRef(),

    deflectIndicateRef: React.createRef(),
    deflectIndicate2Ref: React.createRef(),
    deflectInjuredIndicateRef: React.createRef(),
    deflectInjuredIndicate2Ref: React.createRef(),
    deflectBluntIndicateRef: React.createRef(),

    pushbackIndicateRef: React.createRef(),

    dodgeIndicateRef: React.createRef(),
    dodgeFeintIndicateRef: React.createRef(),
    dodgeFeintIndicate2Ref: React.createRef(),
    dodgeIndicate2Ref: React.createRef(),

    flankIndicateRef: React.createRef(),
    flankIndicate2Ref: React.createRef(),
    noFlankIndicateRef: React.createRef(),

    fallingIndicateRef: React.createRef(),
    drowningIndicateRef: React.createRef(),

    ghostIndicateRef: React.createRef(),
    deathIndicateRef: React.createRef(),

    healIndicateRef: React.createRef(),

    outOfStaminaIndicateRef: React.createRef(),
    inventoryFullIndicateRef: React.createRef(),
    outOfAmmoIndicateRef: React.createRef(),

    destroyedItemIndicateRef: React.createRef(),
    pickupBuffIndicateRef: React.createRef(),
    pickupDebuffIndicateRef: React.createRef(),
    pickupWeaponIndicateRef: React.createRef(),
    dropWeaponIndicateRef: React.createRef(),
    dropArmorIndicateRef: React.createRef(),
    pickupArmorIndicateRef: React.createRef(),
    pickupAmmoIndicateRef: React.createRef(),

    prePushIndicateRef: React.createRef(),
    canPushIndicateRef: React.createRef(),
    noPushingIndicateRef: React.createRef(),
    pushingIndicateRef: React.createRef(),
    prePullIndicateRef: React.createRef(),
    canPullIndicateRef: React.createRef(),
    noPullingIndicateRef: React.createRef(),
    pullingIndicateRef: React.createRef(),
    pushedPulledIndicateRef: React.createRef(),

    terrainSpeedupIndicateRef: React.createRef(),
    terrainSlowdownIndicateRef: React.createRef(),
    terrainInjuredIndicateRef: React.createRef(),

    noDirectionIndicateRef: React.createRef(),
    noDirectionIndicate2Ref: React.createRef(),
    noDirectionIndicate3Ref: React.createRef(),
    northDirectionIndicateRef: React.createRef(),
    southDirectionIndicateRef: React.createRef(),
    eastDirectionIndicateRef: React.createRef(),
    westDirectionIndicateRef: React.createRef(),

    // ITEMS
    itemSpdUpRef: React.createRef(),
    itemSpdDownRef: React.createRef(),
    itemHpUpRef: React.createRef(),
    itemHpDownRef: React.createRef(),
    itemFocusUpRef: React.createRef(),
    itemFocusDownRef: React.createRef(),
    itemStrUpRef: React.createRef(),
    itemStrDownRef: React.createRef(),
    itemHelmet1Ref: React.createRef(),
    itemAmmoRef: React.createRef(),
    itemMail1Ref: React.createRef(),
    itemGreaves1Ref: React.createRef(),
    itemBoltNorthRef: React.createRef(),
    itemBoltSouthRef: React.createRef(),
    itemBoltEastRef: React.createRef(),
    itemBoltWestRef: React.createRef(),
    itemSwordRef: React.createRef(),
    itemSpearRef: React.createRef(),
    itemBowRef: React.createRef(),
    itemCrossbowRef: React.createRef(),
    boltNorthRef: React.createRef(),
    boltSouthRef: React.createRef(),
    boltEastRef: React.createRef(),
    boltWestRef: React.createRef(),
    ammoRef: React.createRef(),
    mail1Ref: React.createRef(),
    mail2Ref: React.createRef(),
    mail3Ref: React.createRef(),
    greaves1Ref: React.createRef(),
    greaves2Ref: React.createRef(),
    greaves3Ref: React.createRef(),
    helmet1Ref: React.createRef(),
    hpUpRef: React.createRef(),
    hpDownRef: React.createRef(),
    spdUpRef: React.createRef(),
    spdDownRef: React.createRef(),
    strUpRef: React.createRef(),
    strDownRef: React.createRef(),
    focusUpRef: React.createRef(),
    focusDownRef: React.createRef(),

    playerImgIdleSheetRef: React.createRef(),
    player2ImgIdleSheetRef: React.createRef(),
    playerComAImgIdleSheetRef: React.createRef(),
    playerComBImgIdleSheetRef: React.createRef(),
    playerImgMoveSheetRef: React.createRef(),
    player2ImgMoveSheetRef: React.createRef(),
    comAImgMoveSheetRef: React.createRef(),
    comBImgMoveSheetRef: React.createRef(),
    player1ImgDefendSheetRef: React.createRef(),
    player2ImgDefendSheetRef: React.createRef(),
    comAImgDefendSheetRef: React.createRef(),
    comBImgDefendSheetRef: React.createRef(),
    player1ImgAttackSheetRef: React.createRef(),
    player2ImgAttackSheetRef: React.createRef(),
    comAImgAttackSheetRef: React.createRef(),
    comBImgAttackSheetRef: React.createRef(),

    // AI

    completeMissionIndicateRef: React.createRef(),
    enrouteIndicateRef: React.createRef(),
    targetSwitchIndicateRef: React.createRef(),
    pathSwitchIndicateRef: React.createRef(),
    retreatIndicateRef: React.createRef(),
    aggressiveModeIndicateRef: React.createRef(),
    passiveModeIndicateRef: React.createRef(),
    thinkingIndicateRef: React.createRef(),
    defendMissionIndicateRef: React.createRef(),
    patrolMissionIndicateRef: React.createRef(),
    pursueMissionIndicateRef: React.createRef(),
    pursueMissionIndicate2Ref: React.createRef(),
    retrieveMissionIndicateRef: React.createRef(),

    moveSheetNewRef: React.createRef(),
    idleSheetNewRef: React.createRef(),
    idleSheetNew2Ref: React.createRef(),
    attackSheetNewRef: React.createRef(),
    defendSheetNewRef: React.createRef(),
    dodgeSheetNewRef: React.createRef(),
    deflectedFallingSheetNewRef: React.createRef(),
};

const {
  backgrounds,
  terrain,
  walls,
  obstacles,
  indicators,
  items,
  playerSprites,
} = assets;

export function ImageRefs() {

    const { context } = useContext(GameContext);

  return (
    <>
      <img
        src=""
        className="hidden"
        height={context.popupImgSize}
        width={context.popupImgSize}
        ref={imageRefs.popupProgressImgRef}
        alt="logo"
        />
        <img
        src={backgrounds_assets.bgCompass}
        className="hidden bgCompass"
        ref={imageRefs.bgCompassRef}
        alt="logo"
        />

        <img
        src={backgrounds_assets.backgroundField1}
        className="hidden"
        ref={imageRefs.backgroundField1Ref}
        alt="logo"
        />
        <img
        src={backgrounds_assets.backgroundField2}
        className="hidden"
        ref={imageRefs.backgroundField2Ref}
        alt="logo"
        />
        <img
        src={backgrounds_assets.backgroundField3}
        className="hidden"
        ref={imageRefs.backgroundField3Ref}
        alt="logo"
        />
        <img
        src={backgrounds_assets.backgroundNorthernLights1}
        className="hidden"
        ref={imageRefs.backgroundNorthernLights1Ref}
        alt="logo"
        />
        <img
        src={backgrounds_assets.backgroundSeaClouds1}
        className="hidden"
        ref={imageRefs.backgroundSeaClouds1Ref}
        alt="logo"
        />
        <img
        src={backgrounds_assets.backgroundSeaClouds2}
        className="hidden"
        ref={imageRefs.backgroundSeaClouds2Ref}
        alt="logo"
        />
        <img
        src={backgrounds_assets.backgroundSeaClouds3}
        className="hidden"
        ref={imageRefs.backgroundSeaClouds3Ref}
        alt="logo"
        />
        <img
        src={backgrounds_assets.backgroundSeaClouds4}
        className="hidden"
        ref={imageRefs.backgroundSeaClouds4Ref}
        alt="logo"
        />
        <img
        src={backgrounds_assets.backgroundSeaCloudsNight1}
        className="hidden"
        ref={imageRefs.backgroundSeaCloudsNight1Ref}
        alt="logo"
        />
        <img
        src={backgrounds_assets.backgroundSeaCoast1}
        className="hidden"
        ref={imageRefs.backgroundSeaCoast1Ref}
        alt="logo"
        />

        <img src={terrain_assets.floorGrass} className="hidden" ref={imageRefs.floorGrassRef} alt="logo" />
        <img src={terrain_assets.floorDirt} className="hidden" ref={imageRefs.floorDirtRef} alt="logo" />
        <img src={terrain_assets.floorIce} className="hidden" ref={imageRefs.floorIceRef} alt="logo" />
        <img src={terrain_assets.floorStone} className="hidden" ref={imageRefs.floorStoneRef} alt="logo" />
        <img src={terrain_assets.floorSand} className="hidden" ref={imageRefs.floorSandRef} alt="logo" />
        <img src={terrain_assets.floorMud} className="hidden" ref={imageRefs.floorMudRef} alt="logo" />
        <img src={terrain_assets.floorPond} className="hidden" ref={imageRefs.floorPondRef} alt="logo" />
        <img src={terrain_assets.floorRiver} className="hidden" ref={imageRefs.floorRiverRef} alt="logo" />
        <img
        src={terrain_assets.floorBramble}
        className="hidden"
        ref={imageRefs.floorBrambleRef}
        alt="logo"
        />
        <img src={terrain_assets.floorLava} className="hidden" ref={imageRefs.floorLavaRef} alt="logo" />
        <img
        src={terrain_assets.floorAttack}
        className="hidden"
        ref={imageRefs.floorAttackRef}
        alt="logo"
        />
        <img
        src={terrain_assets.floorAttack2}
        className="hidden"
        ref={imageRefs.floorAttack2Ref}
        alt="logo"
        />
        <img src={terrain_assets.floorVoid} className="hidden" ref={imageRefs.floorVoidRef} alt="logo" />
        <img src={terrain_assets.floorVoid2} className="hidden" ref={imageRefs.floorVoid2Ref} alt="logo" />
        <img src={terrain_assets.floorVoid3} className="hidden" ref={imageRefs.floorVoid3Ref} alt="logo" />
        <img
        src={terrain_assets.floorHighlight}
        className="hidden"
        ref={imageRefs.floorHighlightRef}
        alt="logo"
        />
        <img
        src={terrain_assets.floorRubble}
        className="hidden"
        ref={imageRefs.floorRubbleRef}
        alt="logo"
        />
        <img src={walls_assets.wall} className="hidden" ref={imageRefs.wallRef} alt="logo" />
        <img src={walls_assets.wall2} className="hidden" ref={imageRefs.wall2Ref} alt="logo" />
        <img src={walls_assets.wall3} className="hidden" ref={imageRefs.wall3Ref} alt="logo" />
        <img
        src={obstacles_assets.obstacleAHalf}
        className="hidden"
        ref={imageRefs.obstacleAHalfRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.obstacleAFull}
        className="hidden"
        ref={imageRefs.obstacleAFullRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.obstacleBHalf}
        className="hidden"
        ref={imageRefs.obstacleBHalfRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.obstacleBFull}
        className="hidden"
        ref={imageRefs.obstacleBFullRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.obstacleCHalf}
        className="hidden"
        ref={imageRefs.obstacleCHalfRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.obstacleCFull}
        className="hidden"
        ref={imageRefs.obstacleCFullRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.obstacleDHalf}
        className="hidden"
        ref={imageRefs.obstacleDHalfRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.obstacleDFull}
        className="hidden"
        ref={imageRefs.obstacleDFullRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.obstacleEHalf}
        className="hidden"
        ref={imageRefs.obstacleEHalfRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.obstacleEFull}
        className="hidden"
        ref={imageRefs.obstacleEFullRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.obstacleCrate}
        className="hidden"
        ref={imageRefs.obstacleCrateRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.obstacleBarrel}
        className="hidden"
        ref={imageRefs.obstacleBarrelRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.barrierANorth}
        className="hidden"
        ref={imageRefs.barrierANorthRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.barrierASouth}
        className="hidden"
        ref={imageRefs.barrierASouthRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.barrierAEast}
        className="hidden"
        ref={imageRefs.barrierAEastRef}
        alt="logo"
        />
        <img
        src={obstacles_assets.barrierAWest}
        className="hidden"
        ref={imageRefs.barrierAWestRef}
        alt="logo"
        />

        <img
        src={indicators_assets.attack1Indicate}
        className="hidden playerImgs"
        ref={imageRefs.attack1IndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.attack2Indicate}
        className="hidden playerImgs"
        ref={imageRefs.attack2IndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.attack3Indicate}
        className="hidden playerImgs"
        ref={imageRefs.attack3IndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.attackUnarmedIndicate}
        className="hidden playerImgs"
        ref={imageRefs.attackUnarmedIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.attackBluntIndicate}
        className="hidden playerImgs"
        ref={imageRefs.attackBluntIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.attackSuccessIndicate}
        className="hidden playerImgs"
        ref={imageRefs.attackSuccessIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.defendIndicate}
        className="hidden playerImgs"
        ref={imageRefs.defendIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.defendIndicate1}
        className="hidden playerImgs"
        ref={imageRefs.defendIndicate1Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.defendIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.defendIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.defendIndicate3}
        className="hidden playerImgs"
        ref={imageRefs.defendIndicate3Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.defendIndicate4}
        className="hidden playerImgs"
        ref={imageRefs.defendIndicate4Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.deflectIndicate}
        className="hidden playerImgs"
        ref={imageRefs.deflectIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.deflectIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.deflectIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.deflectInjuredIndicate}
        className="hidden playerImgs"
        ref={imageRefs.deflectInjuredIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.deflectInjuredIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.deflectInjuredIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.deflectBluntIndicate}
        className="hidden playerImgs"
        ref={imageRefs.deflectBluntIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.pushbackIndicate}
        className="hidden playerImgs"
        ref={imageRefs.pushbackIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.ghostIndicate}
        className="hidden playerImgs"
        ref={imageRefs.ghostIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.deathIndicate}
        className="hidden playerImgs"
        ref={imageRefs.deathIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.preAttackIndicate}
        className="hidden playerImgs"
        ref={imageRefs.preAttackIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.preAttack2Indicate}
        className="hidden playerImgs"
        ref={imageRefs.preAttack2IndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.attackBreakIndicate}
        className="hidden playerImgs"
        ref={imageRefs.attackBreakIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.defendBreakIndicate}
        className="hidden playerImgs"
        ref={imageRefs.defendBreakIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.defendSuccessIndicate}
        className="hidden playerImgs"
        ref={imageRefs.defendSuccessIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.boltDefendIndicate}
        className="hidden playerImgs"
        ref={imageRefs.boltDefendIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.dodgeIndicate}
        className="hidden playerImgs"
        ref={imageRefs.dodgeIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.preAction1Indicate}
        className="hidden playerImgs"
        ref={imageRefs.preAction1IndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.preAction2Indicate}
        className="hidden playerImgs"
        ref={imageRefs.preAction2IndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.fallingIndicate}
        className="hidden playerImgs"
        ref={imageRefs.fallingIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.completeMissionIndicate}
        className="hidden playerImgs"
        ref={imageRefs.completeMissionIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.flankIndicate}
        className="hidden playerImgs"
        ref={imageRefs.flankIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.attackBluntIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.attackBluntIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.enrouteIndicate}
        className="hidden playerImgs"
        ref={imageRefs.enrouteIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.targetSwitchIndicate}
        className="hidden playerImgs"
        ref={imageRefs.targetSwitchIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.pathSwitchIndicate}
        className="hidden playerImgs"
        ref={imageRefs.pathSwitchIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.retreatIndicate}
        className="hidden playerImgs"
        ref={imageRefs.retreatIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.defendSuccessIndicate}
        className="hidden playerImgs"
        ref={imageRefs.defendSuccessIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.healIndicate}
        className="hidden playerImgs"
        ref={imageRefs.healIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.preAttack2Indicate}
        className="hidden playerImgs"
        ref={imageRefs.preAttack2IndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.preAction1Indicate}
        className="hidden playerImgs"
        ref={imageRefs.preAction1IndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.preAction2Indicate}
        className="hidden playerImgs"
        ref={imageRefs.preAction2IndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.attackBreakIndicate}
        className="hidden playerImgs"
        ref={imageRefs.attackBreakIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.missedIndicate}
        className="hidden playerImgs"
        ref={imageRefs.missedIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.defendBreakIndicate}
        className="hidden playerImgs"
        ref={imageRefs.defendBreakIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.boltDefendIndicate}
        className="hidden playerImgs"
        ref={imageRefs.boltDefendIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.dodgeIndicate}
        className="hidden playerImgs"
        ref={imageRefs.dodgeIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.fallingIndicate}
        className="hidden playerImgs"
        ref={imageRefs.fallingIndicateRef}
        alt="logo"
        />

        <img
        src={indicators_assets.completeMissionIndicate}
        className="hidden playerImgs"
        ref={imageRefs.completeMissionIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.flankIndicate}
        className="hidden playerImgs"
        ref={imageRefs.flankIndicateRef}
        alt="log"
        />
        <img
        src={indicators_assets.attackBluntIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.attackBluntIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.enrouteIndicate}
        className="hidden playerImgs"
        ref={imageRefs.enrouteIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.targetSwitchIndicate}
        className="hidden playerImgs"
        ref={imageRefs.targetSwitchIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.pathSwitchIndicate}
        className="hidden playerImgs"
        ref={imageRefs.pathSwitchIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.retreatIndicate}
        className="hidden playerImgs"
        ref={imageRefs.retreatIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.defendSuccessIndicate}
        className="hidden playerImgs"
        ref={imageRefs.defendSuccessIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.aggressiveModeIndicate}
        className="hidden playerImgs"
        ref={imageRefs.aggressiveModeIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.passiveModeIndicate}
        className="hidden playerImgs"
        ref={imageRefs.passiveModeIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.thinkingIndicate}
        className="hidden playerImgs"
        ref={imageRefs.thinkingIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.defendMissionIndicate}
        className="hidden playerImgs"
        ref={imageRefs.defendMissionIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.patrolMissionIndicate}
        className="hidden playerImgs"
        ref={imageRefs.patrolMissionIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.pursueMissionIndicate}
        className="hidden playerImgs"
        ref={imageRefs.pursueMissionIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.pursueMissionIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.pursueMissionIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.retrieveMissionIndicate}
        className="hidden playerImgs"
        ref={imageRefs.retrieveMissionIndicateRef}
        alt="logo"
        />

        <img
        src={indicators_assets.drowningIndicate}
        className="hidden playerImgs"
        ref={imageRefs.drowningIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.destroyedItemIndicate}
        className="hidden playerImgs"
        ref={imageRefs.destroyedItemIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.pickupBuffIndicate}
        className="hidden playerImgs"
        ref={imageRefs.pickupBuffIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.pickupDebuffIndicate}
        className="hidden playerImgs"
        ref={imageRefs.pickupDebuffIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.pickupWeaponIndicate}
        className="hidden playerImgs"
        ref={imageRefs.pickupWeaponIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.dropWeaponIndicate}
        className="hidden playerImgs"
        ref={imageRefs.dropWeaponIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.dropArmorIndicate}
        className="hidden playerImgs"
        ref={imageRefs.dropArmorIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.pickupArmorIndicate}
        className="hidden playerImgs"
        ref={imageRefs.pickupArmorIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.pickupAmmoIndicate}
        className="hidden playerImgs"
        ref={imageRefs.pickupAmmoIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.terrainSpeedupIndicate}
        className="hidden playerImgs"
        ref={imageRefs.terrainSpeedupIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.terrainSlowdownIndicate}
        className="hidden playerImgs"
        ref={imageRefs.terrainSlowdownIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.terrainInjuredIndicate}
        className="hidden playerImgs"
        ref={imageRefs.terrainInjuredIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.outOfStaminaIndicate}
        className="hidden playerImgs"
        ref={imageRefs.outOfStaminaIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.boltKilledIndicate}
        className="hidden playerImgs"
        ref={imageRefs.boltKilledIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.attackParriedIndicate}
        className="hidden playerImgs"
        ref={imageRefs.attackParriedIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.inventoryFullIndicate}
        className="hidden playerImgs"
        ref={imageRefs.inventoryFullIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.outOfAmmoIndicate}
        className="hidden playerImgs"
        ref={imageRefs.outOfAmmoIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.missedIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.missedIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.prePushIndicate}
        className="hidden playerImgs"
        ref={imageRefs.prePushIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.canPushIndicate}
        className="hidden playerImgs"
        ref={imageRefs.canPushIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.noPushingIndicate}
        className="hidden playerImgs"
        ref={imageRefs.noPushingIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.pushingIndicate}
        className="hidden playerImgs"
        ref={imageRefs.pushingIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.prePullIndicate}
        className="hidden playerImgs"
        ref={imageRefs.prePullIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.canPullIndicate}
        className="hidden playerImgs"
        ref={imageRefs.canPullIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.noPullingIndicate}
        className="hidden playerImgs"
        ref={imageRefs.noPullingIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.pullingIndicate}
        className="hidden playerImgs"
        ref={imageRefs.pullingIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.pushedPulledIndicate}
        className="hidden playerImgs"
        ref={imageRefs.pushedPulledIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.unbreakableIndicate}
        className="hidden playerImgs"
        ref={imageRefs.unbreakableIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.dodgeIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.dodgeIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.attackFeintIndicate}
        className="hidden playerImgs"
        ref={imageRefs.attackFeintIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.attackFeintIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.attackFeintIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.attackFeintIndicate3}
        className="hidden playerImgs"
        ref={imageRefs.attackFeintIndicate3Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.defendFeintIndicate}
        className="hidden playerImgs"
        ref={imageRefs.defendFeintIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.defendFeintIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.defendFeintIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.defendFeintIndicate3}
        className="hidden playerImgs"
        ref={imageRefs.defendFeintIndicate3Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.dodgeFeintIndicate}
        className="hidden playerImgs"
        ref={imageRefs.dodgeFeintIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.dodgeFeintIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.dodgeFeintIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.boltDefendIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.boltDefendIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.flankIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.flankIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.noFlankIndicate}
        className="hidden playerImgs"
        ref={imageRefs.noFlankIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.cellVoidingIndicate}
        className="hidden playerImgs"
        ref={imageRefs.cellVoidingIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.cellVoidingIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.cellVoidingIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.timerIndicate}
        className="hidden playerImgs"
        ref={imageRefs.timerIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.chargeIndicate}
        className="hidden playerImgs"
        ref={imageRefs.chargeIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.noDirectionIndicate}
        className="hidden playerImgs"
        ref={imageRefs.noDirectionIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.noDirectionIndicate2}
        className="hidden playerImgs"
        ref={imageRefs.noDirectionIndicate2Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.noDirectionIndicate3}
        className="hidden playerImgs"
        ref={imageRefs.noDirectionIndicate3Ref}
        alt="logo"
        />
        <img
        src={indicators_assets.northDirectionIndicate}
        className="hidden playerImgs"
        ref={imageRefs.northDirectionIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.southDirectionIndicate}
        className="hidden playerImgs"
        ref={imageRefs.southDirectionIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.eastDirectionIndicate}
        className="hidden playerImgs"
        ref={imageRefs.eastDirectionIndicateRef}
        alt="logo"
        />
        <img
        src={indicators_assets.westDirectionIndicate}
        className="hidden playerImgs"
        ref={imageRefs.westDirectionIndicateRef}
        alt="logo"
        />

        <img
        src={items_assets.sword}
        className="hidden playerImgs"
        ref={imageRefs.itemSwordRef}
        alt="logo"
        />
        <img
        src={items_assets.spear}
        className="hidden playerImgs"
        ref={imageRefs.itemSpearRef}
        alt="logo"
        />
        <img src={items_assets.bow} className="hidden playerImgs" ref={imageRefs.itemBowRef} alt="logo" />
        <img
        src={items_assets.crossbow}
        className="hidden playerImgs"
        ref={imageRefs.itemCrossbowRef}
        alt="logo"
        />
        <img
        src={items_assets.boltNorth}
        className="hidden playerImgs"
        ref={imageRefs.itemBoltNorthRef}
        alt="logo"
        />
        <img
        src={items_assets.boltSouth}
        className="hidden playerImgs"
        ref={imageRefs.itemBoltSouthRef}
        alt="logo"
        />
        <img
        src={items_assets.boltEast}
        className="hidden playerImgs"
        ref={imageRefs.itemBoltEastRef}
        alt="logo"
        />
        <img
        src={items_assets.boltWest}
        className="hidden playerImgs"
        ref={imageRefs.itemBoltWestRef}
        alt="logo"
        />
        <img
        src={items_assets.ammo}
        className="hidden playerImgs"
        ref={imageRefs.itemAmmoRef}
        alt="logo"
        />
        <img
        src={items_assets.mail1}
        className="hidden playerImgs"
        ref={imageRefs.itemMail1Ref}
        alt="logo"
        />
        <img
        src={items_assets.mail2}
        className="hidden playerImgs"
        ref={imageRefs.itemMail2Ref}
        alt="logo"
        />
        <img
        src={items_assets.mail3}
        className="hidden playerImgs"
        ref={imageRefs.itemMail3Ref}
        alt="logo"
        />
        <img
        src={items_assets.greaves1}
        className="hidden playerImgs"
        ref={imageRefs.itemGreaves1Ref}
        alt="logo"
        />

        <img
        src={items_assets.greaves2}
        className="hidden playerImgs"
        ref={imageRefs.itemGreaves2Ref}
        alt="logo"
        />
        <img
        src={items_assets.greaves3}
        className="hidden playerImgs"
        ref={imageRefs.itemGreaves3Ref}
        alt="logo"
        />
        <img
        src={items_assets.helmet1}
        className="hidden playerImgs"
        ref={imageRefs.itemHelmet1Ref}
        alt="logo"
        />
        <img
        src={items_assets.hpUp}
        className="hidden playerImgs"
        ref={imageRefs.itemHpUpRef}
        alt="logo"
        />
        <img
        src={items_assets.hpDown}
        className="hidden playerImgs"
        ref={imageRefs.itemHpDownRef}
        alt="logo"
        />
        <img
        src={items_assets.spdUp}
        className="hidden playerImgs"
        ref={imageRefs.itemSpdUpRef}
        alt="logo"
        />
        <img
        src={items_assets.spdDown}
        className="hidden playerImgs"
        ref={imageRefs.itemSpdDownRef}
        alt="logo"
        />
        <img
        src={items_assets.strUp}
        className="hidden playerImgs"
        ref={imageRefs.itemStrUpRef}
        alt="logo"
        />
        <img
        src={items_assets.strDown}
        className="hidden playerImgs"
        ref={imageRefs.itemStrDownRef}
        alt="logo"
        />
        <img
        src={items_assets.focusUp}
        className="hidden playerImgs"
        ref={imageRefs.itemFocusUpRef}
        alt="logo"
        />
        <img
        src={items_assets.focusDown}
        className="hidden playerImgs"
        ref={imageRefs.itemFocusDownRef}
        alt="logo"
        />

        <img
        src={playerSprites_assets.playerImgIdleSheet}
        className="hidden playerImgs"
        ref={imageRefs.playerImgIdleSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.player2ImgIdleSheet}
        className="hidden playerImgs"
        ref={imageRefs.player2ImgIdleSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.playerComAImgIdleSheet}
        className="hidden playerImgs"
        ref={imageRefs.playerComAImgIdleSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.playerComBImgIdleSheet}
        className="hidden playerImgs"
        ref={imageRefs.playerComBImgIdleSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.playerImgMoveSheet}
        className="hidden playerImgs"
        ref={imageRefs.playerImgMoveSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.player2ImgMoveSheet}
        className="hidden playerImgs"
        ref={imageRefs.player2ImgMoveSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.comAImgMoveSheet}
        className="hidden playerImgs"
        ref={imageRefs.comAImgMoveSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.comBImgMoveSheet}
        className="hidden playerImgs"
        ref={imageRefs.comBImgMoveSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.player1DefendSheet}
        className="hidden playerImgs"
        ref={imageRefs.player1ImgDefendSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.player2DefendSheet}
        className="hidden playerImgs"
        ref={imageRefs.player2ImgDefendSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.comADefendSheet}
        className="hidden playerImgs"
        ref={imageRefs.comAImgDefendSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.comBDefendSheet}
        className="hidden playerImgs"
        ref={imageRefs.comBImgDefendSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.player1AttackSheet}
        className="hidden playerImgs"
        ref={imageRefs.player1ImgAttackSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.player2AttackSheet}
        className="hidden playerImgs"
        ref={imageRefs.player2ImgAttackSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.comAAttackSheet}
        className="hidden playerImgs"
        ref={imageRefs.comAImgAttackSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.comBAttackSheet}
        className="hidden playerImgs"
        ref={imageRefs.comBImgAttackSheetRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.testSpriteNorth}
        className="hidden playerImgs"
        ref={imageRefs.testRefNorth}
        alt="logo"
        />
        <img
        src={playerSprites_assets.testSpriteSouth}
        className="hidden playerImgs"
        ref={imageRefs.testRefSouth}
        alt="logo"
        />
        <img
        src={playerSprites_assets.testSpriteEast}
        className="hidden playerImgs"
        ref={imageRefs.testRefEast}
        alt="logo"
        />
        <img
        src={playerSprites_assets.testSpriteWest}
        className="hidden playerImgs"
        ref={imageRefs.testRefWest}
        alt="logo"
        />
        <img
        src={playerSprites_assets.moveSheetNew}
        className="hidden playerImgs"
        ref={imageRefs.moveSheetNewRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.idleSheetNew}
        className="hidden playerImgs"
        ref={imageRefs.idleSheetNewRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.idleSheetNew2}
        className="hidden playerImgs"
        ref={imageRefs.idleSheetNew2Ref}
        alt="logo"
        />
        <img
        src={playerSprites_assets.attackSheetNew}
        className="hidden playerImgs"
        ref={imageRefs.attackSheetNewRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.defendSheetNew}
        className="hidden playerImgs"
        ref={imageRefs.defendSheetNewRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.dodgeSheetNew}
        className="hidden playerImgs"
        ref={imageRefs.dodgeSheetNewRef}
        alt="logo"
        />
        <img
        src={playerSprites_assets.deflectedFallingSheetNew}
        className="hidden playerImgs"
        ref={imageRefs.deflectedFallingSheetNewRef}
        alt="logo"
        />
    </>
  );
}