import React, { 
  useContext, 
  useRef, 
  useEffect,
 } from "react";
import { GameContext } from "../gameContext";
import { imageRefs } from "../imageRefs";


const StartProcessLevelData = () => {
  const { context, setState, cartesianToIsometric } = useContext(GameContext);

  console.log("StartProcessLevelData: game context", context.state);
  

    useEffect(() => {

      if (!context.state.canvas || !context.state.canvasContext) return;

      console.log("StartProcessLevelData: useEffect triggered");
      
      class Point {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
      }

      for (var x = 0; x < context.gridWidth + 1; x++) {
        for (var y = 0; y < context.gridWidth + 1; y++) {
          let p = new Point();
          p.x = x * tileWidth;
          p.y = y * tileWidth;

          let iso = cartesianToIsometric(p);
          let offset = { x: floorImageWidth / 2, y: floorImageHeight };

          // apply offset to center scene for a better view
          iso.x += sceneX;
          iso.y += sceneY;

          let center = {
            x: Math.round(iso.x - offset.x / 2 + context.cellCenterOffsetX),
            y: Math.round(iso.y - offset.y / 2 - context.cellCenterOffsetY),
          };

          gridInfo.push({
            number: { x: x, y: y },
            center: { x: center.x, y: center.y },
            drawCenter: { x: center.x, y: center.y },
            vertices: [
              { x: center.x, y: center.y + context.tileWidth / 2 },
              { x: center.x + context.tileWidth, y: center.y },
              { x: center.x, y: center.y - context.tileWidth / 2 },
              { x: center.x - context.tileWidth, y: center.y },
            ],
            side: Math.sqrt((context.tileWidth / 2) ^ (2 + context.tileWidth) ^ 2),
            levelData: "",
            edge: {
              state: false,
              side: "",
            },
            terrain: {
              name: "",
              type: "",
              effect: "",
            },
            item: {
              name: "",
              type: "",
              subType: "",
              effect: "",
              initDrawn: false,
            },
            void: {
              state: false,
            },
            obstacle: {
              id: 0,
              trap: {},
              state: false,
              name: "",
              type: "",
              hp: 2,
              destructible: {
                state: false,
                weapons: [],
                leaveRubble: false,
              },
              locked: {
                state: false,
                key: "",
              },
              weight: 1,
              height: 0.5,
              items: [],
              effects: [],
              moving: {
                state: false,
                step: 0,
                origin: {
                  number: { x: x, y: y },
                  center: { x: center.x, y: center.y },
                },
                destination: {
                  number: {
                    x: undefined,
                    y: undefined,
                  },
                  center: {
                    x: undefined,
                    y: undefined,
                  },
                },
                currentPosition: {
                  x: undefined,
                  y: undefined,
                },
                nextPosition: {
                  x: undefined,
                  y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                  state: false,
                  count: 0,
                  limit: 10,
                },
              },
            },
            barrier: {
              id: 0,
              trap: {},
              state: false,
              name: "",
              type: "",
              hp: 2,
              destructible: {
                state: false,
                weapons: [],
                leaveRubble: false,
              },
              locked: {
                state: false,
                key: "",
              },
              position: "",
              height: 1,
            },
            elevation: {
              number: 0,
              type: "",
              position: "",
            },
            rubble: false,
          });
        }
      }

      for (var x = 0; x < context.settingsGridWidth + 1; x++) {
        for (var y = 0; y < context.settingsGridWidth + 1; y++) {
          let p2 = new Point();
          p2.x = (x * tileWidth) / 2;
          p2.y = (y * tileWidth) / 2;

          let iso2 = cartesianToIsometric(p2);
          let offset2 = { x: floorImageWidth / 2 / 2, y: floorImageHeight / 2 };

          // apply offset to center scene for a better view

          iso2.x += context.settingsSceneX;
          iso2.y += context.settingsSceneY;

          let center2 = {
            x: Math.round(iso2.x - offset2.x / 2 + context.cellCenterOffsetX / 2),
            y: Math.round(iso2.y - offset2.y / 2 - context.cellCenterOffsetY / 2),
          };

          settingsGridInfo.push({
            number: { x: x, y: y },
            center: { x: center2.x, y: center2.y },
            drawCenter: { x: center2.x, y: center2.y },
            vertices: [
              { x: center2.x, y: center2.y + context.tileWidth / 4 },
              { x: center2.x + context.tileWidth / 2, y: center2.y },
              { x: center2.x, y: center2.y - context.tileWidth / 4 },
              { x: center2.x - context.tileWidth / 2, y: center2.y },
            ],
            side: Math.sqrt((context.tileWidth / 2 / 2) ^ (2 + context.tileWidth / 2) ^ 2),
            levelData: "",
            edge: {
              state: false,
              side: "",
            },
            terrain: {
              name: "",
              type: "",
              effect: "",
            },
            item: {
              name: "",
              type: "",
              subType: "",
              effect: "",
              initDrawn: false,
            },
            void: {
              state: false,
            },
            obstacle: {
              id: 0,
              trap: {},
              state: false,
              name: "",
              type: "",
              hp: 2,
              destructible: {
                state: false,
                weapons: [],
                leaveRubble: false,
              },
              locked: {
                state: false,
                key: "",
              },
              weight: 1,
              height: 0.5,
              items: [],
              effects: [],
              moving: {
                state: false,
                step: 0,
                origin: {
                  number: { x: x, y: y },
                  center: { x: center2.x, y: center2.y },
                },
                destination: {
                  number: {
                    x: undefined,
                    y: undefined,
                  },
                  center: {
                    x: undefined,
                    y: undefined,
                  },
                },
                currentPosition: {
                  x: undefined,
                  y: undefined,
                },
                nextPosition: {
                  x: undefined,
                  y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                  state: false,
                  count: 0,
                  limit: 10,
                },
              },
            },
            barrier: {
              id: 0,
              trap: {},
              state: false,
              name: "",
              type: "",
              hp: 2,
              destructible: {
                state: false,
                weapons: [],
                leaveRubble: false,
              },
              locked: {
                state: false,
                key: "",
              },
              position: "",
              height: 1,
            },
            elevation: {
              number: 0,
              type: "",
              position: "",
            },
            rubble: false,
          });
        }
      }

      setState(prev => ({
        ...prev,
        gridInfo,
        settingsGridInfo,
      }));


    }, [context.global_function_component_triggers.startProcessLevelData]); // <--- dependency


  return null;
};

export default StartProcessLevelData;