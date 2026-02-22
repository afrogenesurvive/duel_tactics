export function playerPopupProgressCalc(app, player, popup) {
  // app.popupProgressSvgRef.current.children[2].setAttribute("height","0")
  // app.popupProgressSvgRef.current.children[2].setAttribute("fill","white")

  let path = app.popupProgressSvgRef.current.children[1];
  let rect = app.popupProgressSvgRef.current.children[2];

  let phase = "";
  let perc = 0;
  let arr = app.popupProgressBorderSvgPath.split(" ");
  path.setAttribute("fill", "blue");
  let start = 0;
  let end = 0;
  let count = 0;
  let upperIndex = Math.ceil(arr.length * (perc / 100));
  let fillPath = false;
  let emptyPath = true;

  // plyr.prePush.state === true ||
  // plyr.prePull.state === true ||

  if (player.action === "defending") {
    if (player.defending.count < player.defending.peakCount && player.defending.decay.state !== true) {
      phase = "windup";
      perc = (player.defending.count / player.defending.peakCount) * 100;
    } else if (player.defending.count === player.defending.peakCount && player.defending.decay.state !== true) {
      phase = "peak";
    }
    if (player.defending.decay.state === true) {
      if (player.defending.decay.count < 5) {
        phase = "peak";
      }
      if (player.defending.decay.count < player.defending.decay.limit && player.defending.decay.count > 5) {
        phase = "peak";
        // phase = "cooldown";
        // perc = (player.defending.decay.count / player.defending.decay.limit) * 100;
      }
    }
    if (
      player.defending.count > player.defending.peakCount &&
      player.defending.count < player.defending.limit &&
      player.defending.decay.state !== true
    ) {
      phase = "cooldown";
      perc = ((player.defending.count - player.defending.peakCount) / (player.defending.limit - player.defending.peakCount)) * 100;
    }
    if (player.defending.count >= player.defending.limit) {
      phase = "off";
    }
    if (phase === "") {
      phase = "peak";
    }
    // console.log("perkies: def", phase, perc, player.defending.count);
  }
  if (player.action === "attacking") {
    let end = player.attacking.limit;

    if (player.attacking.peak === true || player.attacking.chargePeak === true || player.attacking.count === player.attacking.peakCount) {
      phase = "peak";
      // console.log(`playerPopupProgressCalc: ${player.number} ${player.action} peak!! ${app.time}`);
    } else if (player.attacking.count < end) {
      // if count is less or > peak!!!

      if (player.attacking.count <= player.attacking.peakCount) {
        phase = "windup";
        if (popup.msg === "charging") {
          perc = (player.attacking.charge / player.attacking.maxCharge) * 100;
        } else {
          perc = (player.attacking.count / player.attacking.peakCount) * 100;
        }
      }
      if (player.attacking.count > player.attacking.peakCount) {
        phase = "cooldown";
        perc = ((player.attacking.count - player.attacking.peakCount) / (player.attacking.limit - player.attacking.peakCount)) * 100;
      }
      // console.log("perkies: atk", phase, perc, player.attacking.count);
    }
    if (player.attacking.count >= end) {
      phase = "off";
    }
  }
  if (player.action === "dodging") {
    // console.log('popup progress dodging',app.time);
    let dodgeCondition = false;
    if (
      player.dodging.countState === true &&
      player.dodging.count <= player.dodging.peak.start - player.crits.dodge &&
      app.keyPressed[player.number - 1].dodge === true
    ) {
      // console.log('dodge condition 1: true');
      dodgeCondition = true;
    }
    if (player.dodging.countState === true && player.dodging.count > player.dodging.peak.start - player.crits.dodge) {
      // console.log('dodge condition 2: true');
      dodgeCondition = true;
    }

    let startMod = player.crits.dodge;
    let endMod = player.crits.dodge;
    if (player.crits.dodge > 5) {
      player.crits.dodge = 5;
    }
    if (player.dodging.peak.start - startMod < 2) {
      startMod = player.dodging.peak.start - 2;
    }
    if (player.dodging.peak.end + endMod > player.dodging.limit - 2) {
      endMod = player.dodging.limit - (2 + player.dodging.peak.end);
    }
    if (dodgeCondition === true) {
    }

    if (player.dodging.count === 0) {
      // console.log('windup',player.dodging.count);
      phase = "windup";
      perc = (player.dodging.count / (player.dodging.peak.start - startMod)) * 100;
    }
    if (player.dodging.count >= 1 && player.dodging.count < player.dodging.peak.start - startMod) {
      // console.log('windup start:',1,'count:',player.dodging.count,'limit:',(player.dodging.peak.start - startMod));
      phase = "windup";
      perc = (player.dodging.count / (player.dodging.peak.start - startMod)) * 100;
    }
    if (player.dodging.count >= player.dodging.peak.start - startMod && player.dodging.count < player.dodging.peak.end + endMod) {
      // console.log('peak start:',(player.dodging.peak.start - startMod),'count:',player.dodging.count,'limit:',(player.dodging.peak.end + endMod));
      phase = "peak";
    }

    if (player.dodging.count > player.dodging.peak.end + endMod) {
      // console.log('cooldown start:',(player.dodging.peak.end + endMod),'count:',player.dodging.count,'limit:',player.dodging.limit);
      phase = "cooldown";
      // perc = ((player.dodging.count-(player.dodging.peak.end + endMod))/(player.dodging.limit-(player.dodging.peak.end + endMod)))*100;
      perc = (player.dodging.count / player.dodging.limit) * 100;
    }
    if (player.dodging.count >= player.dodging.limit) {
      // console.log('end count',player.dodging.count);
      phase = "off";
    }
  }
  if (player.prePush.state === true) {
    if (player.prePush.count < player.prePush.limit) {
      phase = "windup";
      perc = (player.prePush.count / player.prePush.limit) * 100;
    }
    if (player.prePush.count >= player.prePush.limit) {
      phase = "off";
    }
  }
  if (player.prePull.state === true) {
    if (player.prePull.count < player.prePull.limit) {
      phase = "windup";
      perc = (player.prePull.count / player.prePull.limit) * 100;
    }
    if (player.prePull.count >= player.prePull.limit) {
      phase = "off";
    }
  }
  if (popup.msg === "charging") {
    phase = "windup";
    perc = (player.attacking.charge / player.attacking.maxCharge) * 100;
  }

  if (phase === "windup") {
    fillPath = true;
  }
  if (phase === "peak") {
    perc = 100;
    path.setAttribute("d", arr.join(" "));
    fillPath = false;
    emptyPath = false;
  }
  if (phase === "cooldown") {
    perc = 100 - perc;
    emptyPath = true;
  }
  if (phase === "off") {
    perc = 0;
    // perc = 100;
    path.setAttribute("d", arr.join(" "));
    fillPath = false;
    emptyPath = false;
  }
  switch (phase) {
    case "windup":
      path.setAttribute("fill", "red");
      break;
    case "peak":
      path.setAttribute("fill", "green");
      break;
    case "cooldown":
      path.setAttribute("fill", "blue");
      break;
    case "off":
      path.setAttribute("fill", "yellow");
      break;
    default:
  }

  // SET MOVING BG COLOR
  let baseColor = "";
  if (perc >= 0 && perc <= 40) {
    rect.setAttribute("fill", "red");
    baseColor = "red";
  }
  if (perc >= 40 && perc <= 60) {
    rect.setAttribute("fill", "orange");
    baseColor = "orange";
  }
  if (perc >= 60 && perc <= 70) {
    rect.setAttribute("fill", "yellow");
    baseColor = "yellow";
  }
  if (perc >= 70 && perc <= 80) {
    rect.setAttribute("fill", "blue");
    baseColor = "blue";
  }
  if (perc >= 80) {
    rect.setAttribute("fill", "green");
    baseColor = "green";
  }
  if (player.action === "defending" && phase === "cooldown") {
    baseColor = "green";
  }

  // Gradients:
  // rect.setAttribute("fill","url(#grad)");
  app.popupProgressImgGradColor1 = baseColor;
  switch (phase) {
    case "windup" || "off":
      app.popupProgressImgGradColor2 = "red";
      break;
    case "peak":
      app.popupProgressImgGradColor2 = "green";
      break;
    case "cooldown":
      app.popupProgressImgGradColor2 = "blue";
      break;
    default:
  }

  // if (fillPath === true) {
  //   let newArr = [];
  //   for (var i = 0; i < upperIndex+1; i++) {
  //     newArr.push(arr[i]);
  //   }
  //   app.popupProgressSvgRef.current.children[2].setAttribute("d",newArr.join(" "));
  // }
  // if (emptyPath === true) {
  //   let newArr = arr;
  //   app.popupProgressSvgRef.current.children[2].setAttribute("d",arr.join(" "));
  //   for (var i = 0; i < upperIndex+1; i++) {
  //     newArr.pop();
  //   }
  //   app.popupProgressSvgRef.current.children[2].setAttribute("d",newArr.join(" "));
  // }

  // function svgToPng(svg, callback) {
  //   const url = getSvgUrl(svg);
  // }
  // function getSvgUrl(svg) {
  //   return URL.createObjectURL(new Blob([svg], {
  //     type: 'image/svg+xml'
  //   }));
  // }
  // svgToPng(svg, (imgData) => {
  //   pngImage.src = imgData;
  // });

  // SET SVG IMAGE filter
  // var xml = new XMLSerializer().serializeToString(app.popupProgressSvgRef.current);
  // var svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))
  // var b64start = 'data:image/svg+xml;base64,';
  // var image64 = b64start + svg64;
  // app.popupProgressImgRef.current.src = image64;

  // console.log("playerPopupProgressCalc perc: ",((100-perc)/100).toFixed(2) ,(perc/100).toFixed(2));

  // return (100-perc)/100;
  return -(perc / 100).toFixed(2);
}
