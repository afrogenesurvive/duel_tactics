import React, { 
  useContext, 
  useRef, 
  useEffect,
 } from "react";
import { GameContext } from "../gameContext";
import { imageRefs } from "../imageRefs";
import path from "path";


const PlaceItems = () => {
  const { context, setState } = useContext(GameContext);

  console.log("PlaceItems: game context", context.state);
  

    useEffect(() => {

      if (!context.state.canvas || !context.state.canvasContext) return;

      console.log("PlaceItems useEffect triggered");

      
    //   setState(prev => ({
    //     ...prev,
    //     // ...
    //   }));

    }, [context.global_function_component_triggers.placeItems]); // <--- dependency


  return null;
};

export default PlaceItems;