export function cellPopupProgressCalc(app, popup) {
  //   console.log(`cellPopupProgressCalc`, popup);

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

  if (popup.msg === "timer") {
    fillPath = true;

    perc = (popup.count / popup.limit) * 100;
    // if (phase === "off") {
    //     perc = 0;
    //     path.setAttribute("d", arr.join(" "));
    //     fillPath = false;
    //     emptyPath = false;
    // }
  }

  switch (perc) {
    case perc <= 20:
      path.setAttribute("fill", "red");
      break;
    case perc > 20 && perc <= 40:
      path.setAttribute("fill", "orange");
      break;
    case perc > 40 && perc <= 60:
      path.setAttribute("fill", "yellow");
      break;
    case perc > 60 && perc <= 80:
      path.setAttribute("fill", "blue");
      break;
    case perc > 80 && perc <= 100:
      path.setAttribute("fill", "green");
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

  return -(perc / 100).toFixed(2);
}
