import React, { 
  useContext, 
  useRef, 
  useEffect,
 } from "react";
import { GameContext } from "../gameContext";
import { imageRefs } from "../imageRefs";


const ProcessLevelData = () => {
  const { context, setState, cartesianToIsometric} = useContext(GameContext);

  console.log("ProcessLevelData: game context", context.state);
  

    useEffect(() => {

      if (!context.state.canvas || !context.state.canvasContext) return;

      console.log("ProcessLevelData: useEffect triggered");


      let obstacleCount = 0;
      let barrierCount = 0;
      // let temp;
      let trap;
      let barrierDir;
      for (let elem of allCells) {
        // APPLY LEVEL DATA TO GRID INFO CELLS!
        let levelData2Row = "row" + elem.number.x;
        let elemLevelData =
          this["levelData" + this.gridWidth][levelData2Row][elem.number.y];

        if (
          (elemLevelData.split("_")[1] !== "*" &&
            this.terrainLevelDataRef[elemLevelData.split("_")[3]].type === "deep") ||
          (elemLevelData.split("_")[1] !== "*" &&
            this.terrainLevelDataRef[elemLevelData.split("_")[3]].type === "void")
        ) {
          elemLevelData = elemLevelData.replaceAt(3, "*");
        }
        elem.levelData = elemLevelData;
        // console.log('level data processing',elem.levelData);

        // '**_*_0.0_a_0**'
        // barrierType(a,b,c)BarrierPosition(n,s,e,w)_obstacle_x.y_terrain_elevationNumber(0,1,2)ElevationType(a,b,c)ElevationPosition(n,s,e,w)

        elem.terrain = this.terrainLevelDataRef[elem.levelData.split("_")[3]];
        if (elem.terrain.name === "void") {
          elem.void.state = true;
        }

        elem.elevation.number = parseInt(elem.levelData.split("_")[4].charAt(0));
        if (elem.levelData.split("_")[4].charAt(1) !== "*") {
          elem.elevation.type =
            this.elevationTypeLevelDataRef[elem.levelData.split("_")[4].charAt(1)];
        }

        if (elem.levelData.split("_")[4].charAt(1) !== "*") {
          switch (elem.levelData.split("_")[4].charAt(2)) {
            case "n":
              elem.elevation = {
                number: elem.elevation.number,
                type: elem.elevation.type,
                position: "north",
              };
              break;
            case "s":
              elem.elevation = {
                number: elem.elevation.number,
                type: elem.elevation.type,
                position: "south",
              };
              break;
            case "e":
              elem.elevation = {
                number: elem.elevation.number,
                type: elem.elevation.type,
                position: "east",
              };
              break;
            case "w":
              elem.elevation = {
                number: elem.elevation.number,
                type: elem.elevation.type,
                position: "west",
              };
              break;
            default:
              break;
          }
        }

        // OBSTACLE
        if (elem.levelData.split("_")[1] !== "*") {
          elem.obstacle = JSON.parse(
            JSON.stringify(this.obstacleLevelDataRef[elem.levelData.split("_")[1]])
          );
          elem.obstacle.id = obstacleCount;
          elem.obstacle.moving.origin = {
            number: elem.number,
            center: elem.center,
          };
          elem.obstacle.trap = this.obstacleBarrierTrapInitSet("main", "obstacle", elem);
          obstacleCount++;
        }

        // BARRIER
        if (elem.levelData.split("_")[0] !== "**") {
          elem.barrier = JSON.parse(
            JSON.stringify(this.barrierLevelDataRef[elem.levelData.split("_")[0].charAt(0)])
          );
          elem.barrier.id = barrierCount;
          switch (elem.levelData.split("_")[0].charAt(1)) {
            case "n":
              elem.barrier = {
                id: elem.barrier.id,
                trap: elem.barrier.trap,
                state: elem.barrier.state,
                name: elem.barrier.name,
                type: elem.barrier.type,
                hp: elem.barrier.hp,
                destructible: elem.barrier.destructible,
                locked: elem.barrier.locked,
                position: "north",
                height: elem.barrier.height,
              };
              break;
            case "s":
              elem.barrier = {
                id: elem.barrier.id,
                trap: elem.barrier.trap,
                state: elem.barrier.state,
                name: elem.barrier.name,
                type: elem.barrier.type,
                hp: elem.barrier.hp,
                destructible: elem.barrier.destructible,
                locked: elem.barrier.locked,
                position: "south",
                height: elem.barrier.height,
              };
              break;
            case "e":
              elem.barrier = {
                id: elem.barrier.id,
                trap: elem.barrier.trap,
                state: elem.barrier.state,
                name: elem.barrier.name,
                type: elem.barrier.type,
                hp: elem.barrier.hp,
                destructible: elem.barrier.destructible,
                locked: elem.barrier.locked,
                position: "east",
                height: elem.barrier.height,
              };
              break;
            case "w":
              elem.barrier = {
                id: elem.barrier.id,
                trap: elem.barrier.trap,
                state: elem.barrier.state,
                name: elem.barrier.name,
                type: elem.barrier.type,
                hp: elem.barrier.hp,
                destructible: elem.barrier.destructible,
                locked: elem.barrier.locked,
                position: "west",
                height: elem.barrier.height,
              };
              break;
            default:
              break;
          }
          elem.barrier.trap = this.obstacleBarrierTrapInitSet("main", "barrier", elem);
          barrierCount++;
        }

        // console.log('oo2',elem.levelData,elem.number,elem.terrain);

        // SET EDGES!
        if (elem.number.x === 0) {
          elem.edge = {
            state: true,
            side: "west",
          };
        }
        if (elem.number.x === this.gridWidth) {
          elem.edge = {
            state: true,
            side: "east",
          };
        }
        if (elem.number.y === this.gridWidth) {
          elem.edge = {
            state: true,
            side: "south",
          };
        }
        if (elem.number.y === 0) {
          elem.edge = {
            state: true,
            side: "north",
          };
        }
      }

      obstacleCount = 0;
      barrierCount = 0;
      for (const elem2 of this.settingsGridInfo) {
        // SET LEVEL DATA!
        let levelData2Row = "row" + elem2.number.x;
        let elemLevelData =
          this["levelData" + this.settingsGridWidth][levelData2Row][elem2.number.y];
        if (
          (elemLevelData.split("_")[1] !== "*" &&
            this.terrainLevelDataRef[elemLevelData.split("_")[3]].type === "deep") ||
          (elemLevelData.split("_")[1] !== "*" &&
            this.terrainLevelDataRef[elemLevelData.split("_")[3]].type === "void")
        ) {
          elemLevelData = elemLevelData.replaceAt(3, "*");
        }
        elem2.levelData = elemLevelData;

        // TERRAIN
        elem2.terrain = this.terrainLevelDataRef[elem2.levelData.split("_")[3]];
        if (elem2.terrain.name === "void") {
          elem2.void.state = true;
        }

        // ELEVATION NUMBER
        elem2.elevation.number = parseInt(elem2.levelData.split("_")[4].charAt(0));
        if (elem2.levelData.split("_")[4].charAt(1) !== "*") {
          elem2.elevation.type =
            this.elevationTypeLevelDataRef[elem2.levelData.split("_")[4].charAt(1)];
        }

        // ELEVATION POSITION
        if (elem2.levelData.split("_")[4].charAt(1) !== "*") {
          switch (elem2.levelData.split("_")[4].charAt(2)) {
            case "n":
              elem2.elevation = {
                number: elem2.elevation.number,
                type: elem2.elevation.type,
                position: "north",
              };
              break;
            case "s":
              elem2.elevation = {
                number: elem2.elevation.number,
                type: elem2.elevation.type,
                position: "south",
              };
              break;
            case "e":
              elem2.elevation = {
                number: elem2.elevation.number,
                type: elem2.elevation.type,
                position: "east",
              };
              break;
            case "w":
              elem2.elevation = {
                number: elem2.elevation.number,
                type: elem2.elevation.type,
                position: "west",
              };
              break;
            default:
          }
        }

        // OBSTACLE
        if (elem2.levelData.split("_")[1] !== "*") {
          elem2.obstacle = JSON.parse(
            JSON.stringify(this.obstacleLevelDataRef[elem2.levelData.split("_")[1]])
          );
          elem2.obstacle.id = obstacleCount;
          elem2.obstacle.moving.origin = {
            number: elem2.number,
            center: elem2.center,
          };
          elem2.obstacle.trap = this.obstacleBarrierTrapInitSet("main", "obstacle", elem2);
          obstacleCount++;
        }

        // BARRIER
        if (elem2.levelData.split("_")[0] !== "**") {
          elem2.barrier = JSON.parse(
            JSON.stringify(
              this.barrierLevelDataRef[elem2.levelData.split("_")[0].charAt(0)]
            )
          );
          elem2.barrier.id = barrierCount;
          switch (elem2.levelData.split("_")[0].charAt(1)) {
            case "n":
              elem2.barrier = {
                id: elem2.barrier.id,
                trap: elem2.barrier.trap,
                state: elem2.barrier.state,
                name: elem2.barrier.name,
                type: elem2.barrier.type,
                hp: elem2.barrier.hp,
                destructible: elem2.barrier.destructible,
                locked: elem2.barrier.locked,
                position: "north",
                height: elem2.barrier.height,
              };
              break;
            case "s":
              elem2.barrier = {
                id: elem2.barrier.id,
                trap: elem2.barrier.trap,
                state: elem2.barrier.state,
                name: elem2.barrier.name,
                type: elem2.barrier.type,
                hp: elem2.barrier.hp,
                destructible: elem2.barrier.destructible,
                locked: elem2.barrier.locked,
                position: "south",
                height: elem2.barrier.height,
              };
              break;
            case "e":
              elem2.barrier = {
                id: elem2.barrier.id,
                trap: elem2.barrier.trap,
                state: elem2.barrier.state,
                name: elem2.barrier.name,
                type: elem2.barrier.type,
                hp: elem2.barrier.hp,
                destructible: elem2.barrier.destructible,
                locked: elem2.barrier.locked,
                position: "east",
                height: elem2.barrier.height,
              };
              break;
            case "w":
              elem2.barrier = {
                id: elem2.barrier.id,
                trap: elem2.barrier.trap,
                state: elem2.barrier.state,
                name: elem2.barrier.name,
                type: elem2.barrier.type,
                hp: elem2.barrier.hp,
                destructible: elem2.barrier.destructible,
                locked: elem2.barrier.locked,
                position: "west",
                height: elem2.barrier.height,
              };
              break;
            default:
              break;
          }
          elem2.barrier.trap = this.obstacleBarrierTrapInitSet("main", "barrier", elem2);
          barrierCount++;
        }

        // console.log('oo2',elem2.levelData,elem2.number,elem2.terrain);

        // SET EDGES!
        if (elem2.number.x === 0) {
          elem2.edge = {
            state: true,
            side: "west",
          };
        }
        if (elem2.number.x === this.settingsGridWidth) {
          elem2.edge = {
            state: true,
            side: "east",
          };
        }
        if (elem2.number.y === this.settingsGridWidth) {
          elem2.edge = {
            state: true,
            side: "south",
          };
        }
        if (elem2.number.y === 0) {
          elem2.edge = {
            state: true,
            side: "north",
          };
        }
      }

      // gridInfo to 2D array
      let gridInfo2d = [];
      for (let i = 0; i <= this.gridWidth; i++) {
        // for (let i = 9; i >= 0; i--) {
        let newArray = [];
        for (var j = 0; j < allCells.length; j++) {
          if (allCells[j]["number"].x === i) {
            newArray.push(allCells[j]);
          }
        }
        gridInfo2d.push(newArray);
      }

      
      setState(prev => ({
        ...prev,
        gridInfo2D,
        settingsGridInfo,
        global_function_component_triggers: {
          ...prev.global_function_component_triggers,
          updatePathArray: {
            ...prev.global_function_component_triggers.updatePathArray,
            main: context.global_function_component_triggers.updatePathArray.main + 1,
          },
        }
      }));

    }, [context.global_function_component_triggers.processLevelData]); // <--- dependency


  return null;
};

export default ProcessLevelData;