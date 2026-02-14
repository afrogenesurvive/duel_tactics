export function drawPopupBubble(app, ctx, x, y, w, h, radius, px, py, color) {
  var r = x + w;
  var b = y + h;
  if (py < y || py > y + h) {
    var con1 = Math.min(Math.max(x + radius, px - 10), r - radius - 20);
    var con2 = Math.min(Math.max(x + radius + 20, px + 10), r - radius);
  } else {
    var con1 = Math.min(Math.max(y + radius, py - 10), b - radius - 20);
    var con2 = Math.min(Math.max(y + radius + 20, py + 10), b - radius);
  }
  var dir;
  if (py < y) dir = 2;
  if (py > y) dir = 3;
  if (px < x && py >= y && py <= b) dir = 0;
  if (px > x && py >= y && py <= b) dir = 1;
  if (px >= x && px <= r && py >= y && py <= b) dir = -1;
  ctx.clearRect(x, y, app.popupSize, app.popupSize);
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = "1";
  ctx.moveTo(x + radius, y);
  if (dir == 2) {
    ctx.lineTo(con1, y);
    ctx.lineTo(px, py);
    ctx.lineTo(con2, y);
    ctx.lineTo(r - radius, y);
  } else ctx.lineTo(r - radius, y);
  ctx.quadraticCurveTo(r, y, r, y + radius);
  if (dir == 1) {
    ctx.lineTo(r, con1);
    ctx.lineTo(px, py);
    ctx.lineTo(r, con2);
    ctx.lineTo(r, b - radius);
  } else ctx.lineTo(r, b - radius);
  ctx.quadraticCurveTo(r, b, r - radius, b);
  if (dir == 3) {
    ctx.lineTo(con2, b);
    ctx.lineTo(px, py);
    ctx.lineTo(con1, b);
    ctx.lineTo(x + radius, b);
  } else ctx.lineTo(x + radius, b);
  ctx.quadraticCurveTo(x, b, x, b - radius);
  if (dir == 0) {
    ctx.lineTo(x, con2);
    ctx.lineTo(px, py);
    ctx.lineTo(x, con1);
    ctx.lineTo(x, y + radius);
  } else ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
  // ctx.globalCompositeOperation = "source-over";
  ctx.closePath();
}
