import React, { 
  useContext, 
  useRef, 
  useEffect,
 } from "react";
import { GameContext } from "../gameContext";
import { imageRefs } from "../imageRefs";
import path from "path";


const FindFocusCell = () => {
  const { context, setState } = useContext(GameContext);

  console.log("FindFocusCell: game context", context.state);
  

    useEffect(() => {

      if (!context.state.canvas || !context.state.canvasContext) return;

      console.log("FindFocusCell useEffect triggered");

      
    //   setState(prev => ({
    //     ...prev,
    //     // ...
    //   }));

    }, [context.global_function_component_triggers.findFocusCell]); // <--- dependency


  return null;
};

export default FindFocusCell;