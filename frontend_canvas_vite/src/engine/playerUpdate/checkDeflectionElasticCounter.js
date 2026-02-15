export function checkDeflectionElasticCounter(app, player) {
  if (player.elasticCounter.state === true && player.elasticCounter.type === "deflected") {
    player.action = player.elasticCounter.type;

    // IF PAUSE IS START, COUNT PAUSE 1ST
    if (player.elasticCounter.pause.preState === true && player.elasticCounter.pause.type === "start") {
      player.elasticCounter.pause.preState = false;
      player.elasticCounter.pause.state = true;
      // console.log('start pause, turn on pause');
    }

    // IF PAUSE IS NOT START, COUNT UP
    if (
      player.elasticCounter.pause.type !== "start" &&
      player.elasticCounter.countUp.state !== true &&
      player.elasticCounter.countDown.state !== true &&
      player.elasticCounter.pause.state !== true
    ) {
      player.elasticCounter.countUp.state = true;
    }

    // COUNT UP
    if (player.elasticCounter.countUp.state === true) {
      if (player.elasticCounter.countUp.count < player.elasticCounter.countUp.limit + 1) {
        if (player.elasticCounter.countUp.count === 0) {
          // console.log('elastic count up start');
        }

        player.elasticCounter.countUp.count++;
        // console.log('elastic counting up: ',player.elasticCounter.countUp.count);
      }

      // FINISH COUNT UP
      if (player.elasticCounter.countUp.count >= player.elasticCounter.countUp.limit + 1) {
        // RESET COUNT UP
        player.elasticCounter.countUp = {
          state: false,
          count: 0,
          limit: player.elasticCounter.countUp.limit,
        };
        // console.log('finished count up. elastic counter peak');

        // IF PAUSE IS PEAK, COUNT PAUSE AT PEAK
        if (player.elasticCounter.pause.preState === true && player.elasticCounter.pause.type === "peak") {
          player.elasticCounter.pause.preState = false;
          player.elasticCounter.pause.state = true;
          // console.log('peak pause. turn on pause');
        }

        // IF PAUSE IS NOT PEAK, COUNT DOWM
        if (player.elasticCounter.pause.type !== "peak") {
          player.elasticCounter.countDown.state = true;
          // console.log('pause is not peak. count down');
        }
      }
    }

    // COUNT PAUSE
    if (player.elasticCounter.pause.state === true) {
      // console.log('pause count. type: ',player.elasticCounter.pause.type);

      // COUNT PAUSE
      if (player.elasticCounter.pause.count < player.elasticCounter.pause.limit + 1) {
        if (player.elasticCounter.pause.count === 0) {
          // console.log('pause count start');
        }

        player.elasticCounter.pause.count++;
        // console.log('pause counting: ',player.elasticCounter.pause.count);
      }

      // FINISH PAUSE
      if (player.elasticCounter.pause.count >= player.elasticCounter.pause.limit + 1) {
        // console.log('pause count finished');

        // IF PAUSE IS START, COUNT UP
        if (player.elasticCounter.pause.type === "start") {
          player.elasticCounter.countUp.state = true;
          // console.log('start pause count finished. count up');
        }

        // IF PAUSE IS PEAK, COUNT DOWN
        if (player.elasticCounter.pause.type === "peak") {
          player.elasticCounter.countDown.state = true;
          // console.log('peak pause count finished. count down');
        }

        // IF PAUSE IS END, TURN OFF ELASTIC COUNT
        if (player.elasticCounter.pause.type === "end") {
          player.elasticCounter.state = false;
          player.elasticCounter.type = "";
          player.elasticCounter.subType = "";
          // player.action = "idle";
          // console.log('end pause count finished. turn off elastic count');
        }

        // RESET PAUSE COUNT
        player.elasticCounter.pause.state = false;
        player.elasticCounter.pause.count = 0;
      }
    }

    // COUNT DOWN
    if (player.elasticCounter.countDown.state === true) {
      // COUNT DOWN
      if (player.elasticCounter.countDown.count < player.elasticCounter.countDown.limit + 1) {
        if (player.elasticCounter.countDown.count === 1) {
          // console.log('elastic count down start');
        }

        player.elasticCounter.countDown.count++;
        // console.log('elastic counting down: ',player.elasticCounter.countDown.count);
      }

      // FINISH COUNT DOWN
      if (player.elasticCounter.countDown.count >= player.elasticCounter.countDown.limit + 1) {
        player.elasticCounter.countDown = {
          state: false,
          count: 0,
          limit: player.elasticCounter.countDown.limit,
        };
        // console.log('finished count down. elastic counter end');

        // IF PAUSE IS END, COUNT PAUSE
        if (player.elasticCounter.pause.preState === true && player.elasticCounter.pause.type === "end") {
          player.elasticCounter.pause.preState = false;
          player.elasticCounter.pause.state = true;

          // console.log('end pause. turn on pause');
        }

        // IF PAUSE IS NOT END, TURN OFF ELASTIC COUNTER
        if (player.elasticCounter.pause.type !== "end") {
          player.elasticCounter.state = false;
          player.elasticCounter.type = "";
          player.elasticCounter.subType = "";
          player.action = "idle";

          // reset deflected here?
          // console.log('pause is not end. turn off elastic count',player.success.deflected.state,player.success.deflected.count,'/',player.success.deflected.limit);
        }
      }
    }
  }
}
