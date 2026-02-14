export function placeItems(app, args) {
  if (args.init === true && app.disableInitItems === false) {
    // console.log('placing items init');

    if (app.customItemPlacement.state === true) {
      if (app.initItemList.length > app.customItemPlacement.cells.length) {
        console.log("not enough cells assigned for custom placement please add more");
      } else {
        // console.log('start:',app.initItemList.length,app.customItemPlacement.cells.length);

        for (const item2 of app.initItemList) {
          let index = app.initItemList.indexOf(item2);
          let cell3 = {
            number: app.customItemPlacement.cells[index],
            center: { x: undefined, y: undefined },
          };
          let cell3Ref = app.gridInfo.find((elem) => elem.number.x === cell3.number.x && elem.number.y === cell3.number.y);

          if (!cell3Ref) {
            // console.log('!!original item placement not found!!!',index,'/',app.initItemList.length,app.customItemPlacement.cells[index]);
            cell3 = app.getRandomFreeCell();
            // cell3Ref = app.gridInfo.find(elem => elem.number.x === cell3.number.x && elem.number.y === cell3.number.y);
            // console.log('cell doesnt exist @',app.customItemPlacement.cells[index],'pick new cell',cell3,'item',item2.name);
            if (!cell3) {
              cell3Ref = app.gridInfo.filter((x) => x.obstacle.state === true)[0];
              // console.log('no free cells for placement, replace obatcle? @ ',cell3Ref.number);
              if (cell3Ref) {
                let oldLvlData = cell3Ref.levelData.split("_");
                oldLvlData[1] = "*";
                cell3Ref.levelData = oldLvlData.join("_");
                cell3Ref.obstacle.state = false;

                // console.log('clearing obstacle cell for placement',cell3Ref.number,'item',cell3Ref.item.name,index);

                cell3Ref.item.name = item2.name;
                cell3Ref.item.type = item2.type;
                cell3Ref.item.subType = item2.subType;
                cell3Ref.item.effect = item2.effect;
              } else {
                // console.log('init item placement no free cells for app item. skipping');
                continue;
              }
            } else {
              cell3Ref = app.gridInfo.find((elem) => elem.number.x === cell3.number.x && elem.number.y === cell3.number.y);
              // console.log('cell for placement exists',cell3Ref.number,app.customItemPlacement.cells[index],'item',item2.name);
              if (app.customItemPlacement.cells.find((x) => x.x === cell3.number.x && x.y === cell3.number.y)) {
                // console.log('b');
                cell3 = app.getRandomFreeCell();
                cell3Ref = app.gridInfo.find((elem) => elem.number.x === cell3.number.x && elem.number.y === cell3.number.y);

                if (!cell3) {
                  // console.log('here is where 1');
                  continue;
                }
              }

              if (cell3Ref.obstacle.state === true) {
                // console.log('obstacle in original placement cell',cell3Ref.number);
                cell3 = app.getRandomFreeCell();

                if (!cell3) {
                  // console.log('here is where 2');
                  continue;
                } else {
                  cell3Ref = app.gridInfo.find((elem) => elem.number.x === cell3.number.x && elem.number.y === cell3.number.y);
                  // console.log('chose another cell',cell3Ref.number);
                }
              }

              if (cell3Ref) {
                // console.log('cell is clear for placement2',cell3Ref.number,'item',cell3Ref.item.name,index);

                cell3Ref.item.name = item2.name;
                cell3Ref.item.type = item2.type;
                cell3Ref.item.subType = item2.subType;
                cell3Ref.item.effect = item2.effect;
              }
            }
          } else {
            cell3Ref = app.gridInfo.find((elem) => elem.number.x === cell3.number.x && elem.number.y === cell3.number.y);
            // console.log('cell @',app.customItemPlacement.cells[index],cell3Ref.number);
            if (cell3Ref.obstacle.state === true) {
              cell3 = app.getRandomFreeCell();
              // console.log('obstacle found. choose new cell',cell3);

              if (!cell3) {
                // console.log('here is where');
                continue;
              } else {
                cell3Ref = app.gridInfo.find((elem) => elem.number.x === cell3.number.x && elem.number.y === cell3.number.y);
                // console.log('cell is clear for placement3',cell3Ref.number,'item',cell3Ref.item.name,index);
                cell3Ref.item.name = item2.name;
                cell3Ref.item.type = item2.type;
                cell3Ref.item.subType = item2.subType;
                cell3Ref.item.effect = item2.effect;
              }
            } else {
              cell3Ref = app.gridInfo.find((elem) => elem.number.x === cell3.number.x && elem.number.y === cell3.number.y);
              // console.log('cell is clear for placement4',cell3Ref.number,'item',cell3Ref.item.name,index);

              cell3Ref.item.name = item2.name;
              cell3Ref.item.type = item2.type;
              cell3Ref.item.subType = item2.subType;
              cell3Ref.item.effect = item2.effect;
            }
          }
        }
        // app.customItemPlacement.state = false;
      }
    } else {
      for (const item of app.initItemList) {
        // if (item.amount > item.total-1) {
        // console.log('enough items for distribution');
        let cell = {
          x: 0,
          y: 0,
        };
        let checkCell = false;
        while (checkCell === false) {
          cell.x = app.rnJesus(0, app.gridWidth);
          cell.y = app.rnJesus(0, app.gridWidth);
          checkCell = app.checkCell(cell, ["void", "deep"]);
          // console.log(checkCell);
        }
        if (checkCell === true) {
          // console.log('cell free');
          let cellRef = app.gridInfo.find((elem) => elem.number.x === cell.x && elem.number.y === cell.y);
          cellRef.item.name = item.name;
          cellRef.item.type = item.type;
          cellRef.item.subType = item.subType;
          cellRef.item.effect = item.effect;

          // item.amount--
          // console.log('post item', item, cell2.item,cell2.number);
        }
        // }
        // else {
        //   console.log('item stock empty');
        // }
      }
    }
  } else if (args.init !== true) {
    // console.log('placing items mid-game: ',args.item);

    let item = args.item;

    for (const item2 of app.itemList) {
      if (item2.name === item) {
        if (item2.amount > 0) {
          let cell = {
            x: 0,
            y: 0,
          };
          let checkCell = false;
          while (checkCell === false) {
            cell.x = app.rnJesus(0, app.gridWidth);
            cell.y = app.rnJesus(0, app.gridWidth);
            checkCell = app.checkCell(cell, ["void", "deep"]);
          }
          if (checkCell === true) {
            let cell2 = app.gridInfo.find((elem) => elem.number.x === cell.x && elem.number.y === cell.y);
            cell2.item.name = item2.name;
            cell2.item.type = item2.type;
            cell2.item.subType = item2.subType;
            cell2.item.effect = item2.effect;

            item2.amount--;
            // console.log('placed ingame item',item2.name,"@",cell2.number.x,cell2.number.y,'remaining',item2.amount);

            // for (const cell2 of app.gridInfo) {
            //   if (
            //     cell2.number.x === cell.x &&
            //     cell2.number.y === cell.y
            //   ) {
            //     cell2.item.name = item2.name;
            //     cell2.item.type = item2.type;
            //     cell2.item.subType = item2.subType;
            //     cell2.item.effect = item2.effect;
            //
            //     item2.amount--
            //     console.log('placed ingame item',cell2.number.x,cell2.number.y,item2.amount,app.itemList);
            //   }
            // }
          }
          // item2.amount--
        } else {
          console.log("item stock empty");
        }
      }
    }
  }
}
