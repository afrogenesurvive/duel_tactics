export function checkPopups(app, player) {
  //PLAYER
  if (player.popups.length > 0) {
    for (const popup of player.popups) {
      let indx = player.popups.findIndex((x) => x === popup);
      if (popup.state === true && popup.position !== "northWest") {
        if (popup.limit > 0) {
          if (popup.state === true && popup.count < popup.limit) {
            popup.count++;
          }
          if (popup.count >= popup.limit) {
            player.popups.splice(indx, 1);
          }
        }
        if (popup.limit === 0) {
          // check if the player state it relates to is true, if not remove it
        }
      }
    }

    let currentPopupCount = player.popups.filter((x) => x.state === true).length;
    for (const popup2 of player.popups) {
      if (currentPopupCount < 8) {
        let indx = player.popups.findIndex((x) => x === popup2);
        if (popup2.state === false) {
          popup2.state = true;
          currentPopupCount++;
          // console.log('turn on new popup',popup2.msg);
        }
      } else {
        // console.log('currentPopup display full..',popup2.msg);
      }
    }
  }
  // CELL
  if (app.cellPopups.length > 0) {
    for (const popup of app.cellPopups) {
      let indx = app.cellPopups.findIndex((x) => x === popup);
      if (popup.state === true) {
        if (popup.limit > 0) {
          if (popup.state === true && popup.count < popup.limit) {
            popup.count++;
          }
          if (popup.count >= popup.limit) {
            app.cellPopups.splice(indx, 1);
          }
        }
        if (popup.limit === 0) {
          // check if the player state it relates to is true, if not remove it
        }
      }
    }

    let currentPopupCount = app.cellPopups.filter((x) => x.state === true).length;
    for (const popup2 of app.cellPopups) {
      if (currentPopupCount < 8) {
        let indx = app.cellPopups.findIndex((x) => x === popup2);
        if (popup2.state === false) {
          popup2.state = true;
          currentPopupCount++;
          // console.log('turn on new popup',popup2.msg);
        }
      } else {
        // console.log('currentPopup display full..',popup2.msg);
      }
    }
  }
}
