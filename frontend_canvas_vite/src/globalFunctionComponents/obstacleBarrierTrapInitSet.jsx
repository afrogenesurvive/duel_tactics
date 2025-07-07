import React, { 
  useContext, 
  useRef, 
  useEffect,
 } from "react";
import { GameContext } from "../gameContext";
import { imageRefs } from "../imageRefs";
import path from "path";


const ObstacleBarrierTrapInitSet = () => {
  const { context, setState } = useContext(GameContext);

  console.log("ObstacleBarrierTrapInitSet: game context", context.state);
  

    useEffect(() => {

      if (!context.state.canvas || !context.state.canvasContext) return;

      console.log("ObstacleBarrierTrapInitSet useEffect triggered");

      
    //   setState(prev => ({
    //     ...prev,
    //     // ...
    //   }));

    }, [context.global_function_component_triggers.obstacleBarrierTrapInitSet]); // <--- dependency


  return null;
};

export default ObstacleBarrierTrapInitSet;