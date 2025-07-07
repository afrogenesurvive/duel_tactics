import React, { 
  useContext, 
  useRef, 
  useEffect,
 } from "react";
import { GameContext } from "../gameContext";
import { imageRefs } from "../imageRefs";
import path from "path";


const SettingsFormGridWidthUpdate = () => {
  const { context, setState } = useContext(GameContext);

  console.log("SettingsFormGridWidthUpdate: game context", context.state);
  

    useEffect(() => {

      if (!context.state.canvas || !context.state.canvasContext) return;

      console.log("SettingsFormGridWidthUpdate useEffect triggered");

      
    //   setState(prev => ({
    //     ...prev,
    //     // ...
    //   }));

    }, [context.global_function_component_triggers.settingsFormGridWidthUpdate]); // <--- dependency


  return null;
};

export default SettingsFormGridWidthUpdate;