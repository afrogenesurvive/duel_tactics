import React, { useContext, useEffect, useRef } from "react";
import { GameContext } from "./gameContext";
import Easystar from "easystarjs";

const GameEngine = ({ 
  playerUpdate,
  pollGamepads
 }) => {
  const {
    context,
    setState,
  } = useContext(GameContext);
  console.log("Game Context state:", context);
  

  const animationFrameRef = useRef();

  useEffect(() => {
    // componentDidMount equivalent


    // Start the game loop
    const loop = () => {
      gameLoop();
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    animationFrameRef.current = requestAnimationFrame(loop);

    // componentWillUnmount equivalent
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  },[
    context.removeAi, 
    context.addAiCount, 
    context.players, 
    context.state.showSettings, 
    context.gamepad,
    context.showSettingsCanvasData,
    context.settingsGridWidth
  ]);

  const gameLoop = () => {
    console.log("Game loop running...");
    
    // Handle settings key press
    if (context.showSettingsKeyPress.state) {
      if (context.showSettingsKeyPress.count < context.showSettingsKeyPress.limit) {
        setState((prevState) => ({
          ...prevState,
          showSettingsKeyPress: {
            ...prevState.showSettingsKeyPress,
            count: prevState.showSettingsKeyPress.count + 1,
          }
        }));
      } else {
        // setState((prevState) => ({
        //   ...prevState,
        //   showSettings: !prevState.showSettings,
        //   showSettingsKeyPress: {
        //     state: false,
        //     count: 0,
        //     limit: prevState.showSettingsKeyPress.limit,
        //   }
        // }));

        // If opening settings, check for showSettingsCanvasData.state
        if (!context.showSettings) {
          setState((prevState) => ({
            ...prevState,
            showSettings: true,
            showSettingsKeyPress: {
              state: false,
              count: 0,
              limit: prevState.showSettingsKeyPress.limit,
            }
          }));
          if (
            context.showSettingsCanvasData &&
            context.showSettingsCanvasData.state === true &&
            typeof settingsFormGridWidthUpdate === "function"
          ) {
            settingsFormGridWidthUpdate(
              context.settingsGridWidth || settingsGridWidth
            );
          }
        } else {
          setState((prevState) => ({
            ...prevState,
            showSettings: false,
            showSettingsKeyPress: {
              state: false,
              count: 0,
              limit: prevState.showSettingsKeyPress.limit,
            }
          }));
        }

      }
    }

    if (!context.state.showSettings) {

      const currentTime = new Date().getTime();
      const deltaTime = currentTime - context.stepper.lastTime;
      let counterTime = context.time;

      if (deltaTime > context.stepper.interval) {
        // Update game state - properly use setState for players
        // setState((prevState) => ({
        //   ...prevState,
        //   players: prevState.players.map((player) => {
        //     // Update player logic here
        //     return player;
        //   })
        // }));

        // Update time
        setState((prevState) => ({
          ...prevState,
          time: prevState.time + 1,
          stateUpdater: "..", // mimic App.jsx
        }));

        // Gamepad polling
        if (context.gamepad && typeof pollGamepads === "function") {
          pollGamepads();
        }


        // Remove AI player logic
        if (context.removeAi && context.addAiCount.state !== true) {
          const aiPlayer = context.players[context.removeAi - 1];
          const newArray = context.players.filter((x) => x !== aiPlayer);
          setState((prevState) => ({
            ...prevState,
            players: newArray,
            removeAi: undefined,
          }));
        }

        context.players.forEach((player) => {
          playerUpdate(
            player,
            context.state.canvas,
            context.state.context,
            context.state.canvas2,
            context.state.context2,
            context.state.canvas3,
            context.state.context3
          );
        });

        // Update the stepper last time
        setState((prevState) => ({
          ...prevState,
          stepper: {
            ...prevState.stepper,
            lastTime: currentTime - (deltaTime % prevState.stepper.interval)
          }
        }));
      }
    }

  };

  return null; // This component doesn't render anything
};

export default GameEngine;
