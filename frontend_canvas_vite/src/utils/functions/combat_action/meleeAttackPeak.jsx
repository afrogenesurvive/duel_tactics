export function meleeAttackPeak(app, ownerType, owner) {
  console.log("meleeAttackPeak", {
    ownerType: ownerType,
    owner_id: ownerType === "player" ? owner.number : owner.id,
    location:
      ownerType === "player"
        ? owner.currentPosition.cell.number
        : app.gridInfo.find((x) => x[ownerType].state === true && x[ownerType].id === owner.id)?.number,
  });

  let myCellBlock;
  let ownerWeaponName;
  let ownerWeaponType;
  let targetCell1;
  let targetCell2;
  let cell1Free;
  let cell2Free;
  let myCell;
  let ownerDirection;
  let cell1Item;
  let cell1Rubble;
  let cell2Item;
  let cell2Rubble;

  let playerAttackStamType;

  if (ownerType === "player") {
    myCell = app.gridInfo.find(
      (elem) => elem.number.x === owner.currentPosition.cell.number.x && elem.number.y === owner.currentPosition.cell.number.y,
    );
    targetCell1 = app.gridInfo.find((x) => x.number.x === owner.target.cell1.number.x && x.number.y === owner.target.cell1.number.y);
    targetCell2 = app.gridInfo.find((x) => x.number.x === owner.target.cell2.number.x && x.number.y === owner.target.cell2.number.y);
    cell1Free = owner.target.cell1.free;
    cell2Free = owner.target.cell2.free;
    myCellBlock = owner.target.myCellBlock;
    ownerDirection = owner.direction;
    ownerWeaponType = owner.currentWeapon.type;
    ownerWeaponName = owner.currentWeapon.name;
    cell1Item = owner.target.cell1.occupant.type === "item";
    cell1Rubble = owner.target.cell1.occupant.type === "rubble";
    cell2Item = owner.target.cell2.occupant.type === "item";
    cell2Rubble = owner.target.cell2.occupant.type === "rubble";
  } else {
    myCell = app.gridInfo.find((x) => x[ownerType].state === true && x[ownerType].id === owner.id);
    ownerDirection = app.getDirectionFromCells(myCell.number, owner.trap.target);
    let cell1 = app.getCellFromDirection(1, myCell.number, ownerDirection);
    let cell2 = app.getCellFromDirection(2, myCell.number, ownerDirection);
    targetCell1 = app.gridInfo.find((x) => x.number.x === cell1.x && x.number.y === cell1.y);
    targetCell2 = app.gridInfo.find((x) => x.number.x === cell2.x && x.number.y === cell2.y);
    cell1Free = app.checkCell(targetCell1.number, []);
    cell2Free = app.checkCell(targetCell2.number, []);
    myCellBlock = app.checkMyCellBarrier(ownerDirection, myCell);

    ownerWeaponType = owner.trap.item.subType;
    ownerWeaponName = owner.trap.item.name;
    cell1Item = targetCell1.item.name !== "";
    cell1Rubble = targetCell1.rubble === true;
    cell2Item = targetCell2.item.name !== "";
    cell2Rubble = targetCell2.rubble === true;
  }
  let voidTarget = false;
  if (ownerWeaponType === "sword" && !targetCell1) {
    voidTarget = true;
    console.log("Target is edge void. Do nothing.");
  } else {
    if (myCellBlock !== true) {
      let boltTarget1 = false;
      let boltTarget2 = false;
      boltTarget1 = app.isBoltInCell(targetCell1.number);
      if (targetCell2?.number) {
        boltTarget2 = app.isBoltInCell(targetCell2.number);
      }

      // SET STAM TYPE
      if (ownerType === "player") {
        if (owner.currentWeapon.name === "") {
          playerAttackStamType = app.staminaCostRef.attack.unarmed.normal;
          if (owner.attacking.blunt === true) {
            playerAttackStamType = app.staminaCostRef.attack.unarmed.blunt;
          }
        }
        if (owner.attacking.blunt === true && owner.currentWeapon.name !== "") {
          playerAttackStamType = app.staminaCostRef.attack[owner.currentWeapon.type].blunt;
        }
        if (owner.currentWeapon.name !== "") {
          playerAttackStamType = app.staminaCostRef.attack[owner.currentWeapon.type].normal;
        }
      }

      if (ownerWeaponType === "spear") {
        app.cellsUnderAttack.push({
          number: {
            x: targetCell1.number.x,
            y: targetCell1.number.y,
          },
          count: 1,
          limit: 8,
        });

        if (targetCell2) {
          app.cellsUnderAttack.push({
            number: {
              x: targetCell2.number.x,
              y: targetCell2.number.y,
            },
            count: 1,
            limit: 8,
          });
        }
        // TARGET CELL 1 IS NOT FREE, ITEM, BOLT, RUBBLE, ATTACK CELL1

        let barrier1FacingMe =
          targetCell1.barrier.state === true &&
          (targetCell1.barrier.position === ownerDirection || targetCell1.barrier.position === app.getOppositeDirection(ownerDirection));
        let barrier2FacingMe = targetCell2?.barrier.state === true && targetCell2?.barrier.position === app.getOppositeDirection(ownerDirection);
        if (cell1Free !== true || cell1Item === true || cell1Rubble === true || boltTarget1 === true || barrier1FacingMe) {
          console.log(
            "melee attack peak:",
            ownerType,
            owner.number,
            owner.id,
            "hit player, obstacle, bolt, item  or rubble w/ ",
            ownerWeaponType,
            " @ ",
            targetCell1.number,
          );
          app.meleeAttackParse(ownerType, owner, 1);
        }

        // TARGET CELL 1 IS FREE NOT ITEM, BOLT, RUBBLE
        if (cell1Free === true && cell1Item !== true && cell1Rubble !== true && boltTarget1 !== true && !barrier1FacingMe) {
          // TARGET CELL 2 IS NOT FREE HAS ITEM, BOLT, RUBBLE ATTACK
          if (cell2Free !== true || cell2Item === true || cell2Rubble === true || boltTarget2 === true || barrier2FacingMe) {
            // console.log(
            //   "melee attack peak:",
            //   ownerType,
            //   owner.number,
            //   owner.id,
            //   "hit player, obstacle, bolt, item or rubble w/ ",
            //   ownerWeaponType,
            //   " @ ",
            //   targetCell2.number
            // );
            app.meleeAttackParse(ownerType, owner, 2);
          }

          // TARGET CELL2 IS FREE AND NOT ITEM, BOLT, RUBBLE, MISS
          if (targetCell2 && cell2Free === true && cell2Item !== true && cell2Rubble !== true && boltTarget2 !== true && !barrier2FacingMe) {
            if (ownerType === "player") {
              if (!owner.popups.find((x) => x.msg === "missedAttack2")) {
                owner.popups.push({
                  state: false,
                  count: 0,
                  limit: 30,
                  type: "",
                  position: "",
                  msg: "missedAttack2",
                  img: "",
                });
              }
              owner.stamina.current -= playerAttackStamType.pre;
              console.log(
                "melee attack peak:",
                ownerType,
                owner.number,
                owner.id,
                " attacked empty cell @ ",
                targetCell2.number,
                "w/",
                ownerWeaponType,
              );
            }
          }
        }
      }

      if (ownerWeaponType === "sword") {
        app.cellsUnderAttack.push({
          number: {
            x: targetCell1.number.x,
            y: targetCell1.number.y,
          },
          count: 1,
          limit: 8,
        });

        // TAGET CELL 1 IS FREE NO ITEM OR BOLT, MISS
        let barrierFacingMe = targetCell1.barrier.state === true && targetCell1.barrier.position === app.getOppositeDirection(ownerDirection);
        if (cell1Free === true && cell1Item !== true && cell1Rubble !== true && boltTarget1 !== true && !barrierFacingMe) {
          if (ownerType === "player") {
            if (!owner.popups.find((x) => x.msg === "missedAttack2")) {
              owner.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: "missedAttack2",
                img: "",
              });
            }
            owner.stamina.current -= playerAttackStamType.pre;
            console.log(
              "melee attack peak: ",
              ownerType,
              owner.number,
              owner.id,
              " attacked empty cell @ ",
              targetCell1.number,
              "w/",
              ownerWeaponType,
              owner.attacking.direction,
              "time",
              app.time,
            );
          }
        }

        // TARGET CELL 1 IS NOT FREE OR HAS BOLT OR ITEM, ATTACK
        if (cell1Free !== true || cell1Item === true || cell1Rubble === true || boltTarget1 === true || barrierFacingMe) {
          app.meleeAttackParse(ownerType, owner, 1);
          // console.log(
          //   "melee attack peak: ",
          //   ownerType,
          //   owner.number,
          //   owner.id,
          //   " hit player, obstacle, barrier, bolt, item or rubble w/ ",
          //   ownerWeaponType,
          //   " @ ",
          //   targetCell1.number
          // );
        }
      }

      // UNARMED ATTACK
      // CROSSBOW BLUNT ATTACK
      if (ownerType === "player") {
        // UNARMED ATTACK
        let barrierFacingMe = targetCell1.barrier.state === true && targetCell1.barrier.position === app.getOppositeDirection(ownerDirection);
        if (owner.currentWeapon?.name === "") {
          app.cellsUnderAttack.push({
            number: {
              x: owner.target.cell1.number.x,
              y: owner.target.cell1.number.y,
            },
            count: 1,
            limit: 8,
          });

          // TAGET CELL 1 IS FREE NO ITEM OR BOLT, MISS
          if (cell1Free === true && cell1Item !== true && cell1Rubble !== true && boltTarget1 !== true && !barrierFacingMe) {
            if (!owner.popups.find((x) => x.msg === "missedAttack2")) {
              owner.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: "missedAttack2",
                img: "",
              });
            }

            owner.stamina.current -= playerAttackStamType.pre;
            console.log("melee attack peak: ", ownerType, owner.number, owner.id, " attacked empty cell @ ", targetCell1.number, "unarmed");
          }

          // TARGET CELL 1 IS NOT FREE OR HAS BOLT OR ITEM, ATTACK
          if (cell1Free !== true || cell1Item === true || cell1Rubble === true || boltTarget1 === true || barrierFacingMe) {
            app.meleeAttackParse(ownerType, owner, 1);
            // console.log(
            //   "melee attack peak: ",
            //   ownerType,
            //   owner.number,
            //   owner.id,
            //   " hit player, obstacle, barrier, bolt, item or rubble unarmed  @ ",
            //   targetCell1.number
            // );
          }
        }

        // CROSSBOW BLUNT ATTACK
        if (owner.currentWeapon.type === "crossbow" || owner.currentWeapon.type === "longbow") {
          // CROSSBOW BLUNT ATTACK
          if (owner.attacking.blunt === true) {
            app.cellsUnderAttack.push({
              number: {
                x: owner.target.cell1.number.x,
                y: owner.target.cell1.number.y,
              },
              count: 1,
              limit: 8,
            });

            // TARGET CELL 1 FREE NO ITEM OR BOLT
            if (cell1Free === true && cell1Item === true && boltTarget1 !== true && !barrierFacingMe) {
              if (!owner.popups.find((x) => x.msg === "missedAttack2")) {
                owner.popups.push({
                  state: false,
                  count: 0,
                  limit: 30,
                  type: "",
                  position: "",
                  msg: "missedAttack2",
                  img: "",
                });
              }

              owner.stamina.current -= playerAttackStamType.pre;
              console.log(
                "melee attack peak: ",
                ownerType,
                owner.number,
                owner.id,
                " blunt attacked empty cell @ ",
                targetCell1.number,
                "w/",
                owner.currentWeapon.type,
              );
            }

            // TARGET CELL 1 NOT FREE, OR ITEM OR BOLT
            if (cell1Free !== true || player.target.cell1.occupant.type === "item" || boltTarget1 === true || barrierFacingMe) {
              app.meleeAttackParse(ownerType, owner, 1);
              // console.log(
              //   "melee attack peak: ",
              //   ownerType,
              //   owner.number,
              //   owner.id,
              //   " blunt attacked bolt, item or w/ ",
              //   ownerWeaponType,
              //   " @ ",
              //   targetCell1.number
              // );
            }
          }
        }
      } else {
      }
    }

    // ATTACK MY CELL BARRIER
    else {
      console.log("melee attak peak: ", ownerType, owner.number, owner.id, "s mycell barrier is in the way at", myCell.number);
      app.attackCellContents("melee", ownerType, owner, targetCell1, targetCell2, myCell, undefined);
    }
  }

  if (ownerType === "player") {
    app.players[owner.number - 1] = owner;
  }
}
