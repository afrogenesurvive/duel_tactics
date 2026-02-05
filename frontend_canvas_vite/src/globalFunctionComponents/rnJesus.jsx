import React, { 
  useContext, 
  useRef, 
  useEffect,
 } from "react";
import { GameContext } from "../gameContext";
import { imageRefs } from "../imageRefs";
import path from "path";


const RnJesus = () => {
  const { context, setState } = useContext(GameContext);

  console.log("RnJesus: game context", context.state);
  

    useEffect(() => {

      if (!context.state.canvas || !context.state.canvasContext) return;

      console.log("RnJesus useEffect triggered");

      
    //   setState(prev => ({
    //     ...prev,
    //     // ...
    //   }));

    }, [context.global_function_component_triggers.rnJesus]); // <--- dependency


  return null;
};

export default RnJesus;