import React, { 
  useContext, 
  useRef, 
  useEffect,
 } from "react";
import { GameContext } from "../gameContext";
import { imageRefs } from "../imageRefs";


const SetBackgroundImage = () => {
  const { context, setState } = useContext(GameContext);

  console.log("SetBackgroundImage: game context", context.state);
  

    useEffect(() => {

      if (!context.state.canvas || !context.state.canvasContext) return;

      console.log("SetBackgroundImage: useEffect triggered");
      
      // Get the image key from the trigger
      const imageKey = context.global_function_component_triggers.setBackgroundImage.image;
      if (!imageKey) return;

      // Get the container class name
      const containerClass = context.state.containerInnerClass;
      const containerEls = document.getElementsByClassName(containerClass);

      // Get the background image ref from context
      const bgRef = context.backgroundImageRef?.[imageKey];

      if (containerEls.length > 0 && bgRef && bgRef.src) {
        containerEls[0].style.backgroundImage = `url('${bgRef.src}')`;
      }

    }, [context.global_function_component_triggers.setBackgroundImage]); // <--- dependency


  return null;
};

export default SetBackgroundImage;