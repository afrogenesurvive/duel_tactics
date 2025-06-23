import React, { useContext, useEffect, useRef } from "react";
import { GameContext } from "./gameContext";
import Easystar from "easystarjs";

const GameEngine = () => {
  const {
    context,
    setState,
  } = useContext(GameContext);
  console.log("Game Context state:", context);
  

  const animationFrameRef = useRef();

  useEffect(() => {
    // componentDidMount equivalent
    const initializeGame = () => {
      // Initialize Easystar.js or other game setup logic
      const easyStar = new Easystar.js();
      setState((prevState) => ({ ...prevState, easyStar }));

      // Set up canvas dimensions
      if (window.innerWidth < 1100) {
        setState((prevState) => ({
          ...prevState,
          containerInnerClass: "containerInnerSmall",
          sceneY: {
            three: 300,
            six: 200,
            nine: 120,
            twelve: 50,
          },
          canvasWidth: 1000,
          canvasHeight: 600,
        }));
      }
    };

    initializeGame();

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
  }, []);

    const gameLoop = () => {
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
        setState((prevState) => ({
          ...prevState,
          showSettings: !prevState.showSettings,
          showSettingsKeyPress: {
            state: false,
            count: 0,
            limit: prevState.showSettingsKeyPress.limit,
          }
        }));
      }
    }

    if (!context.state.showSettings) {
      const currentTime = new Date().getTime();
      const deltaTime = currentTime - context.stepper.lastTime;

      if (deltaTime > context.stepper.interval) {
        // Update game state - properly use setState for players
        setState((prevState) => ({
          ...prevState,
          players: prevState.players.map((player) => {
            // Update player logic here
            return player;
          })
        }));

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
