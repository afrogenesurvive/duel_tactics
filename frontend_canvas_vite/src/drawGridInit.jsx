import React, { 
  useContext, 
  useRef, 
  useEffect,
  useImperativeHandle
 } from "react";
import { GameContext } from "./gameContext";
import { imageRefs } from "./imageRefs";



const DrawGridInit = React.forwardRef((props, ref) => {
  const { context, setState } = useContext(GameContext);

  console.log("DrawGridInit: game context", context.state);
  

  const drawGrid = () => {
    
    const canvas = context.state.canvas;
    const context2d = context.state.canvasContext;
    const canvas2 = context.state.canvas2;
    const context2d2 = context.state.canvasContext2;

    // Clear canvases
    context2d.clearRect(0, 0, context.canvasWidth, context.canvasHeight);
    context2d2.clearRect(0, 0, context.canvasWidth, context.canvasHeight);

    setState(prev => ({
      ...prev,
      popupImageRef: {
        attackStart: imageRefs.preAttackIndicateRef.current,
        preAction1: imageRefs.preAction1IndicateRef.current,
        // ...repeat for all keys
      },
      // ...repeat for indicatorImgs, playerImgs, etc.
    }));


  };

  return null;
});

export default DrawGridInit;