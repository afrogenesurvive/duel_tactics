import React, { Component, createRef } from "react";
import Easystar from "easystarjs";
import Pathfinding from "pathfinding";
// import { AStarFinder } from "astar-typescript";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCogs,
  faRobot,
  faVideo,
  faSearchPlus,
  faExpandAlt,
  faUndo,
  faQuestionCircle,
  faBorderAll,
  faChessBoard,
  faExclamationTriangle,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";

import bgCompass from "./assets/bgCompass.png";

import "./App.css";

// COMPONENTS
import DebugBox from "./utils/components/debugBox";
import DebugMenu from "./utils/components/debugMenu";
import Settings from "./utils/components/settings";
import CellInfo from "./utils/components/cellInfo";
import Loading from "./utils/components/loading";
import AiStatus from "./utils/components/aiStatus";
import CameraControl from "./utils/components/cameraControl";

// IMAGES_GRAPHICS
import { initialState, applyConstructorDefaults } from "./data/appState";
import { ImagePreloader } from "./engine/imagePreloader";
import { ImageRefs, images } from "./engine/imageResources";

// ENGINE
import { gameLoop } from "./engine/gameLoop";

import { drawGridInit } from "./engine/drawGridInit";
import { startProcessLevelData } from "./engine/startProcessLevelData";
import { processLevelData } from "./engine/processLevelData";

import { playerUpdate } from "./engine/playerUpdate";
import { drawPlayerStep } from "./engine/drawPlayerStep";

import { gameReset } from "./engine/gameReset";

// INPUT
import { addListeners } from "./utils/functions/input/addListeners";
import { pollGamepads } from "./utils/functions/input/pollGamepads";
import { handleKeyPress } from "./utils/functions/input/handleKeyPress_";
import { handleGamepadEvent } from "./utils/functions/input/handleGamepadEvent";
import { getCanvasClick } from "./utils/functions/input/getCanvasClick";
import { getSettingsCanvasClick } from "./utils/functions/input/getSettingsCanvasClick";

// UI
import { setBackgroundImage } from "./utils/functions/stage/setBackgroundImage";
import { expandDebugBox } from "./utils/functions/input/expandDebugBox";
import { minimizeDebugBox } from "./utils/functions/input/minimizeDebugBox";
import { openSettings } from "./utils/functions/settings/openSettings";
import { cancelSettings } from "./utils/functions/settings/cancelSettings";
import { toggleDebugMenu } from "./utils/functions/misc/toggleDebugMenu";

// SETTINGS
import { loadSettings } from "./utils/functions/settings/loadSettings";
import { loadAiSettings } from "./utils/functions/settings/loadAiSettings";

import { updateSettingsFormPlayerData } from "./utils/functions/settings/updateSettingsFormPlayerData";
import { updateSettingsFormAiData } from "./utils/functions/settings/updateSettingsFormAiData";
import { updateSettingsCanvasData } from "./utils/functions/settings/updateSettingsCanvasData";
import { settingsFormGridWidthUpdate } from "./utils/functions/settings/settingsFormGridWidthUpdate";
import { redrawSettingsGrid } from "./utils/functions/settings/redrawSettingsGrid";
import { getCustomPlyrStartPosList } from "./utils/functions/settings/getCustomPlyrStartPosList";
import { getCustomAiStartPosList } from "./utils/functions/settings/getCustomAiStartPosList";

import { setCellInfoMouseOver } from "./utils/functions/stage/setCellInfoMouseOver";
import { closeCellInfoBox } from "./utils/functions/stage/closeCellInfoBox";
import { plyrStartPosCheckCell } from "./utils/functions/stage/plyrStartPosCheckCell";
import { findFocusCell } from "./utils/functions/stage/findFocusCell";
import { getIntermediateCellByArea } from "./utils/functions/stage/getIntermediateCellByArea";

import { globalLogger } from "./utils/functions/misc/globalLogger";

// CAMERA
import { closeCamera } from "./utils/functions/camera/closeCamera";
import { menuToggleCamera } from "./utils/functions/camera/menuToggleCamera";
import { preResetCamera } from "./utils/functions/camera/preResetCamera";
import { setAutoCamera } from "./utils/functions/camera/setAutoCamera";
import { setCameraFocus } from "./utils/functions/camera/setCameraFocus";
import { setZoomPan } from "./utils/functions/camera/setZoomPan";
import { toggleCameraCustomView } from "./utils/functions/camera/toggleCameraCustomView";
import { toggleCameraModeUI } from "./utils/functions/camera/toggleCameraModeUI";

// GEOMETRY
import { cartesianToIsometric } from "./utils/functions/geometry/cartesianToIsometric";
import { lineCrementer } from "./utils/functions/geometry/lineCrementer";
import { boltCrementer } from "./utils/functions/geometry/boltCrementer";
import { directionalActionAnimLineCrementer } from "./utils/functions/geometry/directionalActionAnimLineCrementer";
import { circleArcCrementer } from "./utils/functions/geometry/circleArcCrementer";
import { arcBoltCrementer } from "./utils/functions/geometry/arcBoltCrementer";
import { obstacleMoveCrementer } from "./utils/functions/geometry/obstacleMoveCrementer";
import { drawPopupBubble } from "./utils/functions/geometry/drawPopupBubble";
import { popupDrawCalc } from "./utils/functions/geometry/popupDrawCalc";
import { playerPopupProgressCalc } from "./utils/functions/geometry/playerPopupProgressCalc";
import { cellPopupProgressCalc } from "./utils/functions/geometry/cellPopupProgressCalc";

import { setElasticCounter } from "./utils/functions/geometry/setElasticCounter";
import { calcElasticCountCoords } from "./utils/functions/geometry/calcElasticCountCoords";

// MISC
import { rnJesus } from "./utils/functions/misc/rnJesus";
import { pointChecker } from "./utils/functions/misc/pointChecker";

// NAVIGATION
import { getTarget } from "./utils/functions/navigation/getTarget";
import { resetTarget } from "./utils/functions/navigation/resetTarget";
import { getBoltTarget } from "./utils/functions/navigation/getBoltTarget";
import { aiBoltPathCheck } from "./utils/functions/navigation/aiBoltPathCheck";
import { checkCell } from "./utils/functions/navigation/checkCell";
import { checkDestination } from "./utils/functions/navigation/checkDestination";
import { checkForwardBarrier } from "./utils/functions/navigation/checkForwardBarrier";
import { checkMyCellBarrier } from "./utils/functions/navigation/checkMyCellBarrier";
import { getCellFromDirection } from "./utils/functions/navigation/getCellFromDirection";
import { getDirectionFromCells } from "./utils/functions/navigation/getDirectionFromCells";
import { getOppositeDirection } from "./utils/functions/navigation/getOppositeDirection";
import { getRandomFreeCell } from "./utils/functions/navigation/getRandomFreeCell";
import { getSurroundingCells } from "./utils/functions/navigation/getSurroundingCells";
import { getVoidCenter } from "./utils/functions/navigation/getVoidCenter";
import { isBoltInCell } from "./utils/functions/navigation/isBoltInCell";
import { obstacleCheckDestination } from "./utils/functions/navigation/obstacleCheckDestination";
import { jumpCollisionCheck } from "./utils/functions/navigation/jumpCollisionCheck";
import { obstaclePlayerOverlap } from "./utils/functions/navigation/obstaclePlayerOverlap";
import { projectileTracker } from "./utils/functions/navigation/projectileTracker";
import { isSameAxisDirection } from "./utils/functions/navigation/isSameAxisDirection";

// STAGE
import { customCellToVoid } from "./utils/functions/stage/customCellToVoid";
import { voidSummon } from "./utils/functions/stage/voidSummon";
import { obstacleBarrierTrapChecker } from "./utils/functions/stage/obstacleBarrierTrapChecker";
import { obstacleBarrierTrapInitSet } from "./utils/functions/stage/obstacleBarrierTrapInitSet";
import { customObstacleBarrierTrapSet } from "./utils/functions/stage/customObstacleBarrierTrapSet";

// COMBAT_ACTION
import { projectileCreator, projectileTester } from "./utils/functions/combat_action/projectileCreatorTester";

import { checkSetAttackDefendDirectionalInput } from "./utils/functions/combat_action/checkSetAttackDefendDirectionalInput";
import { handleDirectionalActionAnimation } from "./utils/functions/combat_action/handleDirectionalActionAnimation";

import { meleeAttackPeak } from "./utils/functions/combat_action/meleeAttackPeak";
import { meleeAttackParse } from "./utils/functions/combat_action/meleeAttackParse";
import { projectileAttackParse } from "./utils/functions/combat_action/projectileAttackParse";
import { setDeflection } from "./utils/functions/combat_action/setDeflection";
import { unsetDeflection } from "./utils/functions/combat_action/unsetDeflection";
import { handleMeleeDamage } from "./utils/functions/combat_action/handleMeleeDamage";
import { handleProjectileDamage } from "./utils/functions/combat_action/handleProjectileDamage";
import { handleMiscPlayerDamage } from "./utils/functions/combat_action/handleMiscPlayerDamage";
import { checkCombatAdvantage } from "./utils/functions/combat_action/checkCombatAdvantage";
import { attackedCancel } from "./utils/functions/combat_action/attackedCancel";
import { trapActionCancel } from "./utils/functions/combat_action/trapActionCancel";
import { attackChargeCancel } from "./utils/functions/combat_action/attackChargeCancel";

// NON_COMBAT_ACTION
import { pushBack } from "./utils/functions/non_combat_action/pushBack";
import { startHalfPushBack } from "./utils/functions/non_combat_action/startHalfPushBack";
import { handleHalfPushBackResult } from "./utils/functions/non_combat_action/handleHalfPushBackResult";

import { deflectDrop } from "./utils/functions/non_combat_action/deflectDrop";
import { discardGear } from "./utils/functions/non_combat_action/discardGear";
import { attackCellContents } from "./utils/functions/non_combat_action/attackCellContents";
import { preObstaclePushCheck } from "./utils/functions/non_combat_action/preObstaclePushCheck";
import { canPushObstacle } from "./utils/functions/non_combat_action/canPushObstacle";
import { prePlayerPushCheck } from "./utils/functions/non_combat_action/prePlayerPushCheck";
import { canPushPlayer } from "./utils/functions/non_combat_action/canPushPlayer";
import { preObstaclePullCheck } from "./utils/functions/non_combat_action/preObstaclePullCheck";
import { canPullObstacle } from "./utils/functions/non_combat_action/canPullObstacle";
import { prePlayerPullCheck } from "./utils/functions/non_combat_action/prePlayerPullCheck";
import { canPullPlayer } from "./utils/functions/non_combat_action/canPullPlayer";
import { respawn } from "./utils/functions/misc/respawn";
import { killPlayer } from "./utils/functions/misc/killPlayer";

// ITEMS
import { placeItems } from "./utils/functions/items/placeItems";
import { obstacleItemDrop } from "./utils/functions/items/obstacleItemDrop";
import { applyRemoveEffect } from "./utils/functions/items/applyRemoveEffect";

// AI
import { addAiPlayer } from "./utils/functions/ai/addAiPlayer";
import { addAiRandomPlayer } from "./utils/functions/ai/addAiRandomPlayer";
import { removeAiPlayer } from "./utils/functions/ai/removeAiPlayer";
import { toggleAiDisplay } from "./utils/functions/ai/toggleAiDisplay";
import { scanTargetAreaThreat } from "./utils/functions/ai/scanTargetAreaThreat";
import { safeDistanceRetreat } from "./utils/functions/ai/safeDistanceRetreat";
import { aiResetRanges } from "./utils/functions/ai/aiResetRanges";
import { aiEvaluate } from "./utils/functions/ai/aiEvaluate";
import { aiDecide } from "./utils/functions/ai/aiDecide";
import { aiParsePath } from "./utils/functions/ai/aiParsePath";
import { aiAct } from "./utils/functions/ai/aiAct";
import { updatePathArray } from "./utils/functions/ai/updatePathArray";

class App extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);

    applyConstructorDefaults(this);

    // ENGINE
    this.gameLoop = () => gameLoop(this);

    this.drawGridInit = (...args) => drawGridInit(this, ...args);
    this.startProcessLevelData = (...args) => startProcessLevelData(this, ...args);
    this.processLevelData = (...args) => processLevelData(this, ...args);

    this.playerUpdate = (...args) => playerUpdate(this, ...args);
    this.drawPlayerStep = (...args) => drawPlayerStep(this, ...args);

    this.gameReset = (...args) => gameReset(this, ...args);

    // INPUT
    this.addListeners = (...args) => addListeners(this, ...args);
    this.pollGamepads = (...args) => pollGamepads(this, ...args);
    this.handleKeyPress = (...args) => handleKeyPress(this, ...args);
    this.handleGamepadEvent = (...args) => handleGamepadEvent(this, ...args);

    this.getCanvasClick = (...args) => getCanvasClick(this, ...args);
    this.getSettingsCanvasClick = (...args) => getSettingsCanvasClick(this, ...args);

    // UI
    this.setBackgroundImage = (...args) => setBackgroundImage(this, ...args);
    this.expandDebugBox = (...args) => expandDebugBox(this, ...args);
    this.minimizeDebugBox = (...args) => minimizeDebugBox(this, ...args);
    this.openSettings = (...args) => openSettings(this, ...args);
    this.cancelSettings = (...args) => cancelSettings(this, ...args);
    this.toggleDebugMenu = (...args) => toggleDebugMenu(this, ...args);

    // SETTINGS
    this.loadSettings = (...args) => loadSettings(this, ...args);
    this.loadAiSettings = (...args) => loadAiSettings(this, ...args);
    this.updateSettingsFormPlayerData = (...args) => updateSettingsFormPlayerData(this, ...args);
    this.updateSettingsFormAiData = (...args) => updateSettingsFormAiData(this, ...args);
    this.updateSettingsCanvasData = (...args) => updateSettingsCanvasData(this, ...args);
    this.settingsFormGridWidthUpdate = (...args) => settingsFormGridWidthUpdate(this, ...args);
    this.redrawSettingsGrid = (...args) => redrawSettingsGrid(this, ...args);
    this.getCustomPlyrStartPosList = (...args) => getCustomPlyrStartPosList(this, ...args);
    this.getCustomAiStartPosList = (...args) => getCustomAiStartPosList(this, ...args);

    this.setCellInfoMouseOver = (...args) => setCellInfoMouseOver(this, ...args);
    this.closeCellInfoBox = (...args) => closeCellInfoBox(this, ...args);
    this.plyrStartPosCheckCell = (...args) => plyrStartPosCheckCell(this, ...args);
    this.findFocusCell = (...args) => findFocusCell(this, ...args);
    this.getIntermediateCellByArea = (...args) => getIntermediateCellByArea(this, ...args);
    this.globalLogger = (...args) => globalLogger(this, ...args);

    // CAMERA
    this.closeCamera = (...args) => closeCamera(this, ...args);
    this.menuToggleCamera = (...args) => menuToggleCamera(this, ...args);
    this.preResetCamera = (...args) => preResetCamera(this, ...args);
    this.setAutoCamera = (...args) => setAutoCamera(this, ...args);
    this.setCameraFocus = (...args) => setCameraFocus(this, ...args);
    this.setZoomPan = (...args) => setZoomPan(this, ...args);
    this.toggleCameraCustomView = (...args) => toggleCameraCustomView(this, ...args);
    this.toggleCameraModeUI = (...args) => toggleCameraModeUI(this, ...args);

    // GEOMENTRY
    this.cartesianToIsometric = (...args) => cartesianToIsometric(this, ...args);
    this.lineCrementer = (...args) => lineCrementer(this, ...args);
    this.boltCrementer = (...args) => boltCrementer(this, ...args);
    this.directionalActionAnimLineCrementer = (...args) => directionalActionAnimLineCrementer(this, ...args);
    this.circleArcCrementer = (...args) => circleArcCrementer(this, ...args);
    this.arcBoltCrementer = (...args) => arcBoltCrementer(this, ...args);
    this.obstacleMoveCrementer = (...args) => obstacleMoveCrementer(this, ...args);
    this.drawPopupBubble = (...args) => drawPopupBubble(this, ...args);
    this.popupDrawCalc = (...args) => popupDrawCalc(this, ...args);
    this.playerPopupProgressCalc = (...args) => playerPopupProgressCalc(this, ...args);
    this.cellPopupProgressCalc = (...args) => cellPopupProgressCalc(this, ...args);
    this.setElasticCounter = (...args) => setElasticCounter(this, ...args);
    this.calcElasticCountCoords = (...args) => calcElasticCountCoords(this, ...args);

    // MISC
    this.rnJesus = (...args) => rnJesus(this, ...args);
    this.pointChecker = (...args) => pointChecker(this, ...args);

    // NAVIGATION
    this.getTarget = (...args) => getTarget(this, ...args);
    this.resetTarget = (...args) => resetTarget(this, ...args);
    this.getBoltTarget = (...args) => getBoltTarget(this, ...args);
    this.aiBoltPathCheck = (...args) => aiBoltPathCheck(this, ...args);
    this.checkCell = (...args) => checkCell(this, ...args);
    this.checkDestination = (...args) => checkDestination(this, ...args);
    this.checkForwardBarrier = (...args) => checkForwardBarrier(this, ...args);
    this.checkMyCellBarrier = (...args) => checkMyCellBarrier(this, ...args);
    this.getCellFromDirection = (...args) => getCellFromDirection(this, ...args);
    this.getDirectionFromCells = (...args) => getDirectionFromCells(this, ...args);
    this.getOppositeDirection = (...args) => getOppositeDirection(this, ...args);
    this.getRandomFreeCell = (...args) => getRandomFreeCell(this, ...args);
    this.getSurroundingCells = (...args) => getSurroundingCells(this, ...args);
    this.getVoidCenter = (...args) => getVoidCenter(this, ...args);
    this.isBoltInCell = (...args) => isBoltInCell(this, ...args);
    this.obstacleCheckDestination = (...args) => obstacleCheckDestination(this, ...args);
    this.projectileTracker = (...args) => projectileTracker(this, ...args);
    this.jumpCollisionCheck = (...args) => jumpCollisionCheck(this, ...args);
    this.obstaclePlayerOverlap = (...args) => obstaclePlayerOverlap(this, ...args);
    this.isSameAxisDirection = (...args) => isSameAxisDirection(this, ...args);

    // STAGE
    this.customCellToVoid = (...args) => customCellToVoid(this, ...args);
    this.voidSummon = (...args) => voidSummon(this, ...args);
    this.obstacleBarrierTrapChecker = (...args) => obstacleBarrierTrapChecker(this, ...args);
    this.obstacleBarrierTrapInitSet = (...args) => obstacleBarrierTrapInitSet(this, ...args);
    this.customObstacleBarrierTrapSet = (...args) => customObstacleBarrierTrapSet(this, ...args);

    // COMBAT_ACTION
    this.projectileCreator = (...args) => projectileCreator(this, ...args);
    this.projectileTester = (...args) => projectileTester(this, ...args);
    this.checkSetAttackDefendDirectionalInput = (...args) => checkSetAttackDefendDirectionalInput(this, ...args);
    this.handleDirectionalActionAnimation = (...args) => handleDirectionalActionAnimation(this, ...args);

    this.meleeAttackPeak = (...args) => meleeAttackPeak(this, ...args);
    this.meleeAttackParse = (...args) => meleeAttackParse(this, ...args);
    this.projectileAttackParse = (...args) => projectileAttackParse(this, ...args);
    this.setDeflection = (...args) => setDeflection(this, ...args);
    this.unsetDeflection = (...args) => unsetDeflection(this, ...args);
    this.handleMeleeDamage = (...args) => handleMeleeDamage(this, ...args);
    this.handleProjectileDamage = (...args) => handleProjectileDamage(this, ...args);
    this.handleMiscPlayerDamage = (...args) => handleMiscPlayerDamage(this, ...args);
    this.checkCombatAdvantage = (...args) => checkCombatAdvantage(this, ...args);
    this.attackedCancel = (...args) => attackedCancel(this, ...args);
    this.trapActionCancel = (...args) => trapActionCancel(this, ...args);
    this.attackChargeCancel = (...args) => attackChargeCancel(this, ...args);

    // NON_COMBAT_ACTION
    this.pushBack = (...args) => pushBack(this, ...args);
    this.startHalfPushBack = (...args) => startHalfPushBack(this, ...args);
    this.handleHalfPushBackResult = (...args) => handleHalfPushBackResult(this, ...args);

    this.deflectDrop = (...args) => deflectDrop(this, ...args);
    this.discardGear = (...args) => discardGear(this, ...args);
    this.attackCellContents = (...args) => attackCellContents(this, ...args);
    this.preObstaclePushCheck = (...args) => preObstaclePushCheck(this, ...args);
    this.canPushObstacle = (...args) => canPushObstacle(this, ...args);
    this.prePlayerPushCheck = (...args) => prePlayerPushCheck(this, ...args);
    this.canPushPlayer = (...args) => canPushPlayer(this, ...args);
    this.preObstaclePullCheck = (...args) => preObstaclePullCheck(this, ...args);
    this.canPullObstacle = (...args) => canPullObstacle(this, ...args);
    this.prePlayerPullCheck = (...args) => prePlayerPullCheck(this, ...args);
    this.canPullPlayer = (...args) => canPullPlayer(this, ...args);
    this.respawn = (...args) => respawn(this, ...args);
    this.killPlayer = (...args) => killPlayer(this, ...args);

    // ITEMS
    this.placeItems = (...args) => placeItems(this, ...args);
    this.obstacleItemDrop = (...args) => obstacleItemDrop(this, ...args);
    this.applyRemoveEffect = (...args) => applyRemoveEffect(this, ...args);

    // AI
    this.addAiPlayer = (...args) => addAiPlayer(this, ...args);
    this.addAiRandomPlayer = (...args) => addAiRandomPlayer(this, ...args);
    this.removeAiPlayer = (...args) => removeAiPlayer(this, ...args);
    this.toggleAiDisplay = (...args) => toggleAiDisplay(this, ...args);
    this.scanTargetAreaThreat = (...args) => scanTargetAreaThreat(this, ...args);
    this.safeDistanceRetreat = (...args) => safeDistanceRetreat(this, ...args);
    this.aiResetRanges = (...args) => aiResetRanges(this, ...args);
    this.aiEvaluate = (...args) => aiEvaluate(this, ...args);
    this.aiDecide = (...args) => aiDecide(this, ...args);
    this.aiParsePath = (...args) => aiParsePath(this, ...args);
    this.aiAct = (...args) => aiAct(this, ...args);
    this.updatePathArray = (...args) => updatePathArray(this, ...args);
  }

  componentDidMount() {
    console.log(`componentDidMount`);

    this.easyStar = new Easystar.js();

    if (window.innerWidth < 1100) {
      this.setState({
        containerInnerClass: "containerInnerSmall",
        sceneY: {
          three: 300,
          six: 200,
          nine: 120,
          twelve: 50,
        },
      });

      switch (this.gridWidth) {
        case 3:
          this.sceneY = 300;
          break;
        case 6:
          this.sceneY = 200;
          break;
        case 9:
          this.sceneY = 120;
          break;
        case 12:
          this.sceneY = 50;
          break;
      }

      this.canvasWidth = 1000;
      this.canvasHeight = 600;
    }

    let canvas = this.canvasRef.current;
    let context = canvas.getContext("2d");

    let canvas2 = this.canvasRef2.current;
    let context2 = canvas2.getContext("2d");

    this.setState({
      canvas: canvas,
      context: context,
      canvas2: canvas2,
      context2: context2,
    });

    const bootGame = () => {
      console.log(`booting game`);

      this.addListeners(canvas, canvas2);

      this.updateSettingsFormPlayerData({
        input: [
          { plyrNo: 1, input: "keyboard" },
          { plyrNo: 2, input: "keyboard" },
        ],
        weapon: [
          { plyrNo: 1, weapons: ["sword", "spear", "crossbow"] },
          { plyrNo: 2, weapons: ["sword", "spear", "crossbow"] },
        ],
        armor: [
          { plyrNo: 1, armor: [] },
          { plyrNo: 2, armor: [] },
        ],
        team: [
          { plyrNo: 1, team: "Red" },
          { plyrNo: 2, team: "Blue" },
        ],
      });
      this.drawGridInit(this.state.canvas, this.state.context, this.state.canvas2, this.state.context2);
      this.getCustomPlyrStartPosList([
        {
          plyrNo: 1,
          selected: undefined,
          posArray: [],
        },
        {
          plyrNo: 2,
          selected: undefined,
          posArray: [],
        },
      ]);

      window.requestAnimationFrame(this.gameLoop);
    };

    const deflectedSheet = this.deflectedFallingSheetNewRef.current;
    if (deflectedSheet?.complete) {
      bootGame();
    } else if (deflectedSheet) {
      deflectedSheet.onload = () => {
        deflectedSheet.onload = null;
        bootGame();
      };
    }
  }
  componentWillUnmount() {
    window.cancelAnimationFrame(this.stepper.currentTime);
  }

  render() {
    return (
      <>
        {this.state.loading === true && <Loading />}

        <div className="containerTop">
          <div className="timer">
            <p className="timerText">{this.time}</p>
            {this.cursorCoords.x && (
              <p className="timerText">
                Cursor: x {this.cursorCoords.x.toFixed(2)}, y {this.cursorCoords.y.toFixed(2)}
              </p>
            )}
          </div>

          <div className={this.state.containerInnerClass}>
            <canvas width={this.canvasWidth} height={this.canvasHeight} ref={this.canvasRef} className="canvas" />
            <canvas width={this.canvasWidth} height={this.canvasHeight} ref={this.canvasRef2} className="canvas2" />
            {/* // DEBUB BOX */}
            <div className={this.debugBoxStyle}>
              <DebugBox player={this.players[0]} expand={this.expandDebugBox} minimize={this.minimizeDebugBox} />
            </div>
            {this.players.length > 1 && (
              <div className={this.debugBoxStyle2}>
                <DebugBox player={this.players[1]} expand={this.expandDebugBox} minimize={this.minimizeDebugBox} />
              </div>
            )}
            {/* //BACKGROUND COMPASS */}
            <img src={bgCompass} className="bgCompass" ref={this.bgCompassRef} alt="logo" />
            {/* // SETTINGS BOX */}
            <div className="settingsSwitch">
              <a className="setSwitchLink" onClick={this.openSettings}>
                <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Popover id={`popover-positioned-${"top"}`}>
                      <Popover.Body>
                        <strong>Show Settings</strong>
                      </Popover.Body>
                    </Popover>
                  }>
                  <FontAwesomeIcon icon={faCogs} size="sm" className="setSwitchIcon" />
                </OverlayTrigger>
              </a>
              <a className={`setSwitchLink ${this.state.showDebugMenu === true ? "cameraModeHighlighted" : ""}`} onClick={this.toggleDebugMenu}>
                <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Popover id={`popover-positioned-${"top"}`}>
                      <Popover.Body>
                        <strong>Debug Log Menu</strong>
                      </Popover.Body>
                    </Popover>
                  }>
                  <FontAwesomeIcon icon={faExclamationTriangle} size="sm" className="setSwitchIcon" />
                </OverlayTrigger>
              </a>
              {this.aiPlayers[0] && (
                // {this.updateSettingsFormAiDataData.random &&(
                <a className="setSwitchLink cameraModeHighlighted" onClick={this.toggleAiDisplay}>
                  <OverlayTrigger
                    placement={"top"}
                    overlay={
                      <Popover id={`popover-positioned-${"top"}`}>
                        <Popover.Body>
                          <strong>Toggle Ai Sub-menu</strong>
                        </Popover.Body>
                      </Popover>
                    }>
                    <FontAwesomeIcon icon={faRobot} size="sm" className="setSwitchIcon" />
                  </OverlayTrigger>
                </a>
              )}
              {!this.aiPlayers[0] && (
                // {!this.updateSettingsFormAiDataData.random &&(
                <a className="setSwitchLink" onClick={this.toggleAiDisplay}>
                  <OverlayTrigger
                    placement={"top"}
                    overlay={
                      <Popover id={`popover-positioned-${"top"}`}>
                        <Popover.Body>
                          <strong>Toggle Ai Sub-menu</strong>
                        </Popover.Body>
                      </Popover>
                    }>
                    <FontAwesomeIcon icon={faRobot} size="sm" className="setSwitchIcon" />
                  </OverlayTrigger>
                </a>
              )}
              {this.camera.state === false && (
                <a className="setSwitchLink" onClick={this.menuToggleCamera}>
                  <OverlayTrigger
                    placement={"top"}
                    overlay={
                      <Popover id={`popover-positioned-${"top"}`}>
                        <Popover.Body>
                          {this.camera.customView.state !== true && <strong>Toggle Camera Sub-menu</strong>}
                          {this.camera.customView.state === true && <strong>Toggle Camera Sub-menu (Custom View is set)</strong>}
                        </Popover.Body>
                      </Popover>
                    }>
                    <div className="icon-container">
                      <FontAwesomeIcon icon={faVideo} size="sm" className="setSwitchIcon" />
                      {this.camera.customView.state === true && (
                        <FontAwesomeIcon icon={faCheckSquare} size="sm" className="setSwitchIcon top-right-icon" />
                      )}
                    </div>
                  </OverlayTrigger>
                </a>
              )}
              <a className="setSwitchLink" onClick={this.gameReset.bind(this, "soft")}>
                <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Popover id={`popover-positioned-${"top"}`}>
                      <Popover.Body>
                        <strong>Reset Game (w/ last settings)</strong>
                      </Popover.Body>
                    </Popover>
                  }>
                  <FontAwesomeIcon icon={faUndo} size="sm" className="setSwitchIcon" />
                </OverlayTrigger>
              </a>
            </div>
            {/* // CAMERA BOX */}
            {this.camera.state === true && (
              <div className="cameraBox">
                <CameraControl
                  camera={this.camera}
                  close={this.closeCamera}
                  toggleMode={this.toggleCameraModeUI}
                  preReset={this.preResetCamera}
                  toggleCustomView={this.toggleCameraCustomView}
                />
              </div>
            )}
            {/* // CELL INFO */}
            {this.showCellInfoBox !== true && (
              <div className="cellInfoSwitch">
                <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Popover id={`popover-positioned-${"top"}`}>
                      <Popover.Body>
                        <strong>Click or mouse over a cell to get more info</strong>
                      </Popover.Body>
                    </Popover>
                  }>
                  <FontAwesomeIcon icon={faChessBoard} size="sm" className="setSwitchIcon" />
                </OverlayTrigger>
              </div>
            )}
            {this.showCellInfoBox === true && (
              <CellInfo
                ref={this.cellInfoBoxRef}
                clicked={this.clicked}
                close={this.closeCellInfoBox}
                cellInfoMouseOver={this.cellInfoMouseOver}
                setCellInfoMouseOver={this.setCellInfoMouseOver}
                cursorCoords={this.cursorCoords}
              />
            )}
            {/* // AI STATUS BOX */}
            {this.state.showAiStatus === true && <AiStatus players={this.players} aiPlayers={this.aiPlayers} onAiAdd={this.addAiRandomPlayer} />}

            {/* // DEBUG/LOG BOX */}
            {this.state.showDebugMenu === true && (
              <DebugMenu loggingSettings={this.loggingSettings} updateLoggingSettings={this.toggleDebugMenu} onClose={this.toggleDebugMenu} />
            )}
          </div>
          {this.state.showSettings === true && (
            <Settings
              gridWidth={this.gridWidth}
              onConfirm={this.loadSettings}
              onCancel={this.cancelSettings}
              getCustomAiStartPosList={this.getCustomAiStartPosList}
              aiStartPosList={this.settingsFormAiStartPosList}
              aiSettingsFormHandler={this.aiSettingsFormHandler}
              updateSettingsFormAiDataData={this.updateSettingsFormAiDataData}
              updateSettingsFormAiData={this.updateSettingsFormAiData}
              rnJesus={this.rnJesus}
              settingsFormGridWidthUpdate={this.settingsFormGridWidthUpdate}
              plyrStartPosList={this.settingsFormPlyrStartPosList}
              getCustomPlyrStartPosList={this.getCustomPlyrStartPosList}
              gamepad={this.gamepad}
              canvasRef={this.canvasRef3}
              canvasRef2={this.canvasRef4}
              canvasHeight={this.settingsCanvasHeight}
              canvasWidth={this.settingsCanvasWidth}
              gridInfo={this.settingsGridInfo}
              clickedCell={this.settingsClicked}
              showCanvasData={this.showSettingsCanvasData}
              updateSettingsCanvasData={this.updateSettingsCanvasData}
              disableInitItems={this.disableInitItems}
              settingsFormPlayerData={this.settingsFormPlayerData}
              updateSettingsFormPlayerData={this.updateSettingsFormPlayerData}
            />
          )}

          <svg
            className="popupProgressSvg hidden"
            ref={this.popupProgressSvgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -0.5 30 30"
            shapeRendering="crispEdges">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path
              id="border"
              stroke="yellow"
              strokeWidth="5px"
              d="M4 0h21M2 1h26M1 2h2M27 2h2M1 3h1M28 3h1M1 4h1M28 4h2M0 5h2M28 5h2M0 6h2M28 6h2M0 7h2M28 7h2M0 8h2M28 8h2M0 9h2M28 9h2M0 10h2M28 10h2M0 11h2M28 11h2M0 12h2M28 12h2M0 13h2M28 13h2M0 14h2M28 14h2M0 15h2M28 15h2M0 16h2M28 16h2M0 17h2M28 17h2M0 18h2M28 18h2M0 19h2M28 19h2M0 20h2M28 20h2M0 21h2M28 21h2M0 22h2M28 22h2M0 23h2M28 23h2M0 24h2M28 24h2M0 25h2M28 25h1M1 26h1M28 26h1M1 27h2M27 27h2M2 28h26M5 29h21"
            />
            <rect id="rect" x="1" y="1" rx="5" ry="5" width="95%" height="0%" fill="url(#grad)" />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={this.popupProgressSvgGradColor1} stopOpacity="100%" />
                <stop offset="100%" stopColor={this.popupProgressSvgGradColor2} stopOpacity="100%" />
              </linearGradient>
            </defs>
          </svg>
          <img src="" className="hidden" height={this.popupImgSize} width={this.popupImgSize} ref={this.popupProgressImgRef} alt="logo" />

          <ImagePreloader refsSource={this} />
        </div>
      </>
    );
  }
}

export default App;
