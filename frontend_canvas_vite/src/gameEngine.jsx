import React, { useContext, useEffect, useRef } from "react";
import { GameContext } from "./gameContext";
import Easystar from "easystarjs";

const GameEngine = () => {
  const {
    state,
    setState,
    gamepadConfig,
    players,
    setPlayers,
    stepper,
    showSettingsKeyPress,
    setShowSettingsKeyPress,
  } = useContext(GameContext);

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
    if (showSettingsKeyPress.state) {
      if (showSettingsKeyPress.count < showSettingsKeyPress.limit) {
        setShowSettingsKeyPress((prev) => ({
          ...prev,
          count: prev.count + 1,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          showSettings: !prevState.showSettings,
        }));
        setShowSettingsKeyPress({
          state: false,
          count: 0,
          limit: showSettingsKeyPress.limit,
        });
      }
    }

    if (!state.showSettings) {
      const currentTime = new Date().getTime();
      const deltaTime = currentTime - stepper.lastTime;

      if (deltaTime > stepper.interval) {
        // Update game state
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) => {
            // Update player logic here
            return player;
          })
        );

        stepper.lastTime = currentTime - (deltaTime % stepper.interval);
      }
    }
  };

  return null; // This component doesn't render anything
};

export default GameEngine;