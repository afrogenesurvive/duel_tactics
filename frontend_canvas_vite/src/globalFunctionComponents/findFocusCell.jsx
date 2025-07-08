import React, { 
  useContext, 
  useRef, 
  useEffect,
 } from "react";
import { GameContext } from "../gameContext";
import { imageRefs } from "../imageRefs";
import Easystar from "easystarjs";


const FindFocusCell = () => {
  const { context, setState } = useContext(GameContext);

  console.log("FindFocusCell: game context", context.state);
  
  //findFocusCell = (inputType, inputSubType, focus, canvas, context, speed)

    useEffect(() => {

      if (!context.state.canvas || !context.state.canvasContext) return;

      console.log("FindFocusCell useEffect triggered");

        const canvas = imageRefs.canvasRef.current;
        const canvasContext = canvas.getContext("2d");
        const canvas2 = imageRefs.canvasRef2.current;
        const canvasContext2 = canvas2.getContext("2d");

        let inputType = context.global_function_component_triggers.findFocusCell.inputType
        let inputSubType = context.global_function_component_triggers.findFocusCell.inputSubType
        
        let cell = {
            x: undefined,
            y: undefined,
        };
        let direction = "";
        let cellOffsetX = 0;
        let cellOffsetY = 0;
        let centerCellRef = {
            x: 4,
            y: 4,
        };
        let newCell = {
            x: undefined,
            y: undefined,
        };
    
        if (inputType === "cellToPan") {
            let destCell = focus;
            let originCell = {
                x: context.camera.focusCell.x,
                y: context.camera.focusCell.y,
            };
            // let originCell = context.camera.cellToPanOrigin;
            let x1 = originCell.x;
            let y1 = originCell.y;
            let x2 = destCell.x;
            let y2 = destCell.y;
            let xSteps = 0;
            let ySteps = 0;
            let xDirection = "";
            let yDirection = "";
            let preInstructions = [];
        
            if (x1 > x2) {
                xDirection = "west";
                xSteps = x1 - x2;
            }
            if (x2 > x1) {
                xDirection = "east";
                xSteps = x2 - x1;
            }
            if (y1 > y2) {
                yDirection = "north";
                ySteps = y1 - y2;
            }
            if (y2 > y1) {
                yDirection = "south";
                ySteps = y2 - y1;
            }
        
            let sameCell = originCell.x === destCell.x && originCell.y === destCell.y;
            let cancelPath = false;
            let pathSet = [];


            // this.updatePathArray();

            setState(prev => ({
                ...prev,
                global_function_component_triggers: {
                ...prev.global_function_component_triggers,
                updatePathArray: {
                    ...prev.global_function_component_triggers.updatePathArray,
                    main: context.global_function_component_triggers.updatePathArray.main + 1,
                },
                }
            }));


            easyStar = new Easystar.js();
            easyStar.setGrid(context.pathArray);
            easyStar.setAcceptableTiles([0]);
            easyStar.enableDiagonals();
        
            let test2 = easyStar.findPath(
                originCell.x,
                originCell.y,
                destCell.x,
                destCell.y,
                function (path) {
                if (path === null) {
                    cancelPath = true;
                    console.log("Path was not found");
                } else {
                    pathSet = path;
                }
                }
            );
            easyStar.setIterationsPerCalculation(1000);
            easyStar.calculate();
            setTimeout(() => {
                if (cancelPath === true) {
                console.log("cancel path");
                easyStar = new Easystar.js();
                } else {
                // console.log("path setA", pathSet);
                finish();
                }
            }, 30);
        
            const finish = () => {
                let indx = 0;
        
                for (const cell of pathSet) {
                if (indx < pathSet.length - 1) {
                    let pointA = cell;
                    let pointB = pathSet[indx + 1];
                    let direction;
        
                    if (pointA.x - pointB.x === 1 && pointA.y - pointB.y === 1) {
                    direction = "north";
                    }
                    if (pointA.x - pointB.x === 0 && pointA.y - pointB.y === 1) {
                    direction = "northEast";
                    }
                    if (pointA.x - pointB.x === -1 && pointA.y - pointB.y === 1) {
                    direction = "east";
                    }
                    if (pointA.x - pointB.x === -1 && pointA.y - pointB.y === 0) {
                    direction = "southEast";
                    }
                    if (pointA.x - pointB.x === -1 && pointA.y - pointB.y === -1) {
                    direction = "south";
                    }
                    if (pointA.x - pointB.x === 0 && pointA.y - pointB.y === -1) {
                    direction = "southWest";
                    }
                    if (pointA.x - pointB.x === 1 && pointA.y - pointB.y === -1) {
                    direction = "west";
                    }
                    if (pointA.x - pointB.x === 1 && pointA.y - pointB.y === 0) {
                    direction = "northWest";
                    }
        
                    preInstructions.push(direction);
                    indx++;
                }
                }
        
                let a = 50;
                let b = 100;
        
                const setMoveAndZoom = () => {
                let zoomCount = parseInt(inputSubType.split("_")[2]);
                let zoomDirection = inputSubType.split("_")[1];
                let panCount = preInstructions.length;
                let incr = 0;
                let remainder = 0;
                let greater = "";
        
                let finalArray = [];
                let indx2 = 0;
                // zoomCount = 10;
                // panCount = 3;
        
                if (zoomCount > panCount) {
                    greater = "zoom";
                    incr = Math.floor(zoomCount / panCount);
                    remainder = zoomCount % panCount;
        
                    for (let index = 0; index < panCount; index++) {
                    finalArray.push("pan");
                    for (let index2 = 0; index2 < incr; index2++) {
                        finalArray.push("zoom");
                    }
                    }
                    if (remainder > 0) {
                    for (let index = 0; index < remainder; index++) {
                        finalArray.push("zoom");
                    }
                    }
                }
        
                if (panCount > zoomCount) {
                    greater = "pan";
                    incr = Math.floor(panCount / zoomCount);
                    remainder = panCount % zoomCount;
                    for (let index = 0; index < zoomCount; index++) {
                    finalArray.push("zoom");
                    for (let index2 = 0; index2 < incr; index2++) {
                        finalArray.push("pan");
                    }
                    }
                    if (remainder > 0) {
                    for (let index = 0; index < remainder; index++) {
                        finalArray.push("pan");
                    }
                    }
                }
        
                // console.log("finalArray", finalArray);
        
                let indx3 = 0;
                let limit = 0;
                let setCombinedInstruction = (args) => {
                    let result = args;
        
                    if (zoomCount > 0) {
                    if (greater === "pan") {
                        limit = zoomCount;
                        if (indx3 < limit) {
                        if (result.action2 === "") {
                            result.action2 = "zoom_" + zoomDirection + "";
                            result.limit2 = 1;
                        } else {
                            result.action3 = "zoom_" + zoomDirection + "";
                            result.count3 = 0;
                            result.limit3 = 1;
                        }
                        indx3++;
                        }
                        if (indx3 >= limit) {
                        indx3 = 0;
                        }
                    }
                    if (greater === "zoom") {
                        limit = panCount;
                        if (indx3 < limit) {
                        if (result.action2 === "") {
                            result.action2 = "zoom_" + zoomDirection + "";
                            result.limit2 = incr;
                        } else {
                            result.action3 = "zoom_" + zoomDirection + "";
                            result.count3 = 0;
                            result.limit3 = incr;
                        }
                        indx3++;
                        }
                        if (indx3 >= limit) {
                        indx3 = 0;
                        }
                    }
                    }
                    return result;
                };
        
                for (const preInstruction of preInstructions) {
                    let completeInstruction = {};
                    switch (preInstruction) {
                    case "north":
                        completeInstruction = setCombinedInstruction({
                        action: "pan_north",
                        action2: "",
                        count: 0,
                        count2: 0,
                        limit: a,
                        limit2: 0,
                        speed: speed,
                        });
                        break;
                    case "northEast":
                        completeInstruction = setCombinedInstruction({
                        action: "pan_north",
                        action2: "pan_east",
                        count: 0,
                        count2: 0,
                        limit: a / 2,
                        limit2: b / 2,
                        speed: speed,
                        });
                        break;
                    case "east":
                        completeInstruction = setCombinedInstruction({
                        action: "pan_east",
                        action2: "",
                        count: 0,
                        count2: 0,
                        limit: b,
                        limit2: 0,
                        speed: speed,
                        });
                        break;
                    case "southEast":
                        completeInstruction = setCombinedInstruction({
                        action: "pan_south",
                        action2: "pan_east",
                        count: 0,
                        count2: 0,
                        limit: a / 2,
                        limit2: b / 2,
                        speed: speed,
                        });
                        break;
                    case "south":
                        this.camera.instructions.push({
                        action: "pan_south",
                        action2: "",
                        count: 0,
                        count2: 0,
                        limit: a,
                        limit2: 0,
                        speed: speed,
                        });
                        break;
                    case "southWest":
                        completeInstruction = setCombinedInstruction({
                        action: "pan_south",
                        action2: "pan_west",
                        count: 0,
                        count2: 0,
                        limit: a / 2,
                        limit2: b / 2,
                        speed: speed,
                        });
                        break;
                    case "west":
                        completeInstruction = setCombinedInstruction({
                        action: "pan_west",
                        action2: "",
                        count: 0,
                        count2: 0,
                        limit: b,
                        limit2: 0,
                        speed: speed,
                        });
                        break;
                    case "northWest":
                        completeInstruction = setCombinedInstruction({
                        action: "pan_north",
                        action2: "pan_west",
                        count: 0,
                        count2: 0,
                        limit: a / 2,
                        limit2: b / 2,
                        speed: speed,
                        });
                        break;
                    default:
                        break;
                    }
                    this.camera.instructions.push(completeInstruction);
                }
        
                if (greater === "zoom" && remainder > 0) {
                    if (
                    this.camera.instructions[this.camera.instructions.length - 1].action2.split(
                        "_"
                    )[0] === "zoom"
                    ) {
                    this.camera.instructions[this.camera.instructions.length - 1].limit2 +=
                        remainder;
                    } else if (
                    this.camera.instructions[this.camera.instructions.length - 1].action3.split(
                        "_"
                    )[0] === "zoom"
                    ) {
                    this.camera.instructions[this.camera.instructions.length - 1].limit3 +=
                        remainder;
                    }
                }
                };
        
                if (inputSubType.split("_")[0] === "move&&zoom") {
                setMoveAndZoom();
                } else {
                for (const instruction of preInstructions) {
                    switch (instruction) {
                    case "north":
                        this.camera.instructions.push({
                        action: "pan_north",
                        action2: "",
                        count: 0,
                        count2: 0,
                        limit: a,
                        limit2: 0,
                        speed: speed,
                        });
                        break;
                    case "northEast":
                        this.camera.instructions.push({
                        action: "pan_north",
                        action2: "pan_east",
                        count: 0,
                        count2: 0,
                        limit: a / 2,
                        limit2: b / 2,
                        speed: speed,
                        });
                        break;
                    case "east":
                        this.camera.instructions.push({
                        action: "pan_east",
                        action2: "",
                        count: 0,
                        count2: 0,
                        limit: b,
                        limit2: 0,
                        speed: speed,
                        });
                        break;
                    case "southEast":
                        this.camera.instructions.push({
                        action: "pan_south",
                        action2: "pan_east",
                        count: 0,
                        count2: 0,
                        limit: a / 2,
                        limit2: b / 2,
                        speed: speed,
                        });
                        break;
                    case "south":
                        this.camera.instructions.push({
                        action: "pan_south",
                        action2: "",
                        count: 0,
                        count2: 0,
                        limit: a,
                        limit2: 0,
                        speed: speed,
                        });
                        break;
                    case "southWest":
                        this.camera.instructions.push({
                        action: "pan_south",
                        action2: "pan_west",
                        count: 0,
                        count2: 0,
                        limit: a / 2,
                        limit2: b / 2,
                        speed: speed,
                        });
                        break;
                    case "west":
                        this.camera.instructions.push({
                        action: "pan_west",
                        action2: "",
                        count: 0,
                        count2: 0,
                        limit: b,
                        limit2: 0,
                        speed: speed,
                        });
                        break;
                    case "northWest":
                        this.camera.instructions.push({
                        action: "pan_north",
                        action2: "pan_west",
                        count: 0,
                        count2: 0,
                        limit: a / 2,
                        limit2: b / 2,
                        speed: speed,
                        });
                        break;
                    default:
                        break;
                    }
                }
                }
        
                // console.log("instructionsA", this.camera.instructions);
                if (this.camera.instructions.length > 0 || sameCell === true) {
                this.autoCamPanWaitingForPath = false;
                }
            };
        
            // console.log('auto camera instructions',this.camera.instructions);
        }
    
        if (inputType === "panToCell") {
            let focusCell;
            const rect = canvas.getBoundingClientRect();
            const scale = rect.width / canvas.offsetWidth;
            // console.log('rect.width',rect.width);
        
            const x = this.canvasWidth / 2;
            const y = this.canvasHeight / 2;
        
            // ADJUSTED FOR CANVAS SCALE & TRANSFORM
            let newX = (x - this.camera.zoomFocusPan.x) / this.camera.zoom.x;
            let newY = (y - this.camera.zoomFocusPan.y) / this.camera.zoom.y;
            // this.camera.focus.x = newX
            // this.camera.focus.y = newY
        
            let insideGrid = false;
        
            for (const cell of this.gridInfo) {
                let point = [newX, newY];
                // let point = [newX,newY];
                let polygon = [];
                for (const vertex of cell.vertices) {
                let vertexPoint = [vertex.x + 10, vertex.y + 5];
                polygon.push(vertexPoint);
                }
                let pip = pointInPolygon(point, polygon);
                if (pip === true) {
                insideGrid = true;
                // console.log("camera focus cell",cell.number,"x: " + x + " y: " + y);
                focusCell = cell;
                }
            }
            if (insideGrid === false) {
                // console.log("clicked the canvas", 'x: ',x,'y: ',y);
                // console.log('clicked outside the grid');
                // this.showCellInfoBox = false;
                focusCell = {
                number: {
                    x: 0,
                    y: 0,
                },
                center: {
                    x: 0,
                    y: 0,
                },
                drawCenter: {
                    x: 0,
                    y: 0,
                },
                vertices: [
                    {
                    x: 0,
                    y: 0,
                    },
                    {
                    x: 0,
                    y: 0,
                    },
                    {
                    x: 0,
                    y: 0,
                    },
                    {
                    x: 0,
                    y: 0,
                    },
                ],
                side: 0,
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
                        number: {
                        x: undefined,
                        y: undefined,
                        },
                        center: {
                        x: undefined,
                        y: undefined,
                        },
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
                };
                this.cellsToHighlight2 = [];
            }
        
            // SEND FOCUS CELL TO cellsToHighlight
        
            if (insideGrid === true) {
                // console.log('panToCell using pointInPolygon',focusCell.number);
                this.camera.focusCell.x = focusCell.number.x;
                this.camera.focusCell.y = focusCell.number.y;
                // console.log('panToCell camera.focusCell',this.camera.focusCell);
                if (this.highlightZoomPanFocusCell === true) {
                for (const cell2 of this.cellsToHighlight2) {
                    if (
                    cell2.number.x !== focusCell.number.x ||
                    cell2.number.y !== focusCell.number.y
                    ) {
                    let indx = this.cellsToHighlight2.indexOf(cell2);
                    this.cellsToHighlight2.splice(indx, 1);
                    }
                }
                if (
                    !this.cellsToHighlight2.find(
                    (x) =>
                        x.number.x === focusCell.number.x && x.number.y === focusCell.number.y
                    )
                ) {
                    this.cellsToHighlight2.push({
                    number: {
                        x: focusCell.number.x,
                        y: focusCell.number.y,
                    },
                    count: 0,
                    limit: 0,
                    });
                }
                // console.log('this.cellsToHighlight2',this.cellsToHighlight2);
                }
            }
        
            if (this.camera.pan.x < 0) {
                direction = "east";
                cellOffsetX = parseInt((this.camera.pan.x / 50).toFixed(0));
            }
            if (this.camera.pan.x > 0) {
                direction = "west";
                cellOffsetX = parseInt((this.camera.pan.x / 50).toFixed(0));
            }
            if (this.camera.pan.y > 0) {
                direction = "north";
                cellOffsetY = parseInt((this.camera.pan.y / 25).toFixed(0));
            }
            if (this.camera.pan.y < 0) {
                direction = "south";
                cellOffsetY = parseInt((this.camera.pan.y / 25).toFixed(0));
            }
        
            if (this.camera.pan.x === -1) {
                cellOffsetX = 0;
            }
            if (this.camera.pan.y === -1) {
                cellOffsetY = 0;
            }
        
            // console.log('cellOffsetX',cellOffsetX,'cellOffsetY',cellOffsetY);
        }
        
      
    //   setState(prev => ({
    //     ...prev,
    //     // ...
    //   }));

    }, [context.global_function_component_triggers.findFocusCell]); // <--- dependency


    // useEffect(() => {
    //   // ...logic...
    // }, [context.global_function_component_triggers.drawGridInit.prop1]);


  return null;
};

export default FindFocusCell;