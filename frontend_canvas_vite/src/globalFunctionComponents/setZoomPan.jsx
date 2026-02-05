import React, { 
  useContext, 
  useRef, 
  useEffect,
 } from "react";
import { GameContext } from "../gameContext";
import { imageRefs } from "../imageRefs";
import path from "path";


const SetZoomPan = () => {
  const { context, setState } = useContext(GameContext);

  console.log("SetZoomPan: game context", context.state);
  

    useEffect(() => {

      if (!context.state.canvas || !context.state.canvasContext) return;

      console.log("SetZoomPan useEffect triggered");

      
    //   setState(prev => ({
    //     ...prev,
    //     // ...
    //   }));

    }, [context.global_function_component_triggers.updatePathArray]); // <--- dependency


  return null;
};

export default SetZoomPan;