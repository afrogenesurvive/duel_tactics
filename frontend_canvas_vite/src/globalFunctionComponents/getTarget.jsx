import React, { 
  useContext, 
  useRef, 
  useEffect,
 } from "react";
import { GameContext } from "../gameContext";
import { imageRefs } from "../imageRefs";
import path from "path";


const GetTarget = () => {
  const { context, setState } = useContext(GameContext);

  console.log("GetTarget: game context", context.state);
  

    useEffect(() => {

      if (!context.state.canvas || !context.state.canvasContext) return;

      console.log("GetTarget useEffect triggered");

      
    //   setState(prev => ({
    //     ...prev,
    //     // ...
    //   }));

    }, [context.global_function_component_triggers.getTarget]); // <--- dependency


  return null;
};

export default GetTarget;