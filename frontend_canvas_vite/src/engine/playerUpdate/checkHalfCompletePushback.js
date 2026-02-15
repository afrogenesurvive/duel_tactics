export function checkHalfCompletePushback(app, player) {
  // RESET MOVE SPEED POST PUSHBACK
  if (player.pushBack.state !== true && player.pushBack.prePushBackMoveSpeed !== 0) {
    player.speed.move = player.player.pushBack.prePushBackMoveSpeed;
    player.player.pushBack.prePushBackMoveSpeed = 0;
  }

  // COMPLETE PUSHBACK DEFLECT FLOW!
  if (player.pushBack.state === false && player.success.deflected.predeflect === true && player.moving.state === false) {
    // console.log('predefelct --> pushback ---> deflect');

    app.setDeflection(player, player.success.deflected.type, false);
  }

  // CONTINUE, COMPLETE PLAYER HALF PUSHBACK
  if (player.halfPushBack.state === true) {
    if (player.halfPushBack.countUp.state === true) {
      player.action = "deflected";

      if (player.halfPushBack.countUp.count < player.halfPushBack.countUp.limit) {
        if (player.halfPushBack.countUp.count === 1) {
          // console.log('player 1/2 pushback start');
        }

        player.halfPushBack.countUp.count++;
        // console.log('player 1/2 pushback count up',player.halfPushBack.countUp.count);
      }

      if (player.halfPushBack.countUp.count >= player.halfPushBack.countUp.limit) {
        player.halfPushBack.countUp = {
          state: false,
          count: 0,
          limit: player.halfPushBack.countUp.limit,
        };
        // console.log('player 1/2 pushback peak');
        // app.handleHalfPushBackResult('player',player);
        player.halfPushBack.countDown.state = true;
      }
    }

    if (player.halfPushBack.countDown.state === true) {
      if (player.halfPushBack.countDown.count < player.halfPushBack.countDown.limit) {
        player.halfPushBack.countDown.count++;
        // console.log('player 1/2 pushback count down',player.halfPushBack.countDown.count);
      }

      if (player.halfPushBack.countDown.count >= player.halfPushBack.countDown.limit) {
        player.halfPushBack.countDown = {
          state: false,
          count: 0,
          limit: player.halfPushBack.countDown.limit,
        };

        // console.log('player 1/2 pushback end');
        app.handleHalfPushBackResult("player", player);
        player.halfPushBack.state = false;
        player.action = "idle";
      }
    }
  }
}
