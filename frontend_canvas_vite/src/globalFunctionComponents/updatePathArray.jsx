import React, { 
  useContext, 
  useRef, 
  useEffect,
 } from "react";
import { GameContext } from "../gameContext";
import { imageRefs } from "../imageRefs";
import path from "path";


const UpdatePathArray = () => {
  const { context, setState } = useContext(GameContext);

  console.log("UpdatePathArray: game context", context.state);
  

    useEffect(() => {

      if (!context.state.canvas || !context.state.canvasContext) return;

      console.log("UpdatePathArray useEffect triggered");

      let pathArray = [];

      for (const [key, value] of Object.entries(context["levelData" + context.gridWidth])) {
        let row = [];
        for (const elem3 of value) {
          // let terrainInfo2 = elem3.length-1;
          // let cell = this.gridInfo.find(elem2 => elem2.levelData === elem3)
          //
          // if (cell) {
          //   let playerCell = false;
          //   for (const plyr of this.players) {
          //     if (
          //       plyr.currentPosition.cell.number.x === cell.number.x &&
          //       plyr.currentPosition.cell.number.y === cell.number.y
          //     ) {
          //       playerCell = true;
          //     }
          //   }
          //   if (playerCell === true) {
          //     row.push(0)
          //     // row.push(1)
          //   } else {
          //     if (
          //       elem3.charAt(terrainInfo2) === 'j' ||
          //       elem3.charAt(terrainInfo2) === 'h' ||
          //       elem3.charAt(terrainInfo2) === 'i' ||
          //       elem3.charAt(0) !== 'x' ||
          //       cell.void.state === true
          //     ) {
          //       row.push(1)
          //     } else {
          //       row.push(0)
          //     }
          //     // row.push(0)
          //   }
          // }

          row.push(0);
        }
        pathArray.push(row);
      }
      
      setState(prev => ({
        ...prev,
        pathArray,
      }));

    }, [context.global_function_component_triggers.updatePathArray]); // <--- dependency


  return null;
};

export default UpdatePathArray;