export function processPlayerSpriteSheet(app, plyr, x, y, finalAnimIndex, weapon, updatedPlayerImg) {
  let frameIndexBase;
  let increment;
  let frameTypeIndex;
  let remainder;
  let newIndex;

  // SET ANIMATION INDEX USED FOR SPRITE SHEET STEPPING BASED ON ACTION
  // FOR TESTING BY CALLING ONLY @ 1 CELL
  if (plyr.currentPosition.cell.number.x === x && plyr.currentPosition.cell.number.y === y && plyr.number === 1) {
    switch (plyr.action) {
      case "moving":
        let moveSpeed = plyr.speed.move;
        if (plyr.stamina.current < 1) {
          moveSpeed = 0.05;
        }
        if (plyr.terrainMoveSpeed.state === true) {
          moveSpeed = plyr.terrainMoveSpeed.speed;
        }
        if (plyr.pushing.state === true) {
          moveSpeed = plyr.pushing.moveSpeed;
        }
        if (plyr.pulling.state === true) {
          moveSpeed = plyr.pulling.moveSpeed;
        }
        if (plyr.pushed.state === true) {
          moveSpeed = plyr.pushed.moveSpeed;
        }
        if (plyr.pulled.state === true) {
          moveSpeed = plyr.pulled.moveSpeed;
        }

        let rangeIndex = plyr.speed.range.indexOf(moveSpeed);
        let moveAnimIndex = app.moveStepRef[rangeIndex].indexOf(plyr.moving.step);
        finalAnimIndex = moveAnimIndex + 1;
        // console.log("draw player step", {
        //   plyr_number: plyr.number,
        //   move_speed: plyr.speed.move,
        //   moveSpeed: moveSpeed,
        //   step: plyr.moving.step,
        //   stamina: plyr.stamina.current,
        //   finalAnimIndex: finalAnimIndex,
        // });

        if (plyr.target.cell1.void == true) {
          // console.log('anim testing mv void spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
        }
        break;
      case "jumping":
        let rangeIndex4 = plyr.speed.range.indexOf(0.1);
        let moveAnimIndex4 = app.moveStepRef[rangeIndex4].indexOf(plyr.moving.step);
        finalAnimIndex = moveAnimIndex4;
        // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
        break;
      case "strafe moving":
        if (plyr.pushBack.state === true) {
          let rangeIndex3 = plyr.speed.range.indexOf(plyr.speed.move);
          let moveAnimIndex3 = app.moveStepRef[rangeIndex3].indexOf(plyr.moving.step);
          finalAnimIndex = moveAnimIndex3;
          //   console.log("anim testing pushback spd", plyr.speed.move, "step", plyr.moving.step, "indx", finalAnimIndex);
        } else {
          let moveSpeed = plyr.speed.move;
          // if (plyr.pushing.state === true) {
          //   moveSpeed = plyr.pushing.moveSpeed;
          // }
          if (plyr.pulling.state === true) {
            moveSpeed = plyr.pulling.moveSpeed;
          }
          if (plyr.pushed.state === true) {
            moveSpeed = plyr.pushed.moveSpeed;
          }
          if (plyr.pulled.state === true) {
            moveSpeed = plyr.pulled.moveSpeed;
          }
          let rangeIndex2 = plyr.speed.range.indexOf(moveSpeed);
          let moveAnimIndex2 = app.moveStepRef[rangeIndex2].indexOf(plyr.moving.step);
          finalAnimIndex = moveAnimIndex2;
          //   console.log("anim testing strafe mv spd", plyr.speed.move, "step", plyr.moving.step, "indx", finalAnimIndex);
        }
        break;
      case "flanking":
        let rangeIndex6 = plyr.speed.range.indexOf(0.2);
        let moveAnimIndex6 = app.moveStepRef[rangeIndex6].indexOf(plyr.moving.step);
        finalAnimIndex = moveAnimIndex6;
        console.log("flanking step", plyr.flanking.step, "step", plyr.moving.step, "anim indx", finalAnimIndex);
        // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
        break;
      case "attacking":
        // let animIndex = plyr.attacking.count -1;
        let animIndex;
        // if (
        //   plyr.elasticCounter.state === true &&
        //   plyr.elasticCounter.type === "attacking"
        // ) {
        //   if (plyr.elasticCounter.countUp.state === true) {
        //     animIndex = plyr.elasticCounter.countUp.count - 1;
        //   }
        //   if (plyr.elasticCounter.pause.state === true) {
        //     if (plyr.elasticCounter.pause.count < 11) {
        //       animIndex = plyr.elasticCounter.pause.count - 1;
        //     } else {
        //       if (plyr.elasticCounter.pause.count % 10 === 0) {
        //         animIndex = 9;
        //         // animIndex5 = 10;
        //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
        //       } else {
        //         let mod = Math.floor(plyr.elasticCounter.pause.count / 10) * 10;
        //         animIndex = plyr.elasticCounter.pause.count - mod - 1;
        //       }
        //     }
        //   }
        //   if (plyr.elasticCounter.countDown.state === true) {
        //     animIndex = plyr.elasticCounter.countDown.count - 1;
        //   }
        // } else {
        //   animIndex = plyr.attacking.count - 1;
        // }
        animIndex = plyr.attacking.count - 1;

        frameIndexBase = app.actionAnimFrameTypeCountRef[plyr.action].sheetLength / app.actionAnimFrameTypeCountRef[plyr.action].typeCount;
        increment = Math.ceil(plyr[plyr.action].limit / app.actionAnimFrameTypeCountRef[plyr.action].typeCount);
        frameTypeIndex = Math.floor(plyr[plyr.action].count / increment);
        remainder = plyr[plyr.action].count % increment;
        newIndex = frameIndexBase * frameTypeIndex + remainder;

        finalAnimIndex = newIndex;
        // finalAnimIndex = animIndex;
        // console.log(
        //   "anim testing atk",
        //   plyr.attacking.count,
        //   plyr.attacking.limit,
        //   finalAnimIndex
        // );
        break;
      case "defending":
        let animIndex2 = plyr.defending.count - 1;
        // if (plyr.defending.decay.state !== true) {
        //   if (plyr.defending.count > 0) {
        //     finalAnimIndex = animIndex2;
        //     // console.log('anim testing def wind up',plyr.defending.count,'plyr',plyr.number, animIndex2);
        //   }
        //   if (plyr.defending.count === 0) {
        //     let animIndex2a = 5;
        //     finalAnimIndex = animIndex2a;
        //     // console.log('anim testing def held',plyr.defending.count,'plyr',plyr.number, animIndex2a);
        //   }
        // }
        // if (plyr.defending.decay.state === true) {
        //   if (plyr.defending.decay.count < 11) {
        //     animIndex2 = plyr.defending.decay.count - 1;
        //   } else {
        //     if (plyr.defending.decay.count % 10 === 0) {
        //       animIndex2 = 9;
        //     } else {
        //       let mod = Math.floor(plyr.defending.decay.count / 10) * 10;
        //       animIndex2 = plyr.defending.decay.count - mod - 1;
        //     }
        //   }
        //   finalAnimIndex = animIndex2;
        // }
        frameIndexBase = app.actionAnimFrameTypeCountRef[plyr.action].sheetLength / app.actionAnimFrameTypeCountRef[plyr.action].typeCount;
        increment = Math.ceil(plyr[plyr.action].limit / app.actionAnimFrameTypeCountRef[plyr.action].typeCount);
        frameTypeIndex = Math.floor(plyr[plyr.action].count / increment);
        remainder = plyr[plyr.action].count % increment;
        newIndex = frameIndexBase * frameTypeIndex + remainder;

        finalAnimIndex = newIndex;

        break;
      case "idle":
        if (plyr.number === 1) {
          // console.log('anim testing idle',plyr.idleAnim.count,'plyr',plyr.number);
        }
        if (plyr.number === 2) {
          // console.log('anim testing idle',plyr.idleAnim.count,'plyr',plyr.number);
        }
        let animIndex3 = plyr.idleAnim.count + 1;
        finalAnimIndex = animIndex3;
        // finalAnimIndex = 1;
        break;
      case "falling":
        let animIndex4 = plyr.falling.count - 1;
        finalAnimIndex = animIndex4;
        // console.log("anim testing fall", plyr.falling.count, "plyr", plyr.number);
        break;
      case "deflected":
        let animIndex5 = plyr.success.deflected.count - 1;
        // if (
        //   plyr.elasticCounter.state === true &&
        //   plyr.elasticCounter.type === "deflected"
        // ) {
        //   if (plyr.elasticCounter.countUp.state === true) {
        //     animIndex5 = plyr.elasticCounter.countUp.count - 1;
        //   }
        //   if (plyr.elasticCounter.pause.state === true) {
        //     if (plyr.elasticCounter.pause.count < 11) {
        //       animIndex5 = plyr.elasticCounter.pause.count - 1;
        //     } else {
        //       if (plyr.elasticCounter.pause.count % 10 === 0) {
        //         animIndex5 = 9;
        //         // animIndex5 = 10;
        //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
        //       } else {
        //         let mod = Math.floor(plyr.elasticCounter.pause.count / 10) * 10;
        //         animIndex5 = plyr.elasticCounter.pause.count - mod - 1;
        //       }
        //     }
        //   }
        //   if (plyr.elasticCounter.countDown.state === true) {
        //     animIndex5 = plyr.elasticCounter.countDown.count - 1;
        //   }
        // }

        if (plyr.halfPushBack.state === true) {
          if (plyr.halfPushBack.countUp.state === true) {
            animIndex5 = plyr.halfPushBack.countUp.count - 1;
          }
          if (plyr.halfPushBack.countDown.state === true) {
            animIndex5 = plyr.halfPushBack.countDown.count - 1;
          }
        }
        finalAnimIndex = animIndex5;
        // console.log("anim testing dflct", {
        //   // plyr_number: plyr.number,
        //   count: plyr.success.deflected.count,
        //   // elastic_count_countUp: plyr.elasticCounter.countUp.count,
        //   elastic_count_pause: plyr.elasticCounter.pause.count,
        //   // elastic_count_countDown: plyr.elasticCounter.countDown.count,
        //   finalAnimIndex: finalAnimIndex,
        // });
        break;
      case "dodging":
        let animIndex7 = plyr.dodging.count - 1;
        // if (
        //   plyr.elasticCounter.state === true &&
        //   plyr.elasticCounter.type === "dodging"
        // ) {
        //   if (plyr.elasticCounter.countUp.state === true) {
        //     // animIndex7 = plyr.elasticCounter.countUp.count-1;
        //     if (plyr.elasticCounter.countUp.count < 11) {
        //       animIndex7 = plyr.elasticCounter.countUp.count - 1;
        //     } else {
        //       if (plyr.elasticCounter.countUp.count % 10 === 0) {
        //         animIndex7 = 9;
        //         // animIndex5 = 10;
        //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
        //       } else {
        //         let mod = Math.floor(plyr.elasticCounter.countUp.count / 10) * 10;
        //         animIndex7 = plyr.elasticCounter.countUp.count - mod - 1;
        //       }
        //     }
        //   }
        //   if (plyr.elasticCounter.pause.state === true) {
        //     if (plyr.elasticCounter.pause.count < 11) {
        //       animIndex7 = plyr.elasticCounter.pause.count - 1;
        //     } else {
        //       if (plyr.elasticCounter.pause.count % 10 === 0) {
        //         animIndex7 = 9;
        //         // animIndex5 = 10;
        //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
        //       } else {
        //         let mod = Math.floor(plyr.elasticCounter.pause.count / 10) * 10;
        //         animIndex7 = plyr.elasticCounter.pause.count - mod - 1;
        //       }
        //     }
        //   }
        //   if (plyr.elasticCounter.countDown.state === true) {
        //     // animIndex7 = plyr.elasticCounter.countDown.count-1;
        //     if (plyr.elasticCounter.countDown.count < 11) {
        //       animIndex7 = plyr.elasticCounter.countDown.count - 1;
        //     } else {
        //       if (plyr.elasticCounter.countDown.count % 10 === 0) {
        //         animIndex7 = 9;
        //         // animIndex5 = 10;
        //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
        //       } else {
        //         let mod =
        //           Math.floor(plyr.elasticCounter.countDown.count / 10) * 10;
        //         animIndex7 = plyr.elasticCounter.countDown.count - mod - 1;
        //       }
        //     }
        //   }
        // }
        finalAnimIndex = animIndex7;
        console.log("anim testing dodge", plyr.dodging.count, "indx", finalAnimIndex);
        break;
    }
  }
  // FOR TESTING BY CALLING ONLY @ 1 CELL

  // REAL DEAL
  switch (plyr.action) {
    case "moving":
      let moveSpeed = plyr.speed.move;
      if (plyr.stamina.current < 1) {
        moveSpeed = 0.05;
      }
      if (plyr.terrainMoveSpeed.state === true) {
        moveSpeed = plyr.terrainMoveSpeed.speed;
      }
      if (plyr.pushing.state === true) {
        moveSpeed = plyr.pushing.moveSpeed;
      }
      if (plyr.pulling.state === true) {
        moveSpeed = plyr.pulling.moveSpeed;
      }
      if (plyr.pushed.state === true) {
        moveSpeed = plyr.pushed.moveSpeed;
      }
      if (plyr.pulled.state === true) {
        moveSpeed = plyr.pulled.moveSpeed;
      }
      let rangeIndex = plyr.speed.range.indexOf(moveSpeed);
      let moveAnimIndex = app.moveStepRef[rangeIndex].indexOf(plyr.moving.step);
      finalAnimIndex = moveAnimIndex + 1;
      // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
      if (plyr.target.cell1.void == true) {
        // console.log('anim testing mv void spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
      }
      break;
    case "jumping":
      let rangeIndex4 = plyr.speed.range.indexOf(0.1);
      let moveAnimIndex4 = app.moveStepRef[rangeIndex4].indexOf(plyr.moving.step);
      finalAnimIndex = moveAnimIndex4;
      // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
      break;
    case "strafe moving":
      if (plyr.pushBack.state === true) {
        let rangeIndex3 = plyr.speed.range.indexOf(plyr.speed.move);
        let moveAnimIndex3 = app.moveStepRef[rangeIndex3].indexOf(plyr.moving.step);
        finalAnimIndex = moveAnimIndex3;
        // console.log('anim testing pushback spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number);
      } else {
        let moveSpeed = plyr.speed.move;
        // if (plyr.pushing.state === true) {
        //   moveSpeed = plyr.pushing.moveSpeed;
        // }
        if (plyr.pulling.state === true) {
          moveSpeed = plyr.pulling.moveSpeed;
        }
        if (plyr.pushed.state === true) {
          moveSpeed = plyr.pushed.moveSpeed;
        }
        if (plyr.pulled.state === true) {
          moveSpeed = plyr.pulled.moveSpeed;
        }
        let rangeIndex2 = plyr.speed.range.indexOf(moveSpeed);
        let moveAnimIndex2 = app.moveStepRef[rangeIndex2].indexOf(plyr.moving.step);
        finalAnimIndex = moveAnimIndex2;
        // console.log('anim testing strafe mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number);
      }
      break;
    case "flanking":
      let rangeIndex6 = plyr.speed.range.indexOf(0.2);
      let moveAnimIndex6 = app.moveStepRef[rangeIndex6].indexOf(plyr.moving.step);
      finalAnimIndex = moveAnimIndex6;
      // console.log('flanking step',plyr.flanking.step,'step',plyr.moving.step);
      // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
      break;
    case "attacking":
      // let animIndex = plyr.attacking.count -1;
      let animIndex;

      // if (
      //   plyr.elasticCounter.state === true &&
      //   plyr.elasticCounter.type === "attacking"
      // ) {
      //   if (plyr.elasticCounter.countUp.state === true) {
      //     animIndex = plyr.elasticCounter.countUp.count - 1;
      //   }
      //   if (plyr.elasticCounter.pause.state === true) {
      //     if (plyr.elasticCounter.pause.count < 11) {
      //       animIndex = plyr.elasticCounter.pause.count - 1;
      //     } else {
      //       if (plyr.elasticCounter.pause.count % 10 === 0) {
      //         animIndex = 9;
      //         // animIndex5 = 10;
      //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
      //       } else {
      //         let mod = Math.floor(plyr.elasticCounter.pause.count / 10) * 10;
      //         animIndex = plyr.elasticCounter.pause.count - mod - 1;
      //       }
      //     }
      //   }
      //   if (plyr.elasticCounter.countDown.state === true) {
      //     animIndex = plyr.elasticCounter.countDown.count - 1;
      //   }
      // } else {
      //   animIndex = plyr.attacking.count - 1;
      // }

      // animIndex = plyr.attacking.count - 1;
      // finalAnimIndex = animIndex;
      frameIndexBase = app.actionAnimFrameTypeCountRef[plyr.action].sheetLength / app.actionAnimFrameTypeCountRef[plyr.action].typeCount;
      increment = Math.ceil(plyr[plyr.action].limit / app.actionAnimFrameTypeCountRef[plyr.action].typeCount);
      frameTypeIndex = Math.floor(plyr[plyr.action].count / increment);
      remainder = plyr[plyr.action].count % increment;
      newIndex = frameIndexBase * frameTypeIndex + remainder;

      finalAnimIndex = newIndex;
      // console.log('anim testing atk',plyr.attacking.count,'plyr',plyr.number);
      break;
    case "defending":
      let animIndex2 = plyr.defending.count - 1;

      // if (plyr.defending.decay.state !== true) {
      //   if (plyr.defending.count > 0) {
      //     finalAnimIndex = animIndex2;
      //     // console.log('anim testing def wind up',plyr.defending.count,'plyr',plyr.number, animIndex2);
      //   }
      //   if (plyr.defending.count === 0) {
      //     let animIndex2a = 5;
      //     finalAnimIndex = animIndex2a;
      //     // console.log('anim testing def held',plyr.defending.count,'plyr',plyr.number, animIndex2a);
      //   }
      // }
      // if (plyr.defending.decay.state === true) {
      //   if (plyr.defending.decay.count < 11) {
      //     animIndex2 = plyr.defending.decay.count - 1;
      //   } else {
      //     if (plyr.defending.decay.count % 10 === 0) {
      //       animIndex2 = 9;
      //     } else {
      //       let mod = Math.floor(plyr.defending.decay.count / 10) * 10;
      //       animIndex2 = plyr.defending.decay.count - mod - 1;
      //     }
      //   }
      //   finalAnimIndex = animIndex2;
      // }
      frameIndexBase = app.actionAnimFrameTypeCountRef[plyr.action].sheetLength / app.actionAnimFrameTypeCountRef[plyr.action].typeCount;
      increment = Math.ceil(plyr[plyr.action].limit / app.actionAnimFrameTypeCountRef[plyr.action].typeCount);
      frameTypeIndex = Math.floor(plyr[plyr.action].count / increment);
      remainder = plyr[plyr.action].count % increment;
      newIndex = frameIndexBase * frameTypeIndex + remainder;

      finalAnimIndex = newIndex;

      break;
    case "idle":
      if (plyr.number === 1) {
        // console.log('anim testing idle',plyr.idleAnim.count,'plyr',plyr.number);
      }
      if (plyr.number === 2) {
        // console.log('anim testing idle',plyr.idleAnim.count,'plyr',plyr.number);
      }
      let animIndex3 = plyr.idleAnim.count + 1;
      finalAnimIndex = animIndex3;
      // finalAnimIndex = 1;
      break;
    case "falling":
      let animIndex4 = plyr.falling.count - 1;
      finalAnimIndex = animIndex4;
      // console.log('anim testing fall',plyr.falling.count,'plyr',plyr.number);
      break;
    case "deflected":
      let animIndex5 = plyr.success.deflected.count - 1;

      // if (
      //   plyr.elasticCounter.state === true &&
      //   plyr.elasticCounter.type === "deflected"
      // ) {
      //   if (plyr.elasticCounter.countUp.state === true) {
      //     animIndex5 = plyr.elasticCounter.countUp.count - 1;
      //   }
      //   if (plyr.elasticCounter.pause.state === true) {
      //     if (plyr.elasticCounter.pause.count < 11) {
      //       animIndex5 = plyr.elasticCounter.pause.count - 1;
      //     } else {
      //       if (plyr.elasticCounter.pause.count % 10 === 0) {
      //         animIndex5 = 9;
      //         // animIndex5 = 10;
      //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
      //       } else {
      //         let mod = Math.floor(plyr.elasticCounter.pause.count / 10) * 10;
      //         animIndex5 = plyr.elasticCounter.pause.count - mod - 1;
      //       }
      //     }
      //   }
      //   if (plyr.elasticCounter.countDown.state === true) {
      //     animIndex5 = plyr.elasticCounter.countDown.count - 1;
      //   }
      // }
      if (plyr.halfPushBack.state === true) {
        if (plyr.halfPushBack.countUp.state === true) {
          animIndex5 = plyr.halfPushBack.countUp.count - 1;
        }
        if (plyr.halfPushBack.countDown.state === true) {
          animIndex5 = plyr.halfPushBack.countDown.count - 1;
        }
      }
      finalAnimIndex = animIndex5;
      // console.log('anim testing dflct',plyr.success.deflected.count,'plyr',plyr.number);
      break;
    case "dodging":
      let animIndex7 = plyr.dodging.count - 1;

      // if (
      //   plyr.elasticCounter.state === true &&
      //   plyr.elasticCounter.type === "dodging"
      // ) {
      //   if (plyr.elasticCounter.countUp.state === true) {
      //     // animIndex7 = plyr.elasticCounter.countUp.count-1;

      //     if (plyr.elasticCounter.countUp.count < 11) {
      //       animIndex7 = plyr.elasticCounter.countUp.count - 1;
      //     } else {
      //       if (plyr.elasticCounter.countUp.count % 10 === 0) {
      //         animIndex7 = 9;
      //         // animIndex5 = 10;
      //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
      //       } else {
      //         let mod = Math.floor(plyr.elasticCounter.countUp.count / 10) * 10;
      //         animIndex7 = plyr.elasticCounter.countUp.count - mod - 1;
      //       }
      //     }
      //   }
      //   if (plyr.elasticCounter.pause.state === true) {
      //     if (plyr.elasticCounter.pause.count < 11) {
      //       animIndex7 = plyr.elasticCounter.pause.count - 1;
      //     } else {
      //       if (plyr.elasticCounter.pause.count % 10 === 0) {
      //         animIndex7 = 9;
      //         // animIndex5 = 10;
      //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
      //       } else {
      //         let mod = Math.floor(plyr.elasticCounter.pause.count / 10) * 10;
      //         animIndex7 = plyr.elasticCounter.pause.count - mod - 1;
      //       }
      //     }
      //   }
      //   if (plyr.elasticCounter.countDown.state === true) {
      //     // animIndex7 = plyr.elasticCounter.countDown.count-1;

      //     if (plyr.elasticCounter.countDown.count < 11) {
      //       animIndex7 = plyr.elasticCounter.countDown.count - 1;
      //     } else {
      //       if (plyr.elasticCounter.countDown.count % 10 === 0) {
      //         animIndex7 = 9;
      //         // animIndex5 = 10;
      //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
      //       } else {
      //         let mod = Math.floor(plyr.elasticCounter.countDown.count / 10) * 10;
      //         animIndex7 = plyr.elasticCounter.countDown.count - mod - 1;
      //       }
      //     }
      //   }
      // }

      finalAnimIndex = animIndex7;
      // console.log('anim testing dodge',plyr.dodging.count,'plyr',plyr.number);
      break;
  }

  // SPRITE SHEET CHAR AVATAR & ACTION SWITCH!
  if (plyr.ai.state === false) {
    switch (plyr.action) {
      case "idle":
        updatedPlayerImg = app.playerImgs[plyr.number - 1].idle[weapon];
        break;
      case "moving":
        if (plyr.pushing.state === true) {
          updatedPlayerImg = app.playerImgs[plyr.number - 1].pushing[weapon];
        }
        if (plyr.pulled.state === true) {
          updatedPlayerImg = app.playerImgs[plyr.number - 1].pulled[weapon];
        }
        if (plyr.pushed.state === true) {
          updatedPlayerImg = app.playerImgs[plyr.number - 1].pushed[weapon];
        } else {
          updatedPlayerImg = app.playerImgs[plyr.number - 1].walking[weapon];
        }

        break;
      case "jumping":
        updatedPlayerImg = app.playerImgs[plyr.number - 1].jumping[weapon];
        break;
      case "flanking":
        updatedPlayerImg = app.playerImgs[plyr.number - 1].flanking[weapon];
        break;
      case "strafe moving":
        if (plyr.pushBack.state === true) {
          updatedPlayerImg = app.playerImgs[plyr.number - 1].pushBack[weapon];
        }
        if (plyr.pulling.state === true) {
          updatedPlayerImg = app.playerImgs[plyr.number - 1].pulling[weapon];
        }
        if (plyr.pulled.state === true) {
          updatedPlayerImg = app.playerImgs[plyr.number - 1].pulled[weapon];
        }
        if (plyr.pushed.state === true) {
          updatedPlayerImg = app.playerImgs[plyr.number - 1].pushed[weapon];
        } else {
          updatedPlayerImg = app.playerImgs[plyr.number - 1].strafing[weapon];
        }
        break;
      case "falling":
        updatedPlayerImg = app.playerImgs[plyr.number - 1].falling[weapon];
        break;
      case "attacking":
        updatedPlayerImg = app.playerImgs[plyr.number - 1].attacking[weapon];
        break;
      case "defending":
        updatedPlayerImg = app.playerImgs[plyr.number - 1].defending[weapon];
        break;
      case "deflected":
        updatedPlayerImg = app.playerImgs[plyr.number - 1].deflected[weapon];
        break;
      case "dodging":
        updatedPlayerImg = app.playerImgs[plyr.number - 1].dodging[weapon];
        break;
      case "dead":
        updatedPlayerImg = app.playerImgs[plyr.number - 1].idle[weapon];
        break;
    }
  }
  if (plyr.ai.state === true) {
    let plyrImgIndex;
    if (plyr.ai.imgType === "A") {
      plyrImgIndex = 2;
    } else if (plyr.ai.imgType === "B") {
      plyrImgIndex = 3;
    }

    switch (plyr.action) {
      case "idle":
        updatedPlayerImg = app.playerImgs[plyrImgIndex].idle[weapon];
        break;
      case "moving":
        if (plyr.pushing.state === true) {
          updatedPlayerImg = app.playerImgs[plyrImgIndex].pushing[weapon];
        }
        if (plyr.pulled.state === true) {
          updatedPlayerImg = app.playerImgs[plyrImgIndex].pulled[weapon];
        }
        if (plyr.pushed.state === true) {
          updatedPlayerImg = app.playerImgs[plyrImgIndex].pushed[weapon];
        } else {
          updatedPlayerImg = app.playerImgs[plyrImgIndex].walking[weapon];
        }
        break;
      case "jumping":
        updatedPlayerImg = app.playerImgs[plyrImgIndex].jumping[weapon];
        break;
      case "flanking":
        updatedPlayerImg = app.playerImgs[plyrImgIndex].flanking[weapon];
        break;
      case "strafe moving":
        if (plyr.pushBack.state === true) {
          updatedPlayerImg = app.playerImgs[plyrImgIndex].pushBack[weapon];
        }
        if (plyr.pulling.state === true) {
          updatedPlayerImg = app.playerImgs[plyrImgIndex].pulling[weapon];
        }
        if (plyr.pulled.state === true) {
          updatedPlayerImg = app.playerImgs[plyrImgIndex].pulled[weapon];
        }
        if (plyr.pushed.state === true) {
          updatedPlayerImg = app.playerImgs[plyrImgIndex].pushed[weapon];
        } else {
          updatedPlayerImg = app.playerImgs[plyrImgIndex].strafing[weapon];
        }
        break;
      case "falling":
        updatedPlayerImg = app.playerImgs[plyrImgIndex].falling[weapon];
        break;
      case "attacking":
        updatedPlayerImg = app.playerImgs[plyrImgIndex].attacking[weapon];
        break;
      case "defending":
        updatedPlayerImg = app.playerImgs[plyrImgIndex].defending[weapon];
        break;
      case "deflected":
        updatedPlayerImg = app.playerImgs[plyrImgIndex].deflected[weapon];
        break;
      case "dodging":
        updatedPlayerImg = app.playerImgs[plyrImgIndex].dodging[weapon];
        break;
      case "dead":
        updatedPlayerImg = app.playerImgs[plyrImgIndex].idle[weapon];
        break;
    }
  }

  return {
    updatedPlayerImg,
    finalAnimIndex,
  };
}
